import { useState, useEffect } from "react";
import {
  ExternalLink,
  Code2,
  Trophy,
  Flame,
  Target,
  Percent,
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

  useEffect(() => {
    let isMounted = true;

    async function fetchStats() {
      try {
        const response = await fetch(
          "https://alfa-leetcode-api.onrender.com/userProfile/aryanyadav_11"
        );
        if (!response.ok) return;

        const data = await response.json();
        if (isMounted && data.totalSolved !== undefined) {
          setStats({
            totalSolved: data.totalSolved ?? 16,
            easySolved: data.easySolved ?? 12,
            totalEasy: data.totalEasy ?? 968,
            mediumSolved: data.mediumSolved ?? 4,
            totalMedium: data.totalMedium ?? 2122,
            hardSolved: data.hardSolved ?? 0,
            totalHard: data.totalHard ?? 979,
            ranking: data.ranking ? `#${data.ranking.toLocaleString()}` : "#5,000,001",
            acceptanceRate: 68.4,
          });
        }
      } catch (err) {
        // Fallback default stats are preserved
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


          {/* LeetCode Card Preview */}
          <div className="leetcode-card-wrapper">
            <img
              src="https://leetcard.jacoblin.cool/aryanyadav_11?theme=dark&font=Baloo&ext=heatmap"
              alt="Aryan Yadav LeetCode Statistics"
              className="leetcode-card-image"
              loading="lazy"
            />
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