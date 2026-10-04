import { useState } from "react";
import { ExternalLink, ArrowUpRight, Layers, Search, X } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { projects } from "../data/projects";
import ProjectModal from "./ProjectModal";

const filters = [
  "All",
  "AI",
  "ML",
  "Full-Stack",
  "Security",
];

function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);

  // Multi-criteria filtering by category AND keyword/tech stack
  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      activeFilter === "All" || project.category === activeFilter;

    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesSearch =
      project.title.toLowerCase().includes(q) ||
      project.description.toLowerCase().includes(q) ||
      project.tech.some((t) => t.toLowerCase().includes(q)) ||
      (project.architecture && project.architecture.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-title">
          <span>Featured Projects</span>

          <h2>
            Things I've Been <span className="gradient-text">Building</span>.
          </h2>

          <p>
            Projects where software, AI and real-world
            problem solving come together. Click any project to inspect architecture and details.
          </p>
        </div>

        {/* CONTROLS: SEARCH & CATEGORY PILLS */}
        <div className="project-controls">
          <div className="project-search-wrapper">
            <Search size={15} className="project-search-icon" />
            <input
              type="text"
              className="project-search-input"
              placeholder="Search projects by tech (e.g. Python, AI, React)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="project-search-clear"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                title="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="project-filters">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`filter-btn ${
                  activeFilter === filter ? "active" : ""
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* PROJECTS GRID OR EMPTY STATE */}
        {filteredProjects.length === 0 ? (
          <div className="projects-empty-state">
            <p>
              No projects found matching "<strong>{searchQuery}</strong>"
              {activeFilter !== "All" ? ` in category "${activeFilter}"` : ""}.
            </p>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("All");
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="projects-grid bento-grid">
            {filteredProjects.map((project, index) => (
              <article
                className={`project-card spotlight-card is-interactive ${
                  index === 0 && activeFilter === "All" && !searchQuery
                    ? "bento-card-featured"
                    : ""
                }`}
                key={project.title}
                onClick={() => setSelectedProject(project)}
                tabIndex={0}
                role="button"
                aria-label={`View details for ${project.title}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedProject(project);
                  }
                }}
              >
                <div className="project-card-top">
                  <span className="project-status">
                    {project.status}
                  </span>

                  <span className="project-quickview-hint">
                    <Layers size={13} /> Quick View
                  </span>
                </div>

                <h3>{project.title}</h3>

                <p>{project.description}</p>

                <div className="project-tech">
                  {project.tech.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>

                <div
                  className="project-links"
                  onClick={(e) => e.stopPropagation()}
                >
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaGithub size={15} />
                    GitHub
                  </a>

                  {Boolean(project.demo && project.demo !== "#") && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ExternalLink size={15} />
                      Live Demo
                    </a>
                  )}

                  <button
                    type="button"
                    className="project-expand-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(project);
                    }}
                    title="Expand project details"
                    aria-label="Expand project details"
                  >
                    <ArrowUpRight
                      size={17}
                      className="project-arrow"
                    />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* QUICK VIEW MODAL */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}

export default Projects;