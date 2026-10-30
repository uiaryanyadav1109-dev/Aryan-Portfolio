import { Trophy, ExternalLink, Calendar, Code, Award, Sparkles, HeartPulse, Lightbulb, Zap, Code2, Rocket } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { hackathons } from "../data/hackathons";


const HACKATHON_ICONS = {
  Trophy: Trophy,
  HeartPulse: HeartPulse,
  Lightbulb: Lightbulb,
  Zap: Zap,
  Code2: Code2,
  Rocket: Rocket,
  Sparkles: Sparkles,
};

function Hackathons() {
  return (
    <section id="hackathons" className="section">
      <div className="container">
        <div className="section-title">
          <span>Hackathons & Achievements</span>

          <h2>
            Build Fast. <span className="gradient-text">Deliver Solutions</span>.
          </h2>

          <p>
            Competitive hackathons and collaborative development sprints where I turn
            ambitious ideas into working software, test technical limits, and solve real-world problems.
          </p>
        </div>

        <div className="hackathons-grid">
          {hackathons.map((hackathon) => {
            const isUpcoming = hackathon.status === "Upcoming";
            const isTopRanked = hackathon.status.includes("Top") || hackathon.status.includes("Shortlisted");

            return (
              <article
                className={`hackathon-card spotlight-card ${isUpcoming ? "hackathon-card-upcoming" : ""} ${isTopRanked ? "hackathon-card-ranked" : ""}`}
                key={hackathon.name}
              >
                <div className="hackathon-card-header">
                  <div className="hackathon-icon">
                    <Trophy size={19} />
                  </div>

                  <div className="hackathon-header-badges">
                    <span
                      className={`hackathon-status-pill ${
                        isUpcoming
                          ? "status-upcoming"
                          : isTopRanked
                          ? "status-ranked"
                          : "status-completed"
                      }`}
                    >
                      {isUpcoming && <Sparkles size={11} className="status-sparkle" />}
                      {hackathon.status}
                    </span>
                    {(() => {
                        const IconComponent = HACKATHON_ICONS[hackathon.icon] || Trophy;
                        return (
                          <span className="hackathon-badge" title={hackathon.name}>
                            <IconComponent size={14} />
                          </span>
                        );
                      })()}
                  </div>
                </div>

                <div className="hackathon-meta-row">
                  <span className="hackathon-meta-item">
                    <Calendar size={13} /> {hackathon.year}
                  </span>
                </div>

                <h3>{hackathon.name}</h3>

                <p className="hackathon-role">{hackathon.role}</p>

                {hackathon.project && (
                  <div className="hackathon-project-pill">
                    <Code size={13} />
                    <span>
                      Project: <strong>{hackathon.project}</strong>
                    </span>
                  </div>
                )}

                {hackathon.achievement && (
                  <div className="hackathon-achievement-highlight">
                    <Award size={14} className="achievement-icon" />
                    <span>{hackathon.achievement}</span>
                  </div>
                )}

                <p className="hackathon-desc">{hackathon.description}</p>

                {hackathon.tags && (
                  <div className="hackathon-tags">
                    {hackathon.tags.map((tag) => (
                      <span key={tag} className="hackathon-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {hackathon.link && (
                  <div className="hackathon-actions">
                    <a
                      href={hackathon.link}
                      target="_blank"
                      rel="noreferrer"
                      className="hackathon-link-btn"
                    >
                      <FaGithub size={14} />
                      <span>View Hackathon Project</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Hackathons;