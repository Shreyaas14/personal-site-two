'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Post {
  id: number;
  title: string;
  content: string;
}

const SpinosaurusASCII = () => (
  <div className="text-center">
    <pre className="text-xs text-gray-500 font-mono leading-tight opacity-30">
{`                                                                
                                                                                                    ░░                  
                                                                                                  ▒▒▓▓██▒▒              
                                                                                                ▓▓▓▓▓▓▓▓▓▓░░▒▒  ░░      
                                                                                            ▓▓▓▓▓▓▓▓██▓▓▓▓▓▓▓▓▓▓▓▓▒▒▓▓  
    ░░▒▒░░                                                        ░░▒▒▒▒▒▒▒▒░░          ▓▓▓▓▓▓▒▒▓▓▓▓▓▓▒▒▒▒▓▓▒▒▒▒▒▒▒▒▒▒▒▒
  ▒▒▒▒▒▒▒▒▒▒                                            ░░▒▒▒▒▓▓▓▓▓▓▓▓▓▓▒▒▓▓▓▓▓▓▓▓  ░░▒▒▓▓▓▓▒▒▓▓▓▓▓▓▓▓▒▒▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒
▒▒      ▒▒▒▒▓▓▓▓░░                                ░░▓▓▓▓▓▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▒▒▒▒▒▒▒▒░░
          ░░▒▒▒▒▒▒▒▒▒▒▓▓▒▒░░            ██  ▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▓▓▒▒▒▒▓▓▓▓▒▒▒▒▓▓▒▒▒▒▒▒▒▒░░░░░░▒▒▒▒▒▒▓▓▓▓▒▒░░▒▒░░▓▓▓▓░░
              ░░▒▒░░▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▓▓▒▒▒▒░░▒▒▒▒▒▒░░░░░░▒▒▒▒░░▓▓▒▒██▓▓  ░░░░░░░░  
                  ░░▒▒▒▒░░▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░▒▒░░▓▓▒▒▒▒▓▓░░            
                        ▒▒░░▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▓▓▒▒▒▒░░▒▒▒▒▒▒▓▓▒▒░░░░░░▒▒▓▓▒▒░░▒▒░░            
                            ▒▒▒▒░░░░▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▒▒▓▓▓▓▒▒▓▓▒▒▒▒▓▓▓▓▓▓▒▒▒▒░░▒▒▒▒▒▒▒▒▒▒░░▒▒░░░░░░░░░░▒▒▒▒              
                                ░░▒▒▒▒▒▒░░▓▓▓▓▓▓▓▓▓▓▒▒▓▓▒▒▓▓▓▓▓▓▒▒▓▓▒▒▓▓▒▒▒▒░░▒▒▒▒▒▒░░▒▒      ░░░░▒▒▒▒▒▒▒▒              
                                        ▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▒▒▒▒▒▒▒▒░░            ░░░░░░░░▒▒▒▒            
                                        ░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▒▒▒▒  ▒▒██              ░░░░░░▒▒░░              
                                        ▒▒▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▓▓▓▓██▓▓▒▒▓▓▒▒▒▒▓▓                ░░▒▒▒▒░░░░            
                                      ░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▓▓████▓▓▓▓██▓▓░░  ▒▒▒▒▒▒▓▓                ▒▒▒▒▒▒░░            
                                    ██▓▓▓▓▓▓▓▓▓▓    ▒▒▒▒      ▓▓▓▓▓▓▓▓██      ▓▓  ▒▒▓▓                                  
                                    ▓▓▓▓▓▓▓▓▓▓▓▓              ▓▓▓▓▓▓▓▓██        ░░  ▓▓                                  
                                  ░░▓▓▓▓▓▓██▓▓              ▒▒▓▓▓▓▓▓██              ▓▓                                  
                                  ▓▓▓▓████░░                ▒▒▓▓▓▓▓▓▓▓                                                  
                                ░░██▓▓██                    ░░▓▓▓▓▓▓                                                    
                                ▓▓▓▓██▓▓                    ▓▓▓▓▓▓                                                      
                                ▓▓▓▓▓▓██                    ▓▓▓▓▓▓                                                      
                                ▓▓▓▓▓▓▓▓                    ▓▓▓▓▓▓                                                      
                                ▒▒▓▓██▓▓                  ░░▓▓▓▓▓▓                                                      
                                ▓▓▓▓▓▓▓▓▒▒                ░░▓▓▓▓▓▓░░                                                    
                              ░░▓▓▓▓▓▓▓▓██                  ░░▓▓▓▓▓▓▓▓░░                                                
                                ▓▓▓▓▒▒▓▓▓▓▓▓▓▓              ░░▓▓██▓▓▓▓▓▓▓▓▒▒                                            
                              ░░▓▓░░▒▒▒▒▒▒▓▓▒▒░░          ░░░░████▒▒▓▓▓▓▓▓▓▓▓▓                                          
                              ▒▒▓▓░░▒▒▓▓██▓▓░░                ░░▓▓▓▓▓▓▓▓██▓▓▒▒░░                                        
                              ░░██░░                            ░░░░░░▓▓██░░                                            
       
`}
    </pre>
    <motion.p 
      initial={{ filter: 'blur(10px)', opacity: 0 }}
      animate={{ filter: 'blur(0px)', opacity: 0.6 }}
      transition={{ duration: 2, delay: 1 }}
      className="text-gray-500 text-sm italic mt-2"
    >
      Page is coming soon, once I actually record a video.
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
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    fetch('http://localhost:3000/posts.json')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error('Error fetching posts:', err));

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
    </div>
  );
} 