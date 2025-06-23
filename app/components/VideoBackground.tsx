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
        className="w-full h-full object-cover"
        style={{
          filter: 'blur(8px) brightness(0.6) contrast(1.1) saturate(0.9)',
          transform: 'scale(1.1)', // Slight scale to hide blur edges
          willChange: 'transform',
        }}
      >
        <source src="/assets/website-background.mp4" type="video/mp4" />
      </video>
      
      {/* Optimized Film grain texture overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.2) 0%, transparent 1.5%),
            radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.15) 0%, transparent 1.2%),
            radial-gradient(circle at 50% 80%, rgba(255, 255, 255, 0.18) 0%, transparent 1.3%),
            radial-gradient(circle at 20% 60%, rgba(255, 255, 255, 0.14) 0%, transparent 1%),
            radial-gradient(circle at 90% 40%, rgba(255, 255, 255, 0.16) 0%, transparent 1.4%)
          `,
          backgroundSize: '25px 25px, 35px 35px, 20px 20px, 30px 30px, 18px 18px',
          animation: 'grainShift 4s linear infinite',
          mixBlendMode: 'screen',
          opacity: 0.5,
          willChange: 'transform',
        }}
      />
      
      {/* Simplified additional grain layer */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 45% 15%, rgba(255, 255, 255, 0.1) 0%, transparent 0.8%),
            radial-gradient(circle at 85% 65%, rgba(255, 255, 255, 0.12) 0%, transparent 1%),
            radial-gradient(circle at 15% 85%, rgba(255, 255, 255, 0.09) 0%, transparent 0.7%)
          `,
          backgroundSize: '15px 15px, 18px 18px, 12px 12px',
          animation: 'grainShift 3s linear infinite reverse',
          mixBlendMode: 'screen',
          opacity: 0.3,
          willChange: 'transform',
        }}
      />
      
      {/* Dark overlay for better text readability */}
      <div 
        className="absolute inset-0 bg-black/40"
        style={{ backdropFilter: 'blur(2px)' }}
      />
    </div>
  )
} 