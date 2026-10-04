import { useState, useEffect } from "react";
import {
  ExternalLink,
  Code2,
  Trophy,
  Flame,
  Target,
  Percent,
  CheckCircle,
  BarChart3,
} from "lucide-react";

function LeetCode() {
  const [stats, setStats] = useState({
    totalSolved: 16,
    easySolved: 12,
    totalEasy: 968,
    mediumSolved: 4,
    totalMedium: 2122,
    hardSolved: 0,
    totalHard: 979,
    ranking: "#5,000,001",
    acceptanceRate: 68.4,
  });

  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const cacheKey = "aryan_leetcode_stats";

    try {
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < 30 * 60 * 1000) {
          setStats(data);
          return;
        }
      }
    } catch {
      // Ignore cache read failures
    }

    async function fetchStats() {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 6000);

      try {
        const response = await fetch(
          "https://alfa-leetcode-api.onrender.com/userProfile/aryanyadav_11",
          { signal: controller.signal }
        );
        clearTimeout(timer);

        if (!response.ok) return;

        const data = await response.json();
        if (isMounted && data && (data.totalSolved !== undefined || data.easySolved !== undefined)) {
          const newStats = {
            totalSolved: data.totalSolved ?? 16,
            easySolved: data.easySolved ?? 12,
            totalEasy: data.totalEasy ?? 968,
            mediumSolved: data.mediumSolved ?? 4,
            totalMedium: data.totalMedium ?? 2122,
            hardSolved: data.hardSolved ?? 0,
            totalHard: data.totalHard ?? 979,
            ranking: data.ranking ? `#${data.ranking.toLocaleString()}` : "#5,000,001",
            acceptanceRate: data.acceptanceRate ? Math.round(data.acceptanceRate * 10) / 10 : 68.4,
          };
          setStats(newStats);
          try {
            sessionStorage.setItem(
              cacheKey,
              JSON.stringify({ data: newStats, timestamp: Date.now() })
            );
          } catch {
            // Ignore cache write failures
          }
        }
      } catch (err) {
        clearTimeout(timer);
        // Fallback default stats are preserved safely
      }
    }

    fetchStats();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="leetcode" className="section leetcode-section">
      <div className="container">
        {/* Section Heading */}
        <div className="section-title">
          <span>Problem Solving</span>
          <h2>
            My <span className="gradient-text">LeetCode</span> Journey.
          </h2>
          <p>
            Practicing data structures, algorithms, and problem solving one challenge at a time.
          </p>
        </div>

        {/* Main LeetCode Dashboard */}
        <div className="leetcode-dashboard spotlight-card">
          {/* Top Header */}
          <div className="leetcode-header">
            <div className="leetcode-profile">
              <div className="leetcode-icon">
                <Code2 size={24} />
              </div>
              <div>
                <span className="leetcode-label">LEETCODE PROFILE</span>
                <h3>aryanyadav_11</h3>
              </div>
            </div>

            <div className="leetcode-header-badges">
              <span className="leetcode-rate-badge">
                <Percent size={13} />
                <span>{stats.acceptanceRate}% Acceptance</span>
              </span>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="leetcode-quick-stats">
            <div className="leetcode-stat">
              <div className="leetcode-stat-icon solved">
                <Target size={18} />
              </div>
              <div>
                <span>Total Solved</span>
                <strong>{stats.totalSolved}</strong>
              </div>
            </div>

            <div className="leetcode-stat">
              <div className="leetcode-stat-icon rank">
                <Trophy size={18} />
              </div>
              <div>
                <span>Global Rank</span>
                <strong>{stats.ranking}</strong>
              </div>
            </div>

            <div className="leetcode-stat">
              <div className="leetcode-stat-icon streak">
                <Flame size={18} />
              </div>
              <div>
                <span>Difficulty Focus</span>
                <strong>Easy → Medium</strong>
              </div>
            </div>
          </div>

          {/* LeetCode Card Preview with Fallback Interactive Breakdown */}
          <div className="leetcode-card-wrapper">
            {!imageError ? (
              <img
                src="https://leetcard.jacoblin.cool/aryanyadav_11?theme=dark&font=Baloo&ext=heatmap"
                alt="Aryan Yadav LeetCode Statistics"
                className="leetcode-card-image"
                loading="lazy"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="leetcode-fallback-card">
                <div className="fallback-card-header">
                  <div className="fallback-title">
                    <BarChart3 size={18} className="fallback-icon" />
                    <span>Solved Problems Breakdown</span>
                  </div>
                  <span className="fallback-tag">Live Profile Overview</span>
                </div>

                <div className="leetcode-diff-bars">
                  {/* Easy */}
                  <div className="leetcode-diff-row">
                    <div className="diff-meta">
                      <span className="diff-label easy">Easy</span>
                      <span className="diff-count">
                        <strong>{stats.easySolved}</strong> / {stats.totalEasy}
                      </span>
                    </div>
                    <div className="diff-bar-track">
                      <div
                        className="diff-bar-fill easy-fill"
                        style={{
                          width: `${Math.max((stats.easySolved / 50) * 100, 16)}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Medium */}
                  <div className="leetcode-diff-row">
                    <div className="diff-meta">
                      <span className="diff-label medium">Medium</span>
                      <span className="diff-count">
                        <strong>{stats.mediumSolved}</strong> / {stats.totalMedium}
                      </span>
                    </div>
                    <div className="diff-bar-track">
                      <div
                        className="diff-bar-fill medium-fill"
                        style={{
                          width: `${Math.max((stats.mediumSolved / 30) * 100, 12)}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Hard */}
                  <div className="leetcode-diff-row">
                    <div className="diff-meta">
                      <span className="diff-label hard">Hard</span>
                      <span className="diff-count">
                        <strong>{stats.hardSolved}</strong> / {stats.totalHard}
                      </span>
                    </div>
                    <div className="diff-bar-track">
                      <div
                        className="diff-bar-fill hard-fill"
                        style={{ width: "3%" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="fallback-card-footer">
                  <span className="fallback-hint">
                    <CheckCircle size={14} className="hint-check" /> Continuous Problem Solving & Algorithmic Practice
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Bottom CTA */}
          <div className="leetcode-bottom">
            <div>
              <span className="leetcode-bottom-title">
                Keep solving. Keep improving.
              </span>
              <span className="leetcode-bottom-text">
                Building stronger DSA fundamentals every day.
              </span>
            </div>

            <a
              href="https://leetcode.com/u/aryanyadav_11/"
              target="_blank"
              rel="noreferrer"
              className="btn leetcode-button"
            >
              <Code2 size={17} />
              <span>View LeetCode Profile</span>
              <ExternalLink size={15} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LeetCode;