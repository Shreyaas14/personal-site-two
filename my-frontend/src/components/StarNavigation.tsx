'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

type NodeType = 'nav' | 'interest' | 'work' | 'social' | 'center';

interface NavNode {
  id: string;
  label: string;
  href?: string;
  x: number;
  y: number;
  type: NodeType;
  connections: string[];
  external?: boolean;
}

interface StarNavigationProps {
  darkMode?: boolean;
}

// Orion constellation with bow - 30% larger total
const baseNodes: NavNode[] = [
  // HEAD (Meissa)
  { id: 'center', label: 'Shreyaas', x: 50, y: 17, type: 'center', connections: ['shoulder_l', 'shoulder_r'] },

  // SHOULDERS (Betelgeuse left, Bellatrix right)
  { id: 'shoulder_l', label: 'Experiences', href: '/experiences', x: 42, y: 27, type: 'nav', connections: ['center', 'belt1', 'bow1', 'foot_l'] },
  { id: 'shoulder_r', label: 'Writings', href: '/blog', x: 58, y: 27, type: 'nav', connections: ['center', 'belt3', 'club1', 'foot_r'] },

  // BELT (3 stars in a row - the iconic part)
  { id: 'belt1', label: 'About', href: '/about', x: 46, y: 43, type: 'nav', connections: ['shoulder_l', 'belt2'] },
  { id: 'belt2', label: 'Videos', href: '/videos', x: 50, y: 47, type: 'nav', connections: ['belt1', 'belt3', 'sword'] },
  { id: 'belt3', label: 'Neuralink', x: 54, y: 43, type: 'work', connections: ['shoulder_r', 'belt2'] },

  // SWORD (hanging from belt)
  { id: 'sword', label: 'xAI', x: 50, y: 57, type: 'work', connections: ['belt2'] },

  // FEET (Saiph left, Rigel right)
  { id: 'foot_l', label: 'LinkedIn', href: 'https://linkedin.com/in/shreyaas14', x: 43, y: 70, type: 'social', connections: ['shoulder_l'], external: true },
  { id: 'foot_r', label: '@5HR3Y445', href: 'https://x.com/5HR3Y445', x: 57, y: 70, type: 'social', connections: ['shoulder_r'], external: true },

  // BOW (curved line extending left from shoulder)
  { id: 'bow1', label: 'Dinosaurs', x: 32, y: 24, type: 'interest', connections: ['shoulder_l', 'bow2'] },
  { id: 'bow2', label: 'Rick Owens', x: 27, y: 34, type: 'interest', connections: ['bow1', 'bow3'] },
  { id: 'bow3', label: 'Music', x: 26, y: 47, type: 'interest', connections: ['bow2', 'bow4'] },
  { id: 'bow4', label: 'Outer Space', x: 29, y: 57, type: 'interest', connections: ['bow3'] },

  // CLUB (raised right arm)
  { id: 'club1', label: 'NYU BNF', x: 66, y: 21, type: 'work', connections: ['shoulder_r', 'club2'] },
  { id: 'club2', label: 'Bittensor', x: 71, y: 14, type: 'work', connections: ['club1'] },

  // Email at bottom center
  { id: 'email', label: 'Email', href: 'mailto:shreyaas.sureshbabu@stern.nyu.edu', x: 50, y: 79, type: 'social', connections: ['foot_l', 'foot_r', 'resume'], external: false },

  // Resume
  { id: 'resume', label: 'Resume', href: '/resume.pdf', x: 50, y: 86, type: 'social', connections: ['email'], external: false },
];

// Light mode - Aged gold colors with more warmth
const lightTypeColors: Record<NodeType, { fill: string; stroke: string; glow: string }> = {
  center: { fill: '#c9a962', stroke: '#8a7040', glow: 'rgba(201, 169, 98, 0.4)' },
  nav: { fill: '#b89850', stroke: '#8a7040', glow: 'rgba(184, 152, 80, 0.35)' },
  interest: { fill: '#986335', stroke: '#6b4030', glow: 'rgba(152, 99, 53, 0.3)' },
  work: { fill: '#a08050', stroke: '#706048', glow: 'rgba(160, 128, 80, 0.3)' },
  social: { fill: '#7a8070', stroke: '#5a6050', glow: 'rgba(122, 128, 112, 0.25)' },
};

// Dark mode - stars that blend with photo (small, glowing points)
const darkTypeColors: Record<NodeType, { fill: string; stroke: string; glow: string }> = {
  center: { fill: '#ffffff', stroke: '#ffffff', glow: 'rgba(255, 255, 255, 0.8)' },
  nav: { fill: '#ffffff', stroke: '#ffffff', glow: 'rgba(255, 255, 255, 0.6)' },
  interest: { fill: '#fffaf0', stroke: '#fffaf0', glow: 'rgba(255, 250, 240, 0.5)' },
  work: { fill: '#f8f8ff', stroke: '#f8f8ff', glow: 'rgba(248, 248, 255, 0.5)' },
  social: { fill: '#ffffff', stroke: '#ffffff', glow: 'rgba(255, 255, 255, 0.4)' },
};

const typeSizes: Record<NodeType, number> = {
  center: 14,
  nav: 8,
  interest: 6,
  work: 6,
  social: 5,
};

export default function StarNavigation({ darkMode = false }: StarNavigationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Use base nodes initially, add randomness on client after hydration
  const [nodes, setNodes] = useState(baseNodes);
  const [isClient, setIsClient] = useState(false);

  // Select color scheme based on mode
  const typeColors = darkMode ? darkTypeColors : lightTypeColors;

  useEffect(() => {
    setIsClient(true);
    // Add slight randomness to node positions (consistent per session)
    setNodes(baseNodes.map((node, i) => ({
      ...node,
      x: node.x + (Math.sin(i * 7.3) * 2),
      y: node.y + (Math.cos(i * 5.7) * 2),
    })));
  }, []);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = `${dimensions.width}px`;
    canvas.style.height = `${dimensions.height}px`;

    const getNodePosition = (node: NavNode) => ({
      x: (node.x / 100) * dimensions.width,
      y: (node.y / 100) * dimensions.height,
    });

    const seededRandom = (seed: number) => {
      const x = Math.sin(seed * 9999) * 9999;
      return x - Math.floor(x);
    };

    // Clear canvas
    ctx.clearRect(0, 0, dimensions.width, dimensions.height);

    const centerX = dimensions.width * 0.5;
    const centerY = dimensions.height * 0.5;
    const globeRadius = Math.min(dimensions.width, dimensions.height) * 0.38;

    if (darkMode) {
      // === DARK MODE: CONSTELLATION OVERLAY ON STAR PHOTO ===
      // Only show lines when hovering over a star

      if (hoveredNode) {
        const drawnConnections = new Set<string>();

        nodes.forEach((node) => {
          const startPos = getNodePosition(node);

          node.connections.forEach((connId) => {
            const connectionKey = [node.id, connId].sort().join('-');
            if (drawnConnections.has(connectionKey)) return;
            drawnConnections.add(connectionKey);

            const connNode = nodes.find((n) => n.id === connId);
            if (!connNode) return;

            const endPos = getNodePosition(connNode);
            const isConnectedToHover = hoveredNode === node.id || hoveredNode === connId;

            // Only draw lines connected to hovered node, or faintly show others
            const opacity = isConnectedToHover ? 1 : 0.3;

            // Glow behind line
            ctx.beginPath();
            ctx.moveTo(startPos.x, startPos.y);
            ctx.lineTo(endPos.x, endPos.y);
            ctx.strokeStyle = `rgba(255, 250, 240, ${0.3 * opacity})`;
            ctx.lineWidth = isConnectedToHover ? 4 : 2;
            ctx.lineCap = 'round';
            ctx.stroke();

            // Core line
            ctx.beginPath();
            ctx.moveTo(startPos.x, startPos.y);
            ctx.lineTo(endPos.x, endPos.y);
            ctx.strokeStyle = `rgba(255, 250, 240, ${0.7 * opacity})`;
            ctx.lineWidth = isConnectedToHover ? 1.5 : 0.8;
            ctx.lineCap = 'round';
            ctx.stroke();
          });
        });
      }

    } else {
      // === LIGHT MODE: PARCHMENT STYLE ===

    // === FOLD LINES (paper creases) ===
    ctx.strokeStyle = 'rgba(100, 85, 65, 0.08)';
    ctx.lineWidth = 1;
    // Horizontal fold
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(dimensions.width, centerY);
    ctx.stroke();
    // Vertical fold
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, dimensions.height);
    ctx.stroke();

    // === WATER STAIN RINGS ===
    for (let i = 0; i < 3; i++) {
      const seed = i * 555 + 123;
      const x = seededRandom(seed) * dimensions.width * 0.8 + dimensions.width * 0.1;
      const y = seededRandom(seed + 1) * dimensions.height * 0.8 + dimensions.height * 0.1;
      const radius = seededRandom(seed + 2) * 60 + 40;

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(140, 120, 90, 0.06)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Inner ring
      ctx.beginPath();
      ctx.arc(x, y, radius * 0.85, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(140, 120, 90, 0.03)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // === AGED PAPER STAINS ===
    for (let i = 0; i < 8; i++) {
      const seed = i * 777;
      const x = seededRandom(seed) * dimensions.width;
      const y = seededRandom(seed + 1) * dimensions.height;
      const radius = seededRandom(seed + 2) * 120 + 60;

      const stain = ctx.createRadialGradient(x, y, 0, x, y, radius);
      stain.addColorStop(0, 'rgba(160, 140, 110, 0.08)');
      stain.addColorStop(0.6, 'rgba(150, 130, 100, 0.04)');
      stain.addColorStop(1, 'rgba(140, 120, 90, 0)');
      ctx.fillStyle = stain;
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);
    }

    // === FOXING SPOTS ===
    for (let i = 0; i < 50; i++) {
      const seed = i * 137;
      const x = seededRandom(seed) * dimensions.width;
      const y = seededRandom(seed + 1) * dimensions.height;
      const size = seededRandom(seed + 2) * 3 + 1;
      const opacity = seededRandom(seed + 3) * 0.08 + 0.02;

      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(120, 100, 70, ${opacity})`;
      ctx.fill();
    }

    // === CORNER FLOURISHES ===
    const drawCornerFlourish = (x: number, y: number, flipX: boolean, flipY: boolean) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(flipX ? -1 : 1, flipY ? -1 : 1);

      ctx.strokeStyle = 'rgba(80, 65, 45, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.lineCap = 'round';

      // Main curl
      ctx.beginPath();
      ctx.moveTo(10, 10);
      ctx.quadraticCurveTo(40, 12, 60, 30);
      ctx.quadraticCurveTo(75, 50, 70, 70);
      ctx.stroke();

      // Inner curl
      ctx.beginPath();
      ctx.moveTo(15, 15);
      ctx.quadraticCurveTo(30, 20, 40, 35);
      ctx.quadraticCurveTo(48, 48, 45, 55);
      ctx.stroke();

      // Decorative dots
      ctx.fillStyle = 'rgba(80, 65, 45, 0.2)';
      ctx.beginPath();
      ctx.arc(25, 25, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(50, 45, 1.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    drawCornerFlourish(0, 0, false, false);
    drawCornerFlourish(dimensions.width, 0, true, false);
    drawCornerFlourish(0, dimensions.height, false, true);
    drawCornerFlourish(dimensions.width, dimensions.height, true, true);

    // === OUTER DECORATIVE BORDER ===
    const borderInset = 25;
    ctx.strokeStyle = 'rgba(80, 65, 45, 0.2)';
    ctx.lineWidth = 1;
    ctx.strokeRect(borderInset, borderInset, dimensions.width - borderInset * 2, dimensions.height - borderInset * 2);

    ctx.strokeStyle = 'rgba(80, 65, 45, 0.12)';
    ctx.lineWidth = 0.5;
    ctx.strokeRect(borderInset + 5, borderInset + 5, dimensions.width - borderInset * 2 - 10, dimensions.height - borderInset * 2 - 10);

    // === CRUMPLED PAPER TEXTURE ===
    // Major crease lines (like paper that's been folded and unfolded)
    for (let i = 0; i < 8; i++) {
      const seed = i * 444 + 111;
      const startX = seededRandom(seed) * dimensions.width;
      const startY = seededRandom(seed + 1) * dimensions.height;
      const endX = seededRandom(seed + 2) * dimensions.width;
      const endY = seededRandom(seed + 3) * dimensions.height;

      // Shadow side of crease
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      const midX = (startX + endX) / 2 + (seededRandom(seed + 4) - 0.5) * 60;
      const midY = (startY + endY) / 2 + (seededRandom(seed + 5) - 0.5) * 60;
      ctx.quadraticCurveTo(midX, midY, endX, endY);
      ctx.strokeStyle = 'rgba(90, 75, 55, 0.12)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Highlight side of crease (offset slightly)
      ctx.beginPath();
      ctx.moveTo(startX + 2, startY + 2);
      ctx.quadraticCurveTo(midX + 2, midY + 2, endX + 2, endY + 2);
      ctx.strokeStyle = 'rgba(220, 210, 190, 0.15)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Crinkle patches - areas where paper bunches up
    for (let i = 0; i < 10; i++) {
      const seed = i * 888;
      const x = seededRandom(seed) * dimensions.width;
      const y = seededRandom(seed + 1) * dimensions.height;
      const size = seededRandom(seed + 2) * 100 + 50;

      // Create a wrinkle pattern with multiple overlapping gradients
      for (let j = 0; j < 3; j++) {
        const angle = seededRandom(seed + j * 10) * Math.PI;
        const offsetX = (seededRandom(seed + j * 20) - 0.5) * 30;
        const offsetY = (seededRandom(seed + j * 30) - 0.5) * 30;

        ctx.save();
        ctx.translate(x + offsetX, y + offsetY);
        ctx.rotate(angle);

        // Shadow stripe
        const crinkleShadow = ctx.createLinearGradient(-size/2, 0, size/2, 0);
        crinkleShadow.addColorStop(0, 'rgba(100, 85, 65, 0)');
        crinkleShadow.addColorStop(0.4, 'rgba(100, 85, 65, 0.08)');
        crinkleShadow.addColorStop(0.5, 'rgba(100, 85, 65, 0.12)');
        crinkleShadow.addColorStop(0.6, 'rgba(100, 85, 65, 0.08)');
        crinkleShadow.addColorStop(1, 'rgba(100, 85, 65, 0)');
        ctx.fillStyle = crinkleShadow;
        ctx.fillRect(-size/2, -8, size, 16);

        // Highlight stripe (offset)
        const crinkleHighlight = ctx.createLinearGradient(-size/2, 0, size/2, 0);
        crinkleHighlight.addColorStop(0, 'rgba(230, 220, 200, 0)');
        crinkleHighlight.addColorStop(0.45, 'rgba(230, 220, 200, 0.08)');
        crinkleHighlight.addColorStop(0.55, 'rgba(230, 220, 200, 0.08)');
        crinkleHighlight.addColorStop(1, 'rgba(230, 220, 200, 0)');
        ctx.fillStyle = crinkleHighlight;
        ctx.fillRect(-size/2, -12, size, 8);

        ctx.restore();
      }
    }

    // Fine wrinkle texture (small random lines)
    ctx.strokeStyle = 'rgba(100, 85, 65, 0.06)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < 40; i++) {
      const seed = i * 222;
      const x = seededRandom(seed) * dimensions.width;
      const y = seededRandom(seed + 1) * dimensions.height;
      const len = seededRandom(seed + 2) * 30 + 10;
      const angle = seededRandom(seed + 3) * Math.PI * 2;

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + Math.cos(angle) * len, y + Math.sin(angle) * len);
      ctx.stroke();
    }

    // === CELESTIAL GLOBE / PLANISPHERE ===
    // Outermost ring with degree markings
    const outerRingRadius = globeRadius + 35;
    ctx.beginPath();
    ctx.arc(centerX, centerY, outerRingRadius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(50, 40, 28, 0.3)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Degree markings
    ctx.font = '8px "Cormorant Garamond", Georgia, serif';
    ctx.fillStyle = 'rgba(60, 50, 35, 0.5)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let deg = 0; deg < 360; deg += 10) {
      const angle = (deg - 90) * (Math.PI / 180);
      const innerR = outerRingRadius - 8;
      const outerR = outerRingRadius - 3;

      // Tick marks
      ctx.beginPath();
      ctx.moveTo(centerX + Math.cos(angle) * innerR, centerY + Math.sin(angle) * innerR);
      ctx.lineTo(centerX + Math.cos(angle) * outerR, centerY + Math.sin(angle) * outerR);
      ctx.strokeStyle = deg % 30 === 0 ? 'rgba(50, 40, 28, 0.4)' : 'rgba(50, 40, 28, 0.2)';
      ctx.lineWidth = deg % 30 === 0 ? 1.5 : 0.5;
      ctx.stroke();

      // Degree numbers (every 30°)
      if (deg % 30 === 0) {
        const textR = outerRingRadius + 12;
        const textX = centerX + Math.cos(angle) * textR;
        const textY = centerY + Math.sin(angle) * textR;
        ctx.fillText(`${deg}°`, textX, textY);
      }
    }

    // Inner decorative ring
    const innerRingRadius = globeRadius + 22;
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRingRadius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(50, 40, 28, 0.15)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Main globe circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, globeRadius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(50, 40, 28, 0.5)';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Second slightly offset circle for hand-drawn effect
    ctx.beginPath();
    ctx.arc(centerX + 0.5, centerY + 0.5, globeRadius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(50, 40, 28, 0.15)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Inner circles (latitude lines)
    for (let i = 1; i <= 3; i++) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, globeRadius * (i / 4), 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(50, 40, 28, ${0.12 + i * 0.04})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Meridian lines
    ctx.strokeStyle = 'rgba(50, 40, 28, 0.2)';
    ctx.lineWidth = 1;

    // Horizontal
    ctx.beginPath();
    ctx.moveTo(centerX - globeRadius, centerY);
    ctx.lineTo(centerX + globeRadius, centerY);
    ctx.stroke();

    // Vertical
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - globeRadius);
    ctx.lineTo(centerX, centerY + globeRadius);
    ctx.stroke();

    // Diagonal lines
    ctx.strokeStyle = 'rgba(50, 40, 28, 0.12)';
    ctx.beginPath();
    ctx.moveTo(centerX - globeRadius * 0.7, centerY - globeRadius * 0.7);
    ctx.lineTo(centerX + globeRadius * 0.7, centerY + globeRadius * 0.7);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX + globeRadius * 0.7, centerY - globeRadius * 0.7);
    ctx.lineTo(centerX - globeRadius * 0.7, centerY + globeRadius * 0.7);
    ctx.stroke();

    // === CARDINAL DIRECTIONS ===
    ctx.font = 'italic 14px "Cormorant Garamond", Georgia, serif';
    ctx.fillStyle = 'rgba(60, 50, 35, 0.7)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const cardinalRadius = globeRadius + 50;
    ctx.fillText('SEPTENTRIO', centerX, centerY - cardinalRadius); // North
    ctx.fillText('MERIDIES', centerX, centerY + cardinalRadius);    // South
    ctx.fillText('ORIENS', centerX + cardinalRadius + 10, centerY); // East
    ctx.fillText('OCCIDENS', centerX - cardinalRadius - 10, centerY); // West

    // === COMPASS ROSE (bottom left) ===
    const compassX = 80;
    const compassY = dimensions.height - 80;
    const compassSize = 30;

    // Main compass points
    ctx.strokeStyle = 'rgba(80, 65, 45, 0.4)';
    ctx.fillStyle = 'rgba(80, 65, 45, 0.3)';
    ctx.lineWidth = 1.5;

    // N-S line
    ctx.beginPath();
    ctx.moveTo(compassX, compassY - compassSize);
    ctx.lineTo(compassX, compassY + compassSize);
    ctx.stroke();

    // E-W line
    ctx.beginPath();
    ctx.moveTo(compassX - compassSize, compassY);
    ctx.lineTo(compassX + compassSize, compassY);
    ctx.stroke();

    // Diagonal lines
    ctx.strokeStyle = 'rgba(80, 65, 45, 0.25)';
    ctx.lineWidth = 1;
    const diagSize = compassSize * 0.7;
    ctx.beginPath();
    ctx.moveTo(compassX - diagSize, compassY - diagSize);
    ctx.lineTo(compassX + diagSize, compassY + diagSize);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(compassX + diagSize, compassY - diagSize);
    ctx.lineTo(compassX - diagSize, compassY + diagSize);
    ctx.stroke();

    // Center circle
    ctx.beginPath();
    ctx.arc(compassX, compassY, 4, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(140, 112, 64, 0.5)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(80, 65, 45, 0.4)';
    ctx.stroke();

    // North arrow
    ctx.beginPath();
    ctx.moveTo(compassX, compassY - compassSize);
    ctx.lineTo(compassX - 5, compassY - compassSize + 12);
    ctx.lineTo(compassX, compassY - compassSize + 8);
    ctx.lineTo(compassX + 5, compassY - compassSize + 12);
    ctx.closePath();
    ctx.fillStyle = 'rgba(80, 65, 45, 0.4)';
    ctx.fill();

    // N label
    ctx.font = 'italic 10px "Cormorant Garamond", Georgia, serif';
    ctx.fillStyle = 'rgba(60, 50, 35, 0.7)';
    ctx.textAlign = 'center';
    ctx.fillText('N', compassX, compassY - compassSize - 8);

    // === CONNECTION LINES ===
    const drawnConnections = new Set<string>();

    nodes.forEach((node, nodeIndex) => {
      const startPos = getNodePosition(node);

      node.connections.forEach((connId, connIndex) => {
        const connectionKey = [node.id, connId].sort().join('-');
        if (drawnConnections.has(connectionKey)) return;
        drawnConnections.add(connectionKey);

        const connNode = nodes.find((n) => n.id === connId);
        if (!connNode) return;

        const endPos = getNodePosition(connNode);
        const isHighlighted = hoveredNode === node.id || hoveredNode === connId;
        const seed = nodeIndex * 100 + connIndex;

        // Single hand-drawn stroke
        const segments = 25;
        ctx.beginPath();
        ctx.moveTo(startPos.x, startPos.y);

        for (let i = 1; i <= segments; i++) {
          const t = i / segments;
          const baseX = startPos.x + (endPos.x - startPos.x) * t;
          const baseY = startPos.y + (endPos.y - startPos.y) * t;

          const wobble = (seededRandom(seed + i) - 0.5) * 1;
          const len = Math.sqrt(Math.pow(endPos.x - startPos.x, 2) + Math.pow(endPos.y - startPos.y, 2));
          const perpX = -(endPos.y - startPos.y) / len;
          const perpY = (endPos.x - startPos.x) / len;

          ctx.lineTo(baseX + perpX * wobble, baseY + perpY * wobble);
        }

        ctx.strokeStyle = `rgba(50, 40, 28, ${isHighlighted ? 0.55 : 0.35})`;
        ctx.lineWidth = isHighlighted ? 2 : 1.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
      });
    });

    // === SCATTERED MARKS (varied shapes like aged paper) ===
    for (let i = 0; i < 50; i++) {
      const seed = i * 333;
      const x = seededRandom(seed) * dimensions.width;
      const y = seededRandom(seed + 1) * dimensions.height;
      const size = seededRandom(seed + 2) * 3 + 1;
      const opacity = seededRandom(seed + 3) * 0.12 + 0.04;
      const markType = Math.floor(seededRandom(seed + 4) * 5);

      ctx.fillStyle = `rgba(80, 65, 50, ${opacity})`;
      ctx.strokeStyle = `rgba(60, 50, 40, ${opacity})`;
      ctx.lineWidth = 0.5;

      if (markType === 0) {
        // Small dot
        ctx.beginPath();
        ctx.arc(x, y, size * 0.5, 0, Math.PI * 2);
        ctx.fill();
      } else if (markType === 1) {
        // Tiny speck cluster
        for (let j = 0; j < 3; j++) {
          const ox = (seededRandom(seed + j * 10) - 0.5) * size * 2;
          const oy = (seededRandom(seed + j * 10 + 1) - 0.5) * size * 2;
          ctx.beginPath();
          ctx.arc(x + ox, y + oy, size * 0.3, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (markType === 2) {
        // Short scratch line
        const angle = seededRandom(seed + 5) * Math.PI;
        ctx.beginPath();
        ctx.moveTo(x - Math.cos(angle) * size, y - Math.sin(angle) * size);
        ctx.lineTo(x + Math.cos(angle) * size, y + Math.sin(angle) * size);
        ctx.stroke();
      } else if (markType === 3) {
        // Irregular blob
        ctx.beginPath();
        ctx.ellipse(x, y, size * 0.7, size * 0.4, seededRandom(seed + 6) * Math.PI, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Small ring/water mark
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    // === EDGE DARKENING (worn edges) ===
    const edgeGradientTop = ctx.createLinearGradient(0, 0, 0, dimensions.height * 0.12);
    edgeGradientTop.addColorStop(0, 'rgba(120, 100, 80, 0.2)');
    edgeGradientTop.addColorStop(1, 'rgba(120, 100, 80, 0)');
    ctx.fillStyle = edgeGradientTop;
    ctx.fillRect(0, 0, dimensions.width, dimensions.height * 0.12);

    const edgeGradientBottom = ctx.createLinearGradient(0, dimensions.height * 0.88, 0, dimensions.height);
    edgeGradientBottom.addColorStop(0, 'rgba(120, 100, 80, 0)');
    edgeGradientBottom.addColorStop(1, 'rgba(120, 100, 80, 0.2)');
    ctx.fillStyle = edgeGradientBottom;
    ctx.fillRect(0, dimensions.height * 0.88, dimensions.width, dimensions.height * 0.12);

    const edgeGradientLeft = ctx.createLinearGradient(0, 0, dimensions.width * 0.08, 0);
    edgeGradientLeft.addColorStop(0, 'rgba(120, 100, 80, 0.15)');
    edgeGradientLeft.addColorStop(1, 'rgba(120, 100, 80, 0)');
    ctx.fillStyle = edgeGradientLeft;
    ctx.fillRect(0, 0, dimensions.width * 0.08, dimensions.height);

    const edgeGradientRight = ctx.createLinearGradient(dimensions.width * 0.92, 0, dimensions.width, 0);
    edgeGradientRight.addColorStop(0, 'rgba(120, 100, 80, 0)');
    edgeGradientRight.addColorStop(1, 'rgba(120, 100, 80, 0.15)');
    ctx.fillStyle = edgeGradientRight;
    ctx.fillRect(dimensions.width * 0.92, 0, dimensions.width * 0.08, dimensions.height);

    } // End of else (light mode)

  }, [dimensions, hoveredNode, nodes, darkMode]);

  const renderNode = (node: NavNode) => {
    const colors = typeColors[node.type];
    const baseSize = typeSizes[node.type];
    // In dark mode, make stars smaller to blend with photo
    const size = darkMode ? Math.max(baseSize * 0.6, 4) : baseSize;

    const isHovered = hoveredNode === node.id;
    const isConnectedToHovered = hoveredNode && nodes.find(n => n.id === hoveredNode)?.connections.includes(node.id);

    const nodeContent = (
      <motion.div
        className="relative flex flex-col items-center cursor-pointer"
        whileHover={{ scale: darkMode ? 1.5 : 1.15 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        onMouseEnter={() => setHoveredNode(node.id)}
        onMouseLeave={() => setHoveredNode(null)}
      >
        {/* Star node */}
        <motion.div
          style={darkMode ? {
            // Dark mode: blend with starfield
            width: size,
            height: size,
            background: colors.fill,
            borderRadius: '50%',
            boxShadow: `
              0 0 ${size * 2}px ${colors.glow},
              0 0 ${size * 4}px ${colors.glow.replace(/[\d.]+\)$/, '0.4)')},
              0 0 ${size * 6}px ${colors.glow.replace(/[\d.]+\)$/, '0.2)')}
            `,
          } : {
            // Light mode: aged gold style
            width: size,
            height: size,
            background: `radial-gradient(circle at 30% 30%, ${colors.fill}, ${colors.stroke})`,
            borderRadius: '50%',
            boxShadow: `0 0 ${size * 0.8}px ${colors.glow}, 0 0 ${size * 1.5}px ${colors.glow.replace(/[\d.]+\)$/, '0.15)')}`,
          }}
          animate={{
            opacity: isHovered ? 1 : (darkMode ? 0.9 : 0.95),
            scale: isHovered ? (darkMode ? 1.3 : 1.1) : 1,
          }}
          transition={{ duration: 0.2 }}
        />

        {/* Label */}
        <AnimatePresence>
          {(isHovered || isConnectedToHovered || (!darkMode && node.type === 'center')) && (
            <motion.span
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 3 }}
              transition={{ duration: 0.15 }}
              className={`absolute whitespace-nowrap ${
                darkMode ? 'font-sans text-xs' : 'font-serif italic'
              } ${
                node.type === 'center' ? (darkMode ? 'text-xs top-4' : 'text-sm top-6') : 'text-xs top-5'
              }`}
              style={{
                color: darkMode
                  ? 'rgba(255, 255, 255, 0.9)'
                  : (isHovered ? '#4a4035' : '#6b5d50'),
                textShadow: darkMode ? '0 0 8px rgba(0,0,0,0.8)' : 'none',
              }}
            >
              {node.label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    );

    if (node.href) {
      if (node.external) {
        return (
          <a
            key={node.id}
            href={node.href}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            {nodeContent}
          </a>
        );
      }
      return (
        <Link
          key={node.id}
          href={node.href}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          {nodeContent}
        </Link>
      );
    }

    return (
      <div
        key={node.id}
        className="absolute transform -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${node.x}%`, top: `${node.y}%` }}
      >
        {nodeContent}
      </div>
    );
  };

  return (
    <div ref={containerRef} className="relative w-full h-screen">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      {nodes.map(renderNode)}
    </div>
  );
}
