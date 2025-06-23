'use client'

import { Suspense } from 'react'
import { CubeScene } from './components/CubeScene'
import { VideoBackground } from './components/VideoBackground'
import { CustomCursor } from './components/CustomCursor'
import { TypewriterText } from './components/TypewriterText'

// Loading component for better UX
function LoadingFallback() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      <div className="text-white text-lg animate-pulse">Loading...</div>
    </div>
  )
}

export default function Home() {
  return (
    <main className="min-h-[400vh] relative overflow-x-hidden"> {/* 4x taller for scrolling */}
      {/* Custom Cursor */}
      <Suspense fallback={null}>
        <CustomCursor />
      </Suspense>
      
      {/* Video Background */}
      <Suspense fallback={<LoadingFallback />}>
        <VideoBackground />
      </Suspense>
      
      {/* 3D Cube Scene - The Blob */}
      <Suspense fallback={null}>
        <CubeScene />
      </Suspense>
      
      {/* Typewriter Text */}
      <Suspense fallback={null}>
        <TypewriterText />
      </Suspense>
    </main>
  )
} 