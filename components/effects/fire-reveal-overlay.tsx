"use client";
import React, { useEffect, useRef } from "react";

interface FireRevealOverlayProps {
  text?: string; // optional text mask
  imageSrc?: string; // optional image mask path under public
  imageScale?: number; // escala (0.1 - 1) para reducir tamaño de la imagen máscara
  imageScaleY?: number; // escala vertical independiente (si no se define usa imageScale)
  startDelayMs?: number; // retraso antes de iniciar la animación (fuego y progreso)
  durationMs?: number; // total animation time
  onComplete?: () => void;
  className?: string;
  reveal?: boolean; // if true, treat burn as alpha mask revealing underlying content
  onWhiteShown?: () => void; // callback cuando el fondo blanco aparece
  fireColor?: [number, number, number]; // optional override color (RGB multiplier)
  showWhiteBackground?: boolean; // control white background reveal behavior
  useLogoMask?: boolean; // when true, use provided imageSrc (or default logo) as the burn/reveal mask
  imageFit?: 'contain' | 'cover'; // cómo ajustar la imagen dentro del viewport
}

// Lightweight single-run fire/burn effect canvas.
export const FireRevealOverlay: React.FC<FireRevealOverlayProps> = ({
  text = "LOGO",
  imageSrc,
  imageScale = 0.5,
  imageScaleY,
  startDelayMs = 0,
  durationMs = 6000,
  onComplete,
  className = "fixed inset-0 z-40 pointer-events-none w-full h-screen",
  reveal = true,
  onWhiteShown,
  fireColor,
  showWhiteBackground = true,
  useLogoMask = false,
  imageFit = 'contain',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const uniformsRef = useRef<Record<string, WebGLUniformLocation | null>>({});
  const texRef = useRef<WebGLTexture | null>(null);
  const startRef = useRef<number>(0);
  const rafRef = useRef<number>(0);
  const finishedRef = useRef(false);
  const whiteShownRef = useRef(false);

  const vert = `precision mediump float;\nattribute vec2 a_position;\nvarying vec2 vUv;\nvoid main(){vUv=a_position;gl_Position=vec4(a_position,0.0,1.0);}';`;
  // Fragment shader with configurable fire color
  const frag = `precision mediump float;\nvarying vec2 vUv;\nuniform vec2 u_resolution;\nuniform float u_progress;\nuniform float u_time;\nuniform sampler2D u_text;\nuniform vec3 u_fireColor;\nuniform vec2 u_uvScale;\nuniform vec2 u_uvOffset;\nfloat rand(vec2 n){return fract(cos(dot(n,vec2(12.9898,4.1414)))*43758.5453);}\nfloat noise(vec2 n){vec2 d=vec2(0.,1.);vec2 b=floor(n),f=smoothstep(vec2(0.),vec2(1.),fract(n));return mix(mix(rand(b),rand(b+d.yx),f.x),mix(rand(b+d.xy),rand(b+d.yy),f.x),f.y);}\nfloat fbm(vec2 n){float total=0.,a=.4;for(int i=0;i<4;i++){total+=noise(n)*a;n+=n;a*=0.6;}return total;}\nvoid main(){vec2 uv=vUv;uv.x*=min(1.,u_resolution.x/u_resolution.y);uv.y*=min(1.,u_resolution.y/u_resolution.x);vec2 sUv=vUv*0.5+0.5; sUv = sUv * u_uvScale + u_uvOffset; sUv.y=1.0-sUv.y;float t=u_progress;vec4 textColor=texture2D(u_text,sUv);vec3 color=textColor.rgb;float main_noise=1.-fbm(.75*uv+10.-vec2(.3,.9*t));float paper_dark=smoothstep(main_noise-.1,main_noise,t);color-=vec3(.99,.95,.99)*paper_dark;vec3 fire_color=fbm(6.*uv-vec2(0.,.005*u_time))*u_fireColor;float show_fire=smoothstep(.4,.9,fbm(10.*uv+2.-vec2(0.,.005*u_time)));show_fire+=smoothstep(.7,.8,fbm(.5*uv+5.-vec2(0.,.001*u_time)));float fire_border=.02*show_fire;float fire_edge=smoothstep(main_noise-fire_border,main_noise-.5*fire_border,t);fire_edge*= (1.-smoothstep(main_noise-.5*fire_border,main_noise,t));color+=fire_color*fire_edge;float opacity=1.-smoothstep(main_noise-.0005,main_noise,t);gl_FragColor=vec4(color,opacity);}';`

  const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

  const init = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const glContext = canvas.getContext("webgl", { premultipliedAlpha: false }) || canvas.getContext("experimental-webgl");
    if (!glContext) return;
    const gl = glContext as WebGLRenderingContext;
    glRef.current = gl;
    // Enable alpha blending so transparent areas stay invisible (prevents white flash)
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  // Inicio oculto, controlado por white background flag
  if (showWhiteBackground){
    canvas.style.opacity = "0";
    canvas.style.transition = "opacity .6s ease";
  } else {
    canvas.style.opacity = "1";
    canvas.style.transition = "opacity 0s";
  }

    const createShader = (type: number, src: string) => {
      const shader = gl.createShader(type); if (!shader) return null;
      gl.shaderSource(shader, src); gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { console.error(gl.getShaderInfoLog(shader)); gl.deleteShader(shader); return null; }
      return shader;
    };
  const vs = createShader(gl.VERTEX_SHADER, vert.replace("';",""));
  const fs = createShader(gl.FRAGMENT_SHADER, frag.replace("';",""));
    if (!vs || !fs) return;
    const program = gl.createProgram(); if (!program) return;
    gl.attachShader(program, vs); gl.attachShader(program, fs); gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) { console.error(gl.getProgramInfoLog(program)); return; }
    gl.useProgram(program);

    const quad = new Float32Array([-1,-1, 1,-1, -1,1, 1,1]);
    const buf = gl.createBuffer(); if (!buf) return;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posLoc); gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // uniforms
    const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    const uniforms: Record<string, WebGLUniformLocation | null> = {};
    for (let i=0;i<count;i++){ const info = gl.getActiveUniform(program,i); if (info) uniforms[info.name]=gl.getUniformLocation(program, info.name); }
    uniformsRef.current = uniforms;

    // fire color uniform (defaults to acid green for backward-compat)
    const fireColLoc = uniforms["u_fireColor"]; 
    if (fireColLoc) {
      const col = fireColor ?? [0.0, 2.6, 0.0];
      gl.uniform3f(fireColLoc, col[0], col[1], col[2]);
    }
    const uvScaleLoc = uniforms["u_uvScale"]; const uvOffsetLoc = uniforms["u_uvOffset"]; if (uvScaleLoc && uvOffsetLoc){ gl.uniform2f(uvScaleLoc,1.0,1.0); gl.uniform2f(uvOffsetLoc,0.0,0.0); }

    // text / mask texture: use imageSrc when useLogoMask, else render text mask
    const tex = gl.createTexture(); if (!tex) return; texRef.current = tex;
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    if (useLogoMask) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        // Canvas cuadrado para centrar y escalar la imagen
        const dprCanvas = Math.min(window.devicePixelRatio || 1, 2);
        const cSize = Math.floor(1024 * dprCanvas);
        const c = document.createElement("canvas"); c.width = cSize; c.height = cSize;
        const cx = c.getContext("2d");
        if (cx) {
          // Improve 2D resampling quality (feature detect with extended type)
          const smoothCtx = cx as CanvasRenderingContext2D;
          // Feature detection using 'in' keeps it safe if future environments differ
          if ('imageSmoothingEnabled' in smoothCtx) {
            smoothCtx.imageSmoothingEnabled = true;
          }
          if ('imageSmoothingQuality' in smoothCtx) {
            smoothCtx.imageSmoothingQuality = 'high';
          }
          // Fondo blanco (para que se vea sobre background blanco)
          cx.fillStyle = "white";
          cx.fillRect(0,0,cSize,cSize);
          const scaleX = Math.min(1, Math.max(0.05, imageScale));
          const scaleY = Math.min(1, Math.max(0.05, imageScaleY ?? imageScale));
          const targetW = img.width * scaleX;
          const targetH = img.height * scaleY;
          const offX = (cSize - targetW) / 2;
          const offY = (cSize - targetH) / 2;
          cx.drawImage(img, offX, offY, targetW, targetH);
          const imageData = cx.getImageData(0, 0, cSize, cSize);
          const data = imageData.data;
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i], g = data[i+1], b = data[i+2];
            // Mantener fondo blanco (no transparentar) para que se vea sobre blanco
            // Solo garantizar opacidad de la parte del logo
            if (!(r > 240 && g > 240 && b > 240)) {
              if (data[i+3] < 200) data[i+3] = 255;
            }
          }
          cx.putImageData(imageData, 0, 0);
          gl.bindTexture(gl.TEXTURE_2D, tex);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, c);
          // Ajustar letterbox según imageFit usando dimensiones reales de la imagen escalada dentro del canvas
          if (uvScaleLoc && uvOffsetLoc){
            const screenAspect = window.innerWidth / window.innerHeight;
            const imageAspect = targetW / targetH;
            let scaleX = 1.0, scaleY = 1.0, offsetX = 0.0, offsetY = 0.0;
            if (imageFit === 'contain') {
              if (screenAspect > imageAspect){
                // pantalla más ancha -> limitar por altura
                scaleX = imageAspect / screenAspect;
                offsetX = (1.0 - scaleX)/2.0;
              } else {
                scaleY = screenAspect / imageAspect;
                offsetY = (1.0 - scaleY)/2.0;
              }
            } else { // cover
              if (screenAspect > imageAspect){
                // pantalla más ancha -> escalar para cubrir ancho
                scaleY = screenAspect / imageAspect;
                offsetY = (1.0 - scaleY)/2.0;
              } else {
                scaleX = imageAspect / screenAspect;
                offsetX = (1.0 - scaleX)/2.0;
              }
            }
            gl.uniform2f(uvScaleLoc, scaleX, scaleY);
            gl.uniform2f(uvOffsetLoc, offsetX, offsetY);
          }
          resize();
        } else {
          gl.bindTexture(gl.TEXTURE_2D, tex);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
          // Calcular letterbox para mantener proporción según imageFit
          if (uvScaleLoc && uvOffsetLoc){
            const screenAspect = window.innerWidth / window.innerHeight;
            const imageAspect = img.width / img.height;
            let scaleX = 1.0, scaleY = 1.0, offsetX = 0.0, offsetY = 0.0;
            if (imageFit === 'contain') {
              if (screenAspect > imageAspect){
                scaleX = imageAspect / screenAspect; offsetX = (1.0 - scaleX)/2.0;
              } else {
                scaleY = screenAspect / imageAspect; offsetY = (1.0 - scaleY)/2.0;
              }
            } else { // cover
              if (screenAspect > imageAspect){
                scaleY = screenAspect / imageAspect; offsetY = (1.0 - scaleY)/2.0;
              } else {
                scaleX = imageAspect / screenAspect; offsetX = (1.0 - scaleX)/2.0;
              }
            }
            gl.uniform2f(uvScaleLoc, scaleX, scaleY);
            gl.uniform2f(uvOffsetLoc, offsetX, offsetY);
          }
          resize();
        }
      };
      img.src = imageSrc ?? "/geeksDesings.png";
    } else {
      const tCanvas = document.createElement("canvas"); tCanvas.width=1024; tCanvas.height=512;
      const ctx2d = tCanvas.getContext("2d");
      if (ctx2d){
        ctx2d.fillStyle = reveal ? "white" : "beige";
        ctx2d.fillRect(0,0,tCanvas.width,tCanvas.height);
        if (text){
          ctx2d.fillStyle = "black";
          ctx2d.font = "bold 160px Arial";
          ctx2d.textAlign = "center";
          ctx2d.textBaseline = "middle";
          ctx2d.fillText(text, tCanvas.width/2, tCanvas.height/2);
        }
      }
      gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,tCanvas);
    }

    resize();
    // Definir inicio considerando retraso
    startRef.current = performance.now() + startDelayMs;
    animate();
  };

  const resize = () => {
    const canvas = canvasRef.current; const gl = glRef.current; const uniforms = uniformsRef.current;
    if (!canvas || !gl || !uniforms) return;
    const dpr = Math.min(window.devicePixelRatio, 2);
    canvas.width = window.innerWidth * dpr; canvas.height = window.innerHeight * dpr;
    canvas.style.width = "100%"; canvas.style.height = "100%";
    gl.viewport(0,0,canvas.width,canvas.height);
    const res = uniforms["u_resolution"]; if (res) gl.uniform2f(res, canvas.width, canvas.height);
  };

  const animate = () => {
    const gl = glRef.current; const uniforms = uniformsRef.current; const tex = texRef.current; const canvas = canvasRef.current;
    if (!gl || !uniforms || !tex || !canvas) return;
    const now = performance.now();
    // Esperar hasta que pase el retraso
    if (now < startRef.current){
      rafRef.current = requestAnimationFrame(animate);
      return;
    }
    const elapsed = (now - startRef.current) / durationMs;
    let progress: number;
    if (elapsed <= 1){
      progress = easeInOut(elapsed);
      // Aparición del fondo blanco controlada por progreso (>0.08) si está habilitado
      if (showWhiteBackground){
        if (progress > 0.08 && canvas.style.opacity !== '1') {
          canvas.style.opacity = '1';
          if (!whiteShownRef.current){
            whiteShownRef.current = true;
            if (onWhiteShown) onWhiteShown();
          }
        }
      }
    } else {
      if (!finishedRef.current){
        finishedRef.current = true;
        canvas.style.transition='opacity .3s';
        canvas.style.opacity='0';
        // FireDone sooner with reduced fade-out
        setTimeout(()=> onComplete && onComplete(), 300);
      }
      return;
    }
    const tLoc = uniforms["u_time"]; if (tLoc) gl.uniform1f(tLoc, now);
    const pLoc = uniforms["u_progress"]; if (pLoc) gl.uniform1f(pLoc, progress);
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, tex);
    const txtLoc = uniforms["u_text"]; if (txtLoc) gl.uniform1i(txtLoc, 0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    rafRef.current = requestAnimationFrame(animate);
  };

  useEffect(()=>{
    init();
    window.addEventListener('resize', resize);
    return ()=>{ window.removeEventListener('resize', resize); if (rafRef.current) cancelAnimationFrame(rafRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas ref={canvasRef} className={className} />;
};
