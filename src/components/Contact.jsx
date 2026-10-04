import { useState, useEffect } from "react";
import {
  Code2,
  Send,
  CheckCircle2,
  AlertCircle,
  Mail,
  Phone,
  Copy,
  Check,
  MapPin,
  Clock,
} from "lucide-react";

import {
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

import {
  submitContactForm,
} from "../services/contact";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    botcheck: "",
  });

  const [feedback, setFeedback] = useState({
    type: null, // "success" | "error" | null
    message: "",
  });

  const [sending, setSending] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  // Live Kolkata (IST) time
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

  const handleCopy = (text, field, e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear feedback when user starts editing again
    if (feedback.type === "error") {
      setFeedback({ type: null, message: "" });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSending(true);
    setFeedback({ type: null, message: "" });

    try {
      const result = await submitContactForm(formData);

      setFeedback({
        type: "success",
        message: result.message,
      });

      // Reset form fields on success
      setFormData({
        name: "",
        email: "",
        message: "",
        botcheck: "",
      });
    } catch (error) {
      setFeedback({
        type: "error",
        message: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-title">
          <span>Get In Touch</span>

          <h2>
            Let's Build Something <span className="gradient-text">Great</span>.
          </h2>

          <p>
            Have an idea, project, hackathon,
            collaboration or simply want to connect?
            Feel free to reach out.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <h3>Let's connect.</h3>

            <p>
              I'm always interested in discussing
              interesting ideas, AI projects,
              full-stack applications and
              technology experiments.
            </p>

            <div className="contact-location-card">
              <div className="contact-location-header">
                <MapPin size={15} className="contact-location-icon" />
                <span>Kolkata, India <strong>(IST)</strong></span>
              </div>
              <div className="contact-location-time">
                <Clock size={14} className="contact-time-icon" />
                <span>Local Time: <strong>{localTime}</strong></span>
                <span className="contact-live-dot" title="Active timezone"></span>
              </div>
            </div>

            <div className="contact-links">
              <a
                href="https://github.com/uiaryanyadav1109-dev"
                target="_blank"
                rel="noreferrer"
                className="contact-link"
              >
                <FaGithub size={19} />
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/aryan-yadav-dev01/"
                target="_blank"
                rel="noreferrer"
                className="contact-link"
              >
                <FaLinkedin size={19} />
                LinkedIn
              </a>

              <a
                href="https://leetcode.com/u/aryanyadav_11/"
                target="_blank"
                rel="noreferrer"
                className="contact-link"
              >
                <Code2 size={19} />
                LeetCode
              </a>

              <div className="contact-link-with-copy">
                <a
                  href="mailto:uiaryanyadav1109@gmail.com"
                  className="contact-link"
                >
                  <Mail size={19} />
                  <span>uiaryanyadav1109@gmail.com</span>
                </a>

                <button
                  type="button"
                  className="contact-copy-btn"
                  onClick={(e) =>
                    handleCopy("uiaryanyadav1109@gmail.com", "email", e)
                  }
                  title="Copy email to clipboard"
                  aria-label="Copy email to clipboard"
                >
                  {copiedField === "email" ? (
                    <span className="copy-feedback">
                      <Check size={14} /> Copied!
                    </span>
                  ) : (
                    <Copy size={15} />
                  )}
                </button>
              </div>

              <div className="contact-link-with-copy">
                <a
                  href="tel:+916289492367"
                  className="contact-link"
                >
                  <Phone size={19} />
                  <span>+91 6289492367</span>
                </a>

                <button
                  type="button"
                  className="contact-copy-btn"
                  onClick={(e) =>
                    handleCopy("+916289492367", "phone", e)
                  }
                  title="Copy phone number to clipboard"
                  aria-label="Copy phone number to clipboard"
                >
                  {copiedField === "phone" ? (
                    <span className="copy-feedback">
                      <Check size={14} /> Copied!
                    </span>
                  ) : (
                    <Copy size={15} />
                  )}
                </button>
              </div>
            </div>
          </div>

          <form
            className="contact-form spotlight-card"
            onSubmit={handleSubmit}
            noValidate={false}
          >
            {/* Anti-spam honeypot field (hidden from genuine users) */}
            <div
              style={{
                display: "none",
                position: "absolute",
                left: "-9999px",
              }}
              aria-hidden="true"
            >
              <label htmlFor="botcheck">Leave this empty</label>
              <input
                id="botcheck"
                name="botcheck"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={formData.botcheck}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="name">
                Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                minLength={2}
                maxLength={100}
                required
                disabled={sending}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={sending}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">
                Message
              </label>

              <textarea
                id="message"
                name="message"
                placeholder="Tell me about your idea, project, or opportunity..."
                value={formData.message}
                onChange={handleChange}
                minLength={10}
                maxLength={3000}
                required
                disabled={sending}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={sending}
            >
              <Send size={17} />

              {sending
                ? "Sending..."
                : "Send Message"}
            </button>

            {feedback.message && (
              <div
                className={`contact-status-banner ${
                  feedback.type === "success"
                    ? "status-success"
                    : "status-error"
                }`}
                role="alert"
              >
                {feedback.type === "success" ? (
                  <CheckCircle2 size={18} className="status-banner-icon" />
                ) : (
                  <AlertCircle size={18} className="status-banner-icon" />
                )}
                <span>{feedback.message}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;