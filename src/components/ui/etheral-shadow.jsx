'use client';

import React, { useRef, useId, useEffect } from 'react';
import { animate, useMotionValue } from 'framer-motion';

function mapRange(value, fromLow, fromHigh, toLow, toHigh) {
  if (fromLow === fromHigh) return toLow;
  const percentage = (value - fromLow) / (fromHigh - fromLow);
  return toLow + percentage * (toHigh - toLow);
}

const useInstanceId = () => {
  const id = useId();
  return `shadowoverlay-${id.replace(/:/g, '')}`;
};

export function Component({
  sizing = 'fill',
  color = 'rgba(128, 128, 128, 1)',
  animation,
  noise,
  style,
  className
}) {
  const id = useInstanceId();
  const animationEnabled = animation && animation.scale > 0;
  const feColorMatrixRef = useRef(null);
  const hueRotateMotionValue = useMotionValue(180);
  const hueRotateAnimation = useRef(null);

  const displacementScale = animation ? mapRange(animation.scale, 1, 100, 20, 100) : 0;
  const animationDuration = animation ? mapRange(animation.speed, 1, 100, 1000, 50) : 1;

  useEffect(() => {
    if (feColorMatrixRef.current && animationEnabled) {
      if (hueRotateAnimation.current) {
        hueRotateAnimation.current.stop();
      }
      hueRotateMotionValue.set(0);
      hueRotateAnimation.current = animate(hueRotateMotionValue, 360, {
        duration: animationDuration / 25,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
        onUpdate: (value) => {
          if (feColorMatrixRef.current) {
            feColorMatrixRef.current.setAttribute("values", String(value));
          }
        }
      });

      return () => {
        if (hueRotateAnimation.current) {
          hueRotateAnimation.current.stop();
        }
      };
    }
  }, [animationEnabled, animationDuration, hueRotateMotionValue]);

  return (
    <div
      className={className}
      style={{
        overflow: "hidden",
        position: "relative",
        width: "100%",
        height: "100%",
        ...style
      }}
    >
      {/* Top vignette overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "15vh",
          background: "linear-gradient(to bottom, black 0%, transparent 100%)",
          zIndex: 9,
          pointerEvents: "none"
        }}
      />

      {/* Background animation and shape */}
      <div
        style={{
          position: "absolute",
          inset: -displacementScale,
          filter: animationEnabled ? `url(#${id}) blur(4px)` : "none"
        }}
      >
        {animationEnabled && (
          <svg style={{ position: "absolute" }}>
            <defs>
              <filter id={id}>
                <feTurbulence
                  result="undulation"
                  numOctaves="2"
                  baseFrequency={`${mapRange(animation.scale, 0, 100, 0.001, 0.0005)},${mapRange(animation.scale, 0, 100, 0.004, 0.002)}`}
                  seed="0"
                  type="turbulence"
                />
                <feColorMatrix
                  ref={feColorMatrixRef}
                  in="undulation"
                  type="hueRotate"
                  values="180"
                />
                <feColorMatrix
                  in="dist"
                  result="circulation"
                  type="matrix"
                  values="4 0 0 0 1  4 0 0 0 1  4 0 0 0 1  1 0 0 0 0"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="circulation"
                  scale={displacementScale}
                  result="dist"
                />
                <feDisplacementMap
                  in="dist"
                  in2="undulation"
                  scale={displacementScale}
                  result="output"
                />
              </filter>
            </defs>
          </svg>
        )}
        <div
          style={{
            backgroundColor: color,
            maskImage: `url('https://framerusercontent.com/images/ceBGguIpUU8luwByxuQz79t7To.png')`,
            maskSize: sizing === "stretch" ? "100% 100%" : "cover",
            maskRepeat: "no-repeat",
            maskPosition: "center",
            width: "100%",
            height: "100%"
          }}
        />
      </div>

      {/* Main Content Container */}
      <div className="flex flex-col lg:flex-row w-full px-4 md:px-10 gap-8 lg:gap-72 min-h-screen items-center lg:items-start">
        <div className="w-full lg:w-auto mt-32 lg:mt-20 text-center lg:text-left lg:ml-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white">
            Ignite Your <br className="hidden lg:block" /> Brainn.
          </h1>
          <p className="text-gray-200 text-xl sm:text-2xl md:text-3xl mt-4 lg:mt-6">
            Learn. Build. Grow
          </p>
          <p className="text-gray-400 text-base sm:text-lg md:text-xl mt-3 lg:mt-4 max-w-md mx-auto lg:mx-0">
            Explore a variety of courses designed to help you master new skills, boost your creativity, and accelerate your personal growth.
          </p>
          <div className="mt-6 lg:mt-8">
            <a
              href="/signup"
              className="inline-block px-6 sm:px-8 lg:px-10 py-3 lg:py-4 rounded-3xl text-gray-300 font-semibold text-lg sm:text-xl
              bg-gradient-to-r from-purple-700 via-pink-700 to-red-950
              hover:outline hover:outline-4 hover:outline-white hover:outline-offset-4
              transition-all duration-100 hover:scale-90 hover:text-white"
            >
              Get Started
            </a>
          </div>
        </div>

        {/* Right: Code Panel */}
        <div className="relative w-full max-w-md lg:w-[30rem] h-[20rem] rounded-3xl overflow-hidden border-white border mt-8 lg:mt-24 mx-auto lg:mx-0">
          {/* Background blur layer */}
          <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-md rounded-3xl border-white border"></div>

          <div className="relative border-white border rounded-3xl p-4 sm:p-6 shadow-lg text-violet-400 font-mono overflow-hidden h-full w-full">
            <div className="absolute top-4 left-6 flex space-x-2 z-10">
              <span className="w-3 h-3 bg-red-500 rounded-full"></span>
              <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            </div>

            <div className="mt-10 ml-2 text-sm sm:text-base md:text-lg space-y-1 relative z-10">
              <p className='text-green-400'>// Welcome to Brainn🚀</p>
              <p>const ignite = () =&gt; {'{'}</p>
              <p className="ml-4">learn();</p>
              <p className="ml-4">build();</p>
              <p className="ml-4">grow();</p>
              <p>{'}'}</p>
              <span className="inline-block w-2 h-6 bg-orange-400 ml-1"></span>
            </div>
          </div>
        </div>
      </div>

      {/* Noise Overlay */}
      {noise && noise.opacity > 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url("https://framerusercontent.com/images/g0QcWrxr87K0ufOxIUFBakwYA8.png")`,
            backgroundSize: noise.scale * 200,
            backgroundRepeat: "repeat",
            opacity: noise.opacity / 2
          }}
        />
      )}

      {/* Bottom vignette overlay */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "15vh",
          background: "linear-gradient(to top, black 0%, transparent 100%)",
          zIndex: 9,
          pointerEvents: "none"
        }}
      />
    </div>
  );
}