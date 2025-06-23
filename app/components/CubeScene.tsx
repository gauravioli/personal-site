'use client'

import { Video3D } from './Video3D'

export function CubeScene() {
  return (
    <div className="fixed inset-0 flex items-center justify-center perspective-1000">
      <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
        {/* Just the blob video - much larger */}
        <Video3D
          position={{ x: 0, y: 0, z: 0 }}
          rotation={{ x: 5, y: 10, z: -3 }}
          size={450}
          animationDelay={0}
        />
      </div>
    </div>
  )
} 