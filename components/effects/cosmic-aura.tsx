"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { Lensflare, LensflareElement } from "three/examples/jsm/objects/Lensflare";

// Adaptation of the provided "Interactive Cosmic Anomaly" to render inside a parent container.
// It mounts a WebGL canvas sized to its wrapper, without touching <head> or global DOM.

type ThemeName = "nebula" | "sunset" | "forest" | "aurora" | "purple";

export const CosmicAura: React.FC<{ className?: string; theme?: ThemeName }> = ({ className, theme = "nebula" }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const containerEl = container as HTMLDivElement;
    const canvasEl = canvas as HTMLCanvasElement;

    let scene: THREE.Scene,
      camera: THREE.PerspectiveCamera,
      renderer: THREE.WebGLRenderer,
      composer: EffectComposer,
      controls: OrbitControls,
      mainGroup: THREE.Group,
      clock: THREE.Clock,
      coreSphere: THREE.Points,
        orbitRings: THREE.Group,
      centralLight: THREE.PointLight,
      lensflare: Lensflare | null = null,
      currentHdrTexture: THREE.Texture | null = null,
      destroyed = false;

    const mouse = new THREE.Vector2(-10, -10);
    let isExplosionActive = false;
    let explosionStartTime = 0;
    const explosionDuration = 2000;
    let hoverActive = false;
    let hoverProgress = 0; // 0..1 eased
    const hoverExplodeMax = 0.6; // how much rings expand on hover
    let lastElapsed = 0;

    const themes: Record<ThemeName, {
      sphere: THREE.Color[];
      rings: (i: number, count: number, j: number, pCount: number) => THREE.Color;
      hdr: string;
    }> = {
      nebula: {
        sphere: [new THREE.Color(0x00ffff), new THREE.Color(0xff1493), new THREE.Color(0x4169e1), new THREE.Color(0xff69b4), new THREE.Color(0x00bfff)],
        rings: (i, count, j, pCount) => new THREE.Color().setHSL((i / count) * 0.6 + (j / pCount) * 0.2 + 0.5, 0.8, 0.6),
        hdr: "https://www.spacespheremaps.com/wp-content/uploads/HDR_blue_nebulae-1.hdr",
      },
      sunset: {
        sphere: [new THREE.Color(0xff4500), new THREE.Color(0xff8c00), new THREE.Color(0xffd700), new THREE.Color(0xff0080), new THREE.Color(0xda70d6)],
        rings: (i, count, j, pCount) => new THREE.Color().setHSL((i / count) * 0.1 + (j / pCount) * 0.1 + 0.0, 0.9, 0.7),
        hdr: "https://www.spacespheremaps.com/wp-content/uploads/HDR_silver_and_gold_nebulae.hdr",
      },
      forest: {
        sphere: [new THREE.Color(0x228b22), new THREE.Color(0x00ff7f), new THREE.Color(0x3cb371), new THREE.Color(0x1e90ff), new THREE.Color(0x87cefa)],
        rings: (i, count, j, pCount) => new THREE.Color().setHSL((i / count) * 0.2 + (j / pCount) * 0.1 + 0.25, 0.8, 0.55),
        hdr: "https://www.spacespheremaps.com/wp-content/uploads/HDR_subdued_multi_nebulae.hdr",
      },
      aurora: {
        sphere: [new THREE.Color(0x00ff7f), new THREE.Color(0x40e0d0), new THREE.Color(0x483d8b), new THREE.Color(0x9932cc), new THREE.Color(0x00fa9a)],
        rings: (i, count, j, pCount) => new THREE.Color().setHSL((i / count) * 0.3 + (j / pCount) * 0.1 + 0.45, 0.9, 0.65),
        hdr: "https://www.spacespheremaps.com/wp-content/uploads/HDR_multi_nebulae.hdr",
      },
      purple: {
        // Deep purple-to-magenta gradient for a strong violet look
        sphere: [
          new THREE.Color(0x4b0082), // indigo
          new THREE.Color(0x6a0dad), // purple
          new THREE.Color(0x8a2be2), // blueviolet
          new THREE.Color(0x9932cc), // darkorchid
          new THREE.Color(0xba55d3), // mediumorchid
        ],
        // Keep hue around purples (approx 0.76–0.86 in HSL), high saturation, mid-high lightness
        rings: (i, count, j, pCount) => {
          const baseHue = 0.78; // ~280°
          const h = baseHue + (i / count) * 0.06 + (j / pCount) * 0.02;
          const s = 0.85;
          const l = 0.62;
          return new THREE.Color().setHSL(h % 1, s, l);
        },
        hdr: "https://www.spacespheremaps.com/wp-content/uploads/HDR_multi_nebulae.hdr",
      },
    };

    const pointMaterialShader = {
      vertexShader: `
        attribute float size;
        attribute vec3 randomDir;
        varying vec3 vColor;
        varying float vDistance;
        varying float vMouseEffect;
        uniform float time;
        uniform vec2 uMouse;
        uniform float uExplode;
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
        float snoise(vec3 v) {
          const vec2 C = vec2(1.0/6.0, 1.0/3.0);
          const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
          vec3 i = floor(v + dot(v, C.yyy));
          vec3 x0 = v - i + dot(i, C.xxx);
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min(g.xyz, l.zxy);
          vec3 i2 = max(g.xyz, l.zxy);
          vec3 x1 = x0 - i1 + C.xxx;
          vec3 x2 = x0 - i2 + C.yyy;
          vec3 x3 = x0 - D.yyy;
          i = mod289(i);
          vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
          float n_ = 0.142857142857;
          vec3 ns = n_ * D.wyz - D.xzx;
          vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_);
          vec4 x = x_ * ns.x + ns.yyyy;
          vec4 y = y_ * ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);
          vec4 b0 = vec4(x.xy, y.xy);
          vec4 b1 = vec4(x.zw, y.zw);
          vec4 s0 = floor(b0)*2.0 + 1.0;
          vec4 s1 = floor(b1)*2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));
          vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
          vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
          vec3 p0 = vec3(a0.xy,h.x);
          vec3 p1 = vec3(a0.zw,h.y);
          vec3 p2 = vec3(a1.xy,h.z);
          vec3 p3 = vec3(a1.zw,h.w);
          vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
          p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
          vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
          m = m * m;
          return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
        }
        void main() {
          vColor = color;
          float explodeAmount = uExplode * 35.0;
          float turbulence = snoise(position * 0.4 + randomDir * 2.0 + time * 0.8) * 10.0 * uExplode;
          vec3 explodedPos = position + randomDir * (explodeAmount + turbulence);
          vec3 mixedPos = mix(position, explodedPos, uExplode);
          vec4 projectedVertex = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          vec2 screenPos = projectedVertex.xy / projectedVertex.w;
          float mouseDist = distance(screenPos, uMouse);
          float mouseEffect = 1.0 - smoothstep(0.0, 0.25, mouseDist);
          vMouseEffect = mouseEffect;
          float noiseFrequency = 0.4;
          float noiseAmplitude = (0.8 + mouseEffect * 3.5) * (1.0 - uExplode);
          vec3 noiseInput = mixedPos * noiseFrequency + time * 0.5;
          vec3 displacement = vec3(snoise(noiseInput), snoise(noiseInput + vec3(10.0)), snoise(noiseInput + vec3(20.0)));
          vec3 finalPos = mixedPos + displacement * noiseAmplitude;
          float pulse = sin(time + length(position)) * 0.1 + 1.0;
          vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
          vDistance = -mvPosition.z;
          gl_PointSize = size * (400.0 / -mvPosition.z) * pulse * (1.0 + vMouseEffect * 0.5);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vMouseEffect;
        uniform float time;
        uniform float uExplode;
        float rand(vec2 co){ return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453); }
        void main() {
          vec2 cxy = 2.0 * gl_PointCoord - 1.0;
          float r = dot(cxy, cxy);
          if (r > 1.0) discard;
          // Softer glow and twinkle to reduce perceived brightness
          float glow = exp(-r * 3.5) * 0.55 + vMouseEffect * 0.15;
          float twinkle = rand(gl_PointCoord + time) * 0.15 + 0.5;
          // Darker violet explosion tint
          vec3 explosionColor = vec3(0.45, 0.25, 0.75);
          vec3 mixedColor = mix(vColor, explosionColor, uExplode * 0.7);
          // Reduce explosion brightness boost significantly
          mixedColor *= (1.0 + uExplode * 0.8);
          // Global darkening factor for particles
          vec3 finalColor = mixedColor * 0.5 * (1.0 + sin(time * 0.8) * 0.15 + vMouseEffect * 0.35) * glow * twinkle;
          gl_FragColor = vec4(finalColor, smoothstep(0.0, 1.0, glow));
        }
      `,
    };


    function easeInOutCubic(x: number) {
      return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    }

    function createPointShaderMaterial() {
      return new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 }, uMouse: { value: mouse }, uExplode: { value: 0.0 } },
        vertexShader: pointMaterialShader.vertexShader,
        fragmentShader: pointMaterialShader.fragmentShader,
        vertexColors: true,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
    }

    function createSpiralSphere(radius: number, particleCount: number) {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);
      const randomDirs = new Float32Array(particleCount * 3).fill(0);
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const phi = Math.acos(-1 + (2 * i) / particleCount);
        const theta = Math.sqrt(particleCount * Math.PI) * phi;
        positions[i3] = radius * Math.cos(theta) * Math.sin(phi);
        positions[i3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
        positions[i3 + 2] = radius * Math.cos(phi);
        sizes[i] = Math.random() * 0.2 + 0.1;
      }
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
      geometry.setAttribute("randomDir", new THREE.BufferAttribute(randomDirs, 3));
      const material = createPointShaderMaterial();
      (material.uniforms.uExplode.value as number) = 0;
      return new THREE.Points(geometry, material);
    }

    function createOrbitRings(radius: number, count: number, thickness: number) {
      const group = new THREE.Group();
      for (let i = 0; i < count; i++) {
        const particleCount = 4000;
        const ringGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);
        const randomDirs = new Float32Array(particleCount * 3);
        const randomVec = new THREE.Vector3();
        for (let j = 0; j < particleCount; j++) {
          const j3 = j * 3;
          const angle = (j / particleCount) * Math.PI * 2;
          const radiusVariation = radius + (Math.random() - 0.5) * thickness;
          positions[j3] = Math.cos(angle) * radiusVariation;
          positions[j3 + 1] = (Math.random() - 0.5) * (thickness * 0.5);
          positions[j3 + 2] = Math.sin(angle) * radiusVariation;
          sizes[j] = Math.random() * 0.15 + 0.08;
          randomVec.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1).normalize();
          randomDirs[j3] = randomVec.x;
          randomDirs[j3 + 1] = randomVec.y;
          randomDirs[j3 + 2] = randomVec.z;
        }
        ringGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        ringGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
        ringGeometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
        ringGeometry.setAttribute("randomDir", new THREE.BufferAttribute(randomDirs, 3));
        const ring = new THREE.Points(ringGeometry, createPointShaderMaterial());
        ring.rotation.x = Math.random() * Math.PI;
        ring.rotation.y = Math.random() * Math.PI;
        group.add(ring);
      }
      return group;
    }


    function init() {
      clock = new THREE.Clock();
      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x000000, 0.008);

      const rect = containerEl.getBoundingClientRect();
      const aspect = Math.max(1, rect.width) / Math.max(1, rect.height);

      camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 50000);
      camera.position.set(0, 5, 14);

      renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvasEl, alpha: true });
      renderer.setSize(rect.width, rect.height);
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.04;
      controls.rotateSpeed = 0.6;
      controls.minDistance = 10;
      controls.maxDistance = 50;
      controls.target.set(0, 0, 0);

      const renderScene = new RenderPass(scene, camera);
      const bloomPass = new UnrealBloomPass(new THREE.Vector2(rect.width, rect.height), 0.9, 0.35, 0.85);
      bloomPass.threshold = 0.1;
      bloomPass.strength = 0.55;
      bloomPass.radius = 0.35;
      composer = new EffectComposer(renderer);
      composer.addPass(renderScene);
      composer.addPass(bloomPass);

      coreSphere = createSpiralSphere(5, 20000); // reduced particles for small container
      orbitRings = createOrbitRings(7.5, 6, 0.6);

      mainGroup = new THREE.Group();
      mainGroup.add(coreSphere);
      mainGroup.add(orbitRings);
      scene.add(mainGroup);

      centralLight = new THREE.PointLight(0x9932cc, 2, 0);
      centralLight.position.set(0, 0, 0);
      scene.add(centralLight);

      const textureLoader = new THREE.TextureLoader();
      const textureFlare0 = textureLoader.load("https://threejs.org/examples/textures/lensflare/lensflare0.png");
      const textureFlare3 = textureLoader.load("https://threejs.org/examples/textures/lensflare/lensflare3.png");
      lensflare = new Lensflare();
      lensflare.addElement(new LensflareElement(textureFlare0, 200, 0, centralLight.color));
      lensflare.addElement(new LensflareElement(textureFlare3, 35, 0.6));
      lensflare.addElement(new LensflareElement(textureFlare3, 45, 0.7));
      lensflare.addElement(new LensflareElement(textureFlare3, 70, 0.9));
      lensflare.addElement(new LensflareElement(textureFlare3, 40, 1));
      centralLight.add(lensflare);

      changeTheme(theme);

      const resize = () => {
        if (destroyed) return;
        const r = containerEl.getBoundingClientRect();
        const w = Math.max(1, Math.floor(r.width));
        const h = Math.max(1, Math.floor(r.height));
        renderer.setSize(w, h);
        composer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };

      const onMouseMove = (event: MouseEvent) => {
        const r = containerEl.getBoundingClientRect();
        const xPix = event.clientX;
        const yPix = event.clientY;
        const inside = xPix >= r.left && xPix <= r.right && yPix >= r.top && yPix <= r.bottom;
        hoverActive = inside;
        const x = (xPix - r.left) / r.width;
        const y = (yPix - r.top) / r.height;
        mouse.x = x * 2 - 1;
        mouse.y = -(y * 2 - 1);
      };

      const onClick = () => {
        if (isExplosionActive) return;
        isExplosionActive = true;
        explosionStartTime = clock.getElapsedTime();
      };

      const ro = new ResizeObserver(resize);
      ro.observe(containerEl);
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("click", onClick);

      function animate() {
        if (destroyed) return;
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();
        const delta = elapsedTime - lastElapsed;
        lastElapsed = elapsedTime;
        const time = elapsedTime;

        if (isExplosionActive) {
          const explosionTime = (elapsedTime - explosionStartTime) * 1000;
          const progress = Math.min(explosionTime / explosionDuration, 1.0);
          const pulseProgress = Math.sin(progress * Math.PI);
          const easedProgress = easeInOutCubic(pulseProgress);
          // Update hover progress
          hoverProgress = Math.min(1, hoverProgress + delta * 2);
          const hoverExplode = easeInOutCubic(hoverProgress) * hoverExplodeMax;
          const totalExplode = Math.max(easedProgress, hoverExplode);
          orbitRings.children.forEach((ring: any) => {
            ring.material.uniforms.uExplode.value = totalExplode;
          });
          if (progress >= 1.0) {
            isExplosionActive = false;
          }
        }
        // Handle hover-only state when not exploding
        if (!isExplosionActive) {
          if (hoverActive) {
            hoverProgress = Math.min(1, hoverProgress + delta * 2);
          } else {
            hoverProgress = Math.max(0, hoverProgress - delta * 2);
          }
          const hoverExplode = easeInOutCubic(hoverProgress) * hoverExplodeMax;
          orbitRings.children.forEach((ring: any) => {
            ring.material.uniforms.uExplode.value = hoverExplode;
          });
        }

        (coreSphere.material as any).uniforms.time.value = time;
        (coreSphere.material as any).uniforms.uMouse.value.copy(mouse);
        orbitRings.children.forEach((ring: any) => {
          ring.material.uniforms.time.value = time;
          ring.material.uniforms.uMouse.value.copy(mouse);
        });

        const breathe = 1 + Math.sin(time * 1.5) * 0.05;
        const hoverScale = 1 + easeInOutCubic(hoverProgress) * 0.15;
        coreSphere.scale.set(breathe * hoverScale, breathe * hoverScale, breathe * hoverScale);
        orbitRings.children.forEach((ring: any, index: number) => {
          const speed = 0.0005 * (index + 1);
          ring.rotation.z += speed;
          ring.rotation.x += speed * 0.3;
          ring.rotation.y += speed * 0.2;
          ring.scale.y = 1.0 + Math.sin(time * 3.0 + index * 0.5) * 0.2;
        });
        mainGroup.rotation.y += 0.0005;
        controls.update();
        composer.render();
      }

      function changeTheme(themeName: ThemeName) {
        const t = themes[themeName];
        if (!t) return;
        const sphereColorsAttr = (coreSphere.geometry as any).attributes.color as THREE.BufferAttribute;
        for (let i = 0; i < sphereColorsAttr.count; i++) {
          const colorPos = (i / sphereColorsAttr.count) * (t.sphere.length - 1);
          const c1 = t.sphere[Math.floor(colorPos)];
          const c2 = t.sphere[Math.min(Math.floor(colorPos) + 1, t.sphere.length - 1)];
          const newColor = new THREE.Color().copy(c1).lerp(c2, colorPos - Math.floor(colorPos));
          sphereColorsAttr.setXYZ(i, newColor.r, newColor.g, newColor.b);
        }
        sphereColorsAttr.needsUpdate = true;
        orbitRings.children.forEach((ring: any, i: number) => {
          const ringColorsAttr = ring.geometry.attributes.color as THREE.BufferAttribute;
          for (let j = 0; j < ringColorsAttr.count; j++) {
            const newColor = t.rings(i, orbitRings.children.length, j, ringColorsAttr.count);
            ringColorsAttr.setXYZ(j, newColor.r, newColor.g, newColor.b);
          }
          ringColorsAttr.needsUpdate = true;
        });
        const loader = new RGBELoader();
        loader.load(t.hdr, (texture: THREE.Texture) => {
          texture.mapping = THREE.EquirectangularReflectionMapping;
          if (currentHdrTexture) currentHdrTexture.dispose();
          // Keep environment for reflections but do not draw background for transparency
          scene.background = null;
          scene.environment = texture;
          currentHdrTexture = texture;
        });
      }

      animate();

      return () => {
        destroyed = true;
        ro.disconnect();
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("click", onClick);
        composer?.dispose();
        renderer?.dispose();
        currentHdrTexture?.dispose();
        (coreSphere.material as any)?.dispose?.();
        orbitRings.children.forEach((ring: any) => ring.material?.dispose?.());
      };
    }

    const cleanup = init();
    return () => { cleanup?.(); };
  }, [theme]);

  return (
    <div ref={containerRef} className={className} aria-hidden>
      <canvas ref={canvasRef} className="absolute bg-transparent inset-0 w-full h-full" />
    </div>
  );
};
