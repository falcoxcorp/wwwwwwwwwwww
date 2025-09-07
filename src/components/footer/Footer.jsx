import React from 'react';
import { 
  FaTelegram, 
  FaTwitter, 
  FaWhatsapp, 
  FaDiscord, 
  FaRocket 
} from 'react-icons/fa6'; // Nota: Usando fa6 en lugar de fa
import { motion } from 'framer-motion';

const Footer = () => {
  const socialLinks = [
    { icon: <FaTelegram size={22} />, url: '#', name: 'Telegram' },
    { icon: <FaTwitter size={22} />, url: '#', name: 'Twitter' },
    { icon: <FaWhatsapp size={22} />, url: '#', name: 'WhatsApp' },
    { icon: <FaDiscord size={22} />, url: '#', name: 'Discord' },
    { icon: <FaRocket size={22} />, url: '#', name: 'Rocket' },
  ];

  const Particles = () => {
    return (
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 100],
              x: [0, (Math.random() - 0.5) * 50],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    );
  };

  const WaveBackground = () => {
    return (
      <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden transform rotate-180">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            className="fill-current text-gray-800 opacity-40"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            className="fill-current text-gray-700 opacity-25"
          ></path>
        </svg>
      </div>
    );
  };

  return (
    <footer className="py-12 bg-gray-900 relative overflow-hidden border-t border-gray-800">
      <div className="absolute inset-0 bg-[url('https://assets.website-files.com/5e51b3b0337309d672efd94c/5e51b3b03373093d1a2efda0_noise.png')] opacity-5"></div>
      <Particles />
      <WaveBackground />
      
      <div className="absolute inset-0 bg-[length:100px_100px] bg-[linear-gradient(to_right,#80808002_1px,transparent_1px),linear-gradient(to_bottom,#80808002_1px,transparent_1px)]"></div>

      <div className="container px-4 mx-auto relative z-10">
        <div className="flex flex-col items-center">
          <div className="flex space-x-6 mb-8">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white relative group"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.name}
              >
                <div className="p-3 rounded-lg bg-gray-800 border border-gray-700 group-hover:border-gray-500 transition-all duration-300 relative overflow-hidden">
                  <div className="relative z-10">{social.icon}</div>
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 opacity-80"></div>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-05 transition-opacity duration-300"></div>
                </div>
                <div className="absolute -bottom-1 left-1/2 h-1 w-0 group-hover:w-10 group-hover:-left-3 bg-blue-400 transition-all duration-300"></div>
              </motion.a>
            ))}
          </div>

          <motion.div 
            className="relative mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 text-sm font-mono tracking-wider uppercase relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600 to-transparent opacity-30 h-px top-1/2"></span>
              <span className="relative px-4">Connect With Us</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-center"
          >
            <p className="text-gray-400 text-xs font-mono tracking-wider relative inline-block">
              <span className="absolute -left-3 top-0 text-gray-600">❯</span>
              FalconX © {new Date().getFullYear()} All Rights Reserved
              <motion.span 
                className="inline-block ml-1"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                █
              </motion.span>
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;