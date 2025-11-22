"use client";
import React, { useEffect, useRef } from "react";

interface FireRevealOverlayProps {
  text?: string;
  durationMs?: number; // total animation time
  onComplete?: () => void;
  className?: string;
  reveal?: boolean; // if true, treat burn as alpha mask revealing underlying content
  onWhiteShown?: () => void; // callback cuando el fondo blanco aparece
}

// Lightweight single-run fire/burn effect canvas.
export const FireRevealOverlay: React.FC<FireRevealOverlayProps> = ({
  text = "LOGO",
  durationMs = 6000,
  onComplete,
  className = "fixed inset-0 z-40 pointer-events-none w-full h-screen",
  reveal = true,
  onWhiteShown,
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
  // Using the provided fragment shader (simplified variable names to avoid warnings)
  const frag = `precision mediump float;\nvarying vec2 vUv;\nuniform vec2 u_resolution;\nuniform float u_progress;\nuniform float u_time;\nuniform sampler2D u_text;\nfloat rand(vec2 n){return fract(cos(dot(n,vec2(12.9898,4.1414)))*43758.5453);}\nfloat noise(vec2 n){vec2 d=vec2(0.,1.);vec2 b=floor(n),f=smoothstep(vec2(0.),vec2(1.),fract(n));return mix(mix(rand(b),rand(b+d.yx),f.x),mix(rand(b+d.xy),rand(b+d.yy),f.x),f.y);}\nfloat fbm(vec2 n){float total=0.,a=.4;for(int i=0;i<4;i++){total+=noise(n)*a;n+=n;a*=0.6;}return total;}\nvoid main(){vec2 uv=vUv;uv.x*=min(1.,u_resolution.x/u_resolution.y);uv.y*=min(1.,u_resolution.y/u_resolution.x);vec2 sUv=vUv*0.5+0.5;sUv.y=1.0-sUv.y;float t=u_progress;vec4 textColor=texture2D(u_text,sUv);vec3 color=textColor.rgb;float main_noise=1.-fbm(.75*uv+10.-vec2(.3,.9*t));float paper_dark=smoothstep(main_noise-.1,main_noise,t);color-=vec3(.99,.95,.99)*paper_dark;vec3 fire_color=fbm(6.*uv-vec2(0.,.005*u_time))*vec3(6.,1.4,.0);float show_fire=smoothstep(.4,.9,fbm(10.*uv+2.-vec2(0.,.005*u_time)));show_fire+=smoothstep(.7,.8,fbm(.5*uv+5.-vec2(0.,.001*u_time)));float fire_border=.02*show_fire;float fire_edge=smoothstep(main_noise-fire_border,main_noise-.5*fire_border,t);fire_edge*= (1.-smoothstep(main_noise-.5*fire_border,main_noise,t));color+=fire_color*fire_edge;float opacity=1.-smoothstep(main_noise-.0005,main_noise,t);gl_FragColor=vec4(color,opacity);}';`;

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
  // Inicio oculto, mostramos tras el primer frame para fondo blanco temprano sin flash brusco
  canvas.style.opacity = "0";
  canvas.style.transition = "opacity .6s ease"; // transición más larga para entrada más suave

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

    // text / mask texture
    const tCanvas = document.createElement("canvas"); tCanvas.width=1024; tCanvas.height=512;
    const ctx2d = tCanvas.getContext("2d");
    if (ctx2d){
      // For reveal mode we want fully opaque base (white) that can be eroded to transparency by fragment alpha logic.
      // If not reveal, background stays solid.
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
    const tex = gl.createTexture(); if (!tex) return; texRef.current = tex;
    gl.bindTexture(gl.TEXTURE_2D, tex); gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,tCanvas);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

    resize();
    startRef.current = performance.now();
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
    const now = performance.now(); const elapsed = (now - startRef.current) / durationMs;
    let progress: number;
    if (elapsed <= 1){
      progress = easeInOut(elapsed);
      // Aparición del fondo blanco controlada por progreso (>0.08)
      if (progress > 0.08 && canvas.style.opacity !== '1') {
        canvas.style.opacity = '1';
        if (!whiteShownRef.current){
          whiteShownRef.current = true;
          if (onWhiteShown) onWhiteShown();
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
