import { useEffect, useState } from "react";
import {
  ArrowDown,
  Sparkles,
  Award,
  FileText,
  Mail,
  Code2,
  Cpu,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const roles = [
  "Aspiring AI/ML Engineer",
  "Full-Stack Developer",
  "Generative AI Enthusiast",
  "Rapid Hackathon Builder",
  "Hardware & IoT Explorer",
];

function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleImageMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -(y * 12), y: x * 12 });
  };

  const handleImageMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };


  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        const nextText = currentRole.substring(0, text.length + 1);
        setText(nextText);

        if (nextText === currentRole) {
          setTimeout(() => {
            setIsDeleting(true);
          }, 1400);
        }
      } else {
        const nextText = currentRole.substring(0, text.length - 1);
        setText(nextText);

        if (nextText === "") {
          setIsDeleting(false);
          setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, roleIndex]);

  return (
    <section id="home" className="hero">
      <div className="container hero-container">
        {/* LEFT SIDE */}
        <div className="hero-content fade-up">

          <h1>
            Hi, I'm <span className="gradient-text">Aryan Yadav.</span>
          </h1>

          <div className="hero-role-wrapper">
            <div className="hero-role-subtitle">
              Aspiring AI/ML Engineer • Full-Stack Developer • Generative AI Enthusiast
            </div>
            <div className="hero-role">
              Specializing in <span className="gradient-text">{text}</span>
              <span className="cursor">|</span>
            </div>
          </div>

          <p className="hero-description">
            I'm a Computer Science student passionate about AI, full-stack
            development, and building technology that solves real-world
            problems. Through projects and hackathons, I explore new ideas,
            develop practical solutions, and continuously strengthen my
            engineering skills.
          </p>

          {/* 4 PRIMARY CALL-TO-ACTION BUTTONS */}
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">
              <Sparkles size={17} />
              View Projects
            </a>

            <a href="#certifications" className="btn btn-secondary">
              <Award size={17} />
              Explore Certifications
            </a>

            <a
              href="/resume/Aryan_Yadav_Resume.pdf"
              download="Aryan_Yadav_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary"
            >
              <FileText size={17} />
              Download Resume
            </a>

            <a href="#contact" className="btn btn-secondary">
              <Mail size={17} />
              Contact Me
            </a>
          </div>

          {/* SOCIAL LINKS ROW */}
          <div className="hero-social-row">
            <span className="hero-social-label">Connect:</span>
            <div className="hero-social-links">
              <a
                href="https://github.com/uiaryanyadav1109-dev"
                target="_blank"
                rel="noreferrer"
                className="hero-social-icon"
                title="GitHub Profile"
                aria-label="GitHub Profile"
              >
                <FaGithub size={17} />
              </a>

              <a
                href="https://www.linkedin.com/in/aryan-yadav-dev01/"
                target="_blank"
                rel="noreferrer"
                className="hero-social-icon"
                title="LinkedIn Profile"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin size={17} />
              </a>

              <a
                href="https://www.instagram.com/itz.aryxn._.01/"
                target="_blank"
                rel="noreferrer"
                className="hero-social-icon"
                title="Instagram Profile"
                aria-label="Instagram Profile"
              >
                <FaInstagram size={17} />
              </a>

              <a
                href="https://leetcode.com/u/aryanyadav_11/"
                target="_blank"
                rel="noreferrer"
                className="hero-social-icon"
                title="LeetCode Profile"
                aria-label="LeetCode Profile"
              >
                <Code2 size={17} />
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE — PHOTO WITH 3D TILT & FLOATING BADGES */}
        <div
          className="hero-image-wrapper"
          onMouseMove={handleImageMouseMove}
          onMouseLeave={handleImageMouseLeave}
          style={{
            transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition:
              tilt.x === 0 && tilt.y === 0
                ? "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
                : "transform 0.1s ease-out",
          }}
        >
          <div className="hero-image-glow"></div>

          <img
            src="/images/developer.png"
            alt="Aryan Yadav - AI/ML Engineer & Full-Stack Developer"
            className="hero-image"
          />

          {/* Floating tech satellite chips */}
          <div className="hero-floating-chip chip-ai" title="AI & Machine Learning">
            <Sparkles size={13} className="chip-icon-ai" />
            <span>AI / ML & LLMs</span>
          </div>

          <div className="hero-floating-chip chip-dev" title="Full-Stack Engineering">
            <Code2 size={13} className="chip-icon-dev" />
            <span>Full-Stack</span>
          </div>

          <div className="hero-floating-chip chip-iot" title="IoT & Embedded Hardware">
            <Cpu size={13} className="chip-icon-iot" />
            <span>IoT & Hardware</span>
          </div>
        </div>

        <a
          href="#about"
          className="hero-scroll"
          aria-label="Scroll to About section"
        >
          <ArrowDown size={18} />
        </a>
      </div>
    </section>
  );
}

export default Hero;