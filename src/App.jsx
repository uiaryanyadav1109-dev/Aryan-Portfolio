import { useEffect, useState, useCallback } from "react";
import { ArrowUp } from "lucide-react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Hackathons from "./components/Hackathons";
import Certifications from "./components/Certifications";
import GitHub from "./components/GitHub";
import LeetCode from "./components/LeetCode";
import Resume from "./components/Resume";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import NotFound from "./components/NotFound";
import CareerSnapshot from "./components/CareerSnapshot";
import CommandPalette from "./components/CommandPalette";
import BackgroundMotion from "./components/BackgroundMotion";
import RainBackground from "./components/RainBackground";

function App() {
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isCmdOpen, setIsCmdOpen] = useState(false);

  // Global Command Palette shortcut (Cmd+K / Ctrl+K) and custom event
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCmdOpen((prev) => !prev);
      }
    };

    const handleCustomOpen = () => setIsCmdOpen(true);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleCustomOpen);
    };
  }, []);

  // Safety fallback in case loading is interrupted
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4200);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Spotlight mouse-follow glow for cards
  useEffect(() => {
    const handleMouseMove = (e) => {
      const cards = document.querySelectorAll(".spotlight-card");
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Track global page scroll progress
  useEffect(() => {
    const updateScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (docHeight > 0) {
        const progress = Math.min(
          Math.round((scrollTop / docHeight) * 100),
          100
        );
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", updateScroll, { passive: true });
    updateScroll();

    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  // Scroll Reveal Intersection Observer for sections and cards
  useEffect(() => {
    if (loading) return;

    const targets = document.querySelectorAll(
      ".section-title, .about-card, .career-card, .skill-card, .project-card, .hackathon-card, .cert-card, .github-card, .leetcode-dashboard, .resume-box, .contact-form, .contact-info"
    );

    targets.forEach((el) => el.classList.add("reveal-on-scroll"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [loading]);

  /*
    Check whether the current URL is a valid page.
    "/"                  → Portfolio
    "/resume/..."        → Resume PDF
    anything else        → 404 page
  */
  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window === "undefined") return "/";
    return window.location.pathname;
  });

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    const handleCustomNavigate = (e) => {
      const target = e.detail?.path || "/";
      if (target.includes("#")) {
        const [path, hash] = target.split("#");
        const resolvedPath = path || "/";
        window.history.pushState({}, "", target);
        setCurrentPath(resolvedPath);
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 120);
      } else {
        window.history.pushState({}, "", target);
        setCurrentPath(target);
      }
    };

    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("navigate-to", handleCustomNavigate);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("navigate-to", handleCustomNavigate);
    };
  }, []);

  const pathname = currentPath;

  const normalizedPath = pathname.replace(/\/index\.html$/, "/").replace(/\/+$/, "") || "/";
  const isHomePage = normalizedPath === "/";
  const isResumePath = pathname.startsWith("/resume/");
  const isCertificatePath = pathname.startsWith("/certificates/");

  const isNotFound = !isHomePage && !isResumePath && !isCertificatePath;

  /*
    Show custom 404 page
  */
  if (isNotFound) {
    return (
      <NotFound
        onNavigate={(target) => {
          window.dispatchEvent(
            new CustomEvent("navigate-to", { detail: { path: target } })
          );
        }}
      />
    );
  }

  /*
    Resume files are handled directly by Vite.
    React doesn't need to render the portfolio there.
  */
  if (isResumePath || isCertificatePath) {
    return null;
  }

  /*
    Main portfolio with seamless loading screen overlay reveal
  */
  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {/* Top Scroll Progress Bar */}
      <div
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* Ambient dynamic background motion */}
      <BackgroundMotion />
      <RainBackground />

      <Navbar />

      <main>
        <Hero />
        <About />
        <CareerSnapshot />
        <Skills />
        <Projects />
        <Hackathons />
        <Certifications />
        <GitHub />
        <LeetCode />
        <Resume />
        <Contact />
      </main>

      <Footer />

      {/* Floating Back to Top with Circular Scroll Progress */}
      <button
        type="button"
        className={`back-to-top ${scrollProgress > 5 ? "is-visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        title="Back to top"
      >
        <svg className="back-to-top-ring" viewBox="0 0 36 36" aria-hidden="true">
          <path
            className="ring-bg"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="ring-fill"
            strokeDasharray={`${scrollProgress}, 100`}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        <ArrowUp size={17} className="back-to-top-icon" />
      </button>

      {/* Command Palette (Cmd+K / Ctrl+K) */}
      <CommandPalette
        isOpen={isCmdOpen}
        onClose={() => setIsCmdOpen(false)}
      />
    </>
  );
}

export default App;