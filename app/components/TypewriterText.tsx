'use client'

import { useEffect, useState, useCallback } from 'react'

export function TypewriterText() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showWebsite, setShowWebsite] = useState(false)
  const text = "hello, welcome to gaurav's website..."
  
  // Throttle scroll handler for better performance
  const throttleScroll = useCallback(() => {
    let ticking = false
    
    const updateScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = window.scrollY
      const progress = Math.min(scrolled / (scrollHeight || 1), 1)
      setScrollProgress(progress)
      
      // Show website content when scroll is at 60% (earlier trigger)
      setShowWebsite(progress >= 0.6)
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
    // Faster reveal - multiply by 1.5 instead of 2
    const visibleCharCount = Math.floor(scrollProgress * totalChars * 1.5)
    return Math.min(visibleCharCount, totalChars)
  }

  const visibleCharCount = getVisibleCharacters()
  const displayText = text.slice(0, visibleCharCount)

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
              className={`text-2xl font-light tracking-tighter transform scale-y-125 transition-all duration-1000 ease-out ${
                showWebsite ? 'delay-300 opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}
              style={{
                textShadow: `
                  0 0 25px rgba(0, 0, 0, 0.3),
                  0 0 50px rgba(0, 0, 0, 0.2),
                  2px 2px 8px rgba(0, 0, 0, 0.4)
                `,
                letterSpacing: '-0.05em',
                willChange: 'transform, opacity'
              }}
            >
              a collection of my works
            </h2>
          </div>
          <div className="text-right">
            <h2 
              className={`text-2xl font-light tracking-tighter transform scale-y-125 transition-all duration-1000 ease-out ${
                showWebsite ? 'delay-500 opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
              }`}
              style={{
                textShadow: `
                  0 0 25px rgba(0, 0, 0, 0.3),
                  0 0 50px rgba(0, 0, 0, 0.2),
                  2px 2px 8px rgba(0, 0, 0, 0.4)
                `,
                letterSpacing: '-0.05em',
                willChange: 'transform, opacity'
              }}
            >
              gaurav thapa 2025
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