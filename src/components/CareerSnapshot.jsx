import {
  GraduationCap,
  BriefcaseBusiness,
  Trophy,
  BrainCircuit,
  Cpu,
  FileText,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

function CareerSnapshot() {
  const snapshotItems = [
    {
      icon: GraduationCap,
      label: "Education",
      value: "B.Tech — Computer Science & Technology",
    },
    {
      icon: BriefcaseBusiness,
      label: "Experience",
      value: "Hackathons + Real-World Projects",
    },
    {
      icon: Trophy,
      label: "Recognition",
      value: "Competitive Hackathons",
    },
    {
      icon: BrainCircuit,
      label: "Core Focus",
      value: "AI / ML + Full-Stack Development",
    },
    {
      icon: Cpu,
      label: "Exploring",
      value: "Hardware + IoT",
    },
  ];

  return (
    <section id="career" className="section career-section">
      <div className="container">
        <div className="section-title">
          <span>Career Snapshot</span>
          <h2>
            What I'm <span className="gradient-text">Building</span>.
          </h2>
          <p>
            A quick look at my technical direction, experience, and areas of exploration.
          </p>
        </div>

        {/* FOCUS PIPELINE CARD */}
        <div className="career-pipeline-card">
          <div className="career-focus">
            <div className="career-focus-item">
              <span className="career-focus-dot"></span>
              <span>AI / ML</span>
            </div>
            <div className="career-focus-line"></div>
            <div className="career-focus-item">
              <span className="career-focus-dot"></span>
              <span>FULL-STACK</span>
            </div>
            <div className="career-focus-line"></div>
            <div className="career-focus-item">
              <span className="career-focus-dot"></span>
              <span>HARDWARE &amp; IOT</span>
            </div>
          </div>

          <div className="career-connector">
            <span className="career-connector-arrow">↓</span>
          </div>

          <div className="career-product">
            <div className="career-product-glow"></div>
            <div className="career-product-content">
              <span className="career-product-eyebrow">
                <Sparkles size={13} /> THE PRIMARY GOAL
              </span>
              <h3>BUILDING IMPACTFUL PRODUCTS</h3>
              <p>
                Turning ideas into practical, reliable technology through software engineering,
                artificial intelligence, and embedded hardware.
              </p>
            </div>
          </div>
        </div>

        {/* SNAPSHOT GRID (3 COLUMNS) */}
        <div className="career-grid">
          {snapshotItems.map((item) => {
            const Icon = item.icon;

            return (
              <div className="career-card spotlight-card" key={item.label}>
                <div className="career-card-icon">
                  <Icon size={20} />
                </div>
                <div className="career-card-info">
                  <span className="career-card-label">{item.label}</span>
                  <strong className="career-card-value">{item.value}</strong>
                </div>
              </div>
            );
          })}

          {/* RESUME CARD */}
          <a
            href="/resume/Aryan_Yadav_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="career-card career-resume spotlight-card"
          >
            <div className="career-card-icon">
              <FileText size={20} />
            </div>
            <div className="career-card-info">
              <span className="career-card-label">Curriculum Vitae</span>
              <strong className="career-card-value career-resume-action">
                <span>View Full Resume</span>
                <ArrowUpRight size={15} />
              </strong>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

export default CareerSnapshot;
