import { useEffect } from "react";
import {
  X,
  ExternalLink,
  CheckCircle2,
  Cpu,
  Sparkles,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="project-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div
        className="project-modal-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL HEADER */}
        <div className="project-modal-header">
          <div className="project-modal-badges">
            <span className="project-status">{project.status}</span>
            <span className="project-category-badge">{project.category}</span>
          </div>

          <button
            type="button"
            className="project-modal-close"
            onClick={onClose}
            aria-label="Close modal"
            title="Close (Esc)"
          >
            <X size={18} />
            <span className="close-kbd">ESC</span>
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="project-modal-body">
          <h2 id="modal-project-title" className="project-modal-title">
            {project.title}
          </h2>

          {project.architecture && (
            <div className="project-modal-arch">
              <Cpu size={15} className="arch-icon" />
              <span>{project.architecture}</span>
            </div>
          )}

          <p className="project-modal-desc">{project.description}</p>

          {/* HIGHLIGHTS */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="project-modal-section">
              <h4 className="project-modal-section-title">
                <Sparkles size={16} /> Key Capabilities & Architecture
              </h4>
              <ul className="project-highlights-list">
                {project.highlights.map((highlight, idx) => (
                  <li key={idx}>
                    <CheckCircle2 size={16} className="highlight-check" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="project-modal-section">
            <h4 className="project-modal-section-title">
              Technologies & Stack
            </h4>
            <div className="project-modal-tech">
              {project.tech.map((item) => (
                <span key={item} className="modal-tech-tag">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* MODAL FOOTER */}
        <div className="project-modal-footer">
          <div className="modal-actions-left">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary modal-btn"
            >
              <FaGithub size={16} />
              View Source
            </a>

            {project.demo && project.demo !== "#" && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary modal-btn"
              >
                <ExternalLink size={16} />
                Live Demo
              </a>
            )}
          </div>

          <button
            type="button"
            className="btn btn-secondary modal-close-btn"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;

