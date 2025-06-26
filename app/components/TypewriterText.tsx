'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'

export function TypewriterText() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showWebsite, setShowWebsite] = useState(false)
  const [showBlobZoom, setShowBlobZoom] = useState(false)
  const [showWorksModal, setShowWorksModal] = useState(false)
  const text = "hello, welcome to gaurav's website..."
  const nexusText = "trying to build cool, impactful shit"
  
  // Optimized scroll handler
  const handleScroll = useCallback(() => {
    // Don't handle scroll if modal is open
    if (showWorksModal) return
    
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrolled = window.scrollY
    const progress = Math.min(scrolled / (scrollHeight || 1), 1)
    
    // Only update if there's a significant change
    setScrollProgress(prev => Math.abs(prev - progress) > 0.01 ? progress : prev)
    
    // More stable thresholds for reverse scrolling
    if (progress < 0.55) {
      setShowWebsite(false)
      setShowBlobZoom(false)
    } else if (progress >= 0.6 && progress < 0.82) {
      setShowWebsite(true)
      setShowBlobZoom(false)
    } else if (progress >= 0.85) {
      setShowWebsite(false)
      setShowBlobZoom(true)
    }
  }, [showWorksModal])

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
    const visibleCharCount = Math.floor(scrollProgress * totalChars * 1.8)
    const displayText = text.slice(0, Math.min(visibleCharCount, totalChars))
    
    let nexusDisplayText = ''
    if (showBlobZoom) {
      const blobProgress = Math.max(0, (scrollProgress - 0.85) / 0.15)
      const nexusVisibleCount = Math.floor(blobProgress * nexusText.length * 2)
      nexusDisplayText = nexusText.slice(0, Math.min(nexusVisibleCount, nexusText.length))
    }
    
    return { displayText, nexusDisplayText }
  }, [scrollProgress, showBlobZoom, text, nexusText])

  // Function to handle home click and trigger shatter
  const handleHomeClick = () => {
    // Dispatch custom event for the orb to shatter
    window.dispatchEvent(new CustomEvent('orbShatter'))
  }

  // Function to handle contact click
  const handleContactClick = () => {
    window.location.href = 'mailto:gauravsthapa2003@gmail.com'
  }

  // Function to handle thoughts click
  const handleThoughtsClick = () => {
    window.open('https://substack.com/@gauravioli', '_blank')
  }

  // Function to handle works click
  const handleWorksClick = () => {
    setShowWorksModal(true)
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden'
  }

  // Function to close works modal
  const closeWorksModal = () => {
    setShowWorksModal(false)
    // Re-enable body scrolling
    document.body.style.overflow = 'unset'
  }

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
            <span 
              className="nav-item-glassy transition-all duration-500 hover:scale-110 cursor-pointer"
              onClick={handleHomeClick}
            >
              home
            </span>
            <span 
              className="nav-item-glassy transition-all duration-500 hover:scale-110 cursor-pointer"
              onClick={handleContactClick}
            >
              contact
            </span>
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
              className={`text-2xl font-garamond tracking-tighter transform scale-y-150 transition-all duration-1000 ease-out cursor-pointer group ${
                showWebsite ? 'delay-300 opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}
              onClick={handleWorksClick}
              style={{
                textShadow: '0 0 15px rgba(255, 255, 255, 0.15), 1px 1px 6px rgba(0, 0, 0, 0.7)',
                letterSpacing: '-0.03em',
                willChange: 'transform, opacity',
                filter: 'contrast(1.05) brightness(1.02) saturate(1.05)',
                color: 'rgba(250, 248, 246, 0.82)',
                fontWeight: '500',
                background: `
                  radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.12) 0%, transparent 1%),
                  radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.08) 0%, transparent 1%),
                  radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.06) 0%, transparent 1%)
                `,
                backgroundSize: '2px 2px, 3px 3px, 4px 4px',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text'
              }}
            >
              <span className="relative inline-block transition-all duration-500 group-hover:scale-110 group-hover:tracking-wide">
                [my works]
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-orange-400 via-pink-400 to-blue-400 transition-all duration-700 group-hover:w-full"></span>
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-400 rounded-full opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:animate-pulse"></span>
              </span>
            </h2>
          </div>
          <div className="text-right">
            <h2 
              className={`text-2xl font-garamond tracking-tighter transform scale-y-150 transition-all duration-1000 ease-out cursor-pointer group ${
                showWebsite ? 'delay-500 opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
              }`}
              onClick={handleThoughtsClick}
              style={{
                textShadow: '0 0 15px rgba(255, 255, 255, 0.15), 1px 1px 6px rgba(0, 0, 0, 0.7)',
                letterSpacing: '-0.03em',
                willChange: 'transform, opacity',
                filter: 'contrast(1.05) brightness(1.02) saturate(1.05)',
                color: 'rgba(250, 248, 246, 0.82)',
                fontWeight: '500',
                background: `
                  radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.12) 0%, transparent 1%),
                  radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.08) 0%, transparent 1%),
                  radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.06) 0%, transparent 1%)
                `,
                backgroundSize: '2px 2px, 3px 3px, 4px 4px',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text'
              }}
            >
              <span className="relative inline-block transition-all duration-500 group-hover:scale-110 group-hover:tracking-wide">
                [my thoughts]
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-purple-400 via-pink-400 to-teal-400 transition-all duration-700 group-hover:w-full"></span>
                <span className="absolute -top-1 -left-1 w-2 h-2 bg-purple-400 rounded-full opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:animate-pulse"></span>
              </span>
            </h2>
          </div>
        </div>

        {/* Creative Works Modal */}
        {showWorksModal && (
          <div 
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(20px)',
              animation: 'fadeIn 0.4s ease-out',
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                closeWorksModal()
              }
            }}
          >
            <div 
              className="relative w-full max-w-4xl mx-2 md:mx-4 my-4 md:my-8 h-[90vh] md:h-[85vh] flex flex-col"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(40px) saturate(150%)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: window.innerWidth <= 768 ? '16px' : '24px',
                boxShadow: `
                  0 25px 80px rgba(0, 0, 0, 0.5),
                  inset 0 1px 0 rgba(255, 255, 255, 0.2),
                  0 0 80px rgba(255, 215, 0, 0.1)
                `,
                animation: 'modalSlideIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              {/* Close button - with higher z-index and better positioning */}
              <button
                onClick={closeWorksModal}
                className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110 hover:bg-red-500/20 z-[10000]"
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: '2px solid rgba(255, 255, 255, 0.4)',
                  color: 'rgba(255, 255, 255, 0.95)',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
                type="button"
              >
                ×
              </button>

              {/* Header - Fixed */}
              <div className="flex-shrink-0 text-center pt-6 md:pt-8 pb-3 md:pb-4 px-4 md:px-6">
                <h1 
                  className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-3 md:mb-4"
                  style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
                    letterSpacing: '-0.03em',
                    textShadow: '0 0 30px rgba(255, 215, 0, 0.3)',
                  }}
                >
                  my works
                </h1>
                <div className="w-20 md:w-24 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent mx-auto"></div>
              </div>

              {/* Scrollable Content Container */}
              <div 
                className="flex-1 overflow-y-scroll px-4 md:px-6 pb-4 md:pb-6"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'rgba(255, 255, 255, 0.4) rgba(255, 255, 255, 0.1)',
                  overscrollBehavior: 'contain',
                }}
              >
                {/* Content */}
                <div className="space-y-8">
                  <div 
                    className="prose prose-invert max-w-none text-gray-300 leading-relaxed"
                    style={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
                      fontSize: window.innerWidth <= 768 ? '0.95rem' : '1.05rem',
                      lineHeight: '1.7',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    <p className="text-lg md:text-xl text-gray-200 mb-6 md:mb-8 font-light" style={{ letterSpacing: '-0.02em' }}>
                      Hi I'm Gaurav, I'm 21, based in Sydney and obsessed with building.
                    </p>

                    <p className="mb-6" style={{ letterSpacing: '-0.01em' }}>
                      In high school I built viral theme pages on Instagram. When a Netflix show came out, I'd create an account, grow it to 100k+ followers, sell it, fund my LED gaming keyboard and do it all over again while all my classmates were working regular jobs. I became obsessed with building and growth hacking my way into people's faces.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 md:gap-8 my-8 md:my-12">
                      <div 
                        className="p-6 rounded-2xl"
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                        }}
                      >
                        <h3 className="text-2xl font-medium text-white mb-4" style={{ letterSpacing: '-0.02em' }}>Musoka</h3>
                        <p className="mb-4" style={{ letterSpacing: '-0.01em' }}>
                          I built <a 
                            href="https://www.musokafit.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-orange-400 hover:text-orange-300 transition-colors underline decoration-orange-400/30 hover:decoration-orange-300"
                          >
                            Musoka
                          </a> because I was sick of fitness brands with zero substance. Started as a side hustle selling gym shirts, now it's hit 6 figures in revenue, has 200k+ followers, and sponsors UFC fighters. Turns out people actually want authenticity over flashy marketing bullshit.
                        </p>
                      </div>

                      <div 
                        className="p-6 rounded-2xl"
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                        }}
                      >
                        <h3 className="text-2xl font-medium text-white mb-4" style={{ letterSpacing: '-0.02em' }}>Bright Start</h3>
                        <p className="mb-4" style={{ letterSpacing: '-0.01em' }}>
                          Then I taught myself to code and built <a 
                            href="https://www.brightstart.app" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 transition-colors underline decoration-blue-400/30 hover:decoration-blue-300"
                          >
                            Bright Start
                          </a> because I was tired of waking up and immediately scrolling TikTok. It locks your phone apps until you scan real sunlight. Sounds simple, but thousands of people now use it daily to actually reclaim their mornings.
                        </p>
                      </div>
                    </div>

                    <p className="mb-6" style={{ letterSpacing: '-0.01em' }}>
                      Behind these projects are a cemetery of dead ideas and failed experiments. I'm no stranger to failure, but I keep going because I know I can make whatever's in front of me work.
                    </p>

                    <p className="mb-6" style={{ letterSpacing: '-0.01em' }}>
                      Before all this, I came 8th in NSW for Legal Studies and got the Sydney Scholars Award at University of Sydney. I dropped out of law to build the Cursor for Marketing.
                    </p>

                    <div 
                      className="p-8 rounded-2xl mb-8"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(255, 107, 53, 0.15))',
                        border: '2px solid rgba(255, 215, 0, 0.4)',
                      }}
                    >
                      <p className="text-xl text-yellow-100 font-medium mb-4" style={{ letterSpacing: '-0.02em' }}>
                        We're in stealth building Australia's next unicorn.
                      </p>
                                             <p className="text-lg text-yellow-200 mb-4" style={{ letterSpacing: '-0.01em' }}>
                         Think about it: right now, marketers spend 80% of their time on shit that could be automated. Writing copy, analyzing data, running A/B tests, managing campaigns. In 5 years, you'll just tell an AI what you want to achieve and it'll handle everything. The future of marketing isn't about humans doing tasks better, it's about humans having superhuman creative partners.
                       </p>
                      <p className="text-lg text-yellow-100 font-medium" style={{ letterSpacing: '-0.01em' }}>
                        We want to lead that charge and be at the forefront. We're hiring exceptional talent to make this vision reality.
                      </p>
                    </div>

                    {/* Extra space for better scrolling */}
                    <div className="h-12"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    )
  }

  // Initial typewriter effect
  return (
    <div className="fixed inset-0 flex items-center justify-center z-30 pointer-events-none">
      <div className="text-center">
        <h1 
          className="text-2xl md:text-4xl lg:text-5xl font-garamond text-white transform scale-y-150"
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