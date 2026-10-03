import { useEffect, useState } from "react";

import {
  getGitHubProfile,
  getGitHubRepositories,
  getGitHubEvents,
  calculateLanguageStats,
  calculateAggregatedStats,
} from "../services/github";

function useGitHub() {
  const [profile, setProfile] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [recentEvents, setRecentEvents] = useState([]);
  const [aggregatedStats, setAggregatedStats] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadGitHubData() {
      try {
        setLoading(true);

        const [profileData, repositoryData, eventsData] =
          await Promise.all([
            getGitHubProfile(),
            getGitHubRepositories(),
            getGitHubEvents(),
          ]);

        setProfile(profileData);
        setRepositories(repositoryData);
        setRecentEvents(eventsData);

        const agg = calculateAggregatedStats(profileData, repositoryData);
        setAggregatedStats(agg);

        const langs = calculateLanguageStats(repositoryData);
        setLanguages(langs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadGitHubData();
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