'use client';

import { Suspense, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const Canvas = dynamic(
  () => import('@react-three/fiber').then((m) => m.Canvas),
  { ssr: false }
);

const WorkImageParticles = dynamic(
  () => import('./WorkImageParticles').then((m) => m.WorkImageParticles),
  { ssr: false }
);

const FloatingObject = dynamic(
  () => import('./FloatingObject').then((m) => m.FloatingObject),
  { ssr: false }
);

export default function HeroScene() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    setMounted(true);
  }, []);

  if (!mounted || isMobile) {
    return (
      <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-30 pointer-events-none">
        <div className="w-72 h-72 rounded-full bg-[var(--accent,#E5262B)]/20 blur-3xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 -z-10 pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <pointLight position={[-3, -3, 2]} color="#E5262B" intensity={1.5} />
        <Suspense fallback={null}>
          <WorkImageParticles />
          <FloatingObject />
        </Suspense>
      </Canvas>
    </div>
  );
}
