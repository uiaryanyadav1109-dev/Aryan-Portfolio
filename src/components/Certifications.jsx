import { Award, CheckCircle2, ShieldCheck, Sparkles, ExternalLink, Code2, BrainCircuit } from "lucide-react";
import { certifications } from "../data/certifications";


const CERT_ICONS = {
  Code2: Code2,
  Sparkles: Sparkles,
  BrainCircuit: BrainCircuit,
};

function Certifications() {
  return (
    <section id="certifications" className="section certifications-section">
      <div className="container">
        <div className="section-title">
          <span>Continuous Learning</span>

          <h2>
            Technical <span className="gradient-text">Certifications</span>.
          </h2>

          <p>
            Structured coursework and verified skill assessments demonstrating strong foundations
            in Python programming, Generative AI applications, and Retrieval-Augmented Generation (RAG).
          </p>
        </div>

        <div className="certifications-grid">
          {certifications.map((cert) => {
            const hasLink = Boolean(cert.verifyUrl);

            return (
              <article
                className="cert-card spotlight-card"
                key={cert.id}
                tabIndex={0}
                aria-label={`Certificate: ${cert.title}`}
              >
                <div className="cert-card-header">
                  <div className="cert-icon-box">
                    <Award size={20} className="cert-icon" />
                  </div>

                  <div className="cert-header-meta">
                    <span className="cert-status-badge">
                      <ShieldCheck size={13} />
                      {cert.status}
                    </span>
                    {(() => {
                        const IconComp = CERT_ICONS[cert.icon] || Award;
                        return (
                          <span className="cert-badge-icon" aria-hidden="true">
                            <IconComp size={15} />
                          </span>
                        );
                      })()}
                  </div>
                </div>

                <div className="cert-issuer-row">
                  <span className="cert-issuer">{cert.issuer}</span>
                  {cert.date && (
                    <span className="cert-date">• {cert.date}</span>
                  )}
                </div>

                <h3 className="cert-title">{cert.title}</h3>

                {cert.highlight && (
                  <div className="cert-highlight-pill">
                    <Sparkles size={12} />
                    <span>{cert.highlight}</span>
                  </div>
                )}

                <p className="cert-description">{cert.description}</p>

                {cert.skills && (
                  <div className="cert-skills-row">
                    {cert.skills.map((skill) => (
                      <span key={skill} className="cert-skill-chip">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                <div className="cert-card-footer">
                  {hasLink ? (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-secondary cert-action-btn"
                    >
                      <ExternalLink size={14} />
                      View Certificate
                    </a>
                  ) : (
                    <div className="cert-verified-placeholder">
                      <CheckCircle2 size={14} className="placeholder-check" />
                      <span>Credential Completed & Verified</span>
                    </div>
                  )}

                  {cert.credentialId && (
                    <span className="cert-id-text">ID: {cert.credentialId}</span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Certifications;
