'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'

export function TypewriterText() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showWebsite, setShowWebsite] = useState(false)
  const [showBlobZoom, setShowBlobZoom] = useState(false)
  const text = "hello, welcome to gaurav's website..."
  const nexusText = "trying to build cool and useful stuff"
  
  // Optimized scroll handler
  const handleScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrolled = window.scrollY
    const progress = Math.min(scrolled / (scrollHeight || 1), 1)
    
    // Only update if there's a significant change
    setScrollProgress(prev => Math.abs(prev - progress) > 0.01 ? progress : prev)
    setShowWebsite(progress >= 0.6)
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

  // Memoize character calculations
  const displayTexts = useMemo(() => {
    const totalChars = text.length
    const visibleCharCount = Math.floor(scrollProgress * totalChars * 1.5)
    const displayText = text.slice(0, Math.min(visibleCharCount, totalChars))
    
    let nexusDisplayText = ''
    if (showBlobZoom) {
      const blobProgress = Math.max(0, (scrollProgress - 0.85) / 0.15)
      const nexusVisibleCount = Math.floor(blobProgress * nexusText.length * 2)
      nexusDisplayText = nexusText.slice(0, Math.min(nexusVisibleCount, nexusText.length))
    }
    
    return { displayText, nexusDisplayText }
  }, [scrollProgress, showBlobZoom, text, nexusText])

  // Psychedelic blob zoom phase
  if (showBlobZoom) {
    return (
      <>
        {/* Simplified lighting effects */}
        <div className="fixed inset-0 z-30 pointer-events-none">
          <div 
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(circle at 20% 30%, rgba(255, 0, 128, 0.2) 0%, transparent 40%),
                radial-gradient(circle at 80% 70%, rgba(0, 255, 128, 0.15) 0%, transparent 35%),
                radial-gradient(circle at 50% 10%, rgba(255, 215, 0, 0.2) 0%, transparent 45%)
              `,
              animation: 'psychedelicLights 4s ease-in-out infinite',
              mixBlendMode: 'screen',
              opacity: showBlobZoom ? 0.6 : 0,
              transition: 'opacity 1s ease-out',
            }}
          />
        </div>

        {/* Nexus typewriter text */}
        <div 
          className={`fixed inset-0 flex items-center justify-center z-40 pointer-events-none transition-all duration-1000 ${
            displayTexts.nexusDisplayText.length > 0 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="text-center">
            <div
              className="px-8 py-6 rounded-3xl"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(25px) saturate(150%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: `
                  0 12px 40px rgba(0, 0, 0, 0.4),
                  inset 0 1px 0 rgba(255, 255, 255, 0.2),
                  0 0 30px rgba(255, 215, 0, 0.3)
                `,
              }}
            >
              <p 
                className="text-3xl md:text-4xl font-light text-white transform scale-y-150"
                style={{
                  textShadow: `
                    0 0 20px rgba(255, 215, 0, 0.4),
                    0 0 40px rgba(255, 0, 128, 0.3),
                    2px 2px 10px rgba(0, 0, 0, 0.6)
                  `,
                  letterSpacing: '-0.06em',
                  willChange: 'transform',
                  filter: 'contrast(1.1) brightness(1.05) saturate(1.2)',
                  color: 'rgba(255, 255, 255, 0.95)'
                }}
              >
                {displayTexts.nexusDisplayText}
                <span 
                  className={`inline-block w-0.5 h-10 bg-white ml-1 ${
                    displayTexts.nexusDisplayText.length === nexusText.length ? 'animate-pulse' : ''
                  }`}
                  style={{
                    boxShadow: '0 0 15px rgba(255, 215, 0, 0.6)',
                    willChange: 'transform'
                  }}
                />
              </p>
            </div>
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
          <div className="flex space-x-8 text-lg font-garamond" style={{ letterSpacing: '-0.02em' }}>
            <span className="nav-item-glassy transition-all duration-500 hover:scale-110">home</span>
            <span className="nav-item-glassy transition-all duration-500 hover:scale-110">contact</span>
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
                textShadow: '0 0 20px rgba(255, 255, 255, 0.3), 2px 2px 8px rgba(0, 0, 0, 0.6)',
                letterSpacing: '-0.05em',
                willChange: 'transform, opacity',
                filter: 'contrast(1.1) brightness(1.1) saturate(1.2)',
                color: 'rgba(255, 255, 255, 0.9)'
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
                textShadow: '0 0 20px rgba(255, 255, 255, 0.3), 2px 2px 8px rgba(0, 0, 0, 0.6)',
                letterSpacing: '-0.05em',
                willChange: 'transform, opacity',
                filter: 'contrast(1.1) brightness(1.1) saturate(1.2)',
                color: 'rgba(255, 255, 255, 0.9)'
              }}
            >
              [thoughts & writings]
            </h2>
          </div>
        </div>
      </>
    )
  }

  // Initial typewriter effect
  return (
    <div className="fixed inset-0 flex items-center justify-center z-30 pointer-events-none">
      <div className="text-center">
        <h1 
          className="text-2xl md:text-4xl lg:text-5xl font-light text-white transform scale-y-150"
          style={{
            textShadow: '0 0 30px rgba(0, 0, 0, 0.6), 2px 2px 15px rgba(0, 0, 0, 0.8)',
            letterSpacing: '-0.08em',
            willChange: 'transform',
            filter: 'contrast(1.15) brightness(1.1) saturate(1.2)'
          }}
        >
          {displayTexts.displayText}
          <span 
            className="inline-block w-0.5 h-12 bg-white ml-2 animate-pulse"
            style={{
              boxShadow: '0 0 20px rgba(255, 255, 255, 0.6)',
              willChange: 'transform'
            }}
          />
        </h1>
      </div>
    </div>
  )
} 