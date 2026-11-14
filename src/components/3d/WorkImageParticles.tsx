'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const WORK_IMAGES = [
  // Real YouTube, Posters & Graphic Thumbnails from Drive
  '/images/thumbnails/acne-and-pimple.png',
  '/images/thumbnails/hair-loss-treatment.png',
  '/images/thumbnails/marketing-poster-2.png',
  '/images/thumbnails/marketing-posterr.png',
  '/images/thumbnails/product-copy-1.png',
  '/images/thumbnails/product-copy-2.png',
  '/images/thumbnails/product-copy-3.png',
  '/images/thumbnails/the-first-30-days-after-endoscopic-spine-surgery.png',
  '/images/thumbnails/understanding-sciatica.png',
  '/images/thumbnails/ghar-par-shradh-kaise-kare.png',
  '/images/thumbnails/pitru-paksh-kab-hai.png',
  '/images/thumbnails/chatgpt-image-jun-27-2026-02-20-38-pm.png',
  '/images/thumbnails/chatgpt-image-sep-29-2026-01-47-36-pm.png',
  // Real Web Projects
  '/images/websites/outrank-ai.png',
  '/images/websites/cult-thread.jpg',
  '/images/websites/resin-rituals.jpg',
  '/images/websites/acord-clinics.jpg',
  '/images/websites/dr-ankita-pundir.jpg',
  '/images/websites/dr-achal-gupta.jpg',
  '/images/websites/rbmf-one.jpg',
  '/images/websites/neurospine.jpg',
  // Real 4K Video Frames
  '/images/videos/ai-agent.jpg',
  '/images/videos/aopn-up-neuropedicon-2026-brand-film.jpg',
];

interface ParticleCardProps {
  texture: THREE.Texture;
  initialPos: [number, number, number];
  size: [number, number];
  speed: number;
  rotSpeed: number;
  phase: number;
}

function FloatingWorkCard({ texture, initialPos, size, speed, rotSpeed, phase }: ParticleCardProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [w, h] = size;

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    const mx = state.pointer.x * 0.4;
    const my = state.pointer.y * 0.3;

    // Gentle floating oscillation
    meshRef.current.position.x = initialPos[0] + Math.cos(time * speed + phase) * 0.18 + mx * (1 + initialPos[2] * 0.2);
    meshRef.current.position.y = initialPos[1] + Math.sin(time * (speed * 1.2) + phase) * 0.18 - my * (1 + initialPos[2] * 0.2);
    meshRef.current.position.z = initialPos[2] + Math.sin(time * 0.8 + phase) * 0.08;

    // Subtle 3D angular tilt
    meshRef.current.rotation.x = Math.sin(time * rotSpeed + phase) * 0.12 - my * 0.3;
    meshRef.current.rotation.y = Math.cos(time * (rotSpeed * 0.9) + phase) * 0.18 + mx * 0.4;
    meshRef.current.rotation.z = Math.sin(time * 0.5 + phase) * 0.04;
  });

  return (
    <group ref={meshRef} position={initialPos}>
      {/* Background glow card */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[w * 1.04, h * 1.08]} />
        <meshBasicMaterial
          color="#E5262B"
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Main Image Quad */}
      <mesh>
        <planeGeometry args={[w, h]} />
        <meshBasicMaterial
          map={texture}
          transparent
          opacity={0.92}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Sleek Border Frame */}
      <lineSegments>
        <edgesGeometry args={[new THREE.PlaneGeometry(w, h)]} />
        <lineBasicMaterial color="#ffffff" transparent opacity={0.45} />
      </lineSegments>
    </group>
  );
}

export function WorkImageParticles() {
  const [textures, setTextures] = useState<THREE.Texture[]>([]);

  // Load textures asynchronously and safely without throwing or suspending
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    const loaded = WORK_IMAGES.map((src) => {
      const tex = loader.load(src);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.minFilter = THREE.LinearFilter;
      tex.generateMipmaps = true;
      return tex;
    });
    setTextures(loaded);

    return () => {
      loaded.forEach((t) => t.dispose());
    };
  }, []);

  // Pre-generate deterministic floating configurations for distant ambient background
  const particles = useMemo(() => {
    // Elegant, distant ambient cards kept strictly away from the left text zone
    const configs: Array<{
      imgIndex: number;
      pos: [number, number, number];
      size: [number, number];
      speed: number;
      rotSpeed: number;
      phase: number;
    }> = [
      // Far right flank ambient layer (behind profile card area)
      { imgIndex: 0, pos: [3.2, 1.5, -3.0], size: [0.75, 0.42], speed: 0.5, rotSpeed: 0.3, phase: 0.2 },
      { imgIndex: 1, pos: [4.0, -0.5, -3.5], size: [0.7, 0.39], speed: 0.45, rotSpeed: 0.25, phase: 1.4 },
      { imgIndex: 2, pos: [2.8, -1.8, -3.2], size: [0.65, 0.36], speed: 0.55, rotSpeed: 0.35, phase: 2.8 },
      { imgIndex: 3, pos: [3.8, 1.0, -4.0], size: [0.85, 0.48], speed: 0.4, rotSpeed: 0.2, phase: 3.6 },

      // Deep distant ambient stars / top fringe (far back at z: -4 to -5)
      { imgIndex: 4, pos: [1.2, 2.4, -4.5], size: [0.65, 0.36], speed: 0.35, rotSpeed: 0.2, phase: 0.8 },
      { imgIndex: 5, pos: [2.5, 2.6, -4.2], size: [0.65, 0.36], speed: 0.4, rotSpeed: 0.25, phase: 2.1 },
      { imgIndex: 6, pos: [4.4, -2.0, -4.8], size: [0.75, 0.42], speed: 0.3, rotSpeed: 0.2, phase: 4.2 },
      { imgIndex: 7, pos: [3.0, -2.5, -4.0], size: [0.7, 0.39], speed: 0.35, rotSpeed: 0.2, phase: 1.9 },
    ];

    return configs;
  }, []);

  // Ambient dust particle cloud floating around the image cards
  const dustRef = useRef<THREE.Points>(null);
  const dustCount = 300;
  const dustPositions = useMemo(() => {
    const arr = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      arr[i * 3] = (Math.sin(i * 12.3) * 6);
      arr[i * 3 + 1] = (Math.cos(i * 7.7) * 4);
      arr[i * 3 + 2] = -0.5 - (Math.abs(Math.sin(i * 5.1)) * 3.5);
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!dustRef.current) return;
    dustRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    dustRef.current.rotation.x = state.clock.elapsedTime * 0.01;
  });

  if (textures.length === 0) return null;

  return (
    <group>
      {/* 18 Floating Work Image Cards */}
      {particles.map((p, idx) => {
        const tex = textures[p.imgIndex % textures.length];
        if (!tex) return null;
        return (
          <FloatingWorkCard
            key={idx}
            texture={tex}
            initialPos={p.pos}
            size={p.size}
            speed={p.speed}
            rotSpeed={p.rotSpeed}
            phase={p.phase}
          />
        );
      })}

      {/* Luminous Ambient Dust Points */}
      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[dustPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color="var(--accent-hover,#ff3338)"
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
    </group>
  );
}
