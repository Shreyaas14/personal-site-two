'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface Experience {
  id: number;
  company: string;
  role: string;
  time: string;
  description: string;
  location?: string;
  companyUrl?: string;
}

const BlackHoleASCII = () => (
  <div className="text-center">
    <pre className="text-xs text-gray-500 font-mono leading-tight opacity-30">
{`                                                                
██████▓▓██████▓▓▓▓██████████▓▓██████████████████████████
▓▓██▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓██████▓▓██████████████████
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▓▓▓▓██▓▓████████████████
▓▓██▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓██▓▓▓▓▓▓▒▒▓▓▓▓▓▓██████▒▒████████
████▓▓▓▓▓▓████▓▓████████████████▒▒▒▒▓▓▓▓████████████████
██████████████████▓▓████████████▓▓▓▓▒▒▓▓▓▓▓▓▒▒██████▓▓██
██▓▓██████████▒▒████▓▓████████████████▓▓▓▓▒▒▓▓▓▓████▓▓██
▓▓▒▒▓▓████▓▓▓▓████▓▓████████▒▒████████▓▓▒▒▒▒▓▓████▓▓▓▓██
▓▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓████████████████▓▓▒▒▓▓▓▓██▓▓▓▓▓▓
██▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▓▓▒▒▒▒▒▒▓▓██████████████▓▓▒▒████▓▓▓▓▓▓
▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒░░░░▒▒▒▒▓▓▓▓██████████▓▓▒▒▓▓██▓▓▓▓▓▓
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▒▒▒▒▒▒░░░░░░▒▒██████████▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓▓▒▒▒▒▒▒▒▒▓▓████▓▓▓▓▒▒▒▒▒▒░░░░▒▒▓▓▓▓██████▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒░░░░░░░░░░▒▒▓▓▓▓▓▓██▓▓▓▓▓▓██▓▓▓▓▓▓
▓▓▓▓▓▓▓▓██████▓▓▒▒░░░░      ░░░░▒▒▒▒▓▓██████▓▓▓▓▓▓▓▓▓▓▒▒
▓▓▓▓▓▓██████▓▓▓▓▒▒░░░░      ░░░░▒▒▒▒██▓▓██▓▓██▓▓▓▓▓▓▓▓▓▓
▓▓▓▓████████▓▓▒▒▒▒░░░░      ░░▒▒▒▒▓▓▓▓██▓▓▓▓▓▓▓▓▓▓██▓▓▓▓
▓▓▓▓██████████▓▓▒▒░░▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓██▓▓▓▓██▓▓████▓▓▓▓▓▓
▓▓▓▓██████████▓▓▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▒▒▓▓▓▓██▓▓▓▓▓▓▒▒▓▓▓▓▓▓▓▓
▓▓▓▓██████▓▓████▓▓▒▒░░░░▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓██████
▓▓▓▓████████▓▓████▓▓▓▓▒▒░░▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▒▒▓▓████████
▓▓▓▓▓▓████████████████▓▓▓▓▓▓▒▒▒▒▓▓▓▓▓▓▒▒▓▓▓▓████████████
▓▓▓▓▓▓██████████████████████████████▓▓██████████████████
██▓▓▓▓▓▓██▓▓████████████████████████████████████████████
▓▓██▓▓▓▓▓▓▓▓▓▓▓▓▓▓████████████████████████████▓▓████████
████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓██▓▓██████████████████▓▓▓▓▓▓▓▓██████
██████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓██████▓▓██████▓▓▓▓▓▓▓▓▓▓████
▓▓████████▓▓▓▓▓▓▓▓▓▓▓▓▒▒▓▓▓▓▓▓▓▓████████▓▓▓▓▓▓██████████
▓▓██████████████▓▓▓▓▓▓▓▓▓▓▓▓▓▓██████████▓▓██▓▓▒▒██████▓▓
██▓▓▓▓██████████████████▓▓▓▓▓▓████▓▓██████████▓▓████████
████████████▓▓████▓▓████████▓▓▒▒▓▓▓▓▓▓██████████████████
`}
    </pre>
    <motion.p 
      initial={{ filter: 'blur(10px)', opacity: 0 }}
      animate={{ filter: 'blur(0px)', opacity: 0.6 }}
      transition={{ duration: 2, delay: 1 }}
      className="text-gray-500 text-sm italic mt-2"
    >
      Some cool things I have done, scroll down.
    </motion.p>
  </div>
);

const experiences: Experience[] = [
  {
    id: 1,
    company: "Neuralink",
    role: "Software Engineering Intern, Lab Systems",
    time: "Current",
    description: "The Lab Systems (HIPPO) team handles data processing / builds data pipelines for all Neuralink data. We build products for all other Neuralink teams. Right now, I'm working on software for the array manufacturing team to improve human-grade array yield.",
    location: "CA, USA",
    companyUrl: "https://neuralink.com"
  },
  {
    id: 2,
    company: "xAI",
    role: "Software Engineering Intern, X, Core Services",
    time: "January 2025 - August 2025",
    description: "The core services team, for lack of a better definition, manages many of X's core services. This is a very broad definition--it includes services which manage hydrating your timeline with posts, or services which recommend who you should follow. My work here revolved around the explore page: we leveraged our access to real-time post data to form trends (Scala, Python), and from those trends we created Grok Stories which you can see on the [explore page](https://x.com/explore/tabs/news). My work on refactoring the Grok Stories pipeline helped increase user clicks by 22.5%. I also developed the backend/infrastructure (Python, Scala) for an X News project (longer form news articles), which launched to some users on web; while launched, this project increased explore page clicks by 15.5%. The X News project will launch fully soon (hopefully).",
    location: "CA, USA",
    companyUrl: "https://x.com"
  },
  {
    id: 3,
    company: "NYU Blockchain & Fintech",
    role: "Head of Development",
    time: "September 2025 - May 2025",
    description: "Without this club, I would not be where I am today; I started as a member of the development team my Sophomore spring, where we built an NFT collection (bNFTs) (Javascript, Python). From there, I was marketing director my junior fall. My senior fall and spring, I was Head of Development. Microsoft sponsored our team, and we spent the year building a project (React, Javascript, Solidity) which allows corporations to maintain their cash inflows and outflows by storing transaction records on-chain. The team and I made a hierarchy tree as well, so those higher up can view the transactions that their subordinates are responsible for; we called the project Taro, and was invited to submit the project to the QuickNode RollOut Accelerator.",
    location: "NY, USA",
    companyUrl: "https://nyubnf.com"
  },
  {
    id: 3,
    company: "DormDAO x Bittensor: Builders S1 Competition (NYU Blockchain & Fintech)",
    role: "Bittensor Team Head",
    time: "January 2025 - May 2025",
    description: "My personal favorite work related to NYU BNF. We were one of only eight teams selected from blockchain clubs nationwide to participate, where we spent the semester building a project to benefit the Bittensor ecosystem. Alongside my teammates (Anish Rane, Rifa Gowani, Aaron Guan), I co-developed a governance platform (Typescript, React, Solidity) that empowers subnet owners, miners, and validators to vote on Bittensor-related decisions directly on-chain. In addition to the platform itself, we authored a formal proposal for a [Delegated Intersubjectivity Token Framework](https://drive.google.com/file/d/1wc_49VAhBfcNV9sgongXqPCyNA0oclnP/view?usp=sharing), outlining a system of consensus dispute resolution within subnets. The paper describes a mechanism to bridge social consensus and canonical truth in decentralized economies, preventing governance deadlock and ensuring subnet sustainability over time. We demoed our project at the Endgame summit in Austin, and ended up winning the competition!",
    location: "NY, USA",
    companyUrl: "https://bittensor.com/"
  }
];

const parseDescription = (description: string) => {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(description)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      parts.push(description.slice(lastIndex, match.index));
    }
    
    // Add the link
    parts.push(
      <a
        key={match.index}
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-gray-300 transition-colors duration-300 underline decoration-gray-500 hover:decoration-gray-300"
      >
        {match[1]}
      </a>
    );
    
    lastIndex = match.index + match[0].length;
  }
  
  if (lastIndex < description.length) {
    parts.push(description.slice(lastIndex));
  }
  
  return parts.length > 0 ? parts : description;
};

const ExperienceSection = ({ experience, index }: { experience: Experience; index: number }) => (
  <section className="min-h-screen flex items-center justify-center px-8 relative">
    <motion.div
      initial={{ filter: 'blur(10px)', opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', opacity: 1 }}
      transition={{ duration: 1.2 }}
      viewport={{ once: true }}
      className="text-center max-w-4xl mx-auto"
    >
      <motion.div
        initial={{ y: 30 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        {experience.companyUrl ? (
          <a 
            href={experience.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-heading mb-6 hover:text-gray-300 transition-colors duration-300 block"
          >
            {experience.company}
          </a>
        ) : (
          <h2 className="text-heading mb-6">{experience.company}</h2>
        )}
        <h3 className="text-subheading mb-4">{experience.role}</h3>
        <p className="text-body text-lg mb-2">{experience.time}</p>
        {experience.location && (
          <p className="text-body text-sm opacity-70 mb-8">{experience.location}</p>
        )}
        <p className="text-body text-lg leading-relaxed max-w-3xl mx-auto">
          {parseDescription(experience.description)}
        </p>
      </motion.div>
    </motion.div>
  </section>
);

export default function Experiences() {
  return (
    <div className="min-h-screen">
      <section className="min-h-screen flex items-center justify-center relative">
              <motion.div 
                className="absolute left-1/2 transform -translate-x-1/2"
                initial={{ filter: 'blur(20px)', opacity: 0 }}
                animate={{ filter: 'blur(0px)', opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              >
                <BlackHoleASCII />
              </motion.div>
            </section>

      {experiences.map((experience, index) => (
        <ExperienceSection 
          key={experience.id} 
          experience={experience} 
          index={index}
        />
      ))}

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