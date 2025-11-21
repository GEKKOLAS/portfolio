"use client";
import React, { useEffect, useRef } from "react";

interface UniformLocations {
  u_time: WebGLUniformLocation | null;
  u_progress: WebGLUniformLocation | null;
  u_text: WebGLUniformLocation | null;
  u_resolution: WebGLUniformLocation | null;
}

interface ScrollFireOverlayProps {
  triggerOffset?: number; // scrollY at which we start
  text?: string; // text to burn
  durationMs?: number; // total animation duration
  className?: string; // extra classes for canvas
}

export const ScrollFireOverlay: React.FC<ScrollFireOverlayProps> = ({
  triggerOffset = 300,
  text = "LOGO",
  durationMs = 8000,
  className = "fixed top-0 left-0 w-full h-screen pointer-events-none z-50",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const startedRef = useRef(false);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const uniformsRef = useRef<UniformLocations | null>(null);
  const textTextureRef = useRef<WebGLTexture | null>(null);
  const startTimeRef = useRef<number>(0);
  const rafRef = useRef<number>(0);

  const vertShader = `
    attribute vec2 a_position;
    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

  const fragShader = `
    precision mediump float;
    uniform float u_time;
    uniform float u_progress;
    uniform sampler2D u_text;
    uniform vec2 u_resolution;

    float noise(vec2 p){
      return fract(sin(dot(p, vec2(12.9898,78.233)))*43758.5453);
    }
    float fbm(vec2 p){
      float v = 0.0;
      float a = 0.5;
      for(int i=0;i<5;i++){
        v += a*noise(p);
        p *= 2.0;
        a *= 0.5;
      }
      return v;
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / u_resolution.xy;
      float t = u_time * 0.0004;
      float displace = fbm(uv * 3.0 + t * 2.0);
      float mask = texture2D(u_text, uv).r;
      float flame = fbm(uv * 6.0 + t * 4.0);
      float reveal = smoothstep(u_progress - 0.2, u_progress + 0.05, uv.y + displace * 0.15);
      vec3 fireCol = mix(vec3(0.05,0.0,0.1), vec3(1.0,0.5,0.0), flame);
      fireCol = mix(fireCol, vec3(1.0,1.0,0.4), flame * flame);
      vec3 base = mix(vec3(0.0), fireCol, reveal * mask);
      gl_FragColor = vec4(base, 1.0);
    }
  `;

  const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

  const init = () => {
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

  const vs = createShader(gl.VERTEX_SHADER, vertShader);
  const fs = createShader(gl.FRAGMENT_SHADER, fragShader);
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

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
  const buffer = gl.createBuffer();
  if (!buffer) return;
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    uniformsRef.current = {
      u_time: gl.getUniformLocation(program, "u_time"),
      u_progress: gl.getUniformLocation(program, "u_progress"),
      u_text: gl.getUniformLocation(program, "u_text"),
      u_resolution: gl.getUniformLocation(program, "u_resolution"),
    };

  const textCanvas = document.createElement("canvas");
    textCanvas.width = 2048;
    textCanvas.height = 1024;
    const text2d = textCanvas.getContext("2d");
    if (text2d) {
      text2d.fillStyle = "white";
      text2d.fillRect(0, 0, textCanvas.width, textCanvas.height);
      text2d.fillStyle = "black";
      text2d.font = "bold 320px Arial";
      text2d.textAlign = "center";
      text2d.textBaseline = "middle";
      text2d.fillText(text, textCanvas.width / 2, textCanvas.height / 2);
    }

  const tex = gl.createTexture();
  if (!tex) return;
  textTextureRef.current = tex;
  gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      textCanvas
    );
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
    gl.uniform2f(uniforms.u_resolution, canvas.width, canvas.height);
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
      progress = 0.3 + 0.7 * easeInOut(elapsed);
    } else {
      canvas.style.display = "none";
      return;
    }

    gl.uniform1f(uniforms.u_time, now);
    gl.uniform1f(uniforms.u_progress, progress);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.uniform1i(uniforms.u_text, 0);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    rafRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const onScroll = () => {
      if (startedRef.current) return;
      if (window.scrollY >= triggerOffset) {
        startedRef.current = true;
        init();
      }
    };
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas ref={canvasRef} className={className} />;
};
