const GITHUB_USERNAME = "uiaryanyadav1109-dev";
const GITHUB_API = `https://api.github.com/users/${GITHUB_USERNAME}`;

// Official GitHub language colors map
export const GITHUB_LANGUAGE_COLORS = {
  Python: "#3572A5",
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  "C++": "#f34b7d",
  C: "#555555",
  HTML: "#e34c26",
  CSS: "#563d7c",
  "Jupyter Notebook": "#da5b0b",
  Shell: "#89e051",
  Java: "#b07219",
  Go: "#00ADD8",
  Rust: "#dea584",
  Other: "#38bdf8",
};

// Resilient Fallback Data for when GitHub rate-limits (60 requests/hr unauthenticated limit)
export const FALLBACK_PROFILE = {
  login: "uiaryanyadav1109-dev",
  name: "Aryan Yadav",
  bio: "AI/ML & Full-Stack Developer | Building StudentOS, NLAMS & Intelligent Systems",
  avatar_url: "/images/developer.png",
  html_url: "https://github.com/uiaryanyadav1109-dev",
  public_repos: 14,
  followers: 12,
  following: 15,
};

export const FALLBACK_REPOSITORIES = [
  {
    id: 9101,
    name: "NLAMS-1",
    html_url: "https://github.com/sankirtansyadavofficial-Hack/NLAMS-1",
    description: "AI-powered Land Acquisition & Management System with cadastral geometry verification and Gemini API.",
    stargazers_count: 6,
    forks_count: 2,
    language: "Python",
  },
  {
    id: 9102,
    name: "StudentOS",
    html_url: "https://github.com/uiaryanyadav1109-dev",
    description: "AI-powered student career development, academic roadmap tracker, and productivity ecosystem.",
    stargazers_count: 5,
    forks_count: 1,
    language: "JavaScript",
  },
  {
    id: 9103,
    name: "VoiceShield",
    html_url: "https://github.com/uiaryanyadav1109-dev",
    description: "AI-driven real-time voice-cloning fraud prevention and spectral anomaly detection engine.",
    stargazers_count: 4,
    forks_count: 1,
    language: "Python",
  },
  {
    id: 9104,
    name: "Saral",
    html_url: "https://github.com/uiaryanyadav1109-dev",
    description: "AI document simplification platform converting dense legal texts and notices into clear action points.",
    stargazers_count: 3,
    forks_count: 0,
    language: "JavaScript",
  },
  {
    id: 9105,
    name: "aryan-portfolio",
    html_url: "https://github.com/uiaryanyadav1109-dev",
    description: "Personal developer portfolio built with React, Vite, dynamic animations, and GitHub/LeetCode sync.",
    stargazers_count: 3,
    forks_count: 1,
    language: "JavaScript",
  },
  {
    id: 9106,
    name: "hardware-iot-experiments",
    html_url: "https://github.com/uiaryanyadav1109-dev",
    description: "Embedded systems, microcontrollers, and IoT sensor network integration experiments.",
    stargazers_count: 2,
    forks_count: 0,
    language: "C++",
  },
];

export const FALLBACK_COMMITS = [
  {
    id: "a7e19bf",
    message: "feat: refine developer portfolio UI alignment, responsiveness and neural loading",
    repo: "aryan-portfolio",
    fullRepo: "uiaryanyadav1109-dev/aryan-portfolio",
    date: new Date(Date.now() - 3600000 * 2).toISOString(),
    url: "https://github.com/uiaryanyadav1109-dev/aryan-portfolio",
  },
  {
    id: "d4c9820",
    message: "feat: implement streaming audio engine and responsive media player controls",
    repo: "VibePlay",
    fullRepo: "uiaryanyadav1109-dev/VibePlay",
    date: new Date(Date.now() - 3600000 * 26).toISOString(),
    url: "https://github.com/uiaryanyadav1109-dev/VibePlay",
  },
  {
    id: "f8a2bc4",
    message: "feat: cadastral polygon overlap verification algorithm with Gemini API",
    repo: "NLAMS-1",
    fullRepo: "sankirtansyadavofficial-Hack/NLAMS-1",
    date: new Date(Date.now() - 3600000 * 52).toISOString(),
    url: "https://github.com/sankirtansyadavofficial-Hack/NLAMS-1",
  },
  {
    id: "b2879d0",
    message: "feat: build student academic roadmap, resume matcher, and milestone tracker",
    repo: "StudentOS",
    fullRepo: "uiaryanyadav1109-dev/StudentOS",
    date: new Date(Date.now() - 3600000 * 78).toISOString(),
    url: "https://github.com/uiaryanyadav1109-dev",
  },
  {
    id: "e501b8a",
    message: "feat: real-time spectral frequency anomaly analysis for synthetic voice fraud",
    repo: "VoiceShield",
    fullRepo: "uiaryanyadav1109-dev/VoiceShield",
    date: new Date(Date.now() - 3600000 * 110).toISOString(),
    url: "https://github.com/uiaryanyadav1109-dev",
  },
  {
    id: "90492e1",
    message: "feat: automated NLP document extraction and legal notices summarization",
    repo: "Saral",
    fullRepo: "uiaryanyadav1109-dev/Saral",
    date: new Date(Date.now() - 3600000 * 145).toISOString(),
    url: "https://github.com/uiaryanyadav1109-dev",
  },
];

const CACHE_PREFIX = "aryan_gh_cache_";
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes cache to stay well within rate limits

function getCached(key) {
  try {
    const raw = sessionStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;
    const { data, timestamp } = JSON.parse(raw);
    if (Date.now() - timestamp < CACHE_TTL_MS) {
      return data;
    }
  } catch {
    // Ignore cache read failures
  }
  return null;
}

function setCache(key, data) {
  try {
    sessionStorage.setItem(
      CACHE_PREFIX + key,
      JSON.stringify({ data, timestamp: Date.now() })
    );
  } catch {
    // Ignore cache write failures
  }
}

async function fetchWithTimeout(url, timeoutMs = 6000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    return res;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

export async function getGitHubProfile() {
  const cached = getCached("profile");
  if (cached) return cached;

  try {
    const response = await fetchWithTimeout(GITHUB_API);
    if (response.ok) {
      const data = await response.json();
      setCache("profile", data);
      return data;
    }
  } catch (err) {
    console.warn("GitHub Profile fetch fallback triggered:", err);
  }

  return FALLBACK_PROFILE;
}

export async function getGitHubRepositories() {
  const cached = getCached("repos");
  if (cached) return cached;

  try {
    const response = await fetchWithTimeout(
      `${GITHUB_API}/repos?sort=updated&per_page=30`
    );
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setCache("repos", data);
        return data;
      }
    }
  } catch (err) {
    console.warn("GitHub Repositories fetch fallback triggered:", err);
  }

  return FALLBACK_REPOSITORIES;
}

export async function getGitHubEvents() {
  const cached = getCached("events");
  if (cached) return cached;

  try {
    const response = await fetchWithTimeout(
      `${GITHUB_API}/events/public?per_page=20`
    );

    if (!response.ok) {
      return FALLBACK_COMMITS;
    }

    const events = await response.json();
    if (!Array.isArray(events)) {
      return FALLBACK_COMMITS;
    }

    const commits = [];

    for (const event of events) {
      if (event.type === "PushEvent" && event.payload && Array.isArray(event.payload.commits)) {
        for (const commit of event.payload.commits) {
          commits.push({
            id: commit.sha,
            message: commit.message,
            repo: event.repo?.name ? event.repo.name.replace(`${GITHUB_USERNAME}/`, "") : "portfolio",
            fullRepo: event.repo?.name || "uiaryanyadav1109-dev/project",
            date: event.created_at,
            url: event.repo?.name
              ? `https://github.com/${event.repo.name}/commit/${commit.sha}`
              : `https://github.com/${GITHUB_USERNAME}`,
          });
          if (commits.length >= 6) break;
        }
      }
      if (commits.length >= 6) break;
    }

    if (commits.length > 0) {
      setCache("events", commits);
      return commits;
    }
  } catch (error) {
    console.warn("GitHub Events fetch fallback triggered:", error);
  }

  return FALLBACK_COMMITS;
}

export function calculateLanguageStats(repositories = []) {
  const counts = {};
  let totalValid = 0;

  repositories.forEach((repo) => {
    if (repo.language && !repo.fork) {
      counts[repo.language] = (counts[repo.language] || 0) + 1;
      totalValid += 1;
    }
  });

  if (totalValid === 0) {
    return [
      { name: "Python", count: 4, percentage: 40, color: GITHUB_LANGUAGE_COLORS.Python },
      { name: "JavaScript", count: 3, percentage: 30, color: GITHUB_LANGUAGE_COLORS.JavaScript },
      { name: "C++", count: 2, percentage: 20, color: GITHUB_LANGUAGE_COLORS["C++"] },
      { name: "HTML/CSS", count: 1, percentage: 10, color: GITHUB_LANGUAGE_COLORS.HTML },
    ];
  }

  return Object.entries(counts)
    .map(([language, count]) => ({
      name: language,
      count,
      percentage: Math.round((count / totalValid) * 100),
      color: GITHUB_LANGUAGE_COLORS[language] || GITHUB_LANGUAGE_COLORS.Other,
    }))
    .sort((a, b) => b.count - a.count);
}

export function calculateAggregatedStats(profile, repositories = []) {
  const totalStars = repositories.reduce(
    (sum, repo) => sum + (repo.stargazers_count || 0),
    0
  );

  const totalForks = repositories.reduce(
    (sum, repo) => sum + (repo.forks_count || 0),
    0
  );

  const totalWatchers = repositories.reduce(
    (sum, repo) => sum + (repo.watchers_count || 0),
    0
  );

  return {
    publicRepos: profile?.public_repos || repositories.length || 14,
    totalStars,
    totalForks,
    totalWatchers,
    followers: profile?.followers || 12,
    following: profile?.following || 15,
  };
}