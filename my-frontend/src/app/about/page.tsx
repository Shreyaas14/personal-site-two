'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const PURPLE = '#B07FEE';
const BG = '#0D0A18';
const PURPLE_80 = '#B07FEECC';
const PURPLE_60 = '#B07FEE99';
const PURPLE_20 = '#B07FEE33';

export default function About() {

  return (
    <div
      className="min-h-screen w-full"
      style={{
        backgroundColor: BG,
        color: PURPLE,
        fontFamily: 'var(--font-jetbrains), "JetBrains Mono", monospace',
      }}
    >
      {/* Outer border */}
      <div
        className="min-h-screen md:m-4"
        style={{ border: `1px solid ${PURPLE}` }}
      >
        {/* Header bar */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: `1px solid ${PURPLE}` }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl tracking-tight"
            style={{ color: PURPLE }}
          >
            About
          </motion.span>
          <Link
            href="/"
            className="text-sm px-3 py-1 rounded-full transition-all duration-150 hover:ring-1"
            style={{
              color: PURPLE,
              backgroundColor: BG,
              ringColor: PURPLE_60,
            }}
          >
            ← back
          </Link>
        </div>

        {/* Content */}
        <div className="px-6 md:px-12 py-10 space-y-16">
            {/* About */}
            <motion.section
              id="about"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2
                className="text-lg mb-6 tracking-wide"
                style={{ color: PURPLE }}
              >
                // about
              </h2>
              <p
                className="text-sm leading-relaxed max-w-xl"
                style={{ color: PURPLE_80 }}
              >
                I&apos;m a senior at NYU studying Computer Science and Finance, graduating May 2026.
              </p>
            </motion.section>

            {/* Experiences */}
            <motion.section
              id="experiences"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h2
                className="text-lg mb-6 tracking-wide"
                style={{ color: PURPLE }}
              >
                // experiences
              </h2>
              <div className="space-y-2 text-sm" style={{ color: PURPLE_80 }}>
                <div className="flex items-start gap-3">
                  <span style={{ color: PURPLE_60 }}>›</span>
                  Interning at Artemis
                </div>
                <div className="flex items-start gap-3">
                  <span style={{ color: PURPLE_60 }}>›</span>
                  Previously been at:
                </div>
                {[
                  'Neuralink',
                  'xAI (technically X) (now SpaceX I guess)',
                  'X',
                  'Coinbase',
                  'Georgia Tech Research Institute',
                  'CommVault (again)',
                  'Healthomation',
                  'Commvault',
                  'Arrosoft Solutions',
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 ml-6"
                  >
                    <span style={{ color: PURPLE_20 }}>—</span>
                    {item}
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Interests */}
            <motion.section
              id="interests"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h2
                className="text-lg mb-6 tracking-wide"
                style={{ color: PURPLE }}
              >
                // interests
              </h2>
              <div className="space-y-2 text-sm" style={{ color: PURPLE_80 }}>
                {[
                  'Dinosaurs',
                  'Archive fashion (Rick Owens, Ann Demeulemeester)',
                  'Astronomy',
                  'Music production',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span style={{ color: PURPLE_60 }}>›</span>
                    {item}
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Currently */}
            <motion.section
              id="currently"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <h2
                className="text-lg mb-6 tracking-wide"
                style={{ color: PURPLE }}
              >
                // currently
              </h2>
              <div className="space-y-2 text-sm" style={{ color: PURPLE_80 }}>
                {[
                  'Reading about how we think about ownership and control',
                  'Reading through Reinforcement Learning by Sutton and Barto (slowly)',
                  '(trying to) pretrain a model (not a good one)',
                  'Finding ways to avoid sleep but also try to sleep as much as possible',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span style={{ color: PURPLE_60 }}>›</span>
                    {item}
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Resume */}
            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 text-sm px-4 py-2 transition-colors duration-200"
                style={{
                  color: PURPLE,
                  border: `1px solid ${PURPLE_60}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = PURPLE_20;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                ↓ download resume
              </a>
            </motion.section>
        </div>
      </div>

      {/* Custom selection + scrollbar styles */}
      <style jsx global>{`
        #about, #experiences, #interests, #currently {
          scroll-margin-top: 2rem;
        }
        .md\\:col-span-3::selection,
        .md\\:col-span-3 *::selection {
          background-color: ${PURPLE_20};
        }
        .md\\:col-span-3::-webkit-scrollbar {
          width: 4px;
        }
        .md\\:col-span-3::-webkit-scrollbar-thumb {
          background-color: ${PURPLE_20};
          border-radius: 4px;
        }
        .md\\:col-span-3::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </div>
  );
}
