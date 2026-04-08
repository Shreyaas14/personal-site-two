'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface Experience {
  id: number;
  company: string;
  logo: string;
  role: string;
  time: string;
  description: string;
  location?: string;
  companyUrl?: string;
  current?: boolean;
}

const experiences: Experience[] = [
  {
    id: 1,
    company: "Artemis",
    logo: "/artemis-logo.jpeg",
    role: "Software Engineering Intern",
    time: "Current",
    description: "Engineering ways to gather every last data point you'd need to invest in a company. Also working on agentic systems to navigate this data.",
    location: "New York, NY",
    companyUrl: "https://artemis.xyz",
    current: true,
  },
  {
    id: 2,
    company: "Neuralink",
    logo: "/nlk-logo-no-bg.png",
    role: "Software Engineering Intern, Lab Systems",
    time: "Current",
    description: "The Lab Systems (HIPPO) team handles data processing / builds data pipelines for all Neuralink data. Built software for the array manufacturing team to improve human-grade array yield.",
    location: "Fremont, CA",
    companyUrl: "https://neuralink.com"
  },
  {
    id: 3,
    company: "xAI",
    logo: "/xAI-logo-light-mode.png",
    role: "Software Engineering Intern, Core Services",
    time: "Jan – Aug 2025",
    description: "Built Grok Stories pipeline (+22.5% clicks) and X News backend (+15.5% explore clicks when it was in an experiment, backend is now Grokipedia). Worked on trend clustering and formation from real-time X post data using Scala and Python.",
    location: "San Jose, CA",
    companyUrl: "https://x.com"
  },
  {
    id: 4,
    company: "Coinbase",
    logo: "/cb-logo-no-bg.png",
    role: "Software Engineering Intern, Institutional, Reporting & Monetization",
    time: "Jun - Aug 2024",
    description: "Did an API migration. Refactored billing services.",
    location: "San Francisco, CA",
    companyUrl: "https://coinbase.com"
  },
  {
    id: 5,
    company: "NYU Blockchain & Fintech",
    logo: "/nyubnflogo.webp",
    role: "Head of Development + Bittensor Team Lead",
    time: "Sep 2024 – May 2025",
    description: "Led Microsoft-sponsored Taro project—on-chain corporate treasury management with hierarchy system. Invited to QuickNode RollOut Accelerator. Also led DormDAO x Bittensor team: won the S1 competition, built governance platform for subnet voting, authored Delegated Intersubjectivity Token Framework, and demoed at Endgame summit in Austin.",
    location: "New York, NY",
    companyUrl: "https://nyubnf.com"
  }
];


export default function Experiences() {
  const [selected, setSelected] = useState<Experience | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [grabbedLogo, setGrabbedLogo] = useState<Experience | null>(null);
  const [pawPosition, setPawPosition] = useState({ x: 0, y: 0 });

  const handleLogoClick = (exp: Experience, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPawPosition({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
    setGrabbedLogo(exp);

    // After paw grabs, show the modal
    setTimeout(() => {
      setSelected(exp);
      setGrabbedLogo(null);
    }, 900);
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ backgroundColor: '#3b2314' }}
    >
      {/* Grain overlay - behind logos */}
      <div
        className="fixed inset-0 pointer-events-none z-[5] opacity-30"
        style={{
          backgroundImage: 'url(/noise.jpg)',
          backgroundSize: 'cover',
          mixBlendMode: 'overlay',
        }}
      />
      {/* Spotlight vignette - stems from Artemis (current job) position */}
      <div
        className="fixed inset-0 pointer-events-none z-[6]"
        style={{
          background: 'radial-gradient(ellipse at 65% 50%, rgba(120,100,255,0.12) 0%, transparent 25%, rgba(0,0,0,0.85) 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-20">

        {/* Logo grid */}
        <div className="flex flex-wrap justify-center items-center gap-16 md:gap-24">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative cursor-pointer"
              onMouseEnter={() => setHovered(exp.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={(e) => handleLogoClick(exp, e)}
            >

              {/* Spotlight effect behind logo */}
              <div
                className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300"
                style={{
                  background: 'radial-gradient(circle, rgba(255,220,150,0.4) 0%, rgba(255,200,100,0.1) 40%, transparent 70%)',
                  transform: 'scale(2)',
                  filter: 'blur(10px)',
                  ...(hovered === exp.id && { opacity: 1 }),
                }}
              />

              {/* Gold pendant logo */}
              <motion.div
                whileHover={{ scale: 1.1, rotateY: 10 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="relative w-28 h-28 md:w-36 md:h-36 flex items-center justify-center"
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: '500px',
                }}
              >
                {/* Drop shadow for 3D lift */}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    transform: 'translateY(8px) scale(0.95)',
                    filter: 'blur(8px)',
                    opacity: 0.5,
                  }}
                >
                  <Image
                    src={exp.logo}
                    alt=""
                    width={140}
                    height={140}
                    className="object-contain w-24 h-24 md:w-28 md:h-28"
                    style={{ filter: 'brightness(0)' }}
                  />
                </div>

                {/* Main gold pendant */}
                <div className="relative w-24 h-24 md:w-28 md:h-28 flex items-center justify-center">
                  <Image
                    src={exp.logo}
                    alt={exp.company}
                    width={140}
                    height={140}
                    className="object-contain w-full h-full"
                    style={{
                      filter: exp.logo.includes('nlk')
                        ? 'invert(1) drop-shadow(1px 1px 0px #8b6914) drop-shadow(-1px -1px 0px #f4d03f) drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'
                        : 'drop-shadow(1px 1px 0px #8b6914) drop-shadow(-1px -1px 0px #f4d03f) drop-shadow(2px 2px 4px rgba(0,0,0,0.4))',
                    }}
                  />
                  {/* Metallic sheen */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(145deg, rgba(244,208,63,0.4) 0%, rgba(212,165,116,0.2) 30%, rgba(139,105,20,0.3) 70%, rgba(244,208,63,0.2) 100%)',
                      mixBlendMode: 'overlay',
                      maskImage: `url(${exp.logo})`,
                      maskSize: 'contain',
                      maskRepeat: 'no-repeat',
                      maskPosition: 'center',
                      WebkitMaskImage: `url(${exp.logo})`,
                      WebkitMaskSize: 'contain',
                      WebkitMaskRepeat: 'no-repeat',
                      WebkitMaskPosition: 'center',
                    }}
                  />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-20"
        >
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-sm hover:opacity-70 transition-opacity"
              style={{ color: '#d4a574' }}
            >
              ← back
            </Link>
            <a
              href="/resume.pdf"
              download
              className="text-sm hover:opacity-70 transition-opacity"
              style={{ color: '#d4a574' }}
            >
              ↓ resume
            </a>
          </div>
        </motion.div>
      </div>

      {/* Cheetah Paw Animation - MASSIVE & CHOPPY */}
      <AnimatePresence>
        {(grabbedLogo || selected) && (
          <motion.div
            initial={{ y: -600 }}
            animate={{ y: pawPosition.y - 450 }}
            exit={{ y: -600 }}
            transition={{
              duration: 0.8,
              ease: 'linear',
            }}
            className="fixed z-40 pointer-events-none"
            style={{
              left: pawPosition.x - 200,
              top: 0,
            }}
          >
            <Image
              src="/cheetah_paw_no_bg.png"
              alt="Cheetah paw"
              width={400}
              height={600}
              className="object-contain"
              style={{
                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.6))',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-lg w-full mx-4 p-8 rounded-2xl"
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: '#2a1810',
                border: '1px solid rgba(212, 165, 116, 0.3)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
              }}
            >
              {/* Close button */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-xl transition-opacity hover:opacity-70"
                style={{ color: '#d4a574' }}
              >
                ×
              </button>

              {/* Company */}
              {selected.companyUrl ? (
                <a
                  href={selected.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h2
                    className="text-2xl font-serif mb-1 hover:opacity-80 transition-opacity"
                    style={{ color: '#e8d5b7' }}
                  >
                    {selected.company}
                  </h2>
                </a>
              ) : (
                <h2
                  className="text-2xl font-serif mb-1"
                  style={{ color: '#e8d5b7' }}
                >
                  {selected.company}
                </h2>
              )}

              {/* Role */}
              <p style={{ color: '#d4a574' }}>{selected.role}</p>
              <p className="text-sm mb-6" style={{ color: '#a89080' }}>
                {selected.time} · {selected.location}
              </p>

              {/* Divider */}
              <div
                className="w-full h-px mb-6"
                style={{ backgroundColor: 'rgba(212, 165, 116, 0.3)' }}
              />

              {/* Description */}
              <p
                className="text-sm leading-relaxed"
                style={{ color: '#c4b0a0' }}
              >
                {selected.description}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
