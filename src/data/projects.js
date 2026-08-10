export const projects = [
  {
    slug: 'aero-sim2real', title: 'AERO-Sim2Real', year: '2025–2026', category: 'Robotics / Drones', status: 'Active research', featured: true,
    summary: 'A sim-to-real reinforcement learning platform for training UAV control policies in NVIDIA IsaacLab and deploying them to Crazyflie 2.1 drones.',
    description: 'Co-developed an autonomous flight workflow spanning simulation, policy inference, physical flight, operator control, telemetry, and experiment logging. The system connects learned navigation policies with a safety-conscious real-world control layer.',
    tech: ['Python', 'Crazyflie 2.1', 'IsaacLab', 'FastAPI', 'WebSockets', 'Reinforcement Learning'], image: '/assets/images/hero-network.png', video: '/assets/video/aerosim2real.mp4',
    features: ['Simulation-to-hardware policy workflow', 'Real-time telemetry and flight visualization', 'WebSocket operator commands', 'Safety and dead-man controls', 'Experiment and flight logging'],
    challenge: 'Bridging simulation assumptions with real hardware requires careful telemetry, command timing, observability, and safety boundaries.', github: 'https://github.com/AkbasLab/IsaacLab/tree/main/CrazyFlie_WebUI', demo: null
  },
  {
    slug: 'canvas-lms-toolkit', title: 'Canvas LMS Toolkit', year: 'Ongoing', category: 'Canvas / Education Technology', status: 'Private source', featured: true,
    summary: 'A collection of API-driven tools for course discovery, readiness checks, link validation, accessibility review, and bulk course operations.',
    description: 'Automation designed to reduce repetitive course-quality work across Canvas LMS. The tools use structured API workflows to inspect content and surface actionable issues while keeping institutional and student data private.',
    tech: ['Python', 'Canvas REST API', 'Automation', 'Accessibility'], image: null,
    features: ['Course search and readiness validation', 'Link and content checks', 'Instructor biography checks', 'Bulk course operations', 'Accessibility-oriented analysis'],
    challenge: 'The reusable application logic can be discussed publicly, but institutional course content, credentials, and student data must remain excluded.', github: null, demo: null
  },
  {
    slug: 'youtube-canvas-studio', title: 'YouTube → Canvas Studio', year: 'Ongoing', category: 'Automation', status: 'Private source', featured: true,
    summary: 'Content migration automation that finds YouTube embeds, uploads media to Canvas Studio, reuses duplicates, and updates course HTML.',
    description: 'A migration pipeline built to turn a repetitive, error-prone content task into a repeatable workflow. It identifies embedded media, avoids duplicate uploads when possible, and updates course pages programmatically.',
    tech: ['Python', 'Canvas REST API', 'Canvas Studio', 'HTML Processing'], image: null,
    features: ['Embed discovery', 'Automated Studio upload workflow', 'Duplicate-media reuse', 'Course HTML updates', 'Repeatable batch processing'],
    challenge: 'Media identity, API rate limits, and safe HTML mutation require deliberate checks and idempotent operations.', github: null, demo: null
  },
  {
    slug: 'discussion-redaction', title: 'Discussion Name Redaction', year: 'Recent', category: 'Artificial Intelligence', status: 'Private data excluded', featured: true,
    summary: 'A local NLP workflow for removing personally identifiable names from thousands of discussion messages before downstream analysis.',
    description: 'A privacy-first processing project combining named-entity recognition, local language-model experiments, spreadsheet workflows, and GPU-assisted runs. No student content or identifying datasets are published.',
    tech: ['Python', 'spaCy', 'Local LLMs', 'Excel', 'GPU Processing'], image: null,
    features: ['Named-entity detection', 'Local-only processing experiments', 'Spreadsheet ingestion and export', 'High-volume message handling', 'Human-review-friendly output'],
    challenge: 'Names are context-sensitive, so useful automation must balance recall with false positives while preserving the meaning of each message.', github: 'https://github.com/KoltonGalie/discussion-name-redactor', demo: null
  },
  {
    slug: 'homelab', title: 'Production Homelab', year: 'Ongoing', category: 'Systems Administration', status: 'Live infrastructure', featured: true,
    summary: 'A self-hosted Ubuntu environment with nginx routing, Cloudflare Tunnel, databases, containerized services, TLS, and operational recovery workflows.',
    description: 'A practical systems platform supporting multiple isolated applications behind nginx and a Cloudflare Tunnel. Work includes reverse-proxy design, TLS origin routing, service management, backups, and careful production changes.',
    tech: ['Ubuntu Server', 'nginx', 'Cloudflare Tunnel', 'PostgreSQL', 'Docker', 'TLS', 'DNS'], image: null,
    features: ['Multi-service reverse proxy', 'Cloudflare Tunnel ingress', 'TLS and hostname routing', 'Database-backed applications', 'Backup and rollback procedures'],
    challenge: 'The primary constraint is operational: improving one service without disrupting unrelated virtual hosts or exposing unnecessary ports.', github: null, demo: null
  },
  {
    slug: 'canvas-code-cleaner', title: 'Canvas Course Code Cleaner', year: 'Recent', category: 'Canvas / Education Technology', status: 'Private source', featured: false,
    summary: 'Course-content tooling for identifying and removing unwanted course codes or metadata from files and page content.',
    description: 'A focused cleanup workflow built around safe discovery and repeatable content changes in Canvas courses.', tech: ['Python', 'Canvas REST API', 'Content Analysis'], image: null,
    features: ['Pattern discovery', 'Course content inspection', 'Targeted cleanup', 'Batch-oriented workflow'], challenge: 'Automated cleanup must avoid changing legitimate instructional content.', github: null, demo: null
  },
  {
    slug: 'encrypt-yo-face', title: 'EncryptYoFace', year: '2025', category: 'Cybersecurity', status: 'Prototype', featured: false,
    summary: 'A Flask application that generates a facial map and uses it as input to a user-specific cryptographic key workflow.',
    description: 'An exploration at the intersection of computer vision, biometrics, web applications, and applied cryptography.', tech: ['Python', 'Flask', 'Computer Vision', 'Cryptography'], image: '/assets/images/encryptyoface_static.gif',
    features: ['Web-based capture workflow', 'Face-map generation', 'User-specific key experiment'], challenge: 'Biometric inputs require careful threat modeling and should never be treated as replaceable passwords without robust safeguards.', github: 'https://github.com/KoltonGalie/encrypt-yo-face', demo: null
  },
  {
    slug: 'pokemon-card-gan', title: 'Pokémon Trading Card GAN', year: '2024', category: 'Artificial Intelligence', status: 'Completed', featured: false,
    summary: 'A generative adversarial network trained to synthesize original trading-card-style imagery.', description: 'A machine-learning experiment exploring adversarial training and visual generation.', tech: ['Python', 'GANs', 'Machine Learning'], image: '/assets/images/pokemon_gan_static.png',
    features: ['Adversarial image generation', 'Training-data pipeline', 'Generated-image evaluation'], challenge: 'GAN stability and visual coherence depend heavily on data preparation and balanced training.', github: 'https://github.com/KoltonGalie/pokemon-card-gan', demo: null
  },
  {
    slug: 'valorant-discord-bot', title: 'Valorant Discord Bot', year: '2024', category: 'Automation', status: 'Completed', featured: false,
    summary: 'A Discord bot that retrieves recent match statistics and uses a language model to generate a contextual gameplay comment.', description: 'An API integration project joining game statistics, conversational interfaces, and language-model output.', tech: ['Python', 'Discord API', 'REST API', 'LLM'], image: '/assets/images/valorant_bot.png',
    features: ['Match-stat retrieval', 'Discord commands', 'Contextual generated commentary'], challenge: 'Reliable responses require graceful handling of external API errors and incomplete player data.', github: 'https://github.com/KoltonGalie/valorant-discord-bot', demo: null
  },
  {
    slug: 'acm-trading-challenge', title: 'ACM Trading Challenge', year: '2023', category: 'Data / Database', status: 'First-place competition project', featured: false,
    summary: 'A five-person team project that developed a strategy to maximize simulated stock-trading profit over a 24-hour period.', description: 'A time-boxed optimization project created for an ACM coding competition.', tech: ['Algorithms', 'Optimization', 'Team Leadership'], image: '/assets/images/acm_competition.png',
    features: ['Trading-strategy optimization', 'Time-boxed implementation', 'Five-person team coordination'], challenge: 'The competition combined rapid algorithm design with execution under a strict deadline.', github: null, demo: null
  },
  {
    slug: 'motion-extraction', title: 'Motion Extraction', year: '2023', category: 'Artificial Intelligence', status: 'Completed', featured: false,
    summary: 'Python video software that detects and isolates motion through a custom processing approach.', description: 'A computer-vision project focused on extracting changing regions from video.', tech: ['Python', 'Computer Vision', 'Video Processing'], image: '/assets/images/motion_extraction_static.png',
    features: ['Video-frame processing', 'Motion detection', 'Visual output generation'], challenge: 'Separating meaningful motion from noise and camera artifacts is a core signal-processing challenge.', github: 'https://github.com/KoltonGalie/motion-extraction', demo: null
  },
  {
    slug: 'typing-game', title: 'AI-Assisted Typing Game', year: '2023', category: 'Artificial Intelligence', status: 'Completed', featured: false,
    summary: 'A team-built Python typing game using hand tracking to suggest improvements in typing efficiency.', description: 'An interactive project combining gameplay, computer vision, and real-time feedback.', tech: ['Python', 'Hand Tracking', 'Computer Vision'], image: '/assets/images/typing_game_static.png',
    features: ['Typing gameplay', 'AI hand tracking', 'Efficiency feedback'], challenge: 'Real-time hand tracking must stay responsive without distracting from the typing experience.', github: 'https://github.com/KoltonGalie/type-master', demo: null
  },
  {
    slug: 'music-inventory', title: 'Music Inventory Manager', year: '2025', category: 'Data / Database', status: 'Completed', featured: false,
    summary: 'A full-control inventory interface designed for managing a music store database.', description: 'A database application focused on practical inventory operations and data management.', tech: ['SQL', 'Database Design', 'Web Development'], image: '/assets/images/music_inventory_manager.png',
    features: ['Inventory CRUD operations', 'Structured catalog management', 'Database-backed interface'], challenge: 'Inventory systems depend on clear data models and safe, predictable updates.', github: 'https://github.com/KoltonGalie/music-inventory-manager', demo: null
  }
];
