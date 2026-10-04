import { useState, useEffect, useMemo, useRef } from "react";
import { ExternalLink, RefreshCw } from "lucide-react";
import HeatmapSnakeOverlay from "./HeatmapSnakeOverlay";

function formatContributionDate(dateStr) {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-").map(Number);
  const dateObj = new Date(Date.UTC(year, month - 1, day));
  return dateObj.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function GitHubHeatmap({ username = "uiaryanyadav1109-dev" }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [snakeActive, setSnakeActive] = useState(false);
  const [hoveredCell, setHoveredCell] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // 1. Reduced-motion preference detection & reactive listener
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    if (mq.addEventListener) {
      mq.addEventListener("change", handleChange);
    } else if (mq.addListener) {
      mq.addListener(handleChange);
    }
    return () => {
      if (mq.removeEventListener) {
        mq.removeEventListener("change", handleChange);
      } else if (mq.removeListener) {
        mq.removeListener(handleChange);
      }
    };
  }, []);

  // 2. Track consumed cells as the snake passes over them
  const [consumedCells, setConsumedCells] = useState(() => new Set());

  const handleConsumeCell = (x, y) => {
    setConsumedCells((prev) => {
      const key = `${x}-${y}`;
      if (prev.has(key)) return prev;
      const next = new Set(prev);
      next.add(key);
      return next;
    });
  };

  const handleResetConsumed = () => {
    setConsumedCells(new Set());
  };

  // Turn snake on/off and reset eaten cells when turned off
  const handleToggleSnake = () => {
    setSnakeActive((prev) => {
      const nextState = !prev;
      if (!nextState) {
        setConsumedCells(new Set()); // Instant visual restore of all squares
      }
      return nextState;
    });
  };

  useEffect(() => {
    let isMounted = true;
    async function fetchContributions() {
      setLoading(true);
      try {
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
        );
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const json = await res.json();
        if (isMounted && json?.contributions?.length) {
          setData(json);
        }
      } catch (err) {
        console.warn("Could not fetch live GitHub heatmap, loading fallback:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchContributions();
    return () => {
      isMounted = false;
    };
  }, [username]);

  // Transform flat 365 days into 52/53 columns of 7 days (Sunday - Saturday)
  const { weeks, monthLabels, totalCount } = useMemo(() => {
    const contributions = data?.contributions || [];
    if (!contributions.length) {
      return { weeks: [], monthLabels: [], totalCount: 0 };
    }

    const calculatedTotal =
      data.total?.lastYear ??
      contributions.reduce((acc, c) => acc + (c.count || 0), 0);

    const weekCols = [];
    let currentWeek = [];

    // Align start to the day of week of the first date
    const firstDate = new Date(contributions[0].date + "T00:00:00Z");
    const startDay = firstDate.getUTCDay(); // 0 is Sunday
    for (let i = 0; i < startDay; i++) {
      currentWeek.push({ isEmpty: true });
    }

    contributions.forEach((day) => {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        weekCols.push(currentWeek);
        currentWeek = [];
      }
    });

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push({ isEmpty: true });
      }
      weekCols.push(currentWeek);
    }

    // Determine month label positions
    const months = [];
    let lastMonth = -1;

    weekCols.forEach((week, wIdx) => {
      const validDay = week.find((d) => !d.isEmpty);
      if (validDay) {
        const d = new Date(validDay.date + "T00:00:00Z");
        const m = d.getUTCMonth();
        if (m !== lastMonth) {
          months.push({
            colIndex: wIdx,
            name: d.toLocaleDateString("en-US", {
              month: "short",
              timeZone: "UTC",
            }),
          });
          lastMonth = m;
        }
      }
    });

    return {
      weeks: weekCols,
      monthLabels: months,
      totalCount: calculatedTotal,
    };
  }, [data]);

  const handleCellEnter = (day, e) => {
    if (!day || day.isEmpty) return;
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const cellRect = e.currentTarget.getBoundingClientRect();
      setTooltipPos({
        x: cellRect.left - containerRect.left + cellRect.width / 2,
        y: cellRect.top - containerRect.top - 8,
      });
    }
    setHoveredCell(day);
  };

  const handleCellLeave = () => {
    setHoveredCell(null);
  };

  return (
    <div className="github-heatmap-container">
      {/* Header */}
      <div className="heatmap-header">
        <div>
          <h4>Annual Contributions</h4>
          <span className="heatmap-sub">
            {loading
              ? "Loading contribution data..."
              : `${totalCount} contributions in the last year`}
          </span>
        </div>

        <div className="heatmap-header-actions">
          <button
            type="button"
            onClick={handleToggleSnake}
            className={`heatmap-snake-toggle ${snakeActive ? "active" : ""}`}
            aria-label={
              snakeActive
                ? prefersReducedMotion
                  ? "Disable Static Snake"
                  : "Disable Snake Animation"
                : "Enable Snake Animation"
            }
            aria-pressed={snakeActive}
          >
            <span className="snake-toggle-emoji">🐍</span>
            <span className="snake-toggle-label">
              Snake {snakeActive ? (prefersReducedMotion ? "ON (Static)" : "ON") : "OFF"}
            </span>
          </button>

          <a
            href={`https://github.com/${username}?tab=overview`}
            target="_blank"
            rel="noreferrer"
            className="heatmap-live-link"
          >
            <span>Live Profile</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* Main Heatmap Calendar */}
      <div className="heatmap-scroll">
        {loading ? (
          <div className="heatmap-loading-skeleton">
            <RefreshCw size={18} className="spinning" />
            <span>Fetching real-time GitHub activity...</span>
          </div>
        ) : (
          <div className="heatmap-calendar-wrapper" ref={containerRef}>
            <svg
              viewBox="0 0 724 114"
              className="github-heatmap-svg"
              preserveAspectRatio="xMinYMin meet"
            >
              {/* Month Labels */}
              {monthLabels.map((m, idx) => (
                <text
                  key={idx}
                  x={28 + m.colIndex * 13}
                  y={10}
                  className="heatmap-svg-text month-label"
                >
                  {m.name}
                </text>
              ))}

              {/* Weekday Labels (Mon, Wed, Fri) */}
              <text x={0} y={35} className="heatmap-svg-text weekday-label">Mon</text>
              <text x={0} y={61} className="heatmap-svg-text weekday-label">Wed</text>
              <text x={0} y={87} className="heatmap-svg-text weekday-label">Fri</text>

              {/* All 53 Weeks x 7 Days Rects */}
              {weeks.map((week, wIdx) =>
                week.map((day, dIdx) => {
                  if (day.isEmpty) return null;
                  const isConsumed = snakeActive && consumedCells.has(`${wIdx}-${dIdx}`);
                  return (
                    <rect
                      key={`${wIdx}-${dIdx}`}
                      x={28 + wIdx * 13}
                      y={16 + dIdx * 13}
                      width={10}
                      height={10}
                      rx={2.5}
                      ry={2.5}
                      className={`heatmap-svg-cell ${
                        isConsumed
                          ? "cell-consumed cell-level-0"
                          : `cell-level-${day.level || 0}`
                      }`}
                      onMouseEnter={(e) => handleCellEnter(day, e)}
                      onMouseLeave={handleCellLeave}
                    />
                  );
                })
              )}

              {/* Interactive Snake Animation Overlay */}
              <HeatmapSnakeOverlay
                weeks={weeks}
                active={snakeActive}
                onConsumeCell={handleConsumeCell}
                onResetConsumed={handleResetConsumed}
                reducedMotion={prefersReducedMotion}
              />
            </svg>

            {/* Floating Tooltip */}
            {hoveredCell && (
              <div
                className="heatmap-floating-tooltip"
                style={{
                  left: `${tooltipPos.x}px`,
                  top: `${tooltipPos.y}px`,
                }}
              >
                <strong>
                  {hoveredCell.count === 0
                    ? "No"
                    : hoveredCell.count}{" "}
                  contribution{hoveredCell.count === 1 ? "" : "s"}
                </strong>{" "}
                on {formatContributionDate(hoveredCell.date)}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Status & Legend */}
      <div className="heatmap-footer">
        <div className="heatmap-status-text">
          {hoveredCell ? (
            <span>
              <strong>
                {hoveredCell.count === 0 ? "No" : hoveredCell.count}
              </strong>{" "}
              contribution{hoveredCell.count === 1 ? "" : "s"} on{" "}
              <strong>{formatContributionDate(hoveredCell.date)}</strong>
            </span>
          ) : (
            <span>Hover over any day for contribution details</span>
          )}
        </div>

        <div className="heatmap-legend">
          <span>Less</span>
          <span className="heatmap-cell cell-level-0" title="0 contributions" />
          <span className="heatmap-cell cell-level-1" title="1-3 contributions" />
          <span className="heatmap-cell cell-level-2" title="4-6 contributions" />
          <span className="heatmap-cell cell-level-3" title="7-9 contributions" />
          <span className="heatmap-cell cell-level-4" title="10+ contributions" />
          <span>More</span>
        </div>
      </div>
    </div>
  );
}

export default GitHubHeatmap;
