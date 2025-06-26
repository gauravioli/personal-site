'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { Video3D } from './Video3D'

export function CubeScene() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showBlobZoom, setShowBlobZoom] = useState(false)
  const [isShattered, setIsShattered] = useState(false)
  const [showReformGlow, setShowReformGlow] = useState(false)

  const handleScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrolled = window.scrollY
    const progress = Math.min(scrolled / (scrollHeight || 1), 1)
    
    // Only update if there's a significant change
    setScrollProgress(prev => Math.abs(prev - progress) > 0.02 ? progress : prev)
    setShowBlobZoom(progress >= 0.85)
  }, [])

  // Listen for shatter events from TypewriterText component
  useEffect(() => {
    const handleShatter = () => {
      setIsShattered(true)
      // Start reform after 1.5 seconds
      setTimeout(() => {
        setIsShattered(false)
        setShowReformGlow(true)
        // Remove glow after 0.5 seconds
        setTimeout(() => {
          setShowReformGlow(false)
        }, 500)
      }, 1500)
    }

    // Listen for custom shatter event
    window.addEventListener('orbShatter', handleShatter)
    return () => window.removeEventListener('orbShatter', handleShatter)
  }, [])

  useEffect(() => {
    let ticking = false

    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })
    return () => window.removeEventListener('scroll', throttledScroll)
  }, [handleScroll])

  // Optimized blob transform calculation - keep blob centered and within bounds
  const blobTransform = useMemo(() => {
    if (!showBlobZoom) return { scale: 1, x: 0, y: 0, opacity: 1 }
    
    const zoomProgress = Math.max(0, (scrollProgress - 0.85) / 0.15)
    // Check if mobile device
    const isMobile = window.innerWidth <= 768
    // Reduced scale for mobile, normal for desktop
    const maxScale = isMobile ? 0.4 : 0.8
    const scale = 1 + (zoomProgress * maxScale)
    // Keep blob perfectly centered
    const x = 0
    const y = 0
    const opacity = Math.min(1 + (zoomProgress * 0.3), 1.3)
    
    return { scale, x, y, opacity }
  }, [scrollProgress, showBlobZoom])

  // Generate shard positions and animations
  const shards = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => {
      const angle = (i * 45) * (Math.PI / 180) // 45 degrees apart
      const distance = 300 + Math.random() * 200 // Random distance
      const rotationSpeed = 360 + Math.random() * 720 // Random rotation
      
      return {
        id: i,
        angle,
        distance,
        rotationSpeed,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        delay: i * 0.1, // Stagger the animations
        scale: 0.3 + Math.random() * 0.4, // Random scale between 0.3-0.7
      }
    })
  }, [])

  return (
    <div className="fixed inset-0 perspective-1000 overflow-hidden">
      {/* Background dimming during shatter */}
      {isShattered && (
        <div 
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: 'rgba(0, 0, 0, 0.4)',
            animation: 'fadeInOut 2s ease-in-out',
          }}
        />
      )}

      {/* Simplified psychedelic background effects during zoom */}
      {showBlobZoom && (
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(circle, 
                transparent 30%, 
                rgba(255, 215, 0, 0.12) 50%,
                rgba(255, 0, 128, 0.08) 70%,
                transparent 90%
              )
            `,
            animation: 'psychedelicPulse 4s ease-in-out infinite alternate',
            opacity: blobTransform.scale > 1.3 ? (window.innerWidth <= 768 ? 0.2 : 0.5) : 0,
            transition: 'opacity 0.3s ease-out',
          }}
        />
      )}

      {/* Shatter Animation Container */}
      {isShattered ? (
        <div className="absolute inset-0 flex items-center justify-center">
          {shards.map((shard) => (
            <div
              key={shard.id}
              className="absolute"
              style={{
                '--shard-x': `${shard.x}px`,
                '--shard-y': `${shard.y}px`,
                '--shard-rotation': `${shard.rotationSpeed}deg`,
                animation: `shardFloat 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
                animationDelay: `${shard.delay}s`,
                transform: 'translate3d(0, 0, 0)',
              } as React.CSSProperties}
            >
              <Video3D
                position={{ x: 0, y: 0, z: 0 }}
                rotation={{ x: 10, y: 10, z: 0 }}
                size={70}
                animationDelay={0}
              />
            </div>
          ))}
        </div>
      ) : (
        /* Main blob video with optimized zoom effect */
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `translate3d(${blobTransform.x}px, ${blobTransform.y}px, 0) scale(${blobTransform.scale})`,
            opacity: blobTransform.opacity,
            transition: showBlobZoom ? 'none' : 'transform 0.5s ease-out, opacity 0.5s ease-out',
            willChange: showBlobZoom ? 'transform' : 'auto',
            animation: showReformGlow ? 'reformGlow 0.5s ease-out' : 'none',
          }}
        >
          <Video3D
            position={{ x: 0, y: 0, z: 0 }}
            rotation={{ x: 10, y: 10, z: 0 }}
            size={showBlobZoom ? 320 : 200}
            animationDelay={0}
          />
        </div>
      )}
    </div>
  )
} 