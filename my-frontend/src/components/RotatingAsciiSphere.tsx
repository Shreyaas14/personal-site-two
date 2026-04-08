'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface RotatingAsciiSphereProps {
  size?: number;
  speed?: number;
  className?: string;
  characters?: string;
}

export default function RotatingAsciiSphere({
  size = 20,
  speed = 0.02,
  className = '',
  characters = '.,-~:;=!*#$@',
}: RotatingAsciiSphereProps) {
  const [frame, setFrame] = useState<string>('');
  const angleRef = useRef({ A: 0, B: 0 });
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const renderFrame = () => {
      const { A, B } = angleRef.current;

      const width = size * 2;
      const height = size;
      const output: string[] = new Array(width * height).fill(' ');
      const zBuffer: number[] = new Array(width * height).fill(0);

      const R1 = 1; // Radius of the torus cross-section
      const R2 = 2; // Distance from center of torus to center of cross-section
      const K2 = 5;
      const K1 = (size * K2 * 3) / (8 * (R1 + R2));

      // Render a torus (donut shape)
      for (let theta = 0; theta < 6.28; theta += 0.07) {
        for (let phi = 0; phi < 6.28; phi += 0.02) {
          const cosTheta = Math.cos(theta);
          const sinTheta = Math.sin(theta);
          const cosPhi = Math.cos(phi);
          const sinPhi = Math.sin(phi);
          const cosA = Math.cos(A);
          const sinA = Math.sin(A);
          const cosB = Math.cos(B);
          const sinB = Math.sin(B);

          // Circle position
          const circleX = R2 + R1 * cosTheta;
          const circleY = R1 * sinTheta;

          // 3D coordinates after rotation
          const x = circleX * (cosB * cosPhi + sinA * sinB * sinPhi) - circleY * cosA * sinB;
          const y = circleX * (sinB * cosPhi - sinA * cosB * sinPhi) + circleY * cosA * cosB;
          const z = K2 + cosA * circleX * sinPhi + circleY * sinA;
          const ooz = 1 / z;

          // Project to 2D
          const xp = Math.floor(width / 2 + K1 * ooz * x);
          const yp = Math.floor(height / 2 - K1 * ooz * y * 0.5);

          // Calculate luminance
          const L =
            cosPhi * cosTheta * sinB -
            cosA * cosTheta * sinPhi -
            sinA * sinTheta +
            cosB * (cosA * sinTheta - cosTheta * sinA * sinPhi);

          if (L > 0) {
            const idx = xp + yp * width;
            if (idx >= 0 && idx < width * height && ooz > zBuffer[idx]) {
              zBuffer[idx] = ooz;
              const luminanceIndex = Math.floor(L * 8);
              output[idx] = characters[Math.min(luminanceIndex, characters.length - 1)];
            }
          }
        }
      }

      // Convert to string with newlines
      let result = '';
      for (let i = 0; i < height; i++) {
        result += output.slice(i * width, (i + 1) * width).join('') + '\n';
      }
      setFrame(result);

      // Update angles
      angleRef.current.A += speed;
      angleRef.current.B += speed * 0.7;

      frameRef.current = requestAnimationFrame(renderFrame);
    };

    frameRef.current = requestAnimationFrame(renderFrame);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [size, speed, characters]);

  return (
    <motion.pre
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={`font-mono text-xs leading-none select-none ${className}`}
      style={{
        fontFamily: 'monospace',
        letterSpacing: '0.1em',
      }}
    >
      {frame}
    </motion.pre>
  );
}
