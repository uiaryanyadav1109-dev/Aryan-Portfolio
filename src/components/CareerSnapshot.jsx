import {
  GraduationCap,
  BriefcaseBusiness,
  Trophy,
  BrainCircuit,
  Cpu,
  FileText,
  ArrowUpRight,
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
            A quick look at my technical direction,
            experience, and areas of exploration.
          </p>
        </div>

        {/* FOCUS AREAS */}
        <div className="career-focus">

          <div className="career-focus-item">
            <span>AI / ML</span>
          </div>

          <div className="career-focus-line"></div>

          <div className="career-focus-item">
            <span>FULL-STACK</span>
          </div>

          <div className="career-focus-line"></div>

          <div className="career-focus-item">
            <span>HARDWARE</span>
          </div>

        </div>

        <div className="career-connector">
          <span></span>
        </div>

        <div className="career-product">
          <div className="career-product-glow"></div>

          <div className="career-product-content">
            <span>THE GOAL</span>
            <h3>BUILDING PRODUCTS</h3>
            <p>
              Turning ideas into practical technology
              through software, AI, and hardware.
            </p>
          </div>
        </div>

        {/* SNAPSHOT GRID */}
        <div className="career-grid">

          {snapshotItems.map((item) => {
            const Icon = item.icon;

            return (
              <div className="career-card spotlight-card" key={item.label}>
                <div className="career-card-icon">
                  <Icon size={19} />
                </div>

                <div>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              </div>
            );
          })}

          {/* RESUME */}
          <a
            href="/resume/Aryan_Yadav_Resume_With_Photo.pdf"
            target="_blank"
            rel="noreferrer"
            className="career-card career-resume spotlight-card"
          >
            <div className="career-card-icon">
              <FileText size={19} />
            </div>

            <div>
              <span>Resume</span>
              <strong>
                Download Resume
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