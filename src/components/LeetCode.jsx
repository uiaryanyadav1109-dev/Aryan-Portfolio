import { useState, useEffect } from "react";
import {
  ExternalLink,
  Code2,
  Trophy,
  Flame,
  Target,
  Percent,
  CheckCircle2,
  BarChart3,
  Layers,
  Sparkles,
} from "lucide-react";

function LeetCode() {
  const [stats, setStats] = useState({
    totalSolved: 16,
    easySolved: 12,
    totalEasy: 830,
    mediumSolved: 4,
    totalMedium: 1740,
    hardSolved: 0,
    totalHard: 740,
    ranking: "5,000,000+",
    acceptanceRate: 68.4,
  });

  const [isLoading, setIsLoading] = useState(false);

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
      // Ignore cache errors
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
        if (
          isMounted &&
          data &&
          (data.totalSolved !== undefined || data.easySolved !== undefined)
        ) {
          const newStats = {
            totalSolved: data.totalSolved ?? 16,
            easySolved: data.easySolved ?? 12,
            totalEasy: data.totalEasy ?? 830,
            mediumSolved: data.mediumSolved ?? 4,
            totalMedium: data.totalMedium ?? 1740,
            hardSolved: data.hardSolved ?? 0,
            totalHard: data.totalHard ?? 740,
            ranking: data.ranking ? `${data.ranking.toLocaleString()}` : "5,000,000+",
            acceptanceRate: data.acceptanceRate
              ? Math.round(data.acceptanceRate * 10) / 10
              : 68.4,
          };
          setStats(newStats);
          try {
            sessionStorage.setItem(
              cacheKey,
              JSON.stringify({ data: newStats, timestamp: Date.now() })
            );
          } catch {
            // Ignore cache storage errors
          }
        }
      } catch {
        clearTimeout(timer);
      }
    }

    fetchStats();
    return () => {
      isMounted = false;
    };
  }, []);

  // Compute difficulty percentages
  const easyPct = Math.min(Math.round((stats.easySolved / 50) * 100), 100);
  const mediumPct = Math.min(Math.round((stats.mediumSolved / 30) * 100), 100);
  const hardPct = Math.min(Math.round((stats.hardSolved / 15) * 100), 100);

  // SVG circular meter stroke calculation (r = 54, circumference = 2 * PI * 54 = 339.29)
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const progressRatio = Math.min(stats.totalSolved / 50, 1);
  const strokeDashoffset = circumference - progressRatio * circumference;

  const dsaTopics = [
    "Arrays & Hashing",
    "Two Pointers",
    "String Manipulation",
    "Binary Search",
    "Linked Lists",
    "Recursion & Math",
  ];

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
            Practicing data structures, algorithms, and computational thinking
            one problem at a time.
          </p>
        </div>

        {/* Main Dashboard Card */}
        <div className="leetcode-dashboard spotlight-card">
          {/* Header */}
          <div className="leetcode-header">
            <div className="leetcode-profile">
              <div className="leetcode-icon">
                <Code2 size={24} />
              </div>
              <div>
                <div className="leetcode-profile-top">
                  <span className="leetcode-label">LEETCODE PROFILE</span>
                  <span className="leetcode-live-tag">
                    <span className="live-dot-green"></span> Active
                  </span>
                </div>
                <h3>aryanyadav_11</h3>
              </div>
            </div>

            <div className="leetcode-header-badges">
              <span className="leetcode-badge rate">
                <Percent size={13} />
                <span>{stats.acceptanceRate}% Acceptance</span>
              </span>

              <span className="leetcode-badge rank">
                <Trophy size={13} />
                <span>Rank #{stats.ranking}</span>
              </span>
            </div>
          </div>

          {/* Core Metrics & Solved Breakdown */}
          <div className="leetcode-main-grid">
            {/* Left: Circular Solved Progress Meter */}
            <div className="leetcode-radial-card">
              <div className="radial-wrapper">
                <svg className="radial-svg" width="140" height="140" viewBox="0 0 140 140">
                  <circle
                    className="radial-bg"
                    cx="70"
                    cy="70"
                    r={radius}
                    strokeWidth="10"
                  />
                  <circle
                    className="radial-progress"
                    cx="70"
                    cy="70"
                    r={radius}
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    transform="rotate(-90 70 70)"
                  />
                </svg>
                <div className="radial-center-text">
                  <span className="radial-number">{stats.totalSolved}</span>
                  <span className="radial-label">SOLVED</span>
                </div>
              </div>

              <div className="radial-meta">
                <div className="radial-meta-item">
                  <span className="meta-label">Accuracy</span>
                  <span className="meta-val">{stats.acceptanceRate}%</span>
                </div>
                <div className="radial-meta-divider"></div>
                <div className="radial-meta-item">
                  <span className="meta-label">Milestone</span>
                  <span className="meta-val">Phase 1 / 50</span>
                </div>
              </div>
            </div>

            {/* Right: Difficulty Tier Progress Bars */}
            <div className="leetcode-tiers-card">
              <div className="tiers-header">
                <BarChart3 size={16} className="tiers-icon" />
                <span>Difficulty Distribution</span>
              </div>

              <div className="diff-bars-stack">
                {/* Easy */}
                <div className="diff-tier-item">
                  <div className="diff-tier-header">
                    <div className="diff-tier-name">
                      <span className="tier-pill easy">Easy</span>
                      <span className="tier-tagline">Fundamentals & Core Logic</span>
                    </div>
                    <span className="diff-tier-count">
                      <strong>{stats.easySolved}</strong>
                      <span className="tier-total"> / {stats.totalEasy}</span>
                    </span>
                  </div>
                  <div className="tier-track">
                    <div
                      className="tier-fill easy-fill"
                      style={{ width: `${Math.max(easyPct, 15)}%` }}
                    />
                  </div>
                </div>

                {/* Medium */}
                <div className="diff-tier-item">
                  <div className="diff-tier-header">
                    <div className="diff-tier-name">
                      <span className="tier-pill medium">Medium</span>
                      <span className="tier-tagline">Optimized Algorithms & Patterns</span>
                    </div>
                    <span className="diff-tier-count">
                      <strong>{stats.mediumSolved}</strong>
                      <span className="tier-total"> / {stats.totalMedium}</span>
                    </span>
                  </div>
                  <div className="tier-track">
                    <div
                      className="tier-fill medium-fill"
                      style={{ width: `${Math.max(mediumPct, 10)}%` }}
                    />
                  </div>
                </div>

                {/* Hard */}
                <div className="diff-tier-item">
                  <div className="diff-tier-header">
                    <div className="diff-tier-name">
                      <span className="tier-pill hard">Hard</span>
                      <span className="tier-tagline">Complex Edge Cases & DP</span>
                    </div>
                    <span className="diff-tier-count">
                      <strong>{stats.hardSolved}</strong>
                      <span className="tier-total"> / {stats.totalHard}</span>
                    </span>
                  </div>
                  <div className="tier-track">
                    <div
                      className="tier-fill hard-fill"
                      style={{ width: "3%" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* DSA Focus Topics Chips */}
          <div className="leetcode-topics-section">
            <div className="topics-header">
              <Layers size={15} className="topics-icon" />
              <span>Core Problem Patterns & Topics Explored</span>
            </div>
            <div className="topics-grid">
              {dsaTopics.map((topic) => (
                <span key={topic} className="topic-chip">
                  <CheckCircle2 size={13} className="topic-check" />
                  <span>{topic}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Callout & Link */}
          <div className="leetcode-bottom-bar">
            <div className="leetcode-bottom-info">
              <span className="bottom-headline">
                <Sparkles size={15} className="bottom-sparkle" />
                Consistent Algorithmic Growth
              </span>
              <p className="bottom-subtext">
                Focusing on time & space complexity, pattern recognition, and robust edge-case handling.
              </p>
            </div>

            <a
              href="https://leetcode.com/u/aryanyadav_11/"
              target="_blank"
              rel="noreferrer"
              className="btn leetcode-cta-btn"
              aria-label="View official LeetCode Profile for aryanyadav_11"
            >
              <Code2 size={16} />
              <span>View LeetCode Profile</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LeetCode;
