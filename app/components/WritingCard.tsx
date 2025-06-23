'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Calendar, Clock } from 'lucide-react'

interface WritingCardProps {
  title: string
  excerpt: string
  date: string
  readTime: string
  url?: string
  index: number
}

export function WritingCard({ title, excerpt, date, readTime, url, index }: WritingCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: "-30px" })

  return (
    <motion.article
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
      className="glass rounded-xl p-5 hover-lift group cursor-pointer border border-white/5"
    >
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar size={12} />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span>{readTime}</span>
          </div>
        </div>
        
        <h3 className="text-lg font-medium text-white group-hover:text-gray-100 transition-colors leading-snug">
          {title}
        </h3>
        
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
          {excerpt}
        </p>
        
        <div className="pt-2">
          <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
            Read more →
          </span>
        </div>
      </div>
    </motion.article>
  )
} 