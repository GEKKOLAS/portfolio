"use client";
import React, { useEffect, useRef } from "react";

// BurningHero: Integrates the provided vertex/fragment shader effect without touching <head> or global markup.
// The component renders a fixed hero section and a WebGL canvas that performs a burn/fire reveal on the text.
// After the animation completes, the canvas hides itself but the hero content remains (or you can optionally fade it out externally).

interface BurningHeroProps {
  textTitle?: string;
  textSubtitle?: string;
  burnText?: string; // Text used inside texture for shader
  durationMs?: number; // Total animation duration (ms)
  className?: string; // Extra classes for root wrapper
  autoStart?: boolean; // Start immediately on mount
  triggerScrollY?: number; // If provided, start when window.scrollY >= value
}

export const BurningHero: React.FC<BurningHeroProps> = ({
  textTitle = "We create experiences",
  textSubtitle = "Not simple websites but real immersive experiences",
  burnText = "LOGO",
  durationMs = 8000,
  className = "",
  autoStart = true,
  triggerScrollY,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const uniformsRef = useRef<Record<string, WebGLUniformLocation | null>>({});
  const textTextureRef = useRef<WebGLTexture | null>(null);
  const startTimeRef = useRef<number>(0);
  const rafRef = useRef<number>(0);
  const startedRef = useRef(false);

  // Provided shaders adapted to inline strings.
  const vertSource = `precision mediump float;\n\n    varying vec2 vUv;\n    attribute vec2 a_position;\n    void main() {\n        vUv = a_position;\n        gl_Position = vec4(a_position, 0.0, 1.0);\n    }`;

  const fragSource = `precision mediump float;\n\n    varying vec2 vUv;\n    uniform vec2 u_resolution;\n    uniform float u_progress;\n    uniform float u_time;\n    uniform sampler2D u_text;\n    uniform vec3 u_fireBase;\n    uniform vec3 u_fireBright;\n\n    float rand(vec2 n) {\n        return fract(cos(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);\n    }\n    float noise(vec2 n) {\n        const vec2 d = vec2(0., 1.);\n        vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));\n        return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);\n    }\n    float fbm(vec2 n) {\n        float total = 0.0, amplitude = .4;\n        for (int i = 0; i < 4; i++) {\n            total += noise(n) * amplitude;\n            n += n;\n            amplitude *= 0.6;\n        }\n        return total;\n    }\n    void main() {\n        vec2 uv = vUv;\n        uv.x *= min(1., u_resolution.x / u_resolution.y);\n        uv.y *= min(1., u_resolution.y / u_resolution.x);\n        vec2 screenUv = vUv * 0.5 + 0.5;\n        screenUv.y = 1.0 - screenUv.y;\n        float t = u_progress;\n        vec4 textColor = texture2D(u_text, screenUv);\n        vec3 color = textColor.rgb;\n        float main_noise = 1. - fbm(.75 * uv + 10. - vec2(.3, .9 * t));\n        float paper_darkness = smoothstep(main_noise - .1, main_noise, t);\n        color -= vec3(.99, .95, .99) * paper_darkness;\n        float fFire = clamp(fbm(6. * uv - vec2(0., .005 * u_time)), 0.0, 1.0);\n        vec3 fire_color = mix(u_fireBase, u_fireBright, fFire);\n        float show_fire = smoothstep(.4, .9, fbm(10. * uv + 2. - vec2(0., .005 * u_time)));\n        show_fire += smoothstep(.7, .8, fbm(.5 * uv + 5. - vec2(0., .001 * u_time)));\n        float fire_border = .02 * show_fire;\n        float fire_edge = smoothstep(main_noise - fire_border, main_noise - .5 * fire_border, t);\n        fire_edge *= (1. - smoothstep(main_noise - .5 * fire_border, main_noise, t));\n        color += fire_color * fire_edge;\n        float opacity = 1. - smoothstep(main_noise - .0005, main_noise, t);\n        gl_FragColor = vec4(color, opacity);\n    }`;

  const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

  const init = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const glContext =
      canvas.getContext("webgl", { premultipliedAlpha: false }) ||
      canvas.getContext("experimental-webgl");
    if (!glContext) return;
    const gl = glContext as WebGLRenderingContext;
    glRef.current = gl;

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = createShader(gl.VERTEX_SHADER, vertSource);
    const fs = createShader(gl.FRAGMENT_SHADER, fragSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    // Fullscreen quad
    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buffer = gl.createBuffer();
    if (!buffer) return;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniforms discovery
    const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    const uniforms: Record<string, WebGLUniformLocation | null> = {};
    for (let i = 0; i < uniformCount; i++) {
      const info = gl.getActiveUniform(program, i);
      if (info) uniforms[info.name] = gl.getUniformLocation(program, info.name);
    }
    uniformsRef.current = uniforms;
    // Initialize random palette and set uniforms
    const palettes: Array<{ base: [number, number, number]; bright: [number, number, number] }> = [
      { base: [0.02, 0.10, 0.01], bright: [0.10, 1.60, 0.12] }, // acid green
      { base: [0.10, 0.04, 0.00], bright: [1.20, 0.55, 0.05] }, // orange
      { base: [0.00, 0.02, 0.10], bright: [0.10, 0.70, 1.60] }, // blue
      { base: [0.06, 0.00, 0.08], bright: [1.40, 0.30, 1.80] }, // purple
    ];
    const pick = palettes[Math.floor(Math.random() * palettes.length)];
    const uFireBase = uniforms["u_fireBase"]; const uFireBright = uniforms["u_fireBright"];
    if (uFireBase) gl.uniform3f(uFireBase, pick.base[0], pick.base[1], pick.base[2]);
    if (uFireBright) gl.uniform3f(uFireBright, pick.bright[0], pick.bright[1], pick.bright[2]);

    // Text canvas texture
    const textCanvas = document.createElement("canvas");
    textCanvas.width = 2048;
    textCanvas.height = 1024;
    const ctx2d = textCanvas.getContext("2d");
    if (ctx2d) {
      ctx2d.fillStyle = "white";
      ctx2d.fillRect(0, 0, textCanvas.width, textCanvas.height);
      ctx2d.fillStyle = "black";
      ctx2d.font = "bold 320px Arial";
      ctx2d.textAlign = "center";
      ctx2d.textBaseline = "middle";
      ctx2d.fillText(burnText, textCanvas.width / 2, textCanvas.height / 2);
    }
    const tex = gl.createTexture();
    if (!tex) return;
    textTextureRef.current = tex;
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textCanvas);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

    resize();
    startTimeRef.current = performance.now();
    animate();
  };

  const resize = () => {
    const canvas = canvasRef.current;
    const gl = glRef.current;
    const uniforms = uniformsRef.current;
    if (!canvas || !gl || !uniforms) return;
    const dpr = Math.min(window.devicePixelRatio, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = "100%";
    canvas.style.height = "100vh";
    gl.viewport(0, 0, canvas.width, canvas.height);
    if (uniforms["u_resolution"]) {
      gl.uniform2f(uniforms["u_resolution"], canvas.width, canvas.height);
    }
  };

  const animate = () => {
    const gl = glRef.current;
    const uniforms = uniformsRef.current;
    const tex = textTextureRef.current;
    const canvas = canvasRef.current;
    if (!gl || !uniforms || !tex || !canvas) return;
    const now = performance.now();
    const elapsed = (now - startTimeRef.current) / durationMs;
    let progress: number;
    if (elapsed <= 1) {
      progress = easeInOut(elapsed);
    } else {
      // Hide canvas after finish
      canvas.style.opacity = "0";
      canvas.style.transition = "opacity 0.6s ease";
      return;
    }
    if (uniforms["u_time"]) gl.uniform1f(uniforms["u_time"], now);
    if (uniforms["u_progress"]) gl.uniform1f(uniforms["u_progress"], progress);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    if (uniforms["u_text"]) gl.uniform1i(uniforms["u_text"], 0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    rafRef.current = requestAnimationFrame(animate);
  };

  // Start conditions: autoStart or scroll trigger.
  useEffect(() => {
    const handleScroll = () => {
      if (startedRef.current || triggerScrollY == null) return;
      if (window.scrollY >= triggerScrollY) init();
    };
    if (autoStart && triggerScrollY == null) init();
    if (triggerScrollY != null) window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      if (triggerScrollY != null) window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStart, triggerScrollY]);

  return (
    <div className={`relative w-full h-screen overflow-hidden ${className}`}>
      <div className="hero-section absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e]">
        <div className="hero-content text-center px-5 text-white">
          <h1
            className="hero-title text-5xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent mb-6 leading-tight"
            style={{ backgroundImage: 'linear-gradient(90deg, #8cff00, #39ff14, #c6ff61)' }}
          >
            {textTitle}
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl font-light max-w-3xl mx-auto opacity-90 leading-relaxed">
            {textSubtitle}
          </p>
        </div>
      </div>
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 w-full h-full z-50"
      />
    </div>
  );
};
