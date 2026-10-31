import { useEffect, useState, useRef, useMemo } from "react";
import RainBackground from "./RainBackground";

/**
 * INITIALIZING THE DEVELOPER UNIVERSE
 * Innovative, Cinematic & Decorative Portfolio Loading Experience
 * 
 * Features:
 * - Glowing rose-gold circular core with rotating multi-layer orbital rings & orbiting satellite nodes
 * - Developer identity: ARYAN YADAV • Aspiring AI/ML Engineer & Full-Stack Developer
 * - Dynamic stage messaging: Initializing digital workspace -> Loading creative environment -> ...
 * - Decorative telemetry terminal: SYSTEM INITIALIZATION module checks & HUD grid coordinates
 * - Ambient single-canvas rain background continuity (Graphite + Rose Gold)
 * - Hardware-accelerated GPU CSS keyframes for 60 FPS efficiency & zero garbage collection
 * - Snappy ~1.4s cubic ease-out progression; never leaves the visitor waiting
 * - Accessible: Respects prefers-reduced-motion & aria live status
 */
function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Dynamic system status message corresponding to progress milestones
  const statusMessage = useMemo(() => {
    if (progress < 20) return "Initializing digital workspace...";
    if (progress < 45) return "Loading creative environment...";
    if (progress < 70) return "Preparing developer portfolio...";
    if (progress < 90) return "Connecting digital experiences...";
    return "Almost ready...";
  }, [progress]);

  // Module checklist states based on progress
  const modules = useMemo(() => {
    return [
      { name: "DESIGN MODULE", ready: progress >= 25 },
      { name: "INTERFACE MODULE", ready: progress >= 55 },
      { name: "EXPERIENCE", ready: progress >= 95 },
    ];
  }, [progress]);

  useEffect(() => {
    // Total initialization time: ~1400ms (snappy, cinematic, non-blocking)
    const totalDuration = 1400;
    const startTime = performance.now();
    let animationFrame;

    const updateLoader = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / totalDuration, 1);

      // Silky cubic ease-out curve
      const easeOut = 1 - Math.pow(1 - t, 3);
      const currentPercent = Math.min(Math.round(easeOut * 100), 100);

      setProgress(currentPercent);

      if (t < 1) {
        animationFrame = requestAnimationFrame(updateLoader);
      } else {
        setProgress(100);
        // Brief pause at 100% before smooth cinematic exit reveal
        const holdTimer = setTimeout(() => {
          setIsExiting(true);
          const exitTimer = setTimeout(() => {
            if (onCompleteRef.current) {
              onCompleteRef.current();
            }
          }, 450); // Matches CSS transition duration
          return () => clearTimeout(exitTimer);
        }, 180);
        return () => clearTimeout(holdTimer);
      }
    };

    animationFrame = requestAnimationFrame(updateLoader);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div
      className={`universe-loading-screen ${isExiting ? "is-exiting" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Initializing Aryan Yadav's developer portfolio"
    >
      {/* Background Decorative Rain Integration */}
      <div className="universe-rain-layer" aria-hidden="true">
        <RainBackground intensity="subtle" />
      </div>

      {/* Subtle Technical Grid Background Mesh */}
      <div className="universe-grid-mesh" aria-hidden="true" />

      {/* Ambient Rose Gold / Warm Graphite Core Aura Glow */}
      <div className="universe-ambient-glow" aria-hidden="true" />

      {/* Top HUD Telemetry System Bar */}
      <div className="universe-hud-top" aria-hidden="true">
        <div className="hud-badge">
          <span className="hud-ping-dot" />
          <span className="hud-text">SYS.BOOT // v2.6.4</span>
        </div>
        <div className="hud-coords">
          <span>LAT: 28.6139° N</span>
          <span className="hud-sep">•</span>
          <span>LNG: 77.2090° E</span>
          <span className="hud-sep">•</span>
          <span className="hud-highlight">SECURE SSL</span>
        </div>
      </div>

      {/* Central Interactive HUD Stage */}
      <div className="universe-stage-card">
        {/* HUD Corner Tech Brackets */}
        <div className="hud-corner hud-corner-tl" aria-hidden="true" />
        <div className="hud-corner hud-corner-tr" aria-hidden="true" />
        <div className="hud-corner hud-corner-bl" aria-hidden="true" />
        <div className="hud-corner hud-corner-br" aria-hidden="true" />

        {/* 2. Main Loading Animation: Glowing Core & Multi-Ring Orbital System */}
        <div className="universe-orbital-stage" aria-hidden="true">
          <svg
            className="universe-orbital-svg"
            viewBox="0 0 280 280"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Metallic Rose Gold Linear Gradient */}
              <linearGradient id="orbitalRoseGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F7E5DC" />
                <stop offset="50%" stopColor="#D6A58D" />
                <stop offset="100%" stopColor="#765B50" />
              </linearGradient>

              {/* Core Radial Glow Gradient */}
              <radialGradient id="coreAuraGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#D6A58D" stopOpacity="0.85" />
                <stop offset="55%" stopColor="#C49077" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#111111" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Core Radial Atmosphere Halo */}
            <circle cx="140" cy="140" r="62" fill="url(#coreAuraGrad)" className="core-halo-pulse" />

            {/* Orbital Ring 3 (Outer, 230px diameter) */}
            <circle
              cx="140"
              cy="140"
              r="115"
              stroke="rgba(214, 165, 141, 0.16)"
              strokeWidth="1.2"
              strokeDasharray="4 8"
              className="orbital-ring-outer"
            />
            {/* Outer Satellite Photon Node 1 */}
            <g className="orbital-satellite-outer">
              <circle cx="140" cy="25" r="3" fill="#F7E5DC" />
              <circle cx="140" cy="25" r="6" stroke="#D6A58D" strokeWidth="0.75" opacity="0.6" />
            </g>

            {/* Orbital Ring 2 (Middle, 176px diameter, Counter-Clockwise) */}
            <circle
              cx="140"
              cy="140"
              r="88"
              stroke="rgba(214, 165, 141, 0.28)"
              strokeWidth="1.5"
              strokeDasharray="24 16 6 16"
              className="orbital-ring-mid"
            />
            {/* Middle Satellite Photon Node 2 */}
            <g className="orbital-satellite-mid">
              <circle cx="228" cy="140" r="3.5" fill="#D6A58D" />
              <circle cx="228" cy="140" r="8" stroke="rgba(247, 229, 220, 0.4)" strokeWidth="0.8" />
            </g>

            {/* Orbital Ring 1 (Inner, 124px diameter, Clockwise) */}
            <circle
              cx="140"
              cy="140"
              r="62"
              stroke="rgba(214, 165, 141, 0.45)"
              strokeWidth="1.75"
              strokeDasharray="12 12"
              className="orbital-ring-inner"
            />
            {/* Inner Cardinal Ticks */}
            <line x1="140" y1="74" x2="140" y2="82" stroke="#D6A58D" strokeWidth="1.5" />
            <line x1="140" y1="198" x2="140" y2="206" stroke="#D6A58D" strokeWidth="1.5" />
            <line x1="74" y1="140" x2="82" y2="140" stroke="#D6A58D" strokeWidth="1.5" />
            <line x1="198" y1="140" x2="206" y2="140" stroke="#D6A58D" strokeWidth="1.5" />

            {/* Central Glowing Rose-Gold Core Sphere */}
            <circle
              cx="140"
              cy="140"
              r="34"
              fill="#1A1817"
              stroke="url(#orbitalRoseGoldGrad)"
              strokeWidth="2.5"
              className="core-solid-disc"
            />

            {/* Precision AY Monogram at Center of Core */}
            <path
              d="M 125 156 L 140 120 L 155 156"
              stroke="url(#orbitalRoseGoldGrad)"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 131 143 L 149 143"
              stroke="url(#orbitalRoseGoldGrad)"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <path
              d="M 140 143 L 140 159"
              stroke="#D6A58D"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* 3. Developer Identity Header */}
        <div className="universe-identity">
          <h1 className="universe-name">ARYAN YADAV</h1>
          <p className="universe-tagline">
            Aspiring AI/ML Engineer &amp; Full-Stack Developer
          </p>
        </div>

        {/* Dynamic Bootup Status Message */}
        <div className="universe-status-line">
          <span className="status-terminal-arrow">›</span>
          <span className="status-dynamic-text">{statusMessage}</span>
        </div>

        {/* 4. Progress Indicator Track */}
        <div className="universe-progress-wrapper">
          <div className="universe-progress-bar-track">
            <div
              className="universe-progress-bar-fill"
              style={{ width: `${progress}%` }}
            >
              {/* Glowing endpoint spark */}
              <span className="progress-leading-spark" />
            </div>
          </div>
          <div className="universe-progress-meta">
            <span className="progress-label">CORE INITIALIZATION</span>
            <span className="progress-percentage">{progress}%</span>
          </div>
        </div>

        {/* 6. Innovative Decorative Details: Telemetry Module Status */}
        <div className="universe-telemetry-box" aria-hidden="true">
          <div className="telemetry-header">SYSTEM INITIALIZATION</div>
          <div className="telemetry-rows">
            {modules.map((mod, idx) => (
              <div key={idx} className="telemetry-row">
                <span className="module-name">{mod.name}</span>
                <span className="module-dots">
                  {mod.name === "EXPERIENCE" ? "..........." : "........"}
                </span>
                <span
                  className={`module-state ${
                    mod.ready ? "is-ready" : "is-loading"
                  }`}
                >
                  {mod.ready ? "READY" : "LOADING"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom HUD Coordinate Footer */}
      <div className="universe-hud-bottom" aria-hidden="true">
        <span className="bottom-tag">GRAPHITE + ROSE GOLD ARCHITECTURE</span>
        <span className="bottom-sep">•</span>
        <span className="bottom-tag">PORTFOLIO V2 // 2026</span>
      </div>
    </div>
  );
}

export default LoadingScreen;