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
      
      {/* Enhanced Film grain texture overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.25) 0%, transparent 2%),
            radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.2) 0%, transparent 2%),
            radial-gradient(circle at 50% 80%, rgba(255, 255, 255, 0.22) 0%, transparent 1.5%),
            radial-gradient(circle at 20% 60%, rgba(255, 255, 255, 0.18) 0%, transparent 1%),
            radial-gradient(circle at 90% 40%, rgba(255, 255, 255, 0.2) 0%, transparent 1.5%),
            radial-gradient(circle at 60% 30%, rgba(255, 255, 255, 0.16) 0%, transparent 1%),
            radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.15) 0%, transparent 1.2%),
            radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.19) 0%, transparent 1.8%),
            radial-gradient(circle at 10% 90%, rgba(255, 255, 255, 0.17) 0%, transparent 1.3%),
            radial-gradient(circle at 70% 60%, rgba(255, 255, 255, 0.14) 0%, transparent 1.1%)
          `,
          backgroundSize: '20px 20px, 30px 30px, 18px 18px, 25px 25px, 15px 15px, 35px 35px, 22px 22px, 28px 28px, 16px 16px, 32px 32px',
          animation: 'grainShift 3s linear infinite',
          mixBlendMode: 'screen',
          opacity: 0.6,
        }}
      />
      
      {/* Additional grain layer for more texture */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 45% 15%, rgba(255, 255, 255, 0.12) 0%, transparent 1%),
            radial-gradient(circle at 85% 65%, rgba(255, 255, 255, 0.14) 0%, transparent 1.2%),
            radial-gradient(circle at 15% 45%, rgba(255, 255, 255, 0.11) 0%, transparent 0.8%),
            radial-gradient(circle at 55% 85%, rgba(255, 255, 255, 0.13) 0%, transparent 1.1%),
            radial-gradient(circle at 95% 25%, rgba(255, 255, 255, 0.1) 0%, transparent 0.9%)
          `,
          backgroundSize: '12px 12px, 14px 14px, 10px 10px, 16px 16px, 11px 11px',
          animation: 'grainShift 2s linear infinite reverse',
          mixBlendMode: 'screen',
          opacity: 0.4,
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