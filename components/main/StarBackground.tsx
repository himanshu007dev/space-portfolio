"use client"

import React, { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { inSphere } from "maath/random";
import * as THREE from "three";

const StarBackground = () => {
  const ref = useRef<THREE.Points | null>(null);

  // Generate the sphere positions
  const [sphere] = useState<THREE.BufferAttribute>(() => {
    const positions = inSphere(new Float32Array(5000), { radius: 1.2 });

    // Ensure no NaN values in the position array
    for (let i = 0; i < positions.length; i++) {
      if (isNaN(positions[i])) {
        console.error("NaN value detected at position", i);
        positions[i] = 0; // Replace NaN values with 0
      }
    }
    
    // Return a BufferAttribute, which is what THREE expects for positions
    return new THREE.BufferAttribute(positions, 3);
  });

  // Animate rotation
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} geometry={new THREE.BufferGeometry().setAttribute("position", sphere)} frustumCulled>
        <PointMaterial
          transparent
          color={"#fff"}
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => (
  <div className="w-full h-auto fixed inset-0 z-[20]">
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Suspense fallback={null}>
        <StarBackground />
      </Suspense>
    </Canvas>
  </div>
);

export default StarsCanvas;
