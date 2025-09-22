'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const SpinosaurusASCII = () => (
  <div className="text-center">
    <pre className="text-xs text-gray-500 font-mono leading-tight opacity-30">
{`                                                                
                          ░░▓▓▒▒                                  
                          ▒▒░░▒▒▒▒▒▒                              
                        ░░▒▒░░▒▒░░▒▒▒▒                            
                        ▒▒▒▒░░░░▒▒▒▒▒▒        ░░░░▒▒▒▒            
                      ░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░    ▒▒▒▒▒▒▓▓▒▒▒▒░░░░░░░░▒▒
      ░░▒▒▒▒▒▒▒▒░░░░▒▒▒▒▒▒▒▒░░░░░░▒▒▒▒▒▒    ▒▒▒▒▒▒▓▓▒▒▒▒░░░░░░░░▒▒
  ░░▓▓▒▒▒▒▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░▒▒▒▒▒▒▒▒░░▒▒▓▓▒▒▒▒██        ░░  
            ░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░▒▒▒▒▒▒▒▒▓▓▒▒▓▓░░        
                  ▒▒▒▒▒▒▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▒▒▒▒▒▒▒▒▓▓▒▒▒▒      
                    ▓▓▒▒▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▒▒          ▒▒▒▒▒▒░░  
                    ▒▒▒▒▓▓▓▓▓▓▓▓▒▒▒▒▒▒▓▓▒▒▒▒                ░░░░  
                    ▒▒▒▒▓▓  ▒▒▒▒▒▒▒▒▓▓▓▓▒▒                        
                    ▒▒▒▒▒▒    ▓▓▓▓░░▒▒▓▓                          
                  ▒▒▓▓▒▒      ▒▒▓▓▒▒▒▒▒▒▒▒                        
                  ▒▒          ▒▒▓▓▓▓▒▒  ▓▓                        
                  ▓▓          ▒▒▓▓▒▒▒▒  ░░▒▒                      
                  ▒▒          ▒▒▓▓  ▓▓    ▓▓                      
                  ▒▒▒▒▒▒        ▓▓▓▓░░▒▒  ▒▒                      
                                ░░░░▒▒▓▓  ▒▒▒▒                    
                                      ▒▒  ░░                      
                                      ░░▒▒▒▒░░                    
`}
    </pre>
    <motion.p 
      initial={{ filter: 'blur(10px)', opacity: 0 }}
      animate={{ filter: 'blur(0px)', opacity: 0.6 }}
      transition={{ duration: 2, delay: 1 }}
      className="text-gray-500 text-sm italic mt-2"
    >
      SUDDEN REALIZATION 
      by Shreyaas Sureshbabu
    </motion.p>
  </div>
);

const getCurrentTime = () => {
  return new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
  });
};

export default function Home() {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(getCurrentTime());
    };
    updateTime(); // Set initial time client-side
    const interval = setInterval(updateTime, 1000); // Update every second
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      <section className="min-h-screen flex items-center justify-center relative">
        <motion.div 
          className="absolute left-1/2 transform -translate-x-1/2"
          initial={{ filter: 'blur(20px)', opacity: 0 }}
          animate={{ filter: 'blur(0px)', opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <SpinosaurusASCII />
        </motion.div>
      </section>

      <section className="min-h-screen flex items-center justify-center px-8 relative">
        <motion.nav 
          className="absolute transform -translate-y-1/2"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex space-y">
            <Link href="/experiences" className="text-gray-300 hover:text-white transition-colors text-lg">
              Experiences
            </Link>
            <Link href="/blog" className="text-gray-300 hover:text-white transition-colors text-lg">
              Writings
            </Link>
            <Link href="/videos" className="block text-gray-300 hover:text-white transition-colors text-lg">
              Videos
            </Link>
            <Link href="/about" className="block text-gray-300 hover:text-white transition-colors text-lg">
              About
            </Link>
          </div>
        </motion.nav>

        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h1 className="text-body mb-4">Shreyaas Sureshbabu</h1>
            <p className="text-body text-lg">{currentTime || 'Loading time...'}</p>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
            style={{ paddingTop: '555px' }}
          >
            <div className="space-y-3">
              <a 
                href="https://x.com/5HR3Y445" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                @5HR3Y445
              </a>
              <a 
                href="https://linkedin.com/in/shreyaas14" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <a 
                href="mailto:shreyaas.sureshbabu@stern.nyu.edu"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                shreyaas dot sureshbabu at stern dot nyu dot edu
              </a>
              <a 
                href="https://textart.sh"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                (all the ascii art is from textart.sh)
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 