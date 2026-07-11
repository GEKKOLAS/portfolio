"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type BackgroundDividerProps = {
  className?: string;
  style?: React.CSSProperties;
};

export function BackgroundDivider({ className, style }: BackgroundDividerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    const vertexShader = `
      attribute vec2 aPosition;
      void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    const fragmentShader = `
      precision mediump float;
      uniform vec2 iResolution;
      uniform float iTime;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
      }

      float fbm(vec2 p) {
        float value = 0.0;
        float amp = 0.6;
        mat2 rot = mat2(0.82, -0.57, 0.57, 0.82);
        for (int i = 0; i < 5; i++) {
          value += amp * noise(p);
          p = rot * p * 1.7 + vec2(0.8, 0.5);
          amp *= 0.5;
        }
        return value;
      }

      vec3 palette(float t) {
        vec3 deep = vec3(0.02, 0.01, 0.08);
        vec3 plasma = vec3(0.18, 0.03, 0.34);
        vec3 mist = vec3(0.08, 0.12, 0.22);
        vec3 glow = vec3(0.70, 0.22, 0.95);
        vec3 a = mix(deep, plasma, smoothstep(0.0, 0.45, t));
        vec3 b = mix(mist, glow, smoothstep(0.5, 1.0, t));
        return mix(a, b, smoothstep(0.1, 0.9, t));
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / iResolution.xy;
        vec2 p = (uv - 0.5) * 2.0;
        vec2 aspect = vec2(iResolution.x / iResolution.y, 1.0);
        p.x *= aspect.x;

        float t = iTime * 0.11;
        float lower = smoothstep(0.0, 0.45, uv.y);
        float upper = 1.0 - lower;

        vec2 flow = p + vec2(sin(t * 0.35) * 0.08, cos(t * 0.45) * 0.06);
        float n1 = fbm(flow * 0.9 + vec2(t * 0.25, -t * 0.16));
        float n2 = fbm(flow * 1.8 - vec2(t * 0.14, t * 0.2));
        float grain = n1 * 0.7 + n2 * 0.3;

        float diagonal = smoothstep(0.0, 0.09, abs((uv.y - 0.5) - (uv.x - 0.5) * 0.20));
        float vertical = smoothstep(0.0, 0.03, abs(uv.x - 0.5));
        float beam = pow(max(0.0, 1.0 - abs(p.x) * 0.95), 2.6) * (0.8 + 0.4 * diagonal);
        float tail = smoothstep(0.0, 0.65, 1.0 - uv.y) * (0.55 + 0.35 * sin(t + grain * 3.0));
        float haze = pow(max(0.0, 1.0 - (uv.y * 1.04)), 1.8) * 0.24;
        float nebula = smoothstep(0.0, 0.9, grain) * lower * 0.45;
        float glow = beam * 1.05 + tail * 0.8 + nebula * 0.22;

        vec3 base = palette(0.1 + 0.8 * grain);
        vec3 color = base * (0.24 + 0.76 * glow);
        color += vec3(1.00, 0.30, 0.95) * beam * 0.72;
        color += vec3(0.92, 0.12, 0.98) * tail * 0.3;
        color += vec3(0.06, 0.06, 0.10) * (1.0 - smoothstep(0.0, 0.05, abs(uv.x - 0.5))) * upper * 0.8;
        color += vec3(0.08, 0.10, 0.14) * haze * lower;
        color += vec3(0.14, 0.06, 0.24) * nebula * 0.24;
        color = pow(color, vec3(0.9));

        gl_FragColor = vec4(color, 0.98);
      }
    `;

    const compile = (type: number, source: string) => {
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

    const vs = compile(gl.VERTEX_SHADER, vertexShader);
    const fs = compile(gl.FRAGMENT_SHADER, fragmentShader);
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
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const position = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const resolutionLocation = gl.getUniformLocation(program, "iResolution");
    const timeLocation = gl.getUniformLocation(program, "iTime");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (resolutionLocation) gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    };

    let animationFrame = 0;
    const start = performance.now();
    const render = () => {
      resize();
      const now = performance.now();
      if (timeLocation) gl.uniform1f(timeLocation, (now - start) / 1000);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrame = requestAnimationFrame(render);
    };

    render();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-0 hidden lg:block overflow-hidden",
        className,
      )}
      style={style}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
