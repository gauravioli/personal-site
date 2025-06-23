'use client'

import { motion } from 'framer-motion'

export function HeroSection() {
  return (
    <section className="section-container py-16 scroll-snap-start">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <motion.h1
              className="text-5xl md:text-6xl font-light tracking-tight text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Gaurav Thapa
            </motion.h1>
            
            <motion.p
              className="text-xl text-gray-300 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Developer, creator, and digital craftsman building thoughtful experiences
            </motion.p>
          </div>

          <motion.div
            className="pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <div className="flex gap-4 text-sm">
              <a 
                href="#work" 
                className="glass px-6 py-3 rounded-lg text-gray-200 hover-lift hover:text-white transition-all duration-300"
              >
                View Work
              </a>
              <a 
                href="#writing" 
                className="glass-subtle px-6 py-3 rounded-lg text-gray-300 hover-lift hover:text-gray-200 transition-all duration-300"
              >
                Read Writing
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 