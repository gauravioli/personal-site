'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: "-50px" })

  const skills = [
    'TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 'Go',
    'AWS', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis', 'GraphQL'
  ]

  return (
    <div ref={ref} className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="glass rounded-xl p-6 border border-white/5"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400/20 to-blue-400/20 rounded-lg flex items-center justify-center text-lg font-medium text-white">
              GT
            </div>
            <div>
              <h3 className="text-lg font-medium text-white">Gaurav Thapa</h3>
              <p className="text-sm text-gray-400">Developer & Creator</p>
            </div>
          </div>
          
          <p className="text-gray-300 text-sm leading-relaxed">
            Passionate about building digital experiences that bridge the gap between design and functionality. 
            I focus on creating products that are both beautiful and meaningful.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="glass rounded-xl p-6 border border-white/5"
      >
        <h4 className="text-lg font-medium mb-4 text-white">Technologies</h4>
        <div className="grid grid-cols-4 gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-2 py-1 text-xs text-gray-300 bg-white/5 rounded border border-white/10 text-center"
            >
              {skill}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="glass rounded-xl p-6 border border-white/5"
      >
        <h4 className="text-lg font-medium mb-3 text-white">Approach</h4>
        <p className="text-gray-300 text-sm leading-relaxed">
          I believe in clean code, thoughtful design, and building with purpose. 
          Every project is an opportunity to create something that genuinely improves people's lives.
        </p>
      </motion.div>
    </div>
  )
} 