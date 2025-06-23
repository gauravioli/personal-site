'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { Video3D } from './Video3D'

export function CubeScene() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showBlobZoom, setShowBlobZoom] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrolled = window.scrollY
    const progress = Math.min(scrolled / (scrollHeight || 1), 1)
    
    // Only update if there's a significant change
    setScrollProgress(prev => Math.abs(prev - progress) > 0.03 ? progress : prev)
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

  // Optimized blob transform calculation - responsive for mobile
  const blobTransform = useMemo(() => {
    if (!showBlobZoom) return { scale: 1, x: 0, y: 0, opacity: 1 }
    
    const zoomProgress = Math.max(0, (scrollProgress - 0.85) / 0.15)
    // Smaller scale on mobile to keep blob within bounds
    const maxScale = isMobile ? 1.8 : 2.2
    const scale = 1 + (zoomProgress * (maxScale - 1))
    // Keep blob perfectly centered
    const x = 0
    const y = 0
    const opacity = Math.min(1 + (zoomProgress * 0.2), 1.2)
    
    return { scale, x, y, opacity }
  }, [scrollProgress, showBlobZoom, isMobile])

  const blobSize = isMobile ? 150 : 200
  const zoomedBlobSize = isMobile ? 220 : 300

  return (
    <div className="fixed inset-0 perspective-1000 overflow-hidden">
      {/* Optimized psychedelic background effects during zoom */}
      {showBlobZoom && (
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(circle, 
                transparent 35%, 
                rgba(255, 215, 0, 0.08) 55%,
                rgba(255, 0, 128, 0.06) 75%,
                transparent 95%
              )
            `,
            animation: 'psychedelicPulse 5s ease-in-out infinite alternate',
            opacity: blobTransform.scale > (isMobile ? 1.3 : 1.2) ? 0.4 : 0,
            transition: 'opacity 0.4s ease-out',
          }}
        />
      )}

      {/* Main blob video with optimized zoom effect */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transform: `translate3d(${blobTransform.x}px, ${blobTransform.y}px, 0) scale(${blobTransform.scale})`,
          opacity: blobTransform.opacity,
          transition: showBlobZoom ? 'none' : 'transform 0.6s ease-out, opacity 0.6s ease-out',
          willChange: showBlobZoom ? 'transform' : 'auto',
        }}
      >
        <Video3D
          position={{ x: 0, y: 0, z: 0 }}
          rotation={{ x: 10, y: 10, z: 0 }}
          size={showBlobZoom ? zoomedBlobSize : blobSize}
          animationDelay={0}
        />
      </div>
    </div>
  )
} 