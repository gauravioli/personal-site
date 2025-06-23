'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface ScrollSectionProps {
  title: string
  children: React.ReactNode
  id: string
}

export function ScrollSection({ title, children, id }: ScrollSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: false, margin: "-50px" })

  return (
    <section
      ref={ref}
      id={id}
      className="section-container py-12 scroll-snap-start"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="space-y-12"
      >
        <div className="space-y-3">
          <h2 className="text-3xl md:text-4xl font-light text-white tracking-tight">
            {title}
          </h2>
          <div className="w-12 h-px bg-gradient-to-r from-white/40 to-transparent" />
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </section>
  )
} 