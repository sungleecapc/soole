"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function AbstractObject({ ...props }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.cos(t / 8) * 0.2;
      meshRef.current.rotation.y = Math.sin(t / 8) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} {...props}>
      <icosahedronGeometry args={[1.5, 0]} />
      {/* Matte black ceramic look with slight glassiness */}
      <meshPhysicalMaterial
        color="#1c1917" // Stone-900 like
        roughness={0.4}
        metalness={0.2}
        clearcoat={0.3}
        clearcoatRoughness={0.2}
      />
    </mesh>
  );
}

function GoldAccent() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.z = t * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <torusGeometry args={[2.2, 0.02, 16, 100]} />
      <meshStandardMaterial color="#D4AF37" roughness={0.1} metalness={1} />
    </mesh>
  );
}

export function SooleScene() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden opacity-60 pointer-events-none grayscale-[0.2]">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Environment preset="city" />
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1} />

          <Float
            speed={1.5}
            rotationIntensity={0.2}
            floatIntensity={0.5}
            floatingRange={[-0.2, 0.2]}
          >
            <AbstractObject />
            <GoldAccent />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}
