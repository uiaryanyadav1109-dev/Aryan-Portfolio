import { ArrowUp, Code2 } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-container">
        {/* SOCIAL LINKS ROW */}
        <div className="footer-links">
          <a
            href="https://github.com/uiaryanyadav1109-dev"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            title="GitHub"
            className="footer-link-btn"
          >
            <FaGithub size={18} />
          </a>

          <a
            href="https://www.linkedin.com/in/aryan-yadav-dev01/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
            className="footer-link-btn"
          >
            <FaLinkedin size={18} />
          </a>

          <a
            href="https://www.instagram.com/itz.aryxn._.01/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            title="Instagram"
            className="footer-link-btn"
          >
            <FaInstagram size={18} />
          </a>

          <a
            href="https://leetcode.com/u/aryanyadav_11/"
            target="_blank"
            rel="noreferrer"
            aria-label="LeetCode"
            title="LeetCode"
            className="footer-link-btn"
          >
            <Code2 size={18} />
          </a>

          <a
            href="#home"
            aria-label="Back to top"
            title="Back to top"
            className="footer-link-btn footer-back-to-top"
          >
            <ArrowUp size={18} />
          </a>
        </div>

        {/* COPYRIGHT */}
        <p className="footer-copyright">
          Designed & Built by <span>Aryan Yadav</span> • {currentYear}
        </p>

        {/* TAGLINE */}
        <p className="footer-tagline">
          CODE → BUILD → BREAK → LEARN → REPEAT
        </p>
      </div>
    </footer>
  );
}

export default Footer;
