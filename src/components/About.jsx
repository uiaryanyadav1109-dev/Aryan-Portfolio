import {
  GraduationCap,
  BrainCircuit,
  Code2,
  Cpu,
  Rocket,
  Gamepad2,
  Sparkles,
  Headphones,
  Film,
  Compass,
} from "lucide-react";

const interests = [
  { icon: Code2, label: "Coding", desc: "Software & Systems Architecture" },
  { icon: Gamepad2, label: "Gaming", desc: "Strategy & Immersive RPGs" },
  { icon: BrainCircuit, label: "AI / ML", desc: "Deep Learning & Generative AI" },
  { icon: Headphones, label: "Music", desc: "Lo-Fi, Synthwave & Beats" },
  { icon: Film, label: "Anime", desc: "Storytelling & Visual Art" },
  { icon: Compass, label: "Travelling", desc: "Exploring New Horizons & Cultures" },
  { icon: Rocket, label: "Exploring New Tech", desc: "Tinkering with Cutting-Edge Tools" },
];

const snapshotItems = [
  {
    icon: GraduationCap,
    label: "Education",
    value: "B.Tech — CST",
    accent: "mono",
  },
  {
    icon: BrainCircuit,
    label: "Focus",
    value: "AI / ML",
    accent: "mono",
  },
  {
    icon: Code2,
    label: "Development",
    value: "Full-Stack",
    accent: "mono",
  },
  {
    icon: Cpu,
    label: "Hardware",
    value: "IoT / Embedded",
    accent: "mono",
  },
  {
    icon: Rocket,
    label: "Building",
    value: "Real-World Products",
    accent: "mono",
  },
  {
    icon: Gamepad2,
    label: "Interests",
    value: "Tech & Gaming",
    accent: "mono",
  },
];

function About() {
  return (
    <section id="about" className="section">
      <div className="container">

        <div className="section-title">
          <span>About Me</span>
          <h2>
            Building at the intersection of <span className="gradient-text">AI & Software</span>.
          </h2>

          <p>
            I'm a Computer Science student passionate about
            building intelligent software, full-stack products,
            and technology that solves real-world problems.
          </p>
        </div>

        <div className="about-grid">

          {/* About Content */}
          <div className="about-content">

            <h3>
              Turning ideas into
              <span className="gradient-text">
                {" "}working products.
              </span>
            </h3>

            <p>
              I'm currently pursuing my{" "}
              <span className="about-highlight">
                B.Tech in Computer Science & Technology
              </span>{" "}
              at JIS College of Engineering.
            </p>

            <p>
              My interests span across{" "}
              <span className="about-highlight">
                Artificial Intelligence, Machine Learning,
                Generative AI, Full-Stack Development,
                Hardware and IoT.
              </span>
            </p>

            <p>
              I enjoy participating in hackathons,
              experimenting with new technologies, and
              turning ideas into practical solutions.
            </p>

            {/* PERSONAL INTERESTS & PASSIONS */}
            <div className="about-interests">
              <span className="about-interests-eyebrow">
                <Sparkles size={12} className="about-interests-sparkle" />
                INTERESTS & PASSIONS
              </span>

              <div className="interest-chips">
                {interests.map((item) => (
                  <div
                    className="interest-chip"
                    key={item.label}
                    title={item.desc}
                  >
                    <item.icon size={15} className="interest-icon-svg" />
                    <span className="interest-text">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>


          {/* Developer Snapshot */}
          <div className="about-card snapshot-card spotlight-card">

            <div className="snapshot-header">
              <div>
                <span className="snapshot-eyebrow">
                  DEVELOPER PROFILE
                </span>

                <h3>
                  Developer Snapshot
                </h3>
              </div>

              <div className="snapshot-status">
                <span></span>
                Building
              </div>
            </div>


            <div className="snapshot-grid">

              {snapshotItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    className={`snapshot-item snapshot-${item.accent}`}
                    key={item.label}
                    title={`${item.label}: ${item.value}`}
                  >
                    <div className="snapshot-icon">
                      <Icon size={20} />
                    </div>

                    <div className="snapshot-info">
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                    </div>
                  </div>
                );
              })}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default About;