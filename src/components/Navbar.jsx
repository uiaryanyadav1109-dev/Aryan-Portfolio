import { useEffect, useState } from "react";
import { Menu, X, Sun, Moon, Search } from "lucide-react";

const NAV_SECTIONS = [
  { id: "about", label: "About" },
  { id: "career", label: "Career" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "hackathons", label: "Hackathons" },
  { id: "github", label: "GitHub" },
  { id: "leetcode", label: "LeetCode" },
  { id: "contact", label: "Contact" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    return true;
  });

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Synchronize with external theme toggle triggers (e.g. Command Palette)
  useEffect(() => {
    const handleToggle = () => setDarkMode((prev) => !prev);
    window.addEventListener("toggle-theme", handleToggle);
    return () => window.removeEventListener("toggle-theme", handleToggle);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Scroll Spy logic to detect visible section
      const allSections = ["home", ...NAV_SECTIONS.map((s) => s.id)];
      const scrollPos = window.scrollY + 180;

      for (let i = allSections.length - 1; i >= 0; i--) {
        const el = document.getElementById(allSections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(allSections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleOpenCmd = () => {
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  };

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <a
          href="#home"
          className="logo"
          onClick={handleLinkClick}
        >
          Aryan<span>.dev</span>
        </a>

        <div className={`nav-links ${isOpen ? "active" : ""}`}>
          {NAV_SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={handleLinkClick}
              className={activeSection === section.id ? "active" : ""}
            >
              {section.label}
            </a>
          ))}
        </div>

        <div className="navbar-actions">
          {/* COMMAND PALETTE TRIGGER */}
          <button
            type="button"
            className="cmd-k-nav-trigger"
            onClick={handleOpenCmd}
            title="Search & Quick Actions (Ctrl+K or ⌘K)"
            aria-label="Open Search & Quick Actions"
          >
            <Search size={18} />
          </button>

          {/* THEME TOGGLE */}
          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            aria-label={
              darkMode
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            title={
              darkMode
                ? "Light Mode"
                : "Dark Mode"
            }
          >
            {darkMode ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          {/* MOBILE MENU TOGGLE */}
          <button
            className="mobile-menu-button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={
              isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;