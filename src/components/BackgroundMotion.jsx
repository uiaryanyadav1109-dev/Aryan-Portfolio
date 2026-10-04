import { useEffect, useRef } from "react";

export default function BackgroundMotion() {
  const canvasRef = useRef(null);
  const mouseGlowRef = useRef(null);

  // Smooth mouse-follow illumination effect
  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 3;
    let currentX = mouseX;
    let currentY = mouseY;
    let animationFrameId;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const updateGlow = () => {
      // Lerp for butter-smooth movement
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;

      if (mouseGlowRef.current) {
        mouseGlowRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(updateGlow);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(updateGlow);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Lightweight ambient stardust particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Track theme to adjust particle colors
    let isLight =
      document.documentElement.getAttribute("data-theme") === "light";

    const observer = new MutationObserver(() => {
      isLight =
        document.documentElement.getAttribute("data-theme") === "light";
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // Generate gentle floating particles
    const particleCount = Math.min(Math.floor(window.innerWidth / 35), 45);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35 - 0.08, // slight upward float
      radius: Math.random() * 1.5 + 0.8,
      baseAlpha: Math.random() * 0.35 + 0.15,
      phase: Math.random() * Math.PI * 2,
    }));

    let mouse = { x: -1000, y: -1000 };
    const handlePointerMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handlePointerMove, { passive: true });

    let lastTime = performance.now();

    const render = (time) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      const colorR = isLight ? 2 : 56;
      const colorG = isLight ? 132 : 189;
      const colorB = isLight ? 199 : 248;

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Natural drifting motion
        p.x += p.vx * 60 * dt;
        p.y += p.vy * 60 * dt;
        p.phase += dt * 1.5;

        // Wrap around boundaries smoothly
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Mouse gentle interaction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < 12000 && distSq > 0) {
          const force = (1 - Math.sqrt(distSq) / 110) * 0.5;
          p.x -= (dx / Math.sqrt(distSq)) * force;
          p.y -= (dy / Math.sqrt(distSq)) * force;
        }

        // Pulse alpha gently
        const alpha = p.baseAlpha + Math.sin(p.phase) * 0.12;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colorR}, ${colorG}, ${colorB}, ${Math.max(
          0.05,
          alpha
        )})`;
        ctx.fill();

        // Delicate connector lines between close particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const cdx = p.x - p2.x;
          const cdy = p.y - p2.y;
          const cDistSq = cdx * cdx + cdy * cdy;

          if (cDistSq < 10000) {
            // ~100px max distance
            const lineAlpha = (1 - Math.sqrt(cDistSq) / 100) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${colorR}, ${colorG}, ${colorB}, ${lineAlpha})`;
            ctx.lineWidth = 0.65;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handlePointerMove);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="bg-motion-container" aria-hidden="true">
      {/* Dynamic Floating Ambient Orbs */}
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />
      <div className="bg-orb bg-orb-4" />

      {/* Cyber Grid with radial falloff mask */}
      <div className="bg-grid-mesh" />

      {/* Stardust particle canvas */}
      <canvas ref={canvasRef} className="bg-particle-canvas" />

      {/* Smooth Cursor Aura / Mouse-following glow */}
      <div ref={mouseGlowRef} className="bg-cursor-aura" />
    </div>
  );
}
