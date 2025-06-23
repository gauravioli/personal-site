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
        }}
      >
        <source src="/assets/website-background.mp4" type="video/mp4" />
      </video>
      
      {/* Film grain texture overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.15) 0%, transparent 2%),
            radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.1) 0%, transparent 2%),
            radial-gradient(circle at 50% 80%, rgba(255, 255, 255, 0.12) 0%, transparent 1.5%),
            radial-gradient(circle at 20% 60%, rgba(255, 255, 255, 0.08) 0%, transparent 1%),
            radial-gradient(circle at 90% 40%, rgba(255, 255, 255, 0.1) 0%, transparent 1.5%),
            radial-gradient(circle at 60% 30%, rgba(255, 255, 255, 0.06) 0%, transparent 1%)
          `,
          backgroundSize: '30px 30px, 40px 40px, 25px 25px, 35px 35px, 20px 20px, 45px 45px',
          animation: 'grainShift 4s linear infinite',
          mixBlendMode: 'screen',
          opacity: 0.3,
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