import { useState } from "react";
import {
  Code2,
  Globe,
  BrainCircuit,
  Database,
  Terminal,
  Cpu,
  Search,
  X,
} from "lucide-react";
import { skills } from "../data/skills";

const categoryIcons = {
  Languages: Code2,
  "Web & Backend": Globe,
  "AI / ML": BrainCircuit,
  Databases: Database,
  Tools: Terminal,
  Exploring: Cpu,
};

function Skills() {
  const [searchQuery, setSearchQuery] = useState("");

  const q = searchQuery.toLowerCase().trim();

  // Filter categories and calculate relevant items
  const filteredSkills = skills
    .map((category) => {
      const matchingItems = category.items.filter((item) =>
        item.toLowerCase().includes(q)
      );

      const categoryMatches = category.title.toLowerCase().includes(q);

      return {
        ...category,
        items: category.items,
        matchingItems: categoryMatches ? category.items : matchingItems,
        isRelevant: !q || categoryMatches || matchingItems.length > 0,
      };
    })
    .filter((cat) => cat.isRelevant);

  // Total matching skills count
  const totalMatches = skills.reduce((acc, cat) => {
    return (
      acc +
      cat.items.filter((item) => item.toLowerCase().includes(q)).length
    );
  }, 0);

  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="section-title">
          <span>Tech Stack</span>
          <h2>Tools I use to build.</h2>

          <p>
            A growing toolkit covering software development,
            AI, backend systems, and emerging technologies. Search to find specific proficiencies.
          </p>
        </div>

        {/* SKILLS SEARCH BAR */}
        <div className="skills-search-wrapper">
          <Search size={16} className="skills-search-icon" />
          <input
            type="text"
            className="skills-search-input"
            placeholder="Search skills, languages, or tools (e.g. Python, React, Git)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="skills-search-clear"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
              title="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* SEARCH MATCH COUNT BADGE */}
        {q && (
          <div className="skills-match-indicator">
            <span>
              {totalMatches > 0
                ? `Found ${totalMatches} skill${totalMatches > 1 ? "s" : ""} matching "${searchQuery}"`
                : `No skills found matching "${searchQuery}"`}
            </span>
            {totalMatches > 0 && (
              <button
                type="button"
                className="skills-reset-link"
                onClick={() => setSearchQuery("")}
              >
                Clear
              </button>
            )}
          </div>
        )}

        {/* SKILLS GRID OR EMPTY STATE */}
        {filteredSkills.length === 0 ? (
          <div className="skills-empty-state">
            <p>
              No matching technologies or tools found for "<strong>{searchQuery}</strong>".
            </p>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setSearchQuery("")}
            >
              Reset Search
            </button>
          </div>
        ) : (
          <div className="skills-grid">
            {filteredSkills.map((skill) => {
              const Icon = categoryIcons[skill.title] || Code2;

              return (
                <div
                  className="skill-card spotlight-card"
                  key={skill.title}
                >
                  <h3>
                    <Icon size={18} />
                    {skill.title}
                  </h3>

                  <div className="skill-tags">
                    {skill.items.map((item) => {
                      const isMatched =
                        q && item.toLowerCase().includes(q);
                      const isDimmed =
                        q && !isMatched;

                      return (
                        <span
                          className={`skill-tag ${
                            isMatched ? "matched" : ""
                          } ${isDimmed ? "dimmed" : ""}`}
                          key={item}
                        >
                          {item}
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default Skills;