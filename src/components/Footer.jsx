import {
  ArrowUp,
  Code2,
} from "lucide-react";

import {
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

function Footer() {
  const currentYear =
    new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-links">
          <a
            href="https://github.com/uiaryanyadav1109-dev"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <FaGithub size={18} />
          </a>

          <a
            href="https://www.linkedin.com/in/aryan-yadav-dev01/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={18} />
          </a>

          <a
            href="https://leetcode.com/u/aryanyadav_11/"
            target="_blank"
            rel="noreferrer"
            aria-label="LeetCode"
          >
            <Code2 size={18} />
          </a>

          <a
            href="#home"
            aria-label="Back to top"
          >
            <ArrowUp size={18} />
          </a>
        </div>

        <p>
          Designed & Built by{" "}
          <span>Aryan Yadav</span> •{" "}
          {currentYear}
        </p>

        <p className="footer-tagline">
          CODE → BUILD → BREAK → LEARN → REPEAT
        </p>
      </div>
    </footer>
  );
}

export default Footer;