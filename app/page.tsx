'use client'

import { CubeScene } from './components/CubeScene'
import { VideoBackground } from './components/VideoBackground'
import { CustomCursor } from './components/CustomCursor'
import { TypewriterText } from './components/TypewriterText'

export default function Home() {
  return (
    <main className="min-h-[400vh] relative overflow-x-hidden"> {/* 4x taller for scrolling */}
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Video Background */}
      <VideoBackground />
      
      {/* 3D Cube Scene - The Blob */}
      <CubeScene />
      
      {/* Typewriter Text */}
      <TypewriterText />
    </main>
  )
} 