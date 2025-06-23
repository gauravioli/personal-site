'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink, Github } from 'lucide-react'

interface ProjectCardProps {
  title: string
  description: string
  tech: string[]
  liveUrl?: string
  githubUrl?: string
  index: number
}

export function ProjectCard({ title, description, tech, liveUrl, githubUrl, index }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: "-30px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0
      } : { 
        opacity: 0, 
        y: 20
      }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      className="glass rounded-xl p-6 hover-lift group border border-white/5"
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-medium text-white group-hover:text-gray-100 transition-colors">
            {title}
          </h3>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {githubUrl && (
              <a
                href={githubUrl}
                className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
              >
                <Github size={16} className="text-gray-400 hover:text-white" />
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
              >
                <ExternalLink size={16} className="text-gray-400 hover:text-white" />
              </a>
            )}
          </div>
        </div>
        
        <p className="text-gray-400 text-sm leading-relaxed">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-1.5">
          {tech.slice(0, 4).map((item) => (
            <span
              key={item}
              className="px-2 py-1 text-xs text-gray-300 bg-white/5 rounded border border-white/10"
            >
              {item}
            </span>
          ))}
          {tech.length > 4 && (
            <span className="px-2 py-1 text-xs text-gray-400">
              +{tech.length - 4} more
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
} 