import { useState } from "react";
import {
  FileText,
  Download,
  ExternalLink,
  GraduationCap,
  Award,
  CheckCircle2,
  Code2,
} from "lucide-react";

function Resume() {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadClick = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <section id="resume" className="section resume-section">
      <div className="container">
        <div className="section-title">
          <span>Credentials & Curriculum Vitae</span>
          <h2>
            Verified <span className="gradient-text">Background & Resume</span>.
          </h2>
          <p>
            Explore my verified technical education, coursework, hackathon achievements,
            and professional engineering experience.
          </p>
        </div>

        <div className="resume-grid">
          {/* Left: Summary Card */}
          <div className="resume-summary-card spotlight-card">
            <div className="resume-summary-header">
              <div className="resume-avatar-badge">
                <FileText size={24} />
              </div>
              <div>
                <span className="resume-eyebrow">OFFICIAL CV & CREDENTIALS</span>
                <h3>Aryan Yadav</h3>
                <p className="resume-role">
                  AI/ML Engineer & Full-Stack Developer
                </p>
              </div>
            </div>

            <div className="resume-highlights">
              <div className="resume-highlight-item">
                <GraduationCap size={18} className="resume-item-icon" />
                <div>
                  <strong>B.Tech — Computer Science & Technology</strong>
                  <span>JIS College of Engineering (Affiliated with MAKAUT)</span>
                </div>
              </div>

              <div className="resume-highlight-item">
                <Code2 size={18} className="resume-item-icon" />
                <div>
                  <strong>Core Specializations</strong>
                  <span>AI/ML, Generative AI, Full-Stack Architecture, Python & React</span>
                </div>
              </div>

              <div className="resume-highlight-item">
                <Award size={18} className="resume-item-icon" />
                <div>
                  <strong>Competitive Achievements</strong>
                  <span>Smart India Hackathon (SIH) Top 11 Finalist, HackInverse 1.0</span>
                </div>
              </div>
            </div>

            <div className="resume-badges-row">
              <span className="resume-pill">
                <CheckCircle2 size={13} /> Open to Engineering Roles
              </span>
              <span className="resume-pill">
                <CheckCircle2 size={13} /> Updated for 2026
              </span>
            </div>
          </div>

          {/* Right: Actions Card */}
          <div className="resume-box spotlight-card">
            <div className="resume-action-icon">
              <FileText size={36} />
            </div>

            <h3>Download or Inspect CV</h3>
            <p>
              Access the complete document detailing my academic coursework, technical skills,
              production-grade software projects, and verified credentials.
            </p>

            <div className="resume-buttons">
              <a
                href="/resume/Aryan_Yadav_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
                title="Open PDF in new tab"
              >
                <ExternalLink size={16} />
                <span>View Full PDF</span>
              </a>

              <a
                href="/resume/Aryan_Yadav_Resume.pdf"
                download="Aryan_Yadav_Resume.pdf"
                onClick={handleDownloadClick}
                className="btn btn-secondary"
                title="Download PDF directly to your device"
              >
                <Download size={16} />
                <span>{downloadSuccess ? "Downloaded!" : "Download PDF"}</span>
              </a>
            </div>

            <span className="resume-meta-note">
              Format: PDF • Size: ~34 KB • Printable & ATS-Optimized
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Resume;
