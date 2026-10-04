import { Trophy } from "lucide-react";
import { hackathons } from "../data/hackathons";

function Hackathons() {
  return (
    <section id="hackathons" className="section">
      <div className="container">

        <div className="section-title">
          <span>Hackathons & Experience</span>

          <h2>
            Build Fast. <span className="gradient-text">Learn Faster</span>.
          </h2>

          <p>
            Hackathons have been a major part of my
            journey toward becoming a better developer.
          </p>
        </div>

        <div className="hackathons-grid">

          {hackathons.map((hackathon) => (
            <article
              className="hackathon-card spotlight-card"
              key={hackathon.name}
            >

              <div className="hackathon-card-header">
                <div className="hackathon-icon">
                  <Trophy size={19} />
                </div>
                <span className="hackathon-badge">
                  {hackathon.icon}
                </span>
              </div>

              <h3>
                {hackathon.name}
              </h3>

              <p className="hackathon-role">
                {hackathon.role}
              </p>

              <p>
                {hackathon.description}
              </p>

            </article>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Hackathons;