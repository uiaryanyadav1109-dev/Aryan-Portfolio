import { useEffect, useState } from "react";

function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const totalDuration = 2300;
    const startTime = performance.now();
    let animationFrame;

    const updateLoader = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / totalDuration, 1);

      // Smooth realistic curve: fast start -> steady scan -> crisp finish
      let currentPercent;
      if (t < 0.28) {
        currentPercent = (t / 0.28) * 35;
      } else if (t < 0.65) {
        currentPercent = 35 + ((t - 0.28) / 0.37) * 40;
      } else if (t < 0.88) {
        currentPercent = 75 + ((t - 0.65) / 0.23) * 17;
      } else {
        currentPercent = 92 + ((t - 0.88) / 0.12) * 8;
      }

      currentPercent = Math.min(Math.round(currentPercent), 100);
      setProgress(currentPercent);

      if (t < 1) {
        animationFrame = requestAnimationFrame(updateLoader);
      } else {
        setProgress(100);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 500);
        }, 300);
      }
    };

    animationFrame = requestAnimationFrame(updateLoader);

    return () => cancelAnimationFrame(animationFrame);
  }, [onComplete]);

  const getStatusText = (p) => {
    if (p < 30) return "INITIALIZING PORTFOLIO...";
    if (p < 65) return "LOADING AI & DEV ASSETS...";
    if (p < 95) return "FINALIZING INTERFACE...";
    return "EXPERIENCE READY";
  };

  return (
    <div
      className={`loading-screen ${isExiting ? "is-exiting" : ""}`}
      aria-label="Loading Aryan Yadav's portfolio"
    >
      {/* 1. Cinema-Grade Ambient Reactive Lighting (fills top & bottom letterbox with glowing aura) */}
      <div className="loading-ambient-glow" />

      {/* 2. Cybernetic Perspective Grid Planes (Top & Bottom Spaces) */}
      <div className="loading-grid-plane loading-grid-top" />
      <div className="loading-grid-plane loading-grid-bottom" />

      {/* 3. Top Cyber HUD & Real-Time Telemetry Stream (Fills space above the artwork) */}
      <div className="loading-top-hud">
        <div className="top-hud-corner">
          <span className="hud-bracket">[</span>
          <span className="hud-tag">AY.SYS // v2.6.4</span>
          <span className="hud-bracket">]</span>
        </div>

        <div className="top-hud-ticker">
          <div className="hud-ticker-track">
            <span>NEURAL_ENGINE: ONLINE</span>
            <span className="ticker-sep">⚡</span>
            <span>MODEL: GEMINI_ADVANCED</span>
            <span className="ticker-sep">⚡</span>
            <span>STACK: REACT 19 + PYTORCH + NODE</span>
            <span className="ticker-sep">⚡</span>
            <span>AI_EMBEDDINGS: CALIBRATED</span>
            <span className="ticker-sep">⚡</span>
            <span>INTERFACE: HYPER-FLUID</span>
          </div>
        </div>

        <div className="top-hud-status">
          <span className="hud-status-label">SYS.STATUS: OPERATIONAL</span>
          <span className="hud-live-beacon" />
        </div>
      </div>

      {/* 4. High-Resolution Responsive Background Graphic (100% Fully Visible) */}
      <div className="loading-bg-image" />

      {/* 5. Animated Laser Boundary Glow Lines */}
      <div className="loading-laser-border laser-top" />
      <div className="loading-laser-border laser-bottom" />

      {/* 6. Dynamic Audio Frequency Wave Visualizer (Fills space below artwork around dock) */}
      <div className="loading-bottom-ambient">
        <div className="loading-freq-bars">
          {[...Array(24)].map((_, i) => (
            <span
              key={i}
              className="freq-bar"
              style={{
                animationDelay: `${(i * 0.08).toFixed(2)}s`,
                height: `${14 + (Math.sin(i * 0.7) * 12 + 12)}px`,
              }}
            />
          ))}
        </div>
      </div>

      {/* 7. FLOATING BOTTOM GLASSMORPHIC COMMAND DOCK */}
      <div className="loading-dock-container">
        <div className="loading-glass-dock">
          {/* Glowing Mini AY Monogram Emblem */}
          <div className="dock-logo-wrapper">
            <div className="dock-logo-glow" />
            <svg
              className="dock-logo-svg"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="dockCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
                <linearGradient id="dockPurpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
                <filter id="dockGlow" x="-25%" y="-25%" width="150%" height="150%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Orbit Spin Ring */}
              <circle
                cx="50"
                cy="50"
                r="44"
                stroke="rgba(56, 189, 248, 0.4)"
                strokeWidth="2"
                strokeDasharray="6 6"
                className="dock-orbit-spin"
              />

              {/* Monogram A & Y */}
              <path
                d="M 26 74 L 50 20 L 74 74"
                stroke="url(#dockCyanGrad)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#dockGlow)"
              />
              <path
                d="M 35 52 L 65 52"
                stroke="url(#dockPurpleGrad)"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <path
                d="M 50 52 L 50 82"
                stroke="url(#dockPurpleGrad)"
                strokeWidth="6"
                strokeLinecap="round"
                filter="url(#dockGlow)"
              />
              <circle
                cx="50"
                cy="52"
                r="3.5"
                fill="#ffffff"
                filter="url(#dockGlow)"
              />
            </svg>
          </div>

          {/* Central Telemetry & Progress Track */}
          <div className="dock-content">
            <div className="dock-status-row">
              <span className="dock-status-dot" />
              <span className="dock-status-text">{getStatusText(progress)}</span>
            </div>

            <div className="dock-bar-track">
              <div
                className="dock-bar-fill"
                style={{ width: `${progress}%` }}
              >
                <div className="dock-bar-tip" />
              </div>
            </div>
          </div>

          {/* Digital Telemetry Percentage Readout */}
          <div className="dock-percentage-box">
            <span className="dock-percentage-num">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;