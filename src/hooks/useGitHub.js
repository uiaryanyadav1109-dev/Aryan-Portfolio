import { useEffect, useState } from "react";

import {
  getGitHubProfile,
  getGitHubRepositories,
  getGitHubEvents,
  calculateLanguageStats,
  calculateAggregatedStats,
  FALLBACK_PROFILE,
  FALLBACK_REPOSITORIES,
  FALLBACK_COMMITS,
} from "../services/github";

function useGitHub() {
  const [profile, setProfile] = useState(FALLBACK_PROFILE);
  const [repositories, setRepositories] = useState(FALLBACK_REPOSITORIES);
  const [recentEvents, setRecentEvents] = useState(FALLBACK_COMMITS);
  const [aggregatedStats, setAggregatedStats] = useState(() =>
    calculateAggregatedStats(FALLBACK_PROFILE, FALLBACK_REPOSITORIES)
  );
  const [languages, setLanguages] = useState(() =>
    calculateLanguageStats(FALLBACK_REPOSITORIES)
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadGitHubData() {
      try {
        setLoading(true);

        const [profileData, repositoryData, eventsData] =
          await Promise.all([
            getGitHubProfile(),
            getGitHubRepositories(),
            getGitHubEvents(),
          ]);

        if (!isMounted) return;

        const finalProfile = profileData || FALLBACK_PROFILE;
        const finalRepos =
          Array.isArray(repositoryData) && repositoryData.length > 0
            ? repositoryData
            : FALLBACK_REPOSITORIES;
        const finalEvents =
          Array.isArray(eventsData) && eventsData.length > 0
            ? eventsData
            : FALLBACK_COMMITS;

        setProfile(finalProfile);
        setRepositories(finalRepos);
        setRecentEvents(finalEvents);

        const agg = calculateAggregatedStats(finalProfile, finalRepos);
        setAggregatedStats(agg);

        const langs = calculateLanguageStats(finalRepos);
        setLanguages(langs);
      } catch (err) {
        if (isMounted) {
          console.warn("GitHub data fetch handled with fallback:", err);
          setError(null); // Keep fallback visible rather than breaking the UI
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadGitHubData();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    profile,
    repositories,
    recentEvents,
    aggregatedStats,
    languages,
    loading,
    error,
  };
}

export default useGitHub;