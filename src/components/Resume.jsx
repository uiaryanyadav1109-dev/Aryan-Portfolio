import { FileText } from "lucide-react";

function Resume() {
  return (
    <section id="resume" className="section">
      <div className="container">
        <div className="section-title">
          <span>Credentials & Resume</span>
          <h2>
            Want To Know <span className="gradient-text">More</span>?
          </h2>
          <p>
            Explore my verified technical background, coursework, projects, and hackathon accomplishments.
          </p>
        </div>

        <div className="resume-box spotlight-card">

          <FileText
            size={38}
            color="var(--blue)"
            style={{ margin: "0 auto 20px" }}
          />

          <h3>Curriculum Vitae</h3>

          <p>
            Check out my resume to learn more about
            my education, technical skills, projects,
            hackathons and experience.
          </p>

          <div className="resume-buttons">
            <a
              href="/resume/Aryan_Yadav_Resume_With_Photo.pdf"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              <FileText size={17} />
              View Resume
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Resume;