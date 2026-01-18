"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Text3D, Float, Center } from "@react-three/drei";
import { motion } from "framer-motion";
import { Suspense, useRef, useState } from "react";
import * as THREE from "three";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

function GoldenK() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Animation Phases
    // 0s - 2s: Smooth Fade In
    // 2s - 4s: Float & Hold
    // 4s - 6s: Dissolve Out (Scale Up + Fade)

    if (meshRef.current) {
      // Continuous gentle float/rotate
      meshRef.current.rotation.y = Math.sin(t * 0.3) * 0.1;
      meshRef.current.rotation.x = Math.cos(t * 0.2) * 0.05;

      // Dissolve effect: Expand slightly as it fades out after 4s
      if (t > 4.0) {
        const expansion = (t - 4.0) * 0.4;
        meshRef.current.scale.setScalar(1 + expansion);
      }
    }

    if (materialRef.current) {
      if (t < 2.0) {
        // Linear fade in
        materialRef.current.opacity = Math.min(1, t / 2);
      } else if (t > 4.0) {
        // Fade out
        const fadeOut = Math.max(0, 1 - (t - 4.0) / 1.5);
        materialRef.current.opacity = fadeOut;
      } else {
        materialRef.current.opacity = 1;
      }
    }
  });

  // Responsive sizing
  const fontSize = viewport.width > 7 ? 2.5 : 1.5;

  return (
    <Float floatIntensity={0.5} rotationIntensity={0.2} speed={0.8}>
      <Center>
        <Text3D
          ref={meshRef}
          font="/helvetiker_bold.typeface.json"
          size={fontSize}
          height={0.1}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          K
          <meshStandardMaterial
            ref={materialRef}
            color="#D4AF37" // Soft Gold
            roughness={0.15}
            metalness={1.0}
            transparent
            opacity={0}
          />
        </Text3D>
      </Center>
    </Float>
  );
}

export function BrandHero() {
  const [showOverlay, setShowOverlay] = useState(false);

  // Trigger HTML overlay pop-up at 4.5s
  if (typeof window !== "undefined") {
    setTimeout(() => setShowOverlay(true), 4500);
  }

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-stone-50 dark:bg-stone-950">
      {/* 3D Scene Layer */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 35 }}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <Environment preset="city" />
            <ambientLight intensity={0.5} />
            <pointLight
              position={[10, 10, 10]}
              intensity={1.5}
              color="#fff0d0"
            />
            <pointLight
              position={[-10, -10, -10]}
              intensity={0.5}
              color="#d4af37"
            />
            <GoldenK />
          </Suspense>
        </Canvas>
      </div>

      {/* HTML Content Layer */}
      <motion.div
        className="z-10 text-center max-w-5xl px-6"
        initial={{ opacity: 0, scale: 0.5, filter: "blur(20px)" }}
        animate={
          showOverlay ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}
        }
        transition={{
          duration: 1.8,
          ease: [0.16, 1, 0.3, 1], // Expo ease out
          scale: { type: "spring", stiffness: 30, damping: 12 }, // Bouncy, dramatic spring
        }}
      >
        <h1
          className="text-8xl md:text-[12rem] font-bold tracking-tighter text-stone-900 dark:text-white mb-8 leading-none"
          style={{
            filter: "drop-shadow(0 0 40px rgba(212, 175, 55, 0.6))", // Gold glow
          }}
        >
          SOOLE
        </h1>
        <p className="text-2xl md:text-3xl text-stone-600 dark:text-stone-300 mb-10 font-serif italic">
          What is quietly chosen.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0 animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-forwards"
          style={{ animationDelay: "5.5s" }}
        >
          <Button
            size="lg"
            className="rounded-full px-8 h-14 text-lg bg-stone-900 dark:bg-stone-50 text-white dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-stone-200 transition-all shadow-xl shadow-stone-900/10"
          >
            Explore Rankings
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className="rounded-full px-6 h-14 text-lg gap-2 hover:bg-black/5 dark:hover:bg-white/10"
          >
            <Play className="w-5 h-5 fill-current" />
            Watch on YouTube
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
