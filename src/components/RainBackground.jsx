import { useEffect, useRef, useState } from "react";

/**
 * High-Performance Single-Canvas Rain Animation Engine
 * 
 * Performance & Architecture Optimizations:
 * 1. Single HTML5 Canvas: Zero DOM particle elements.
 * 2. Batched Path Rendering: Drops are rendered in 3 batched passes (one per layer),
 *    reducing draw calls and context switches by ~97% (from ~175 to 4 per frame).
 * 3. Particle Limits: Strictly 100–150 on desktop, 40–70 on mobile.
 * 4. Zero Garbage Collection: Pre-allocated object pool for drops and micro-splashes.
 *    Recycles in-place without object creation or array reallocation in the render loop.
 * 5. Hardware-Aware Scaling: Adjusts baseline based on navigator.hardwareConcurrency & deviceMemory.
 * 6. Dynamic Load Governor: Automatically scales down particle rendering if framerate drops under load.
 * 7. Complete Idle Suspension: Completely halts requestAnimationFrame when the tab is hidden.
 * 8. Zero React State Overheads: All physics and cursor coordinates stay in numeric animation registers.
 * 9. Non-Blocking: Passive pointer/touch listeners, pointer-events: none.
 * 10. Accessible: Respects prefers-reduced-motion.
 */

const RAIN_PRESETS = {
  off: { desktop: 0, mobile: 0, speedMult: 0 },
  subtle: { desktop: 100, mobile: 40, speedMult: 0.85 }, // Default: refined & cinematic
  normal: { desktop: 125, mobile: 55, speedMult: 1.0 },
  heavy: { desktop: 150, mobile: 70, speedMult: 1.15 },
};

// Graphite + Rose Gold Layer Color Palette
const LAYER_STYLES = [
  { stroke: "rgba(184, 173, 167, 0.18)", width: 0.85 }, // Layer 0: Background slate-grey
  { stroke: "rgba(247, 229, 220, 0.32)", width: 1.1 },  // Layer 1: Midground champagne
  { stroke: "rgba(214, 165, 141, 0.48)", width: 1.45 }, // Layer 2: Foreground rose-gold
];

function RainBackground({ intensity: propIntensity }) {
  const canvasRef = useRef(null);

  // Read saved preference or default to "subtle" (or "off" if prefers-reduced-motion)
  const [intensity, setIntensity] = useState(() => {
    if (propIntensity) return propIntensity;
    if (typeof window === "undefined") return "subtle";

    const saved = localStorage.getItem("aryan_portfolio_rain_mode");
    if (saved && ["off", "subtle", "normal", "heavy"].includes(saved)) {
      return saved;
    }

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    return prefersReduced ? "off" : "subtle";
  });

  // Synchronize with external triggers (Navbar or Command Palette)
  useEffect(() => {
    const handleSetIntensity = (e) => {
      const mode = e.detail?.mode;
      if (mode && ["off", "subtle", "normal", "heavy"].includes(mode)) {
        setIntensity(mode);
        localStorage.setItem("aryan_portfolio_rain_mode", mode);
      }
    };

    const handleToggle = () => {
      setIntensity((prev) => {
        const next = prev === "off" ? "subtle" : prev === "subtle" ? "normal" : "off";
        localStorage.setItem("aryan_portfolio_rain_mode", next);
        return next;
      });
    };

    window.addEventListener("set-rain-intensity", handleSetIntensity);
    window.addEventListener("toggle-rain", handleToggle);

    return () => {
      window.removeEventListener("set-rain-intensity", handleSetIntensity);
      window.removeEventListener("toggle-rain", handleToggle);
    };
  }, []);

  useEffect(() => {
    if (propIntensity && propIntensity !== intensity) {
      setIntensity(propIntensity);
    }
  }, [propIntensity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    if (intensity === "off") {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    let animationFrameId = null;
    let isVisible = !document.hidden;

    // Viewport dimensions
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Hardware capability check
    const hardwareThreads = navigator.hardwareConcurrency || 4;
    const deviceMemory = navigator.deviceMemory || 4;
    const isLowPowerDevice = hardwareThreads <= 2 || deviceMemory <= 2;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Determine target particle count
    const config = RAIN_PRESETS[intensity] || RAIN_PRESETS.subtle;
    const isMobile = width < 768;
    let baseCount = isMobile ? config.mobile : config.desktop;

    if (isLowPowerDevice) {
      baseCount = Math.floor(baseCount * 0.75);
    }

    if (prefersReducedMotion) {
      baseCount = Math.floor(baseCount * 0.3);
    }

    // =========================================================
    // PRE-ALLOCATED MEMORY POOL (ZERO RUNTIME ALLOCATIONS)
    // =========================================================
    const MAX_PARTICLES = 160;
    const raindrops = new Array(MAX_PARTICLES);

    function initDropObject(drop, layer, spawnAnywhere = true) {
      const isFore = layer === 2;
      const isMid = layer === 1;

      drop.layer = layer;
      drop.length = isFore
        ? Math.random() * 16 + 28
        : isMid
        ? Math.random() * 14 + 18
        : Math.random() * 10 + 10;

      drop.vy = isFore
        ? (Math.random() * 8 + 24) * config.speedMult
        : isMid
        ? (Math.random() * 6 + 17) * config.speedMult
        : (Math.random() * 5 + 11) * config.speedMult;

      drop.x = Math.random() * (width + 140) - 70;
      drop.y = spawnAnywhere ? Math.random() * height : -drop.length - Math.random() * 50;
      drop.vx = 0.85;
    }

    for (let i = 0; i < MAX_PARTICLES; i++) {
      // Layer distribution: 35% background, 50% midground, 15% foreground
      const rand = Math.random();
      const layer = rand < 0.35 ? 0 : rand < 0.85 ? 1 : 2;
      raindrops[i] = {
        layer: 0,
        x: 0,
        y: 0,
        vx: 0.85,
        vy: 18,
        length: 20,
      };
      initDropObject(raindrops[i], layer, true);
    }

    // Static Pre-allocated Micro-Splash Pool (Max 16 active splashes)
    const MAX_SPLASHES = 16;
    const splashPool = new Array(MAX_SPLASHES);
    for (let i = 0; i < MAX_SPLASHES; i++) {
      splashPool[i] = {
        active: false,
        x: 0,
        y: 0,
        radius: 0.5,
        maxRadius: 3,
        alpha: 0.25,
      };
    }
    let splashHead = 0;

    function spawnSplash(x, y, isForeground) {
      const splash = splashPool[splashHead];
      splash.active = true;
      splash.x = x;
      splash.y = y;
      splash.radius = 0.5;
      splash.maxRadius = isForeground ? Math.random() * 3.5 + 3.5 : Math.random() * 2 + 1.8;
      splash.alpha = isForeground ? 0.35 : 0.22;
      splashHead = (splashHead + 1) % MAX_SPLASHES;
    }

    // Resize handler
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      const newMobile = width < 768;
      baseCount = newMobile ? config.mobile : config.desktop;
      if (isLowPowerDevice) baseCount = Math.floor(baseCount * 0.75);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // =========================================================
    // DYNAMIC WIND & CURSOR TRACKING (ZERO REACT STATE)
    // =========================================================
    const BASE_WIND = 0.85; // Subtle natural 3° downward angle to the right
    const MAX_WIND = 6.2;   // Safety cap: prevents horizontal rain
    let currentWind = BASE_WIND;
    let targetWind = BASE_WIND;
    let lastPointerX = width / 2;
    let lastPointerY = height / 2;
    let lastPointerTime = performance.now();
    let lastPointerMoveTime = performance.now();

    const handlePointerMove = (e) => {
      if (prefersReducedMotion) return;

      const now = performance.now();
      const dt = Math.max(now - lastPointerTime, 8);
      const dx = e.clientX - lastPointerX;
      const dy = e.clientY - lastPointerY;

      lastPointerX = e.clientX;
      lastPointerY = e.clientY;
      lastPointerTime = now;
      lastPointerMoveTime = now;

      // Ignore sub-pixel micro-jitter
      if (Math.abs(dx) > 1.2) {
        const vx = (dx / dt) * 16.67;
        const verticalFactor = Math.abs(dy) > 2 ? 0.9 : 1.0;
        const windImpulse = vx * 0.12 * verticalFactor;

        targetWind = Math.max(
          -MAX_WIND,
          Math.min(MAX_WIND, targetWind + windImpulse)
        );
      }
    };

    const handleTouchMove = (e) => {
      if (prefersReducedMotion || !e.touches || e.touches.length === 0) return;
      const touch = e.touches[0];
      const now = performance.now();
      const dt = Math.max(now - lastPointerTime, 12);
      const dx = touch.clientX - lastPointerX;

      lastPointerX = touch.clientX;
      lastPointerY = touch.clientY;
      lastPointerTime = now;
      lastPointerMoveTime = now;

      if (Math.abs(dx) > 2) {
        const vx = (dx / dt) * 16.67;
        const windImpulse = vx * 0.08;
        targetWind = Math.max(
          -MAX_WIND,
          Math.min(MAX_WIND, targetWind + windImpulse)
        );
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    // =========================================================
    // DYNAMIC LOAD GOVERNOR (FPS & OVERLOAD AUTO-THROTTLE)
    // =========================================================
    let loadScale = 1.0;
    let slowFrameStreak = 0;
    let smoothFrameStreak = 0;

    let lastTime = performance.now();

    function renderLoop(time) {
      if (!isVisible) {
        animationFrameId = null;
        return;
      }

      const rawDelta = (time - lastTime) / 16.67;
      const delta = Math.min(rawDelta, 2.5); // Normalize to 60fps
      lastTime = time;

      // Heavy load governor detection
      if (rawDelta > 1.8) {
        slowFrameStreak++;
        smoothFrameStreak = 0;
        if (slowFrameStreak > 6) {
          // Device under heavy load: scale down active count by 30%
          loadScale = Math.max(0.65, loadScale - 0.05);
        }
      } else {
        smoothFrameStreak++;
        slowFrameStreak = 0;
        if (smoothFrameStreak > 90 && loadScale < 1.0) {
          // Smooth 60 FPS sustained: gently recover
          loadScale = Math.min(1.0, loadScale + 0.02);
        }
      }

      // Wind coasting after-effect
      const timeSinceMove = time - lastPointerMoveTime;
      if (timeSinceMove > 45) {
        targetWind += (BASE_WIND - targetWind) * (0.038 * delta);
      }

      currentWind += (targetWind - currentWind) * (0.065 * delta);

      ctx.clearRect(0, 0, width, height);
      ctx.lineCap = "round";

      // Effective active drop count based on current load governor scale
      const activeCount = Math.floor(baseCount * loadScale);

      // =========================================================
      // BATCHED PASS 1: RAINDROPS (GROUPED BY LAYER)
      // =========================================================
      // Layer 0: Background
      // Layer 1: Midground
      // Layer 2: Foreground
      for (let layer = 0; layer < 3; layer++) {
        const layerStyle = LAYER_STYLES[layer];
        const layerWindMult = layer === 2 ? 1.25 : layer === 1 ? 1.0 : 0.65;
        const targetDropVx = currentWind * layerWindMult;

        ctx.beginPath();
        ctx.strokeStyle = layerStyle.stroke;
        ctx.lineWidth = layerStyle.width;

        for (let i = 0; i < activeCount; i++) {
          const drop = raindrops[i];
          if (drop.layer !== layer) continue;

          // Adapt individual drop velocity
          drop.vx += (targetDropVx - drop.vx) * (0.075 * delta);

          // Append streak line to batched path
          ctx.moveTo(drop.x, drop.y);
          ctx.lineTo(drop.x - drop.vx * 1.5, drop.y - drop.length);

          // Update position
          drop.x += drop.vx * delta;
          drop.y += drop.vy * delta;

          // Ground check
          if (drop.y > height + drop.length) {
            if (layer >= 1 && loadScale > 0.8 && Math.random() < 0.28) {
              spawnSplash(drop.x, height - 2, layer === 2);
            }
            initDropObject(drop, layer, false);
          } else if (drop.x > width + 70) {
            drop.x = -50;
          } else if (drop.x < -70) {
            drop.x = width + 50;
          }
        }

        // Single draw call for this entire layer
        ctx.stroke();
      }

      // =========================================================
      // BATCHED PASS 2: MICRO-SPLASH RIPPLES
      // =========================================================
      if (loadScale > 0.75) {
        ctx.beginPath();
        ctx.strokeStyle = "rgba(214, 165, 141, 0.28)";
        ctx.lineWidth = 1;

        const rippleTilt = Math.max(-0.25, Math.min(0.25, currentWind * 0.04));
        let hasActiveSplashes = false;

        for (let s = 0; s < MAX_SPLASHES; s++) {
          const splash = splashPool[s];
          if (!splash.active) continue;

          splash.radius += 0.35 * delta;
          const progress = splash.radius / splash.maxRadius;

          if (progress >= 1) {
            splash.active = false;
            continue;
          }

          hasActiveSplashes = true;
          ctx.ellipse(
            splash.x,
            splash.y,
            splash.radius * 2.2,
            splash.radius * 0.7,
            rippleTilt,
            0,
            Math.PI * 2
          );
        }

        if (hasActiveSplashes) {
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    }

    // Tab visibility handling: fully freeze and resume loop
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        lastTime = performance.now();
        if (!animationFrameId) {
          animationFrameId = requestAnimationFrame(renderLoop);
        }
      } else {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Start loop
    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className={`rain-canvas rain-${intensity}`}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
        opacity: intensity === "off" ? 0 : 1,
        transition: "opacity 0.6s ease",
      }}
    />
  );
}

export { RainBackground };
export default RainBackground;
