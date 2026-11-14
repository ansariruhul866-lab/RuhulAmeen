'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Deterministic pseudo-random number generator for react-hooks purity
function pseudoRandom(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

export function ParticleText() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 1200;

  // Generate particle positions deterministically
  const [positions, originalPositions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const r1 = pseudoRandom(i * 4 + 1);
      const r2 = pseudoRandom(i * 4 + 2);
      const r3 = pseudoRandom(i * 4 + 3);
      const r4 = pseudoRandom(i * 4 + 4);

      const theta = r1 * Math.PI * 2;
      const radius = 1.8 + r2 * 2.2;
      const x = Math.cos(theta) * radius + (r3 - 0.5) * 0.5;
      const y = Math.sin(theta) * (radius * 0.4) + (r4 - 0.5) * 0.4;
      const z = (pseudoRandom(i * 4 + 5) - 0.5) * 1.5;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      orig[i * 3] = x;
      orig[i * 3 + 1] = y;
      orig[i * 3 + 2] = z;
    }
    return [pos, orig];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.elapsedTime;
    const positionsAttr = pointsRef.current.geometry.attributes.position;
    const array = positionsAttr.array as Float32Array;

    const mouseX = state.pointer.x * 3;
    const mouseY = state.pointer.y * 2;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const origX = originalPositions[idx];
      const origY = originalPositions[idx + 1];
      const origZ = originalPositions[idx + 2];

      const wave = Math.sin(time * 1.5 + origX * 2) * 0.08;

      const dx = mouseX - array[idx];
      const dy = mouseY - array[idx + 1];
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 1.2) {
        const force = (1.2 - dist) * 0.8;
        array[idx] -= (dx / dist) * force * 0.08;
        array[idx + 1] -= (dy / dist) * force * 0.08;
      } else {
        array[idx] += (origX - array[idx]) * 0.05;
        array[idx + 1] += (origY + wave - array[idx + 1]) * 0.05;
      }
      array[idx + 2] = origZ + Math.cos(time + origY) * 0.05;
    }

    positionsAttr.needsUpdate = true;
    pointsRef.current.rotation.y = time * 0.03;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#E5262B"
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}
