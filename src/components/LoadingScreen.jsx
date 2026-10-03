import { useEffect, useState } from "react";

const loadingMessages = [
  "INITIALIZING PORTFOLIO",
  "LOADING DEVELOPER PROFILE",
  "CONNECTING PROJECTS",
  "OPTIMIZING EXPERIENCE",
  "PREPARING INTERFACE",
  "SYSTEM READY",
];

function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  /*
    ============================================
    SMOOTH EASE-OUT PROGRESSION
    ============================================
  */
  useEffect(() => {
    const duration = 2200;
    const startTime = performance.now();
    let animationFrame;

    const animateProgress = (currentTime) => {
      const elapsed = currentTime - startTime;
      const linearProgress = Math.min(elapsed / duration, 1);

      // Smooth cubic ease-out
      const easedProgress = 1 - Math.pow(1 - linearProgress, 3);
      const currentVal = Math.min(easedProgress * 100, 100);

      setProgress(currentVal);

      if (linearProgress < 1) {
        animationFrame = requestAnimationFrame(animateProgress);
      } else {
        // Hold on 100% briefly, then smoothly fade out
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 400);
        }, 260);
      }
    };

    animationFrame = requestAnimationFrame(animateProgress);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [onComplete]);

  /*
    ============================================
    UPDATE SYSTEM MESSAGE ACCORDING TO PROGRESS
    ============================================
  */
  useEffect(() => {
    if (progress < 18) {
      setMessageIndex(0);
    } else if (progress < 38) {
      setMessageIndex(1);
    } else if (progress < 60) {
      setMessageIndex(2);
    } else if (progress < 80) {
      setMessageIndex(3);
    } else if (progress < 99) {
      setMessageIndex(4);
    } else {
      setMessageIndex(5);
    }
  }, [progress]);

  const percentage = Math.min(Math.floor(progress), 100);

  return (
    <div
      className={`loading-screen ${isExiting ? "is-exiting" : ""}`}
      aria-label="Loading portfolio"
    >
      {/* Ambient background grid & soft atmospheric glows */}
      <div className="loading-grid" aria-hidden="true" />
      <div className="loading-glow loading-glow-one" aria-hidden="true" />
      <div className="loading-glow loading-glow-two" aria-hidden="true" />

      {/* Main Focused Loading Content */}
      <div className="loading-content">
        {/* Logo Emblem Container */}
        <div className="loading-logo-wrapper">
          {/* Subtle concentric rotating accent rings */}
          <div className="loading-ring loading-ring-one" aria-hidden="true" />
          <div className="loading-ring loading-ring-two" aria-hidden="true" />

          {/* Bespoke Geometric <A.> Developer Emblem */}
          <div className="loading-logo" aria-label="Aryan.dev">
            <svg
              className="loading-logo-icon"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id="brandGrad"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="50%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#818cf8" />
                </linearGradient>

                <filter
                  id="brandGlow"
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="140%"
                >
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <g filter="url(#brandGlow)">
                {/* Left code bracket chevron `<` */}
                <path
                  d="M 23 43 L 17 32 L 23 21"
                  stroke="#38bdf8"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Right code bracket chevron `>` */}
                <path
                  d="M 41 21 L 47 32 L 41 43"
                  stroke="#38bdf8"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Architectural apex `A` */}
                <path
                  d="M 25 43 L 32 18 L 39 43"
                  stroke="url(#brandGrad)"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Illuminated Crossbar */}
                <path
                  d="M 28 35 L 36 35"
                  stroke="#38bdf8"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                />

                {/* Signature Brand Accent Dot */}
                <circle cx="51" cy="43" r="2.2" fill="#38bdf8" />
              </g>
            </svg>
          </div>
        </div>

        {/* Clean Branded Identity */}
        <div className="loading-brand">
          Aryan<span>.dev</span>
        </div>

        {/* Percentage Counter */}
        <div className="loading-percentage">
          {percentage}
          <span>%</span>
        </div>

        {/* Terminal Message */}
        <div className="loading-message">
          <span className="loading-terminal">&gt;</span>
          <span>{loadingMessages[messageIndex]}</span>
          <span className="loading-dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        </div>

        {/* Progress Bar */}
        <div className="loading-bar">
          <div
            className="loading-progress"
            style={{ width: `${progress}%` }}
          >
            <div className="loading-progress-glow" />
          </div>
        </div>

        {/* Technology Domains */}
        <div className="loading-footer">
          <span>AI / ML</span>
          <span>•</span>
          <span>FULL-STACK</span>
          <span>•</span>
          <span>HARDWARE</span>
        </div>

        {/* System Status Indicator */}
        <div
          className={`loading-status ${
            percentage >= 100 ? "loading-complete" : ""
          }`}
        >
          {percentage >= 100 ? "✓ SYSTEM READY" : "BOOTING SYSTEM"}
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;