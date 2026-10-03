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

export async function getGitHubProfile() {
  const response = await fetch(GITHUB_API);

  if (!response.ok) {
    throw new Error("Failed to fetch GitHub profile");
  }

  return response.json();
}

export async function getGitHubRepositories() {
  const response = await fetch(
    `${GITHUB_API}/repos?sort=updated&per_page=30`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch GitHub repositories");
  }

  return response.json();
}

export async function getGitHubEvents() {
  try {
    const response = await fetch(
      `${GITHUB_API}/events/public?per_page=20`
    );

    if (!response.ok) {
      return [];
    }

    const events = await response.json();

    // Extract recent commits
    const commits = [];

    for (const event of events) {
      if (event.type === "PushEvent" && event.payload && event.payload.commits) {
        for (const commit of event.payload.commits) {
          commits.push({
            id: commit.sha,
            message: commit.message,
            repo: event.repo.name.replace(`${GITHUB_USERNAME}/`, ""),
            fullRepo: event.repo.name,
            date: event.created_at,
            url: `https://github.com/${event.repo.name}/commit/${commit.sha}`,
          });
          if (commits.length >= 6) break;
        }
      }
      if (commits.length >= 6) break;
    }

    return commits;
  } catch (error) {
    console.warn("Unable to fetch GitHub events:", error);
    return [];
  }
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

  if (totalValid === 0) return [];

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
    publicRepos: profile?.public_repos || repositories.length,
    totalStars,
    totalForks,
    totalWatchers,
    followers: profile?.followers || 0,
    following: profile?.following || 0,
  };
}