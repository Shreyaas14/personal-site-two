'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const RaptorASCII = () => (
  <div className="text-center">
    <pre className="text-xs text-gray-500 font-mono leading-tight opacity-30">
{`                                                                
                                                                                                                                                
  ▒▒▓▓░░                                                                                                                                        
      ▓▓▓▓                                                                                                                                      
        ▒▒▓▓▒▒                                                                                                                                  
          ░░▓▓▒▒░░                                                                                                                              
              ▓▓▓▓▒▒                                                                                                                            
                ▓▓▓▓▓▓                                                                                                                          
                ░░▓▓▓▓▓▓                                                                                                                        
                  ░░▓▓▓▓▓▓░░                                                                                                                    
                      ▓▓▒▒▓▓▓▓░░                                                                                                                
                        ▓▓▓▓▓▓▓▓░░                                                                                                              
                        ▒▒▓▓▓▓▓▓▓▓░░                                                                                                            
                          ▒▒▓▓▓▓▓▓▓▓▓▓                                                                                                          
                            ▓▓▓▓▓▓▓▓▓▓▓▓                                                                                                        
                              ▓▓▓▓▓▓▓▓▓▓▓▓                                                                                                      
                                ▓▓▓▓▓▓▓▓▓▓▓▓░░                                                                                                  
                                  ▓▓▓▓▓▓▓▓▓▓▒▒▒▒                                                                                                
                                    ▓▓▓▓▓▓▓▓▒▒▒▒░░                                                                                              
                                      ▓▓▓▓▓▓▓▓▒▒▓▓▒▒                                                                                            
                                        ▓▓▓▓▒▒▓▓▓▓▓▓░░                                                                                          
                                        ░░▓▓▓▓▒▒▓▓▒▒▒▒▒▒                                                                                        
                                            ▓▓▓▓▒▒▓▓▒▒▒▒▒▒▒▒░░                                                                                  
                                              ▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒░░░░                                                                              
                                                ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒░░  ░░  ░░                                                                
                                                  ▒▒▓▓▓▓▒▒▒▒▒▒▓▓▓▓▓▓░░░░▒▒▒▒▓▓▒▒▒▒  ░░                                                          
                                                    ▒▒▓▓▓▓▓▓▒▒▒▒▓▓▓▓▒▒░░░░▒▒▓▓▓▓▓▓▓▓▒▒▒▒                                                        
                                                      ░░▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▓▓▒▒▒▒▒▒▓▓▓▓▓▓▓▓▒▒                                                      
                                                          ▒▒▓▓▓▓▓▓▒▒▓▓▒▒▒▒░░▓▓▒▒▒▒▓▓▒▒▓▓▒▒                                                      
                                                            ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▒▒                                                    
                                                              ▓▓▓▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▒▒▓▓██▓▓▒▒▒▒▓▓                                                  
                                                              ░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▒▒▓▓                      ░░  ▒▒                    
                                                                ▓▓▓▓▓▓▓▓▓▓▓▓██▒▒▓▓▓▓▓▓▓▓▓▓▓▓▒▒▓▓▒▒                ░░▒▒░░▒▒██▓▓                  
                                                                ▓▓▒▒▓▓▓▓▓▓██▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒░░                ▒▒██▓▓▓▓▓▓▓▓                
                                                                ▓▓▒▒▓▓▓▓▓▓▓▓████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▓▓▒▒            ▒▒▓▓▓▓▓▓▓▓▓▓▒▒▓▓▒▒            
                                                                ▓▓▓▓▓▓▓▓▓▓▓▓▓▓██▒▒░░▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒░░░░▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░        
                                                                ▒▒▓▓▓▓▓▓▓▓▓▓██▓▓▓▓▓▓▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒      
                                                                ▒▒▓▓▓▓▓▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▓▓▓▓▓▓██▓▓▓▓▓▓▓▓▒▒▓▓▒▒▓▓▓▓▓▓██▓▓▓▓▓▓████▓▓▓▓▓▓▓▓      
                                                              ▓▓▓▓▓▓▓▓▒▒      ▓▓▓▓▓▓▓▓▒▒▒▒▒▒▓▓██▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒    
                                                        ▒▒▓▓▓▓▓▓▒▒▓▓▓▓          ▒▒▓▓▓▓▓▓▓▓▒▒██▓▓▓▓▓▓▓▓▒▒▓▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓████▓▓▓▓▓▓▓▓▓▓▒▒    
                                                      ░░▓▓▒▒▓▓▓▓▓▓▓▓              ░░▓▓▓▓▓▓▓▓▓▓▓▓██▒▒▒▒▒▒▓▓▓▓██▓▓▓▓▓▓▓▓▒▒▓▓██▓▓▓▓▓▓▓▓▓▓██▓▓▓▓▒▒  
                                                    ▒▒▓▓▓▓▓▓▓▓▓▓░░                ░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓░░        ░░▓▓▓▓▓▓▒▒▒▒▓▓▓▓▓▓▓▓▒▒
                                                  ▒▒▒▒▓▓▓▓▓▓░░                    ▓▓▓▓▒▒  ▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░                ▓▓▓▓▓▓      ░░▓▓▓▓▓▓
                                                  ▓▓▓▓▒▒                          ▓▓▓▓▓▓    ▒▒▓▓▒▒▓▓▓▓                      ▓▓▓▓▓▓▒▒      ░░▓▓▓▓
                                                  ▓▓▓▓▒▒                            ▓▓▓▓▒▒  ░░▓▓▒▒▓▓▒▒░░                    ░░▓▓▓▓▒▒            
                                                  ░░▓▓▓▓                            ▒▒▓▓▓▓  ▒▒▓▓▒▒██▓▓▓▓▒▒                    ▓▓▓▓▒▒            
                                                    ▓▓▓▓▓▓                            ▓▓▓▓▓▓▒▒▓▓▒▒  ▓▓▓▓▓▓▒▒                  ░░▓▓▒▒            
                                                    ▓▓▓▓▓▓░░                          ▒▒▒▒▓▓▒▒▓▓▓▓▓▓░░▒▒▓▓▓▓▒▒                  ▒▒▓▓            
                                                    ▒▒▓▓▓▓▓▓      ▓▓▓▓                ░░▓▓▓▓▓▓▓▓▒▒▓▓▓▓▓▓░░▓▓▓▓▒▒                  ▒▒            
                                                    ░░▓▓▓▓▓▓▓▓▒▒▓▓░░  ▓▓                ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ░░▓▓▓▓▒▒▓▓▓▓▓▓▓▓                    
                                                      ▓▓▓▓██▓▓▓▓▓▓░░                    ▓▓▓▓▓▓▓▓▓▓██▓▓▓▓▓▓▓▓░░    ▒▒▓▓▒▒  ░░▒▒                  
                                                      ▓▓▓▓▓▓████▓▓▓▓▒▒▒▒                                ▓▓▓▓▓▓▓▓      ░░░░    ▒▒                
                                                      ▒▒▓▓▓▓▓▓▓▓██▓▓▓▓░░░░                                  ▒▒▓▓▓▓▒▒▓▓▓▓░░                      
                                                          ░░░░▒▒                                                ▓▓▓▓▓▓▓▓▓▓██░░                  
                                                                                                                  ▒▒▓▓▒▒▓▓░░▓▓░░                
                                                                                                                    ░░▓▓  ▓▓  ▓▓                
                                                                                                                      ▒▒    ▒▒                  
`}
    </pre>
    <motion.p 
      initial={{ filter: 'blur(10px)', opacity: 0 }}
      animate={{ filter: 'blur(0px)', opacity: 0.6 }}
      transition={{ duration: 2, delay: 1 }}
      className="text-gray-500 absolute left-1/2 transform -translate-x-1/2 text-center max-w-2xl"
    >
    </motion.p>
  </div>
);

export default function About() {
  return (
    <div className="min-h-screen" style={{ background: 'transparent' }}>
      <section className="">
        <motion.div 
          initial={{ filter: 'blur(20px)', opacity: 0 }}
          animate={{ filter: 'blur(0px)', opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <RaptorASCII />
        </motion.div>
      </section>
        
      <section className="min-h-screen flex items-start justify-center relative py-16 px-8">
        <motion.div 
          className="max-w-2xl"
          initial={{ filter: 'blur(20px)', opacity: 0 }}
          animate={{ filter: 'blur(0px)', opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <div className="mt-8">
            <p className="mb-4 justify-left">
              I’m a senior at NYU studying Computer Science and Finance, with an expected graduation date of May 2026.
            </p>
            <h3 className="">Currently:</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>interning at Neuralink</li>
              <li>exploring how blockchains can be used to store / train LLMs (shoutout Anish)</li>
              <li>reading <em>Reinforcement Learning</em> by Barto and Sutton</li>
              <li>romanticizing the mundane aspects of life</li>
            </ul>
            <h3 className="mb-3 mt-6">Interests:</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>dinosaurs</li>
              <li>archive fashion (Rick Owens, ERD, Ann D, etc.)</li>
              <li>astronomy</li>
              <li>music production</li>
            </ul>
          </div>
        </motion.div>
      </section>

      <section className="min-h-screen flex items-center justify-center px-8">
        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0 }}
          whileInView={{ filter: 'blur(0px)', opacity: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link 
            href="/"
            className="text-body text-lg hover:text-white transition-colors"
          >
            ← Back to Home
          </Link>
        </motion.div>
      </section>
    </div>
  );
}