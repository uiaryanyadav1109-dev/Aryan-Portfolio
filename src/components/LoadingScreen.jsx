import { useEffect, useState, useRef } from "react";

function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const totalDuration = 1200; // Swift, modern, and snappy
    const startTime = performance.now();
    let animationFrame;

    const updateLoader = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / totalDuration, 1);

      // Smooth modern cubic ease-out progression
      const easeOut = 1 - Math.pow(1 - t, 3);
      const currentPercent = Math.min(Math.round(easeOut * 100), 100);

      setProgress(currentPercent);

      if (t < 1) {
        animationFrame = requestAnimationFrame(updateLoader);
      } else {
        setProgress(100);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            if (onCompleteRef.current) onCompleteRef.current();
          }, 350);
        }, 150);
      }
    };

    animationFrame = requestAnimationFrame(updateLoader);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div
      className={`loading-screen ${isExiting ? "is-exiting" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading Aryan Yadav's portfolio"
    >
      {/* Soft ambient background aura */}
      <div className="modern-loader-glow" aria-hidden="true" />

      {/* Main modern card */}
      <div className="modern-loader-content">
        {/* Sleek Monogram Brand Emblem */}
        <div className="modern-loader-logo-wrap">
          <div className="modern-loader-logo-badge">
            <svg
              className="modern-loader-logo-svg"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="modernAyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F7E5DC" />
                  <stop offset="100%" stopColor="#D6A58D" />
                </linearGradient>
              </defs>
              {/* Clean, minimalist AY Monogram */}
              <path
                d="M 27 73 L 50 23 L 73 73"
                stroke="url(#modernAyGrad)"
                strokeWidth="5.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M 37 53 L 63 53"
                stroke="url(#modernAyGrad)"
                strokeWidth="4.5"
                strokeLinecap="round"
              />
              <path
                d="M 50 53 L 50 78"
                stroke="#D6A58D"
                strokeWidth="5.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Developer Branding */}
        <div className="modern-loader-header">
          <h1 className="modern-loader-title">Aryan Yadav</h1>
          <p className="modern-loader-subtitle">Engineering &amp; AI Systems</p>
        </div>

        {/* Minimal Progress Bar */}
        <div className="modern-loader-track-wrap">
          <div className="modern-loader-track">
            <div
              className="modern-loader-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="modern-loader-meta">
            <span className="modern-loader-status">
              {progress === 100 ? "Ready" : "Loading portfolio..."}
            </span>
            <span className="modern-loader-percent">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
