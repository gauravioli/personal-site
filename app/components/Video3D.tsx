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
    <div 
      className="cube-container absolute group cursor-none"
      style={{
        ...containerStyle,
        zIndex: 20,
      }}
    >
      <div 
        className="relative led-border-animation overflow-hidden shadow-2xl blob-hover-effect"
        style={{ 
          width: `${size}px`, 
          height: `${size}px`,
          borderRadius: `${size * 0.15}px`,
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
          backdropFilter: 'blur(8px)',
        }}
      >
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
        
        {/* Minimal film grain overlay for performance */}
        <div 
          className="absolute inset-0 pointer-events-none z-15"
          style={{
            background: `
              radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 1%)
            `,
            backgroundSize: '25px 25px',
            animation: 'grainShift 6s linear infinite',
            mixBlendMode: 'overlay',
            opacity: 0.15,
            borderRadius: `${size * 0.15}px`,
            willChange: 'transform',
          }}
        />
        
        {/* LED Iridescent Hover Effect */}
        <div 
          className="absolute inset-0 pointer-events-none z-25 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out"
          style={{
            borderRadius: `${size * 0.15}px`,
            background: `
              conic-gradient(from 0deg,
                transparent 0deg,
                rgba(255, 0, 128, 0.8) 30deg,
                rgba(255, 215, 0, 1.0) 60deg,
                rgba(0, 255, 128, 0.8) 90deg,
                rgba(0, 128, 255, 0.9) 120deg,
                rgba(128, 0, 255, 0.8) 150deg,
                rgba(255, 107, 53, 0.9) 180deg,
                rgba(255, 0, 128, 0.8) 210deg,
                rgba(255, 215, 0, 1.0) 240deg,
                rgba(0, 255, 128, 0.8) 270deg,
                rgba(0, 128, 255, 0.9) 300deg,
                rgba(128, 0, 255, 0.8) 330deg,
                transparent 360deg
              )
            `,
            animation: 'ledIridescence 2.5s linear infinite',
            mixBlendMode: 'screen',
            filter: 'blur(1px) brightness(1.8)',
          }}
        />
        
        {/* Pulsing LED Ring */}
        <div 
          className="absolute inset-[-6px] pointer-events-none z-30 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out"
          style={{
            borderRadius: `${size * 0.15 + 6}px`,
            background: `
              conic-gradient(from 90deg,
                rgba(255, 215, 0, 1.0) 0deg,
                rgba(255, 0, 128, 0.9) 60deg,
                rgba(0, 255, 128, 1.0) 120deg,
                rgba(0, 128, 255, 0.9) 180deg,
                rgba(128, 0, 255, 1.0) 240deg,
                rgba(255, 107, 53, 0.9) 300deg,
                rgba(255, 215, 0, 1.0) 360deg
              )
            `,
            animation: 'ledRingPulse 1.8s ease-in-out infinite',
            filter: 'blur(2px)',
            maskImage: `radial-gradient(ellipse at center, transparent 82%, black 90%)`,
            WebkitMaskImage: `radial-gradient(ellipse at center, transparent 82%, black 90%)`,
          }}
        />
        
        {/* Sparkle Effect */}
        <div 
          className="absolute inset-0 pointer-events-none z-35 opacity-0 group-hover:opacity-100 transition-opacity duration-800"
          style={{
            borderRadius: `${size * 0.15}px`,
            background: `
              radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.8) 0%, transparent 3%),
              radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.6) 0%, transparent 2%),
              radial-gradient(circle at 60% 20%, rgba(255, 255, 255, 0.7) 0%, transparent 2.5%),
              radial-gradient(circle at 30% 80%, rgba(255, 255, 255, 0.5) 0%, transparent 2%)
            `,
            backgroundSize: '40px 40px, 30px 30px, 35px 35px, 25px 25px',
            animation: 'sparkle 3s ease-in-out infinite',
            mixBlendMode: 'screen',
          }}
        />
        
        {/* Minimal overlay for depth */}
        <div 
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.02) 0%, rgba(236, 72, 153, 0.02) 50%, rgba(59, 130, 246, 0.02) 100%)',
            mixBlendMode: 'overlay',
            borderRadius: `${size * 0.15}px`,
          }}
        />
      </div>
    </div>
  )
} 