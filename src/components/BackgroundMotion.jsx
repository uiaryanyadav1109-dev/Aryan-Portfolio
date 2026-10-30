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

  // Sophisticated Obsidian Black & Pure White Particle-Web + Chain-Link + Wave Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Track scroll depth for section-specific animation intensity
    let scrollDepth = 0;
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollDepth = docHeight > 0 ? window.scrollY / docHeight : 0;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Theme check
    let isLight = document.documentElement.getAttribute("data-theme") === "light";
    const observer = new MutationObserver(() => {
      isLight = document.documentElement.getAttribute("data-theme") === "light";
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // 1. Interconnected Node Web
    const nodeCount = Math.min(Math.floor(window.innerWidth / 30), 55);
    const nodes = Array.from({ length: nodeCount }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28 - 0.04,
      radius: i % 7 === 0 ? Math.random() * 1.2 + 2.2 : Math.random() * 1.0 + 0.9,
      isAnchor: i % 7 === 0, // Soft white glowing hub nodes
      baseAlpha: i % 7 === 0 ? 0.75 : Math.random() * 0.35 + 0.15,
      phase: Math.random() * Math.PI * 2,
    }));

    // 2. Subtle Floating Metallic Chain-Link Structures
    const chainLinks = [
      { x: width * 0.15, y: height * 0.25, rot: 0.2, rotSpeed: 0.0015, scale: 0.85, drift: 0.1 },
      { x: width * 0.85, y: height * 0.45, rot: 0.8, rotSpeed: -0.0012, scale: 1.05, drift: 0.15 },
      { x: width * 0.45, y: height * 0.75, rot: 1.4, rotSpeed: 0.0018, scale: 0.95, drift: 0.08 },
    ];

    let mouse = { x: -1000, y: -1000 };
    const handlePointerMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handlePointerMove, { passive: true });

    let lastTime = performance.now();
    let waveTime = 0;

    const render = (time) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;
      waveTime += dt * (0.35 + scrollDepth * 0.3); // Wave speed gently scales with scroll depth

      ctx.clearRect(0, 0, width, height);

      // A. Slow-moving subtle monochrome gradient waves
      if (!prefersReducedMotion) {
        const waveY = height * 0.65;
        ctx.beginPath();
        ctx.moveTo(0, height);
        ctx.lineTo(0, waveY);

        for (let x = 0; x <= width; x += 40) {
          const y =
            waveY +
            Math.sin(x * 0.002 + waveTime) * 35 +
            Math.cos(x * 0.003 - waveTime * 0.7) * 20;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();

        const waveGrad = ctx.createLinearGradient(0, waveY - 50, 0, height);
        if (isLight) {
          waveGrad.addColorStop(0, "rgba(220, 220, 220, 0.03)");
          waveGrad.addColorStop(1, "rgba(200, 200, 200, 0.08)");
        } else {
          waveGrad.addColorStop(0, "rgba(214, 165, 141, 0.02)");
          waveGrad.addColorStop(1, "rgba(118, 91, 80, 0.05)");
        }
        ctx.fillStyle = waveGrad;
        ctx.fill();
      }

      // B. Render subtle floating metallic chain-link structures
      if (!prefersReducedMotion) {
        ctx.save();
        chainLinks.forEach((link, idx) => {
          link.rot += link.rotSpeed;
          const linkColor = isLight
            ? "rgba(100, 100, 100, 0.05)"
            : "rgba(214, 165, 141, 0.08)";
          ctx.strokeStyle = linkColor;
          ctx.lineWidth = 1.2;

          ctx.save();
          const offsetY = Math.sin(waveTime * 0.8 + idx) * 15;
          ctx.translate(link.x, link.y + offsetY);
          ctx.rotate(link.rot);
          ctx.scale(link.scale, link.scale);

          // Draw double interlocked rounded link
          ctx.beginPath();
          ctx.roundRect(-24, -14, 48, 28, 14);
          ctx.stroke();

          ctx.beginPath();
          ctx.roundRect(-8, -14, 48, 28, 14);
          ctx.stroke();

          ctx.restore();
        });
        ctx.restore();
      }

      // Color targets for pure monochrome nodes & lines
      const nodeColor = isLight ? "118, 91, 80" : "214, 165, 141";

      // C. Update and render interconnected nodes
      for (let i = 0; i < nodes.length; i++) {
        const p = nodes[i];

        if (!prefersReducedMotion) {
          p.x += p.vx * 60 * dt;
          p.y += p.vy * 60 * dt;
          p.phase += dt * 1.5;

          // Wrap boundaries
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
          if (p.y < -10) p.y = height + 10;
          if (p.y > height + 10) p.y = -10;

          // Gentle cursor repulsion
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 15000 && distSq > 0) {
            const force = (1 - Math.sqrt(distSq) / 122) * 0.45;
            p.x -= (dx / Math.sqrt(distSq)) * force;
            p.y -= (dy / Math.sqrt(distSq)) * force;
          }
        }

        const alpha = Math.max(
          0.08,
          p.baseAlpha + Math.sin(p.phase) * (p.isAnchor ? 0.22 : 0.08)
        );

        ctx.save();
        if (p.isAnchor && !isLight) {
          ctx.shadowBlur = 12;
          ctx.shadowColor = "rgba(214, 165, 141, 0.85)";
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${nodeColor}, ${alpha})`;
        ctx.fill();
        ctx.restore();

        // Fine animated lines connecting floating nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const p2 = nodes[j];
          const cdx = p.x - p2.x;
          const cdy = p.y - p2.y;
          const cDistSq = cdx * cdx + cdy * cdy;

          if (cDistSq < 14400) {
            // max ~120px distance
            const distRatio = 1 - Math.sqrt(cDistSq) / 120;
            const lineAlpha = distRatio * (p.isAnchor || p2.isAnchor ? 0.22 : 0.12);

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(214, 165, 141, ${lineAlpha * 0.9})`;
            ctx.lineWidth = p.isAnchor || p2.isAnchor ? 0.8 : 0.5;
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
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handlePointerMove);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="bg-motion-container" aria-hidden="true">
      {/* Slow-moving black, grey & white atmospheric waves */}
      <div className="bg-wave-layer" />

      {/* Cyber Grid with radial falloff */}
      <div className="bg-grid-mesh" />

      {/* Interconnected Web & Particle Canvas */}
      <canvas ref={canvasRef} className="bg-particle-canvas" />

      {/* Subtle cursor-responsive illumination */}
      <div ref={mouseGlowRef} className="bg-cursor-aura" />
    </div>
  );
}
