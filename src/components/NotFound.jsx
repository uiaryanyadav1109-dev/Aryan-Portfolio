import { useEffect, useState } from "react";
import { Home, ArrowLeft, Layers, Terminal, AlertCircle } from "lucide-react";
import RainBackground from "./RainBackground";

export default function NotFound({ onNavigate }) {
  const [currentPath, setCurrentPath] = useState("/");
  const [copiedDebug, setCopiedDebug] = useState(false);

  // Read current URL path and update document title
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname || "/unknown");
      const previousTitle = document.title;
      document.title = "404 — Page Not Found | Aryan Yadav";

      return () => {
        document.title = previousTitle;
      };
    }
  }, []);

  // Universal navigation helper
  const handleNavigate = (targetPath) => {
    if (onNavigate) {
      onNavigate(targetPath);
      return;
    }

    if (typeof window !== "undefined") {
      window.history.pushState({}, "", targetPath);
      window.dispatchEvent(new Event("popstate"));
      window.dispatchEvent(
        new CustomEvent("navigate-to", { detail: { path: targetPath } })
      );
    }
  };

  // Smart Go Back handler
  const handleGoBack = () => {
    if (typeof window !== "undefined") {
      if (window.history.length > 1 && document.referrer.includes(window.location.host)) {
        window.history.back();
      } else {
        handleNavigate("/");
      }
    }
  };

  // Copy debug info shortcut
  const handleCopyDebug = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(
        `Error 404: Page Not Found\nPath: ${currentPath}\nTimestamp: ${new Date().toISOString()}\nHost: ${window.location.host}`
      );
      setCopiedDebug(true);
      setTimeout(() => setCopiedDebug(false), 2200);
    }
  };

  return (
    <main className="not-found-screen" role="main">
      {/* Ambient background rain and subtle lighting */}
      <RainBackground intensity="subtle" />
      <div className="not-found-ambient-glow" aria-hidden="true" />
      <div className="not-found-grid-mesh" aria-hidden="true" />

      <div className="not-found-container">
        {/* Status Telemetry Pill */}
        <div className="not-found-status-badge">
          <span className="status-ping-dot" />
          <span className="status-text">SYSTEM STATUS: PAGE NOT FOUND</span>
        </div>

        {/* Giant Metallic Rose-Gold 404 Display */}
        <div className="not-found-hero-code" aria-hidden="true">
          <span className="code-digit">4</span>
          <span className="code-digit code-digit-glow">0</span>
          <span className="code-digit">4</span>
          <div className="code-radial-reflection" />
        </div>

        {/* Primary Headings & Narrative */}
        <div className="not-found-header">
          <h1 className="not-found-title">
            404 <span className="title-sep">—</span> PAGE NOT FOUND
          </h1>
          <p className="not-found-quote">
            "Looks like you've wandered into an unknown part of my universe."
          </p>
          <p className="not-found-explanation">
            The page you're looking for doesn't exist, may have been moved, or is temporarily unavailable.
          </p>
        </div>

        {/* Developer Terminal Route Inspection Element */}
        <div className="not-found-terminal" role="region" aria-label="Route diagnostic terminal">
          <div className="terminal-topbar">
            <div className="terminal-dots" aria-hidden="true">
              <span className="t-dot t-dot-red" />
              <span className="t-dot t-dot-yellow" />
              <span className="t-dot t-dot-green" />
            </div>
            <div className="terminal-title">
              <Terminal size={13} className="terminal-icon" />
              <span>route_debugger.sh — 80x24</span>
            </div>
            <button
              type="button"
              className="terminal-copy-btn"
              onClick={handleCopyDebug}
              title="Copy diagnostic report"
            >
              {copiedDebug ? "COPIED!" : "COPY LOG"}
            </button>
          </div>

          <div className="terminal-body">
            <div className="terminal-line text-muted">
              <span className="t-prompt">$</span> agy route:verify --target="{currentPath}"
            </div>
            <div className="terminal-line text-info">
              <span className="t-arrow">&gt;</span> initializing navigation protocol...
            </div>
            <div className="terminal-line text-info">
              <span className="t-arrow">&gt;</span> searching requested route: <strong className="t-highlight">"{currentPath}"</strong>
            </div>
            <div className="terminal-line text-error">
              <span className="t-badge">ERROR 404:</span> RESOURCE NOT FOUND IN MANIFEST
            </div>
            <div className="terminal-line text-success">
              <span className="t-arrow">&gt;</span> redirect destination: <span className="t-resolved">HOME (/)</span>
            </div>
            <div className="terminal-line terminal-cursor-line">
              <span className="t-prompt">$</span> awaiting user command<span className="t-cursor">_</span>
            </div>
          </div>
        </div>

        {/* Interactive Action Buttons */}
        <div className="not-found-actions">
          <button
            type="button"
            className="btn-404 btn-404-primary"
            onClick={() => handleNavigate("/")}
            title="Navigate to portfolio homepage"
          >
            <Home size={17} />
            <span>Back to Home</span>
          </button>

          <button
            type="button"
            className="btn-404 btn-404-secondary"
            onClick={handleGoBack}
            title="Return to previous page in browser history"
          >
            <ArrowLeft size={17} />
            <span>Go Back</span>
          </button>

          <button
            type="button"
            className="btn-404 btn-404-secondary btn-404-projects"
            onClick={() => handleNavigate("/#projects")}
            title="Explore featured development projects"
          >
            <Layers size={17} />
            <span>Explore Projects</span>
          </button>
        </div>

        {/* Minimal Footer Signature */}
        <div className="not-found-footer-hint">
          <AlertCircle size={13} className="hint-icon" />
          <span>If you believe this route is broken, please feel free to reach out via the Contact section.</span>
        </div>
      </div>
    </main>
  );
}
