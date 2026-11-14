'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function FloatingObject() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;

    // Subtle floating bob
    meshRef.current.position.y = Math.sin(time * 1.2) * 0.15;
    meshRef.current.position.x = 2.2 + Math.cos(time * 0.8) * 0.1;

    // Follow mouse gently
    meshRef.current.rotation.x = (state.pointer.y * 0.4) + time * 0.2;
    meshRef.current.rotation.y = (state.pointer.x * 0.6) + time * 0.3;
  });

  return (
    <group ref={meshRef} position={[2.2, 0, 0]} scale={0.75}>
      {/* Low-poly 3D Play / Prism Symbol */}
      <mesh>
        <octahedronGeometry args={[1.1, 0]} />
        <meshStandardMaterial
          color="#E5262B"
          metalness={0.7}
          roughness={0.2}
          wireframe={false}
        />
      </mesh>
      {/* Wireframe outer shell */}
      <mesh scale={1.15}>
        <octahedronGeometry args={[1.1, 0]} />
        <meshBasicMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}
