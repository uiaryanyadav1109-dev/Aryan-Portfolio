import { useState, useEffect } from "react";
import {
  BookOpen,
  Clock,
  Sparkles,
  ArrowUpRight,
  X,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  FileCode2,
} from "lucide-react";
import { articles } from "../data/articles";

function ArticleModal({ article, onClose }) {
  useEffect(() => {
    if (!article) return;
    const orig = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = orig;
      window.removeEventListener("keydown", handleKey);
    };
  }, [article, onClose]);

  if (!article) return null;

  return (
    <div className="article-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="article-modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="article-modal-header">
          <div className="article-modal-badges">
            <span className="article-cat-badge">{article.category}</span>
            <span className="article-read-badge">
              <Clock size={12} />
              {article.readTime}
            </span>
          </div>

          <button
            type="button"
            className="article-modal-close"
            onClick={onClose}
            aria-label="Close article"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="article-modal-body">
          <h2 className="article-modal-title">{article.title}</h2>
          <p className="article-modal-summary">{article.summary}</p>

          <div className="article-breakdown-card problem-card">
            <div className="breakdown-header">
              <AlertTriangle size={16} className="breakdown-icon problem" />
              <h4>The Engineering Problem</h4>
            </div>
            <p>{article.problem}</p>
          </div>

          <div className="article-breakdown-card solution-card">
            <div className="breakdown-header">
              <Lightbulb size={16} className="breakdown-icon solution" />
              <h4>Architectural Solution</h4>
            </div>
            <p>{article.solution}</p>
          </div>

          <div className="article-metrics-section">
            <h4 className="metrics-title">
              <Sparkles size={15} /> Quantified Engineering Metrics
            </h4>
            <div className="metrics-grid">
              {article.metrics.map((metric, idx) => (
                <div key={idx} className="metric-item">
                  <CheckCircle2 size={16} className="metric-check" />
                  <span>{metric}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="article-tags-wrap">
            {article.tags.map((tag) => (
              <span key={tag} className="article-tag-chip">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="article-modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Close Case Study
          </button>
        </div>
      </div>
    </div>
  );
}

function Writing() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <section id="writing" className="section">
      <div className="container">
        <div className="section-title">
          <span>Technical Writing</span>
          <h2>Engineering Notes & Deep Dives.</h2>
          <p>
            Architectural decisions, performance benchmarks, and lessons learned building real-world software.
          </p>
        </div>

        <div className="articles-grid">
          {articles.map((article) => (
            <article
              key={article.id}
              className="article-card spotlight-card"
              onClick={() => setSelectedArticle(article)}
              tabIndex={0}
              role="button"
              aria-label={`Read ${article.title}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedArticle(article);
                }
              }}
            >
              <div className="article-card-header">
                <span className="article-cat-badge">{article.category}</span>
                <span className="article-meta">
                  <Clock size={12} /> {article.readTime}
                </span>
              </div>

              <h3 className="article-title">{article.title}</h3>
              <p className="article-summary">{article.summary}</p>

              <div className="article-card-metrics">
                <div className="card-metric-highlight">
                  <CheckCircle2 size={14} className="metric-check" />
                  <span>{article.metrics[0]}</span>
                </div>
              </div>

              <div className="article-card-footer">
                <div className="article-tags-mini">
                  {article.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="tag-mini">
                      {tag}
                    </span>
                  ))}
                </div>

                <span className="article-read-btn">
                  <span>Read Breakdown</span>
                  <ArrowUpRight size={15} />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* CASE STUDY READER MODAL */}
      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </section>
  );
}

export default Writing;
