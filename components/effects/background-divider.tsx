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
        float amplitude = 0.55;
        mat2 rot = mat2(0.8, -0.6, 0.6, 0.8);
        for (int i = 0; i < 6; i++) {
          value += amplitude * noise(p);
          p = rot * p * 1.9 + vec2(1.0, 0.7);
          amplitude *= 0.5;
        }
        return value;
      }

      vec3 palette(float t) {
        vec3 dark = vec3(0.08, 0.04, 0.18);
        vec3 fuchsia = vec3(1.00, 0.10, 0.86);
        vec3 cyan = vec3(0.22, 0.98, 1.00);
        vec3 neon = vec3(1.00, 0.84, 0.96);
        vec3 base = mix(dark, fuchsia, smoothstep(0.0, 0.45, t));
        vec3 highlight = mix(cyan, neon, smoothstep(0.55, 1.0, t));
        return mix(base, highlight, smoothstep(0.25, 0.85, t));
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / iResolution.xy;
        vec2 aspect = vec2(iResolution.x / iResolution.y, 1.0);
        vec2 p = (uv - 0.5) * 2.0;
        p.x *= aspect.x;

        float time = iTime * 0.18;
        vec2 warp = p + vec2(sin(time * 0.7) * 0.22, cos(time * 0.95) * 0.18);

        float n1 = fbm(warp * 1.3 + vec2(time * 0.6, -time * 0.45));
        float n2 = fbm(warp * 2.1 - vec2(time * 0.25, time * 0.55));
        float n3 = fbm(warp * 3.4 + vec2(-time * 0.3, time * 0.2));

        float line = smoothstep(0.014, 0.008, abs(p.x + sin(time * 0.4) * 0.12 + n1 * 0.085));
        float band = smoothstep(0.16, 0.08, abs(p.x + 0.09 * sin(time * 0.42)));
        float halo = smoothstep(0.65, 0.1, length(p + vec2(0.1, 0.0)));
        float light = smoothstep(0.4, 0.0, length(vec2(p.x * 1.1, p.y * 0.8)));

        float noiseMix = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;
        float glow = pow(max(0.0, noiseMix), 1.6) * 0.75;

        vec3 base = palette(smoothstep(-0.3, 0.95, noiseMix));
        vec3 accent = palette(clamp(line * 1.4 + band * 0.9 + light * 0.4, 0.0, 1.0));

        vec3 color = base * (0.55 + 0.55 * glow);
        color += accent * (0.65 * line + 0.45 * band * light);
        color += vec3(0.24, 0.12, 0.38) * (1.0 - smoothstep(0.12, 0.8, length(p)));
        color += vec3(0.64, 0.28, 0.95) * pow(max(0.0, 0.18 - abs(p.x + 0.04)), 2.0) * line * 0.95;
        color *= mix(1.0, 1.2, halo);
        color = pow(color, vec3(0.88));

        gl_FragColor = vec4(color, 1.0);
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
