import React from 'react';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = ({ lang }) => {
  return (
    <footer className="relative z-20 py-8 px-6 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-200 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">
          © {new Date().getFullYear()} Thirunallur Jallikattu. All rights reserved.
        </p>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300 text-sm font-medium"
        >
          <span>Created by</span>
          <a 
            href="https://darwingowtham.me/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-full hover:border-thiru-red/50 hover:text-thiru-red transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <span className="font-bold">Darwin Gowtham</span>
            <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </a>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
