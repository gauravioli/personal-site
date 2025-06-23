'use client'

import { useEffect, useState, useCallback } from 'react'

export function TypewriterText() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showWebsite, setShowWebsite] = useState(false)
  const [showBlobZoom, setShowBlobZoom] = useState(false)
  const text = "hello, welcome to gaurav's website..."
  const nexusText = "building at the nexus of taste and value"
  
  // Throttle scroll handler for better performance
  const throttleScroll = useCallback(() => {
    let ticking = false
    
    const updateScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = window.scrollY
      const progress = Math.min(scrolled / (scrollHeight || 1), 1)
      setScrollProgress(progress)
      
      // Show website content when scroll is at 60%
      setShowWebsite(progress >= 0.6)
      // Show blob zoom when scroll is at 85%
      setShowBlobZoom(progress >= 0.85)
      ticking = false
    }

    return () => {
      if (!ticking) {
        requestAnimationFrame(updateScroll)
        ticking = true
      }
    }
  }, [])

  useEffect(() => {
    const handleScroll = throttleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [throttleScroll])

  // Faster character reveal calculation
  const getVisibleCharacters = () => {
    const totalChars = text.length
    const visibleCharCount = Math.floor(scrollProgress * totalChars * 1.5)
    return Math.min(visibleCharCount, totalChars)
  }

  // Calculate nexus text reveal
  const getNexusVisibleCharacters = () => {
    if (!showBlobZoom) return 0
    // Start revealing text when blob zoom is active
    const blobProgress = Math.max(0, (scrollProgress - 0.85) / 0.15) // Progress from 85% to 100%
    const totalChars = nexusText.length
    const visibleCharCount = Math.floor(blobProgress * totalChars * 2)
    return Math.min(visibleCharCount, totalChars)
  }

  const visibleCharCount = getVisibleCharacters()
  const displayText = text.slice(0, visibleCharCount)
  const nexusVisibleCount = getNexusVisibleCharacters()
  const nexusDisplayText = nexusText.slice(0, nexusVisibleCount)

  // Psychedelic blob zoom phase
  if (showBlobZoom) {
    return (
      <>
        {/* Iridescent lighting effects */}
        <div className="fixed inset-0 z-30 pointer-events-none">
          <div 
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(circle at 20% 30%, rgba(255, 0, 128, 0.4) 0%, transparent 40%),
                radial-gradient(circle at 80% 70%, rgba(0, 255, 128, 0.3) 0%, transparent 35%),
                radial-gradient(circle at 50% 10%, rgba(255, 215, 0, 0.35) 0%, transparent 45%),
                radial-gradient(circle at 10% 80%, rgba(128, 0, 255, 0.3) 0%, transparent 30%),
                radial-gradient(circle at 90% 20%, rgba(0, 128, 255, 0.25) 0%, transparent 40%),
                radial-gradient(circle at 30% 90%, rgba(255, 107, 53, 0.3) 0%, transparent 35%)
              `,
              animation: 'psychedelicLights 3s ease-in-out infinite',
              mixBlendMode: 'screen',
              opacity: showBlobZoom ? 0.8 : 0,
              transition: 'opacity 1s ease-out',
            }}
          />
        </div>

        {/* Nexus typewriter text */}
        <div 
          className={`fixed inset-0 flex items-center justify-center z-40 pointer-events-none transition-all duration-1000 ${
            nexusVisibleCount > 0 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="text-center">
            <p 
              className="text-3xl md:text-4xl font-light text-white transform scale-y-150"
              style={{
                textShadow: `
                  0 0 30px rgba(255, 215, 0, 0.6),
                  0 0 60px rgba(255, 0, 128, 0.4),
                  0 0 90px rgba(128, 0, 255, 0.3),
                  2px 2px 10px rgba(0, 0, 0, 0.6)
                `,
                letterSpacing: '-0.06em',
                willChange: 'transform',
                filter: `
                  contrast(1.2) 
                  brightness(1.1) 
                  saturate(1.3)
                  drop-shadow(0 0 20px rgba(255, 215, 0, 0.4))
                `
              }}
            >
              {nexusDisplayText}
              <span 
                className={`inline-block w-0.5 h-10 bg-white ml-1 ${
                  nexusVisibleCount === nexusText.length ? 'animate-pulse' : ''
                }`}
                style={{
                  boxShadow: `
                    0 0 20px rgba(255, 215, 0, 0.8),
                    0 0 40px rgba(255, 0, 128, 0.6)
                  `,
                  willChange: 'transform'
                }}
              />
            </p>
          </div>
        </div>
      </>
    )
  }

  if (showWebsite) {
    return (
      <>
        {/* Header Navigation */}
        <nav 
          className={`fixed top-8 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-1000 ease-out ${
            showWebsite ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8 pointer-events-none'
          }`}
        >
          <div className="flex space-x-8 text-white text-lg font-garamond" style={{ letterSpacing: '-0.02em' }}>
            <span className="nav-item-custom transition-all duration-500 hover:scale-110">home</span>
            <span className="nav-item-custom transition-all duration-500 hover:scale-110">works</span>
            <span className="nav-item-custom transition-all duration-500 hover:scale-110">about</span>
            <span className="nav-item-custom transition-all duration-500 hover:scale-110">contact</span>
          </div>
        </nav>

        {/* Main Website Content */}
        <div 
          className={`fixed inset-0 flex items-center justify-between px-20 z-40 transition-all duration-1000 ease-out ${
            showWebsite ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
        >
          <div className="text-left">
            <h2 
              className={`text-2xl font-light tracking-tighter transform scale-y-150 transition-all duration-1000 ease-out ${
                showWebsite ? 'delay-300 opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}
              style={{
                textShadow: `
                  0 0 35px rgba(0, 0, 0, 0.4),
                  0 0 70px rgba(0, 0, 0, 0.3),
                  2px 2px 12px rgba(0, 0, 0, 0.5)
                `,
                letterSpacing: '-0.05em',
                willChange: 'transform, opacity',
                filter: `
                  contrast(1.15) 
                  brightness(1.05) 
                  saturate(1.1)
                  drop-shadow(0 0 15px rgba(0, 0, 0, 0.3))
                `
              }}
            >
              [a collection of my works]
            </h2>
          </div>
          <div className="text-right">
            <h2 
              className={`text-2xl font-light tracking-tighter transform scale-y-150 transition-all duration-1000 ease-out ${
                showWebsite ? 'delay-500 opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
              }`}
              style={{
                textShadow: `
                  0 0 35px rgba(0, 0, 0, 0.4),
                  0 0 70px rgba(0, 0, 0, 0.3),
                  2px 2px 12px rgba(0, 0, 0, 0.5)
                `,
                letterSpacing: '-0.05em',
                willChange: 'transform, opacity',
                filter: `
                  contrast(1.15) 
                  brightness(1.05) 
                  saturate(1.1)
                  drop-shadow(0 0 15px rgba(0, 0, 0, 0.3))
                `
              }}
            >
              [gaurav thapa 2025]
            </h2>
          </div>
        </div>
      </>
    )
  }

  return (
    <div 
      className={`fixed inset-0 flex items-center justify-center z-30 pointer-events-none transition-all duration-600 ${
        showWebsite ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
      style={{ willChange: 'transform, opacity' }}
    >
      <div className="text-center">
        <p 
          className="text-2xl md:text-3xl font-light text-white"
          style={{
            textShadow: `
              0 0 25px rgba(0, 0, 0, 0.25),
              0 0 50px rgba(0, 0, 0, 0.15),
              2px 2px 8px rgba(0, 0, 0, 0.3)
            `,
            letterSpacing: '-0.08em',
            willChange: 'transform'
          }}
        >
          {displayText}
          <span 
            className={`inline-block w-0.5 h-8 bg-white ml-1 ${
              visibleCharCount === text.length ? 'animate-pulse' : ''
            }`}
            style={{
              boxShadow: `
                0 0 15px rgba(0, 0, 0, 0.25),
                0 0 30px rgba(0, 0, 0, 0.15),
                2px 2px 6px rgba(0, 0, 0, 0.3)
              `,
              willChange: 'transform'
            }}
          />
        </p>
      </div>
    </div>
  )
} 