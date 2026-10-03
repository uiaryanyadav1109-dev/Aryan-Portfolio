import { useState } from "react";
import {
  GitFork,
  Star,
  BookOpen,
  GitCommit,
  Calendar,
  Eye,
  Users,
  ExternalLink,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import useGitHub from "../hooks/useGitHub";

function timeAgo(dateString) {
  if (!dateString) return "";
  const now = new Date();
  const past = new Date(dateString);
  const diffSec = Math.floor((now - past) / 1000);

  if (diffSec < 60) return "just now";
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) return `${diffDays}d ago`;
  const diffMonths = Math.floor(diffDays / 30);
  return `${diffMonths}mo ago`;
}

function GitHub() {
  const {
    profile,
    repositories,
    recentEvents,
    aggregatedStats,
    languages,
    loading,
    error,
  } = useGitHub();

  const [activeTab, setActiveTab] = useState("repos");

  return (
    <section id="github" className="section">
      <div className="container">
        <div className="section-title">
          <span>GitHub</span>
          <h2>Open source & experiments.</h2>
          <p>
            A live snapshot of my public GitHub activity, code frequency, and repositories.
          </p>
        </div>

        {loading && (
          <div className="github-loading-card spotlight-card">
            <div className="loading-spinner-sm" />
            <span>Fetching live GitHub data...</span>
          </div>
        )}

        {error && (
          <div className="github-card">
            Unable to load live GitHub data right now. Please check back shortly.
          </div>
        )}

        {!loading && !error && profile && (
          <div className="github-dashboard">
            {/* TOP PROFILE & STATS CARD */}
            <div className="github-card spotlight-card github-main-card">
              <div className="github-profile-header">
                <div className="github-avatar-wrap">
                  <FaGithub size={32} color="var(--blue)" />
                </div>
                <div>
                  <h3 className="github-name">
                    {profile.name || "Aryan Yadav"}
                  </h3>
                  <p className="github-bio">
                    {profile.bio || "AI/ML & Full-Stack Developer"}
                  </p>
                </div>
              </div>

              {/* AGGREGATED METRICS GRID */}
              <div className="github-stats-grid">
                <div className="stat-box">
                  <strong>{aggregatedStats?.publicRepos || profile.public_repos}</strong>
                  <span><BookOpen size={13} /> Repositories</span>
                </div>

                <div className="stat-box">
                  <strong>{aggregatedStats?.totalStars ?? 0}</strong>
                  <span><Star size={13} /> Total Stars</span>
                </div>

                <div className="stat-box">
                  <strong>{aggregatedStats?.totalForks ?? 0}</strong>
                  <span><GitFork size={13} /> Total Forks</span>
                </div>

                <div className="stat-box">
                  <strong>{aggregatedStats?.totalWatchers ?? 0}</strong>
                  <span><Eye size={13} /> Watchers</span>
                </div>

                <div className="stat-box">
                  <strong>{aggregatedStats?.followers || profile.followers}</strong>
                  <span><Users size={13} /> Followers</span>
                </div>

                <div className="stat-box">
                  <strong>{aggregatedStats?.following || profile.following}</strong>
                  <span>Following</span>
                </div>
              </div>

              {/* LANGUAGE DISTRIBUTION BAR */}
              {languages && languages.length > 0 && (
                <div className="github-lang-section">
                  <div className="github-lang-header">
                    <span>Language Distribution</span>
                    <span className="lang-note">Across public repositories</span>
                  </div>

                  {/* Multi-segment progress bar */}
                  <div className="github-lang-bar">
                    {languages.map((lang) => (
                      <div
                        key={lang.name}
                        className="github-lang-segment"
                        style={{
                          width: `${Math.max(lang.percentage, 3)}%`,
                          backgroundColor: lang.color,
                        }}
                        title={`${lang.name}: ${lang.percentage}%`}
                      />
                    ))}
                  </div>

                  {/* Language Legend */}
                  <div className="github-lang-legend">
                    {languages.slice(0, 5).map((lang) => (
                      <div key={lang.name} className="lang-legend-item">
                        <span
                          className="lang-legend-dot"
                          style={{ backgroundColor: lang.color }}
                        />
                        <span className="lang-name">{lang.name}</span>
                        <span className="lang-pct">{lang.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <a
                href={profile.html_url}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary github-profile-btn"
              >
                <FaGithub size={16} />
                <span>View Full GitHub Profile</span>
                <ExternalLink size={14} />
              </a>
            </div>

            {/* TABBED INTERACTION CARD */}
            <div className="github-card spotlight-card github-activity-card">
              {/* TAB SELECTOR */}
              <div className="github-tab-nav">
                <button
                  type="button"
                  className={`github-tab-btn ${activeTab === "repos" ? "active" : ""}`}
                  onClick={() => setActiveTab("repos")}
                >
                  <BookOpen size={15} />
                  <span>Recent Repositories</span>
                </button>

                <button
                  type="button"
                  className={`github-tab-btn ${activeTab === "commits" ? "active" : ""}`}
                  onClick={() => setActiveTab("commits")}
                >
                  <GitCommit size={15} />
                  <span>Recent Commits</span>
                  {recentEvents.length > 0 && (
                    <span className="tab-badge">{recentEvents.length}</span>
                  )}
                </button>

                <button
                  type="button"
                  className={`github-tab-btn ${activeTab === "heatmap" ? "active" : ""}`}
                  onClick={() => setActiveTab("heatmap")}
                >
                  <Calendar size={15} />
                  <span>Activity Heatmap</span>
                </button>
              </div>

              {/* TAB CONTENT: REPOSITORIES */}
              {activeTab === "repos" && (
                <div className="github-repo-list">
                  {repositories.slice(0, 6).map((repo) => (
                    <a
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="github-repo-item"
                    >
                      <strong className="github-repo-title">
                        {repo.name}
                      </strong>

                      <span className="github-repo-desc">
                        {repo.description || "No description provided."}
                      </span>

                      <div className="github-repo-meta">
                        <span>
                          <Star size={12} />
                          {repo.stargazers_count}
                        </span>

                        <span>
                          <GitFork size={12} />
                          {repo.forks_count}
                        </span>

                        <span>
                          <BookOpen size={12} />
                          {repo.language || "Other"}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              )}

              {/* TAB CONTENT: LIVE COMMITS */}
              {activeTab === "commits" && (
                <div className="github-commits-list">
                  {recentEvents.length === 0 ? (
                    <div className="github-empty-tab">
                      No recent commit push events found in public feed.
                    </div>
                  ) : (
                    recentEvents.map((commit) => (
                      <a
                        key={commit.id}
                        href={commit.url}
                        target="_blank"
                        rel="noreferrer"
                        className="github-commit-item"
                      >
                        <div className="commit-icon-col">
                          <GitCommit size={16} className="commit-icon" />
                        </div>
                        <div className="commit-content-col">
                          <div className="commit-header">
                            <span className="commit-repo-badge">{commit.repo}</span>
                            <span className="commit-time">{timeAgo(commit.date)}</span>
                          </div>
                          <p className="commit-msg">{commit.message}</p>
                          <span className="commit-sha">
                            <code>{commit.id.substring(0, 7)}</code>
                          </span>
                        </div>
                      </a>
                    ))
                  )}
                </div>
              )}

              {/* TAB CONTENT: ACTIVITY HEATMAP */}
              {activeTab === "heatmap" && (
                <div className="github-heatmap-container">
                  <div className="heatmap-header">
                    <h4>Annual Contributions</h4>
                    <span className="heatmap-sub">Live GitHub Activity Calendar</span>
                  </div>

                  <div className="heatmap-scroll">
                    <img
                      src={`https://ghchart.rshah.org/38bdf8/${profile.login || "uiaryanyadav1109-dev"}`}
                      alt="Aryan Yadav GitHub Contribution Chart"
                      className="github-chart-img"
                      loading="lazy"
                    />
                  </div>

                  <div className="heatmap-footer">
                    <span>Chart updates live with every repository push</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default GitHub;