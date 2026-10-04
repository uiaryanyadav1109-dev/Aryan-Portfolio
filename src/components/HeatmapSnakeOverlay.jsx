import { useState, useEffect, useRef, useMemo } from "react";

// 53 columns x 7 rows grid constants matching GitHubHeatmap SVG
const COLS = 53;
const ROWS = 7;
const CELL_SIZE = 10;
const CELL_GAP = 3;
const OFFSET_X = 28;
const OFFSET_Y = 16;
const TICK_RATE_MS = 110;

export default function HeatmapSnakeOverlay({
  weeks = [],
  active = false,
  onConsumeCell,
  onResetConsumed,
  reducedMotion = false,
}) {
  // Collect all cells that have contributions (target food for snake)
  const contributionCoords = useMemo(() => {
    const coords = [];
    weeks.forEach((week, wIdx) => {
      week.forEach((day, dIdx) => {
        if (!day.isEmpty && day.count > 0) {
          coords.push({ x: wIdx, y: dIdx, count: day.count });
        }
      });
    });
    return coords;
  }, [weeks]);

  // Snake body segments: [{ x, y }]
  const [snake, setSnake] = useState(() => [
    { x: 4, y: 2 },
    { x: 3, y: 2 },
    { x: 2, y: 2 },
    { x: 1, y: 2 },
  ]);
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [chompEffect, setChompEffect] = useState(null);

  const activeRef = useRef(active);
  activeRef.current = active;

  const eatenSetRef = useRef(new Set());
  const snakeRef = useRef(snake);
  snakeRef.current = snake;
  const dirRef = useRef(direction);
  dirRef.current = direction;

  useEffect(() => {
    if (!active) {
      eatenSetRef.current.clear();
      setChompEffect(null);
      setSnake([
        { x: 4, y: 2 },
        { x: 3, y: 2 },
        { x: 2, y: 2 },
        { x: 1, y: 2 },
      ]);
      setDirection({ x: 1, y: 0 });
      onResetConsumed?.();
      return;
    }

    // If reduced-motion is requested, show static peaceful snake without starting timer
    if (reducedMotion) {
      setSnake([
        { x: 5, y: 3 },
        { x: 4, y: 3 },
        { x: 3, y: 3 },
        { x: 2, y: 3 },
      ]);
      setDirection({ x: 1, y: 0 });
      return;
    }

    let timerId = null;
    let isCancelled = false;

    const tick = () => {
      if (!activeRef.current || isCancelled) return;

      const currentSnake = snakeRef.current;
      const head = currentSnake[0];
      const curDir = dirRef.current;

      // 1. Find nearest uneaten contribution cell
      let target = null;
      let minDistance = Infinity;

      for (const food of contributionCoords) {
        const key = `${food.x},${food.y}`;
        if (!eatenSetRef.current.has(key)) {
          const dist = Math.abs(food.x - head.x) + Math.abs(food.y - head.y);
          if (dist < minDistance) {
            minDistance = dist;
            target = food;
          }
        }
      }

      // If all targets are eaten in this round, notify reset & cycle targets again
      if (!target && contributionCoords.length > 0) {
        eatenSetRef.current.clear();
        onResetConsumed?.();
        target = contributionCoords[0];
      }

      // 2. Select next direction towards target
      let nextDir = curDir;
      const possibleDirs = [
        { x: 1, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: -1 },
      ];

      // Disallow 180-degree instant reversal into own neck
      const validDirs = possibleDirs.filter(
        (d) => !(d.x === -curDir.x && d.y === -curDir.y)
      );

      if (target) {
        let bestDist = Infinity;
        let chosenDir = curDir;

        for (const d of validDirs) {
          const testX = head.x + d.x;
          const testY = head.y + d.y;
          if (testX >= 0 && testX < COLS && testY >= 0 && testY < ROWS) {
            const dist = Math.abs(target.x - testX) + Math.abs(target.y - testY);
            if (dist < bestDist) {
              bestDist = dist;
              chosenDir = d;
            }
          }
        }
        nextDir = chosenDir;
      } else {
        // Safe wandering avoiding boundaries
        const testX = head.x + curDir.x;
        const testY = head.y + curDir.y;
        if (testX < 0 || testX >= COLS || testY < 0 || testY >= ROWS) {
          const openDirs = validDirs.filter((d) => {
            const nx = head.x + d.x;
            const ny = head.y + d.y;
            return nx >= 0 && nx < COLS && ny >= 0 && ny < ROWS;
          });
          if (openDirs.length > 0) {
            nextDir = openDirs[Math.floor(Math.random() * openDirs.length)];
          }
        }
      }

      dirRef.current = nextDir;
      setDirection(nextDir);

      // 3. Compute new head coordinates
      const newHeadX = Math.max(0, Math.min(COLS - 1, head.x + nextDir.x));
      const newHeadY = Math.max(0, Math.min(ROWS - 1, head.y + nextDir.y));
      const newHead = { x: newHeadX, y: newHeadY };

      // 4. Check if a contribution food square was reached
      const foodKey = `${newHeadX},${newHeadY}`;
      const isFood = contributionCoords.some(
        (f) => f.x === newHeadX && f.y === newHeadY
      );

      let didEat = false;
      if (isFood && !eatenSetRef.current.has(foodKey)) {
        eatenSetRef.current.add(foodKey);
        didEat = true;
        // Trigger visual consumption on the underlying heatmap cell
        onConsumeCell?.(newHeadX, newHeadY);
        setChompEffect({ x: newHeadX, y: newHeadY, key: Date.now() });
      }

      // Classic normal snake (fixed 4 segments)
      const newSegments = [
        newHead,
        currentSnake[0],
        currentSnake[1],
        currentSnake[2],
      ];

      snakeRef.current = newSegments;
      setSnake(newSegments);

      timerId = setTimeout(tick, TICK_RATE_MS);
    };

    timerId = setTimeout(tick, TICK_RATE_MS);

    return () => {
      isCancelled = true;
      if (timerId) clearTimeout(timerId);
    };
  }, [active, contributionCoords, reducedMotion, onConsumeCell, onResetConsumed]);

  if (!active) return null;

  const head = snake[0] || { x: 0, y: 0 };
  const headPxX = OFFSET_X + head.x * (CELL_SIZE + CELL_GAP);
  const headPxY = OFFSET_Y + head.y * (CELL_SIZE + CELL_GAP);

  return (
    <g className="heatmap-snake-layer" pointerEvents="none">
      {/* Visual Chomp Ripple when food is eaten (disabled in reduced-motion) */}
      {!reducedMotion && chompEffect && (
        <circle
          key={chompEffect.key}
          cx={OFFSET_X + chompEffect.x * 13 + 5}
          cy={OFFSET_Y + chompEffect.y * 13 + 5}
          r={7}
          className="snake-chomp-pulse"
        />
      )}

      {/* Snake Body Segments */}
      {snake.slice(1).map((seg, idx) => {
        const segX = OFFSET_X + seg.x * 13;
        const segY = OFFSET_Y + seg.y * 13;
        const opacity = Math.max(0.45, 0.95 - idx * 0.15);
        return (
          <rect
            key={idx}
            x={segX}
            y={segY}
            width={CELL_SIZE}
            height={CELL_SIZE}
            rx={2.5}
            ry={2.5}
            className="snake-body-segment"
            style={{ opacity }}
          />
        );
      })}

      {/* Snake Head */}
      <rect
        x={headPxX}
        y={headPxY}
        width={CELL_SIZE}
        height={CELL_SIZE}
        rx={3}
        ry={3}
        className="snake-head-rect"
      />

      {/* Eyes aligned to movement direction */}
      {direction.x >= 0 && (
        <>
          <circle cx={headPxX + 7} cy={headPxY + 3} r={1.2} fill="#ffffff" />
          <circle cx={headPxX + 7} cy={headPxY + 7} r={1.2} fill="#ffffff" />
          <circle cx={headPxX + 7.5} cy={headPxY + 3} r={0.6} fill="#0f172a" />
          <circle cx={headPxX + 7.5} cy={headPxY + 7} r={0.6} fill="#0f172a" />
        </>
      )}
      {direction.x < 0 && (
        <>
          <circle cx={headPxX + 3} cy={headPxY + 3} r={1.2} fill="#ffffff" />
          <circle cx={headPxX + 3} cy={headPxY + 7} r={1.2} fill="#ffffff" />
          <circle cx={headPxX + 2.5} cy={headPxY + 3} r={0.6} fill="#0f172a" />
          <circle cx={headPxX + 2.5} cy={headPxY + 7} r={0.6} fill="#0f172a" />
        </>
      )}
      {direction.y > 0 && direction.x === 0 && (
        <>
          <circle cx={headPxX + 3} cy={headPxY + 7} r={1.2} fill="#ffffff" />
          <circle cx={headPxX + 7} cy={headPxY + 7} r={1.2} fill="#ffffff" />
          <circle cx={headPxX + 3} cy={headPxY + 7.5} r={0.6} fill="#0f172a" />
          <circle cx={headPxX + 7} cy={headPxY + 7.5} r={0.6} fill="#0f172a" />
        </>
      )}
      {direction.y < 0 && direction.x === 0 && (
        <>
          <circle cx={headPxX + 3} cy={headPxY + 3} r={1.2} fill="#ffffff" />
          <circle cx={headPxX + 7} cy={headPxY + 3} r={1.2} fill="#ffffff" />
          <circle cx={headPxX + 3} cy={headPxY + 2.5} r={0.6} fill="#0f172a" />
          <circle cx={headPxX + 7} cy={headPxY + 2.5} r={0.6} fill="#0f172a" />
        </>
      )}
    </g>
  );
}
