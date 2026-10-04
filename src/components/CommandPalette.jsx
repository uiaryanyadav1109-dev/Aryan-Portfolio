import { useState, useEffect, useRef } from "react";
import {
  Search,
  X,
  Home,
  User,
  Briefcase,
  Cpu,
  Layers,
  Trophy,
  FileText,
  Mail,
  Phone,
  Moon,
  Sun,
  Code2,
  ExternalLink,
  Check,
  CornerDownLeft,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedAction, setCopiedAction] = useState("");
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Define commands catalog
  const commands = [
    // Navigation
    {
      id: "nav-home",
      group: "Navigation",
      title: "Go to Home",
      icon: Home,
      action: () => {
        const el = document.getElementById("home");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "nav-about",
      group: "Navigation",
      title: "Go to About Me",
      icon: User,
      action: () => {
        const el = document.getElementById("about");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "nav-career",
      group: "Navigation",
      title: "Go to Career Snapshot",
      icon: Briefcase,
      action: () => {
        const el = document.getElementById("career");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "nav-skills",
      group: "Navigation",
      title: "Go to Skills & Tech Stack",
      icon: Cpu,
      action: () => {
        const el = document.getElementById("skills");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "nav-projects",
      group: "Navigation",
      title: "Go to Featured Projects",
      icon: Layers,
      action: () => {
        const el = document.getElementById("projects");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "nav-hackathons",
      group: "Navigation",
      title: "Go to Hackathons & Awards",
      icon: Trophy,
      action: () => {
        const el = document.getElementById("hackathons");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "nav-github",
      group: "Navigation",
      title: "Go to GitHub Overview",
      icon: FaGithub,
      action: () => {
        const el = document.getElementById("github");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "nav-leetcode",
      group: "Navigation",
      title: "Go to LeetCode Statistics",
      icon: Code2,
      action: () => {
        const el = document.getElementById("leetcode");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "nav-resume",
      group: "Navigation",
      title: "Go to Resume Section",
      icon: FileText,
      action: () => {
        const el = document.getElementById("resume");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "nav-contact",
      group: "Navigation",
      title: "Go to Contact",
      icon: Mail,
      action: () => {
        const el = document.getElementById("contact");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      },
    },

    // Quick Actions
    {
      id: "action-theme",
      group: "Quick Actions",
      title: "Toggle Dark / Light Theme",
      icon: Sun,
      action: () => {
        window.dispatchEvent(new CustomEvent("toggle-theme"));
      },
    },
    {
      id: "action-copy-email",
      group: "Quick Actions",
      title: "Copy Email (uiaryanyadav1109@gmail.com)",
      icon: Mail,
      action: () => {
        navigator.clipboard.writeText("uiaryanyadav1109@gmail.com");
        setCopiedAction("email");
        setTimeout(() => setCopiedAction(""), 2000);
      },
    },
    {
      id: "action-copy-phone",
      group: "Quick Actions",
      title: "Copy Phone (+91 6289492367)",
      icon: Phone,
      action: () => {
        navigator.clipboard.writeText("+916289492367");
        setCopiedAction("phone");
        setTimeout(() => setCopiedAction(""), 2000);
      },
    },
    {
      id: "action-view-resume",
      group: "Quick Actions",
      title: "Open Resume PDF",
      icon: FileText,
      action: () => {
        window.open("/resume/Aryan_Yadav_Resume_With_Photo.pdf", "_blank");
      },
    },

    // External Profiles
    {
      id: "link-github",
      group: "Profiles",
      title: "Open GitHub Profile",
      icon: FaGithub,
      action: () => {
        window.open("https://github.com/uiaryanyadav1109-dev", "_blank");
      },
    },
    {
      id: "link-linkedin",
      group: "Profiles",
      title: "Open LinkedIn Profile",
      icon: FaLinkedin,
      action: () => {
        window.open(
          "https://www.linkedin.com/in/aryan-yadav-dev01/",
          "_blank"
        );
      },
    },
    {
      id: "link-leetcode",
      group: "Profiles",
      title: "Open LeetCode Profile",
      icon: Code2,
      action: () => {
        window.open("https://leetcode.com/u/aryanyadav_11/", "_blank");
      },
    },
  ];

  // Filter commands by query
  const filteredCommands = commands.filter((cmd) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.group.toLowerCase().includes(q)
    );
  });

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Focus input when opened & lock scroll
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const timer = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 50);

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector(".cmd-item.is-active");
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex]);

  // Handle keyboard events (up, down, enter, escape)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredCommands.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredCommands.length - 1
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        const selected = filteredCommands[selectedIndex];
        if (selected) {
          selected.action();
          if (
            selected.id !== "action-copy-email" &&
            selected.id !== "action-copy-phone"
          ) {
            onClose();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="cmd-palette-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
    >
      <div
        className="cmd-palette-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* SEARCH INPUT */}
        <div className="cmd-input-wrapper">
          <Search size={18} className="cmd-search-icon" />
          <input
            ref={inputRef}
            type="text"
            className="cmd-input"
            placeholder="Type a command or search sections..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query ? (
            <button
              type="button"
              className="cmd-clear-btn"
              onClick={() => setQuery("")}
              aria-label="Clear query"
            >
              <X size={15} />
            </button>
          ) : (
            <span className="cmd-kbd-badge">ESC</span>
          )}
        </div>

        {/* FEEDBACK BANNER (IF COPIED) */}
        {copiedAction && (
          <div className="cmd-feedback-toast">
            <Check size={14} />
            <span>
              Copied {copiedAction === "email" ? "Email" : "Phone"} to clipboard!
            </span>
          </div>
        )}

        {/* COMMAND LIST */}
        <div className="cmd-list" ref={listRef}>
          {filteredCommands.length === 0 ? (
            <div className="cmd-empty-state">
              No matching commands for "{query}"
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const Icon = cmd.icon;
              const isActive = idx === selectedIndex;

              return (
                <div
                  key={cmd.id}
                  className={`cmd-item ${isActive ? "is-active" : ""}`}
                  onClick={() => {
                    cmd.action();
                    if (
                      cmd.id !== "action-copy-email" &&
                      cmd.id !== "action-copy-phone"
                    ) {
                      onClose();
                    }
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                >
                  <div className="cmd-item-left">
                    <span className="cmd-item-icon">
                      <Icon size={16} />
                    </span>
                    <span className="cmd-item-title">{cmd.title}</span>
                  </div>

                  <div className="cmd-item-right">
                    <span className="cmd-item-group">{cmd.group}</span>
                    {isActive && (
                      <span className="cmd-enter-hint">
                        <CornerDownLeft size={12} />
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* FOOTER */}
        <div className="cmd-palette-footer">
          <div className="cmd-footer-shortcuts">
            <span className="shortcut-chip">
              <kbd>↑</kbd> <kbd>↓</kbd> navigate
            </span>
            <span className="shortcut-chip">
              <kbd>↵</kbd> select
            </span>
            <span className="shortcut-chip">
              <kbd>esc</kbd> close
            </span>
          </div>
          <span className="cmd-footer-brand">Aryan.dev Command Menu</span>
        </div>
      </div>
    </div>
  );
}

export default CommandPalette;
