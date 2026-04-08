'use client';

import { useEffect, useRef } from 'react';

interface DesertBackgroundProps {
  variant?: 'day' | 'sunset' | 'night';
}

export default function DesertBackground({ variant = 'day' }: DesertBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const palettes = {
    day: {
      sky: ['#87CEEB', '#B0E0E6', '#F5DEB3'],
      mesa: ['#CD853F', '#D2691E', '#8B4513'],
      ground: '#DEB887',
      sun: '#FFD700',
    },
    sunset: {
      sky: ['#2d1b4e', '#8b3a62', '#d4726a', '#f4a261', '#e9c46a'],
      mesa: ['#3d2317', '#5c3d2e', '#7a4a35'],
      ground: '#4a3728',
      sun: '#f4a261',
    },
    night: {
      sky: ['#0d1b2a', '#1b263b', '#2d3a4a'],
      mesa: ['#1a1512', '#2d2319', '#3d3025'],
      ground: '#1a1512',
      sun: null,
    },
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      draw();
    };

    const draw = () => {
      const { width, height } = canvas;
      const palette = palettes[variant];

      // Sky gradient
      const skyGradient = ctx.createLinearGradient(0, 0, 0, height * 0.7);
      palette.sky.forEach((color, i) => {
        skyGradient.addColorStop(i / (palette.sky.length - 1), color);
      });
      ctx.fillStyle = skyGradient;
      ctx.fillRect(0, 0, width, height);

      // Sun/moon
      if (palette.sun) {
        const sunX = width * 0.75;
        const sunY = height * 0.25;
        const sunRadius = Math.min(width, height) * 0.08;

        // Glow
        const glowGradient = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunRadius * 3);
        glowGradient.addColorStop(0, variant === 'sunset' ? 'rgba(244, 162, 97, 0.4)' : 'rgba(255, 215, 0, 0.3)');
        glowGradient.addColorStop(1, 'transparent');
        ctx.fillStyle = glowGradient;
        ctx.fillRect(0, 0, width, height);

        // Sun body
        ctx.beginPath();
        ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
        ctx.fillStyle = palette.sun;
        ctx.fill();
      }

      // Stars for night
      if (variant === 'night') {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        for (let i = 0; i < 100; i++) {
          const x = Math.random() * width;
          const y = Math.random() * height * 0.5;
          const size = Math.random() * 1.5 + 0.5;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw mesa silhouettes (back to front)
      const mesaLayers = [
        { y: 0.55, heights: [0.15, 0.2, 0.18, 0.22, 0.16], color: palette.mesa[0] },
        { y: 0.62, heights: [0.12, 0.18, 0.14, 0.16, 0.13], color: palette.mesa[1] },
        { y: 0.70, heights: [0.08, 0.12, 0.1, 0.14, 0.09], color: palette.mesa[2] },
      ];

      mesaLayers.forEach((layer) => {
        ctx.beginPath();
        ctx.moveTo(0, height);

        const segments = layer.heights.length;
        const segmentWidth = width / segments;

        // Start from bottom left
        ctx.lineTo(0, height * layer.y);

        // Draw mesa tops with flat plateaus
        for (let i = 0; i < segments; i++) {
          const x1 = i * segmentWidth;
          const x2 = (i + 0.3) * segmentWidth;
          const x3 = (i + 0.7) * segmentWidth;
          const x4 = (i + 1) * segmentWidth;

          const baseY = height * layer.y;
          const peakY = baseY - height * layer.heights[i];

          // Slope up
          ctx.lineTo(x2, peakY);
          // Flat top
          ctx.lineTo(x3, peakY);
          // Slope down
          ctx.lineTo(x4, baseY + (Math.random() - 0.5) * 20);
        }

        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fillStyle = layer.color;
        ctx.fill();
      });

      // Ground
      ctx.fillStyle = palette.ground;
      ctx.fillRect(0, height * 0.78, width, height * 0.22);

      // Cacti silhouettes
      drawCactus(ctx, width * 0.1, height * 0.75, 40, variant === 'night' ? '#1a1512' : '#2d4a1c');
      drawCactus(ctx, width * 0.85, height * 0.72, 55, variant === 'night' ? '#1a1512' : '#2d4a1c');
      drawCactus(ctx, width * 0.6, height * 0.76, 35, variant === 'night' ? '#1a1512' : '#2d4a1c');
    };

    const drawCactus = (ctx: CanvasRenderingContext2D, x: number, y: number, height: number, color: string) => {
      ctx.fillStyle = color;

      // Main body
      ctx.fillRect(x - 5, y - height, 10, height);

      // Left arm
      ctx.fillRect(x - 20, y - height * 0.7, 15, 6);
      ctx.fillRect(x - 20, y - height * 0.7 - 20, 6, 20);

      // Right arm
      ctx.fillRect(x + 5, y - height * 0.5, 18, 6);
      ctx.fillRect(x + 17, y - height * 0.5 - 25, 6, 25);
    };

    resize();
    window.addEventListener('resize', resize);

    return () => window.removeEventListener('resize', resize);
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{ pointerEvents: 'none' }}
    />
  );
}
