'use client'

import { useState, useEffect } from 'react'

export function TypewriterText() {
  const [mounted, setMounted] = useState(false)
  const [currentText, setCurrentText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const [isScrolledDown, setIsScrolledDown] = useState(false)
  
  const texts = [
    "hello, welcome",
    "trying to build cool and useful stuff"
  ]

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    const handleScroll = () => {
      const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
      setIsScrolledDown(scrollProgress > 0.3)
    }

    let timeoutId: NodeJS.Timeout
    const currentFullText = texts[currentIndex]
    
    if (currentText.length < currentFullText.length) {
      timeoutId = setTimeout(() => {
        setCurrentText(currentFullText.slice(0, currentText.length + 1))
      }, 100)
    } else {
      timeoutId = setTimeout(() => {
        if (currentIndex < texts.length - 1) {
          setCurrentIndex(currentIndex + 1)
          setCurrentText('')
        }
      }, 2000)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [currentText, currentIndex, mounted, texts])

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)
    
    return () => clearInterval(cursorInterval)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-10">
      <div className="text-center px-4 md:px-8 max-w-6xl mx-auto">
        <div 
          className={`text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-light tracking-tight mb-6 md:mb-8 transition-all duration-1000 ${
            isScrolledDown 
              ? 'opacity-0 transform translate-y-4' 
              : 'opacity-100 transform translate-y-0'
          }`}
          style={{
            fontFamily: "'EB Garamond', serif",
            lineHeight: '1.2',
          }}
        >
          <span className="text-white">{currentText}</span>
          <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>
            |
          </span>
        </div>
        
        {/* Glass background text that appears during trippy phase */}
        <div 
          className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${
            isScrolledDown 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-4'
          }`}
          style={{
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(20px) saturate(200%)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '24px',
            margin: '16px',
          }}
        >
          <div className="text-lg md:text-2xl lg:text-3xl font-light text-white/80">
            trying to build cool and useful stuff
          </div>
        </div>
      </div>
    </div>
  )
} 