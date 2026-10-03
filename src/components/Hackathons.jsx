import { Trophy } from "lucide-react";
import { hackathons } from "../data/hackathons";

function Hackathons() {
  return (
    <section id="hackathons" className="section">
      <div className="container">

        <div className="section-title">
          <span>Hackathons & Experience</span>

          <h2>
            Build fast. Learn faster.
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

              <div className="hackathon-icon">
                <Trophy size={20} />
              </div>

              <div className="hackathon-badge">
                {hackathon.icon}
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