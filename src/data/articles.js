export const articles = [
  {
    id: "voice-cloning-defense",
    title: "Detecting Voice Clones in Real-Time Banking Audio Streams",
    category: "AI Security",
    readTime: "4 min read",
    date: "Aug 2024",
    summary:
      "How spectral frequency anomaly detection and low-latency audio pipelines identify synthetic speech artifacts before fraudulent transactions execute.",
    tags: ["Voice AI", "Audio DSP", "Cybersecurity", "FastAPI"],
    problem:
      "Traditional banking phone verification relies on voice biometric match scores that are vulnerable to diffusion-based generative voice clones trained on under 10 seconds of sample audio.",
    solution:
      "Built a hybrid pipeline combining short-time Fourier transform (STFT) spectral analysis with an anomaly classifier that checks for unnatural phase consistency and vocoder artifact frequencies.",
    metrics: [
      "Sub-140ms end-to-end audio chunk processing",
      "93.8% detection accuracy on synthetic test vectors",
      "Zero plain-text audio storage with in-memory streaming"
    ],
  },
  {
    id: "cadastral-gis-nlams",
    title: "Cadastral Geometry & Spatial Polygon Verification with Gemini & GIS",
    category: "Full-Stack & GIS",
    readTime: "5 min read",
    date: "Oct 2024",
    summary:
      "Lessons learned building NLAMS: automating land acquisition dispute resolution, title verification, and cadastral overlap detection under hackathon pressure.",
    tags: ["GIS", "Spatial Analysis", "FastAPI", "Gemini API"],
    problem:
      "Manual land acquisition reviews take months due to conflicting deed descriptions, irregular polygon borders, and multilingual legal deed terminology.",
    solution:
      "Engineered an automated parsing engine using Gemini for multilingual deed extraction paired with GIS spatial polygon overlap detection to verify plot boundaries automatically.",
    metrics: [
      "Over 75% reduction in initial deed verification turnaround",
      "Instant polygon intersection flagging for dispute prevention",
      "Automated valuation and survey report generation"
    ],
  },
  {
    id: "student-os-architecture",
    title: "Designing Latency-Sensitive Full-Stack AI Ecosystems",
    category: "System Architecture",
    readTime: "3 min read",
    date: "Dec 2024",
    summary:
      "Balancing client-side responsiveness and server-side LLM orchestration in StudentOS: caching strategies, streaming tokens, and relational modeling.",
    tags: ["Next.js", "Node.js", "PostgreSQL", "System Design"],
    problem:
      "LLM inference latency can degrade interactive student workflows if prompts, roadmaps, and career matching queries are treated as blocking synchronous requests.",
    solution:
      "Implemented optimistic UI updates, streaming response tokens via Server-Sent Events, and multi-tier edge caching for common academic curricula and roadmap trees.",
    metrics: [
      "Instant visual response (<50ms) using optimistic state",
      "Streaming token delivery reducing perceived wait by 65%",
      "Structured JSON schema enforcement via Zod"
    ],
  },
];
