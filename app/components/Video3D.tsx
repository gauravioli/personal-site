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
        className="relative led-border-animation overflow-hidden shadow-2xl"
        style={{ 
          width: `${size}px`, 
          height: `${size}px`,
          borderRadius: `${size * 0.15}px`, // More rounded corners
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
          backdropFilter: 'blur(15px)',
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover relative z-10"
          style={{
            filter: 'brightness(1.1) contrast(1.1) saturate(1.2)',
            borderRadius: `${size * 0.15}px`, // Match container border radius
            willChange: 'transform',
          }}
        >
          <source src="/assets/blob.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Optimized film grain overlay for the blob video */}
        <div 
          className="absolute inset-0 pointer-events-none z-15"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.15) 0%, transparent 1.2%),
              radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.12) 0%, transparent 1%),
              radial-gradient(circle at 40% 80%, rgba(255, 255, 255, 0.17) 0%, transparent 1.4%),
              radial-gradient(circle at 70% 20%, rgba(255, 255, 255, 0.13) 0%, transparent 1.1%)
            `,
            backgroundSize: '18px 18px, 22px 22px, 15px 15px, 25px 25px',
            animation: 'grainShift 3s linear infinite',
            mixBlendMode: 'overlay',
            opacity: 0.35,
            borderRadius: `${size * 0.15}px`,
            willChange: 'transform',
          }}
        />
        
        {/* Simplified fine grain layer */}
        <div 
          className="absolute inset-0 pointer-events-none z-16"
          style={{
            background: `
              radial-gradient(circle at 15% 25%, rgba(255, 255, 255, 0.1) 0%, transparent 0.7%),
              radial-gradient(circle at 85% 75%, rgba(255, 255, 255, 0.11) 0%, transparent 0.8%)
            `,
            backgroundSize: '10px 10px, 12px 12px',
            animation: 'grainShift 2s linear infinite reverse',
            mixBlendMode: 'screen',
            opacity: 0.25,
            borderRadius: `${size * 0.15}px`,
            willChange: 'transform',
          }}
        />
        
        {/* Subtle overlay for depth */}
        <div 
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.05) 0%, rgba(236, 72, 153, 0.05) 50%, rgba(59, 130, 246, 0.05) 100%)',
            mixBlendMode: 'overlay',
            borderRadius: `${size * 0.15}px`, // Match container border radius
          }}
        />
      </div>
    </div>
  )
} 