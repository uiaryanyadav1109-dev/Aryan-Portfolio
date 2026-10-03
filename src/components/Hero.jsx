import { useEffect, useState } from "react";
import { ArrowDown, Sparkles, MapPin, Clock } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const roles = [
  "AI / ML Enthusiast",
  "Full-Stack Developer",
  "Generative AI Explorer",
  "Hardware & IoT Builder",
  "Hackathon Developer",
];

function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Live Kolkata (IST) clock
  const [localTime, setLocalTime] = useState(() => {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Kolkata",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(new Date());
  });

  useEffect(() => {
    const updateTime = () => {
      setLocalTime(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).format(new Date())
      );
    };

    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 45 : 90;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        const nextText = currentRole.substring(
          0,
          text.length + 1
        );

        setText(nextText);

        if (nextText === currentRole) {
          setTimeout(() => {
            setIsDeleting(true);
          }, 1200);
        }
      } else {
        const nextText = currentRole.substring(
          0,
          text.length - 1
        );

        setText(nextText);

        if (nextText === "") {
          setIsDeleting(false);
          setRoleIndex(
            (prevIndex) =>
              (prevIndex + 1) % roles.length
          );
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
          <div className="hero-status-pills">
            <div className="hero-badge">
              <span className="status-dot"></span>
              OPEN TO BUILD & COLLABORATE
            </div>

            <div
              className="hero-time-pill"
              title="Live Local Time in Kolkata, India (IST)"
            >
              <MapPin size={13} className="time-pill-icon" />
              <span>Kolkata, IN</span>
              <span className="time-pill-dot">•</span>
              <Clock size={13} className="time-pill-icon" />
              <span className="time-pill-live">{localTime} IST</span>
            </div>
          </div>

          <h1>
            Hi, I'm{" "}
            <span className="gradient-text">
              Aryan Yadav.
            </span>
          </h1>


          <div className="hero-role">
            I'm a{" "}
            <span className="gradient-text">
              {text}
            </span>
            <span className="cursor">|</span>
          </div>

          <p className="hero-description">
            I build AI-powered applications,
            full-stack products, and experimental
            hardware projects. I enjoy turning ideas
            into real-world technology through
            code, AI, and continuous learning.
          </p>

          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">
              <Sparkles size={18} />
              View My Projects
            </a>

            <a
              href="https://github.com/uiaryanyadav1109-dev"
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary"
            >
              <FaGithub size={18} />
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/aryan-yadav-dev01/"
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary"
            >
              <FaLinkedin size={18} />
              LinkedIn
            </a>
          </div>
        </div>

        {/* RIGHT SIDE — YOUR PHOTO */}
        <div className="hero-image-wrapper">
          <div className="hero-image-glow"></div>

          <img
            src="/images/developer.png"
            alt="Aryan Yadav"
            className="hero-image"
          />
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