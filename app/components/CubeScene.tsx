'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { Video3D } from './Video3D'

export function CubeScene() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showBlobZoom, setShowBlobZoom] = useState(false)

  const handleScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrolled = window.scrollY
    const progress = Math.min(scrolled / (scrollHeight || 1), 1)
    
    // Only update if there's a significant change
    setScrollProgress(prev => Math.abs(prev - progress) > 0.02 ? progress : prev)
    setShowBlobZoom(progress >= 0.85)
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
    // Reduced scale to keep blob within screen bounds (max 2.5x instead of 5x)
    const scale = 1 + (zoomProgress * 1.5)
    // Keep blob perfectly centered
    const x = 0
    const y = 0
    const opacity = Math.min(1 + (zoomProgress * 0.3), 1.3)
    
    return { scale, x, y, opacity }
  }, [scrollProgress, showBlobZoom])

  return (
    <div className="fixed inset-0 perspective-1000 overflow-hidden">
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
            opacity: blobTransform.scale > 1.3 ? 0.5 : 0,
            transition: 'opacity 0.3s ease-out',
          }}
        />
      )}

      {/* Main blob video with optimized zoom effect */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transform: `translate3d(${blobTransform.x}px, ${blobTransform.y}px, 0) scale(${blobTransform.scale})`,
          opacity: blobTransform.opacity,
          transition: showBlobZoom ? 'none' : 'transform 0.5s ease-out, opacity 0.5s ease-out',
          willChange: showBlobZoom ? 'transform' : 'auto',
        }}
      >
        <Video3D
          position={{ x: 0, y: 0, z: 0 }}
          rotation={{ x: 10, y: 10, z: 0 }}
          size={showBlobZoom ? 320 : 200}
          animationDelay={0}
        />
      </div>
    </div>
  )
} 