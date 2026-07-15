import React, { useEffect, useRef, useState } from "react";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 4500); // Wait for 4.5s for the animation to finish
    return () => clearTimeout(timer);
  }, [onComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function syncSize() {
      const w = canvas?.clientWidth || 1280;
      const h = canvas?.clientHeight || 720;
      if (canvas && (canvas.width !== w || canvas.height !== h)) {
        canvas.width = w;
        canvas.height = h;
      }
    }

    if (typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(syncSize);
      observer.observe(canvas);
      return () => observer.disconnect();
    }
    syncSize();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null;
    if (!gl) return;

    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;

      float noise(vec2 p) {
          return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
      }

      void main() {
          vec2 uv = gl_FragCoord.xy / u_resolution.xy;
          float t = u_time * 0.5;
          
          float ink = 0.0;
          for(float i = 1.0; i < 4.0; i++) {
              vec2 p = uv * i * 2.0;
              p.x += sin(t + p.y) * 0.2;
              p.y += cos(t + p.x) * 0.2;
              ink += noise(p + t);
          }
          
          float mask = smoothstep(0.4, 0.6, uv.x + sin(uv.y * 5.0 + t) * 0.1);
          vec3 color = mix(vec3(0.98, 0.98, 0.98), vec3(0.07, 0.07, 0.07), mask * (ink / 3.0));
          
          gl_FragColor = vec4(color, 1.0);
      }
    `;

    function createShader(type: number, source: string) {
      if (!gl) return null;
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
    }

    const vertexShader = createShader(gl.VERTEX_SHADER, vsSource);
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, fsSource);

    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    const timeUniformLocation = gl.getUniformLocation(program, 'u_time');
    const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');

    let animationFrameId: number;
    let startTime = performance.now();

    function render(now: number) {
      if (!gl || !canvas) return;
      gl.viewport(0, 0, canvas.width, canvas.height);
      
      const time = (now - startTime) * 0.001;

      if (timeUniformLocation) gl.uniform1f(timeUniformLocation, time);
      if (resolutionUniformLocation) gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animationFrameId = requestAnimationFrame(render);
    }

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-[#f9f9f9] text-[#000000] flex flex-col items-center justify-center font-ui-medium">
      <div className="absolute inset-0 z-0">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      
      <div className="z-10 flex flex-col items-center justify-center pointer-events-none mix-blend-difference">
        <h1 className="font-serif text-5xl md:text-6xl text-white tracking-tighter opacity-0 animate-[inkBleed_4s_cubic-bezier(0.25,1,0.5,1)_forwards]">
          LUMIÈRE
        </h1>
        
        <div className="h-[1px] w-16 bg-white my-6 opacity-0 animate-[fadeInDelay_2s_ease-in-out_3s_forwards]"></div>
        
        <p className="font-sans text-[10px] font-bold text-white uppercase tracking-widest opacity-0 animate-[fadeInDelay_2s_ease-in-out_3s_forwards]">
          Édition 2026
        </p>
      </div>

      <style>{`
        @keyframes inkBleed {
          0% {
            opacity: 0;
            filter: blur(20px) contrast(5);
            transform: scale(0.95);
          }
          50% {
            opacity: 0.8;
            filter: blur(5px) contrast(1.5);
            transform: scale(1.02);
          }
          100% {
            opacity: 1;
            filter: blur(0px) contrast(1);
            transform: scale(1);
          }
        }

        @keyframes fadeInDelay {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
