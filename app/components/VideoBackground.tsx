'use client'

import { useRef, useEffect } from 'react'

export function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay might be blocked, that's okay
      })
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
        style={{
          filter: 'blur(8px) brightness(0.6) contrast(1.1) saturate(0.9)',
          transform: 'scale(1.1)',
          willChange: 'transform',
        }}
      >
        <source src="/assets/website-background.mp4" type="video/mp4" />
      </video>
      
      {/* Simplified film grain texture overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.15) 0%, transparent 1%),
            radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.12) 0%, transparent 1%)
          `,
          backgroundSize: '30px 30px, 40px 40px',
          animation: 'grainShift 6s linear infinite',
          mixBlendMode: 'screen',
          opacity: 0.3,
          willChange: 'transform',
        }}
      />
      
      {/* Dark overlay for better text readability */}
      <div 
        className="absolute inset-0 bg-black/40"
        style={{ backdropFilter: 'blur(1px)' }}
      />
    </div>
  )
} 