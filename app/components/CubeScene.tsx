'use client'

import { useState, useEffect } from 'react'
import { Video3D } from './Video3D'
import { Cube3D } from './Cube3D'

export function CubeScene() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showBlobZoom, setShowBlobZoom] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = window.scrollY
      const progress = Math.min(scrolled / (scrollHeight || 1), 1)
      setScrollProgress(progress)
      setShowBlobZoom(progress >= 0.85)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Calculate blob zoom scale and position
  const getBlobTransform = () => {
    if (!showBlobZoom) return { scale: 1, x: 0, y: 0, opacity: 1 }
    
    const zoomProgress = Math.max(0, (scrollProgress - 0.85) / 0.15) // 0 to 1 from 85% to 100%
    const scale = 1 + (zoomProgress * 4) // Scale from 1 to 5
    const x = -zoomProgress * 200 // Move towards center
    const y = -zoomProgress * 100 // Move towards center
    const opacity = 1 + (zoomProgress * 0.5) // Slightly brighter
    
    return { scale, x, y, opacity }
  }

  const blobTransform = getBlobTransform()

  return (
    <div className="fixed inset-0 perspective-1000 overflow-hidden">
      {/* Psychedelic background effects during zoom */}
      {showBlobZoom && (
        <>
          {/* Rotating color rings */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                conic-gradient(from 0deg, 
                  transparent 0deg,
                  rgba(255, 0, 128, 0.3) 60deg,
                  rgba(255, 215, 0, 0.4) 120deg,
                  rgba(0, 255, 128, 0.3) 180deg,
                  rgba(128, 0, 255, 0.4) 240deg,
                  rgba(0, 128, 255, 0.3) 300deg,
                  transparent 360deg
                )
              `,
              animation: 'rotateColorRing 8s linear infinite',
              transform: `scale(${blobTransform.scale * 2})`,
              opacity: blobTransform.scale > 2 ? 0.6 : 0,
              transition: 'opacity 0.5s ease-out',
            }}
          />
          
          {/* Pulsing radial burst */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(circle, 
                  transparent 20%, 
                  rgba(255, 215, 0, 0.2) 40%,
                  rgba(255, 0, 128, 0.15) 60%,
                  rgba(128, 0, 255, 0.1) 80%,
                  transparent 100%
                )
              `,
              animation: 'psychedelicPulse 2s ease-in-out infinite alternate',
              transform: `scale(${blobTransform.scale})`,
              opacity: blobTransform.scale > 1.5 ? 0.8 : 0,
              transition: 'opacity 0.3s ease-out',
            }}
          />
        </>
      )}

      {/* Main blob video with zoom effect */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transform: `translate3d(${blobTransform.x}px, ${blobTransform.y}px, 0) scale(${blobTransform.scale})`,
          opacity: blobTransform.opacity,
          transition: showBlobZoom ? 'transform 0.3s ease-out, opacity 0.3s ease-out' : 'transform 0.5s ease-out, opacity 0.5s ease-out',
          willChange: 'transform, opacity',
        }}
      >
        <Video3D
          position={{ x: 0, y: 0, z: 0 }}
          rotation={{ x: 10, y: 10, z: 0 }}
          size={showBlobZoom ? 400 : 200}
          animationDelay={0}
        />
      </div>

      {/* Background cubes - hide during blob zoom */}
      <div 
        className={`transition-opacity duration-1000 ${showBlobZoom ? 'opacity-0' : 'opacity-100'}`}
        style={{ willChange: 'opacity' }}
      >
        {/* Floating cubes positioned around the scene */}
        <Cube3D
          position={{ x: -300, y: -200, z: -100 }}
          rotation={{ x: 45, y: 45, z: 0 }}
          size={80}
          gradient="gradient-orange"
          animationDelay={0}
        />
        
        <Cube3D
          position={{ x: 400, y: -150, z: -150 }}
          rotation={{ x: 30, y: 60, z: 15 }}
          size={60}
          gradient="gradient-pink"
          animationDelay={1}
        />
        
        <Cube3D
          position={{ x: -200, y: 200, z: -200 }}
          rotation={{ x: 60, y: 30, z: 45 }}
          size={70}
          gradient="gradient-purple"
          animationDelay={2}
        />
        
        <Cube3D
          position={{ x: 350, y: 180, z: -120 }}
          rotation={{ x: 15, y: 75, z: 30 }}
          size={50}
          gradient="gradient-blue"
          animationDelay={3}
        />
        
        <Cube3D
          position={{ x: -400, y: 50, z: -250 }}
          rotation={{ x: 45, y: 0, z: 60 }}
          size={65}
          gradient="gradient-teal"
          animationDelay={4}
        />
        
        <Cube3D
          position={{ x: 150, y: -300, z: -180 }}
          rotation={{ x: 0, y: 45, z: 75 }}
          size={55}
          gradient="gradient-green"
          animationDelay={5}
        />
      </div>
    </div>
  )
} 