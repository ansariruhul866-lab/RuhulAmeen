'use client';

import React, { useEffect, useRef } from 'react';

interface HeroSmokeCanvasProps {
  active: boolean;
  onSmokeClearing?: () => void;
  onSmokeComplete?: () => void;
}

interface SmokeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  baseOpacity: number;
  rotation: number;
  rotSpeed: number;
  isRed: boolean;
}

export function HeroSmokeCanvas({ active, onSmokeClearing, onSmokeComplete }: HeroSmokeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = canvas.offsetWidth || 1000);
    const height = (canvas.height = canvas.offsetHeight || 600);

    const particles: SmokeParticle[] = [];
    const count = 48;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: width * 0.2 + Math.random() * (width * 0.6),
        y: height * 0.2 + Math.random() * (height * 0.6),
        vx: (Math.random() - 0.48) * 1.8,
        vy: -0.6 - Math.random() * 1.4,
        radius: 70 + Math.random() * 110,
        maxRadius: 240 + Math.random() * 160,
        opacity: 0.75 + Math.random() * 0.25,
        baseOpacity: 0.65 + Math.random() * 0.35,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.018,
        isRed: Math.random() < 0.28, // 28% crimson ember smoke puffs
      });
    }

    const startTime = performance.now();
    const duration = 1800; // 1.8 seconds total smoke lifespan
    let clearingNotified = false;
    let completeNotified = false;

    const render = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Notify when smoke starts clearing (at 40% duration)
      if (progress >= 0.38 && !clearingNotified) {
        clearingNotified = true;
        onSmokeClearing?.();
      }

      // Fade out envelope
      let masterAlpha = 1;
      if (progress < 0.25) {
        masterAlpha = 1;
      } else {
        // Smoothly fade from 1 to 0
        masterAlpha = Math.max(0, 1 - (progress - 0.25) / 0.75);
      }

      ctx.clearRect(0, 0, width, height);

      if (masterAlpha > 0.005) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.rotation += p.rotSpeed;
          p.radius = Math.min(p.maxRadius, p.radius + 0.45);

          const grad = ctx.createRadialGradient(p.x, p.y, p.radius * 0.1, p.x, p.y, p.radius);
          const currentAlpha = p.baseOpacity * masterAlpha;

          if (p.isRed) {
            grad.addColorStop(0, `rgba(229, 38, 43, ${currentAlpha * 0.45})`);
            grad.addColorStop(0.4, `rgba(180, 25, 30, ${currentAlpha * 0.28})`);
            grad.addColorStop(0.75, `rgba(30, 10, 15, ${currentAlpha * 0.12})`);
            grad.addColorStop(1, 'rgba(10, 10, 12, 0)');
          } else {
            grad.addColorStop(0, `rgba(240, 240, 250, ${currentAlpha * 0.35})`);
            grad.addColorStop(0.4, `rgba(140, 145, 160, ${currentAlpha * 0.22})`);
            grad.addColorStop(0.75, `rgba(40, 42, 50, ${currentAlpha * 0.08})`);
            grad.addColorStop(1, 'rgba(10, 10, 12, 0)');
          }

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        animId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, width, height);
        if (!completeNotified) {
          completeNotified = true;
          onSmokeComplete?.();
        }
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [active, onSmokeClearing, onSmokeComplete]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-50 rounded-[28px] sm:rounded-[36px] md:rounded-[44px]"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
