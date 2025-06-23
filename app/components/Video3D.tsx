'use client'

import { useRef, useEffect } from 'react'

interface Video3DProps {
  position: { x: number; y: number; z: number }
  rotation: { x: number; y: number; z: number }
  size?: number
  animationDelay?: number
}

export function Video3D({ position, rotation, size = 200, animationDelay = 0 }: Video3DProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay might be blocked, that's okay
      })
    }
  }, [])

  const containerStyle = {
    transform: `translate3d(${position.x}px, ${position.y}px, ${position.z}px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`,
    animationDelay: `${animationDelay}s`,
    willChange: 'transform',
  }

  return (
    <div className="cube-container absolute" style={containerStyle}>
      <div 
        className="relative led-border-animation overflow-hidden shadow-2xl blob-hover-effect group cursor-pointer"
        style={{ 
          width: `${size}px`, 
          height: `${size}px`,
          borderRadius: `${size * 0.15}px`,
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
          backdropFilter: 'blur(8px)',
        }}
      >
        {/* LED Iridescent Hover Effect - Behind video */}
        <div 
          className="absolute inset-0 z-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            borderRadius: `${size * 0.15}px`,
            background: `
              conic-gradient(from 0deg,
                transparent 0deg,
                rgba(255, 0, 128, 0.4) 30deg,
                rgba(255, 215, 0, 0.6) 60deg,
                rgba(0, 255, 128, 0.4) 90deg,
                rgba(0, 128, 255, 0.5) 120deg,
                rgba(128, 0, 255, 0.4) 150deg,
                rgba(255, 107, 53, 0.5) 180deg,
                rgba(255, 0, 128, 0.4) 210deg,
                rgba(255, 215, 0, 0.6) 240deg,
                rgba(0, 255, 128, 0.4) 270deg,
                rgba(0, 128, 255, 0.5) 300deg,
                rgba(128, 0, 255, 0.4) 330deg,
                transparent 360deg
              )
            `,
            animation: 'ledIridescence 3s linear infinite',
            mixBlendMode: 'screen',
            filter: 'blur(2px) brightness(1.3)',
          }}
        />

        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover relative z-10 pointer-events-none"
          style={{
            filter: 'brightness(1.1) contrast(1.1) saturate(1.2)',
            borderRadius: `${size * 0.15}px`,
            willChange: 'transform',
          }}
        >
          <source src="/assets/blob.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Pulsing LED Ring - Over video */}
        <div 
          className="absolute inset-[-4px] z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            borderRadius: `${size * 0.15 + 4}px`,
            background: `
              conic-gradient(from 90deg,
                rgba(255, 215, 0, 0.8) 0deg,
                rgba(255, 0, 128, 0.7) 60deg,
                rgba(0, 255, 128, 0.8) 120deg,
                rgba(0, 128, 255, 0.7) 180deg,
                rgba(128, 0, 255, 0.8) 240deg,
                rgba(255, 107, 53, 0.7) 300deg,
                rgba(255, 215, 0, 0.8) 360deg
              )
            `,
            animation: 'ledRingPulse 2s ease-in-out infinite',
            filter: 'blur(2px)',
            maskImage: `radial-gradient(ellipse at center, transparent 85%, black 95%)`,
            WebkitMaskImage: `radial-gradient(ellipse at center, transparent 85%, black 95%)`,
          }}
        />
        
        {/* Simplified film grain overlay */}
        <div 
          className="absolute inset-0 z-15 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.08) 0%, transparent 1%)`,
            backgroundSize: '30px 30px',
            animation: 'grainShift 6s linear infinite',
            mixBlendMode: 'overlay',
            opacity: 0.15,
            borderRadius: `${size * 0.15}px`,
          }}
        />
        
        {/* Minimal overlay for depth */}
        <div 
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.01) 0%, rgba(236, 72, 153, 0.01) 50%, rgba(59, 130, 246, 0.01) 100%)',
            mixBlendMode: 'overlay',
            borderRadius: `${size * 0.15}px`,
          }}
        />
      </div>
    </div>
  )
} 