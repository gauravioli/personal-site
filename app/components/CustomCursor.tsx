'use client'

import { useEffect, useState, useRef } from 'react'

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const animationRef = useRef<number>()

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener('mousemove', updateMousePosition)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  useEffect(() => {
    const animateCursor = () => {
      setCursorPosition(prev => {
        const lerp = (start: number, end: number, factor: number) => {
          return start + (end - start) * factor
        }

        // Much slower interpolation factor (0.02 instead of typical 0.1-0.15)
        const factor = 0.02
        
        return {
          x: lerp(prev.x, mousePosition.x, factor),
          y: lerp(prev.y, mousePosition.y, factor)
        }
      })

      animationRef.current = requestAnimationFrame(animateCursor)
    }

    animationRef.current = requestAnimationFrame(animateCursor)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mousePosition])

  return (
    <div
      className={`fixed pointer-events-none z-50 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        left: cursorPosition.x - 10,
        top: cursorPosition.y - 10,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className="custom-cursor-glow" />
    </div>
  )
} 