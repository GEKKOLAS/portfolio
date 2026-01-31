"use client";
import React from "react";
import Image from "next/image";
import { Navbar } from "./navbar";
import { Social } from "./socialnet";
import { ReactTyped } from "react-typed";
import { BackgroundBeams } from "../ui/background-beams";
import { AuroraText } from "../ui/aurora-text";
import { CosmicAura } from "../effects/cosmic-aura";

const FlameAura = ({ className }: { className?: string }) => {
  return (
    <div className={className} aria-hidden>
      <canvas
      className="absolute inset-0 w-full h-full bg-transparent"
      style={{ filter: "blur(18px)" }}
      ref={(canvas) => {
        if (!canvas || (canvas as any).__glInit) return;
        (canvas as any).__glInit = true;

        const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true });
        if (!gl) return;

        const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
        const resize = () => {
        const rect = canvas.getBoundingClientRect();
        canvas.width = Math.max(1, Math.floor(rect.width * dpr));
        canvas.height = Math.max(1, Math.floor(rect.height * dpr));
        gl.viewport(0, 0, canvas.width, canvas.height);
        };
        resize();

        const vsSrc = `
        attribute vec2 a_position;
        void main() {
          gl_Position = vec4(a_position, 0.0, 1.0);
        }
        `;
        const fsSrc = `
        precision mediump float;
        uniform vec2 u_resolution;
        uniform float u_time;

        float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123); }
        float noise(vec2 p){
          vec2 i=floor(p), f=fract(p);
          float a=hash(i), b=hash(i+vec2(1.,0.));
          float c=hash(i+vec2(0.,1.)), d=hash(i+vec2(1.,1.));
          vec2 u=f*f*(3.0-2.0*f);
          return mix(a,b,u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
        }
        float fbm(vec2 p){
          float v=0.0, a=0.5;
          for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.0; a*=0.5; }
          return v;
        }

        void main(){
          vec2 uv = gl_FragCoord.xy / u_resolution;
          vec2 center = vec2(0.5, 0.5);

          float d = distance(uv, center);
          float r = 0.33;          // inner radius around avatar
          float thickness = 0.12;  // aura thickness

          float inner = smoothstep(r, r + 0.02, d);
          float outer = 1.0 - smoothstep(r + thickness, r + thickness + 0.02, d);
          float ring = inner * outer;

          vec2 p = uv * vec2(u_resolution.x / u_resolution.y, 1.0) * 3.0;
          float flow = fbm(p + vec2(0.0, -u_time * 0.35)) * 0.9 + 0.1;
          float intensity = ring * flow;

          vec3 col1 = vec3(1.0, 0.8, 0.0);
          vec3 col2 = vec3(1.0, 0.0, 0.4);
          vec3 col3 = vec3(0.4, 0.0, 1.0);
          vec3 color = mix(col1, col2, smoothstep(0.2, 0.6, intensity));
          color = mix(color, col3, smoothstep(0.6, 1.0, intensity));

          float glow = smoothstep(r - 0.02, r + 0.02, d) * 0.25;
          color += vec3(glow);

          gl_FragColor = vec4(color, clamp(intensity, 0.0, 1.0));
        }
        `;

        const compile = (type: number, src: string) => {
        const sh = gl.createShader(type)!;
        gl.shaderSource(sh, src);
        gl.compileShader(sh);
        if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
          console.warn(gl.getShaderInfoLog(sh));
        }
        return sh;
        };
        const vs = compile(gl.VERTEX_SHADER, vsSrc);
        const fs = compile(gl.FRAGMENT_SHADER, fsSrc);
        const prog = gl.createProgram()!;
        gl.attachShader(prog, vs);
        gl.attachShader(prog, fs);
        gl.linkProgram(prog);
        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        console.warn(gl.getProgramInfoLog(prog));
        }
        gl.useProgram(prog);

        const quad = gl.createBuffer()!;
        gl.bindBuffer(gl.ARRAY_BUFFER, quad);
        gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
          -1, -1, 1, -1, -1, 1,
          -1,  1, 1, -1, 1,  1,
        ]),
        gl.STATIC_DRAW
        );
        const aPos = gl.getAttribLocation(prog, "a_position");
        gl.enableVertexAttribArray(aPos);
        gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

        const uRes = gl.getUniformLocation(prog, "u_resolution");
        const uTime = gl.getUniformLocation(prog, "u_time");

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

        let raf = 0;
        const render = (t: number) => {
        raf = requestAnimationFrame(render);
        // Ensure transparent background each frame
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.uniform2f(uRes, canvas.width, canvas.height);
        gl.uniform1f(uTime, t * 0.001);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        };
        render(performance.now());

        const ro = new ResizeObserver(resize);
        ro.observe(canvas);

        (canvas as any).__cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        gl.deleteBuffer(quad);
        gl.deleteProgram(prog);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        delete (canvas as any).__glInit;
        };
      }}
      />
    </div>
  );
};

export const Profile = () => {
  const words =
    "I specialize in building robust web applications using the latest technologies on AI & frameworks. Let's connect.";
  return (
    <div className="flex flex-col items-center justify-center min-h-screen pb-5 md:pb-20 md:pt-10 sm:pb-10 2xl:h-screen 2xl:mb-10 2xl:pt-0 2xl:justify-start lg:h-screen lg:mb-10 lg:pt-10 lg:justify-center">
      <div className="absolute inset-0 -z-10 w-full h-full">
      <BackgroundBeams />
      </div>
      <div className="mx-auto max-w-screen-lg px-4 2xl:px-0 flex-1 flex flex-col justify-center 2xl:justify-start">
      <Navbar />
      <div>
        <div className="mb-4 flex items-center justify-between">
        <div className="flex flex-col items-center justify-center w-full gap-2">
          <div className="flex justify-center">
          <div className="relative w-48 h-48 rounded-full overflow-visible shadow-lg p-0 bg-transparent">
            <div className="relative w-full h-full">
              {/* Three.js cosmic aura behind the avatar, bleeding outside edges */}
              <CosmicAura className="absolute -inset-3 z-0 rounded-full overflow-hidden" theme="nebula" />

              <div className="relative z-10 rounded-full overflow-hidden bg-transparent w-full h-full">
                <Image
                  className="rounded-full w-full h-full bg-transparent object-cover border-0"
                  src="/HeroProfile3.png"
                  alt="profile avatar"
                  width={500}
                  height={300}
                  style={{ objectPosition: "center 3%" }}
                  priority
                />
              </div>
            </div>
          </div>
          </div>
          <div className="text-center gap-3">
          <h2 className="scroll-m-20 tracking-tight lg:text-2xl 2xl:text-6xl font-bold font-newyork leading-none text-gray-900 dark:text-white">
            Hey there! I&apos;m{" "}
            <span className="text-yellow-500">Nicolas</span>
            <br />a{" "}
            <span className="text-rose-500">
            Passionate {""} <br />
            </span>
            
            <div>
            <ReactTyped
            strings={[
              '<span class="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500  bg-clip-text text-transparent">.NET Developer</span>',
              '<span class="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">Full Stack Developer</span>',
              '<span class="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500  bg-clip-text text-transparent">Automation Engineer</span>',
            ]}
            typeSpeed={60}
            backSpeed={40}
            loop
            smartBackspace
            showCursor
            contentType="html"
            />
            </div>
          </h2>
          <br />
          <div className="flex items-center justify-center w-full">
            {/* <TextGenerateEffect words={words} /> */}
            <AuroraText className="text-2xl sekuya-regular">{words}</AuroraText>
          </div>
          <Social />
          </div>
        </div>
        </div>
      </div>
      </div>
    </div>
  );
};
