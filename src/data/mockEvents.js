export const initialEvents = [
  {
    id: 'evt-101',
    title: 'HackNova 2026: AI & Web3 National Hackathon',
    category: 'Hackathon',
    department: 'Computer Science & Engineering',
    date: '2026-10-15',
    time: '09:00 AM - 09:00 PM (36 Hours)',
    venue: 'Campus Innovation Center, Hall A',
    organizer: 'AI Research Club & CSE Dept',
    organizerEmail: 'hacknova@campus.edu',
    organizerPhone: '+1 (555) 019-2834',
    facultyAdvisor: 'Dr. Robert Vance, Head of AI Lab',
    shortDescription: 'Build next-gen AI agents, decentralized applications, and smart automation systems with mentorship and $5,000 in prizes.',
    description: 'HackNova 2026 is the flagship annual collegiate hackathon bringing together over 300 passionate developers, designers, and innovators. Tackle real-world problems using LLMs, computer vision, autonomous agents, and smart contracts. Enjoy 36 hours of non-stop hacking, free meals, energy drinks, technical mentor workshops, and direct hiring interviews with top tech sponsors.',
    banner: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    maxParticipants: 250,
    registeredCount: 218,
    registrationDeadline: '2026-10-12',
    status: 'Upcoming',
    isFeatured: true,
    skills: ['Artificial Intelligence', 'Python', 'Web3', 'React', 'Machine Learning'],
    tags: ['AI', 'Hackathon', 'Coding', 'Prizes', 'Team'],
    speakers: [
      {
        name: 'Dr. Elena Rostova',
        role: 'Principal AI Scientist',
        organization: 'DeepMind Labs',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'
      },
      {
        name: 'Marcus Chen',
        role: 'VP of Engineering',
        organization: 'NovaChain Solutions',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
      }
    ],
    rules: [
      'Teams must consist of 2 to 4 registered university students.',
      'All code must be written during the hackathon period. Open-source libraries are permitted.',
      'Bring your own laptops, chargers, and student ID cards.',
      'Final demos must include working source code and a 3-minute pitch to the jury.'
    ],
    popularityScore: 98,
    turnoutPrediction: '96% (High Demand - Fast Filling)'
  },
  {
    id: 'evt-102',
    title: 'Generative AI & LLM Systems Hands-on Workshop',
    category: 'Workshop',
    department: 'Computer Science & Engineering',
    date: '2026-09-28',
    time: '02:00 PM - 05:30 PM',
    venue: 'Turing Computer Lab 4, Tech Block',
    organizer: 'Google Student Developer Club (GDSC)',
    organizerEmail: 'gdsc@campus.edu',
    organizerPhone: '+1 (555) 012-4491',
    facultyAdvisor: 'Prof. Anita Sharma',
    shortDescription: 'Master Prompt Engineering, RAG (Retrieval-Augmented Generation), and Fine-tuning with practical Google Gemini and LangChain APIs.',
    description: 'In this intensive practical workshop, learn how to build enterprise-grade AI applications from scratch. Topics covered include Vector Embeddings, ChromaDB, LangChain orchestration, multimodal Gemini integration, and deploying agents to cloud servers. Every participant receives free API credits and a digital Certificate of Mastery.',
    banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    maxParticipants: 80,
    registeredCount: 71,
    registrationDeadline: '2026-09-26',
    status: 'Upcoming',
    isFeatured: true,
    skills: ['Artificial Intelligence', 'Python', 'LangChain', 'Prompt Engineering', 'Data Science'],
    tags: ['Workshop', 'AI', 'Hands-on', 'Certificate'],
    speakers: [
      {
        name: 'Devon Hughes',
        role: 'Staff ML Engineer',
        organization: 'OpenCloud AI',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
      }
    ],
    rules: [
      'Basic knowledge of Python programming is recommended.',
      'Participants must bring a laptop with Google Chrome or modern browser installed.',
      'Pre-installed Python 3.10+ and VS Code is strongly suggested.'
    ],
    popularityScore: 94,
    turnoutPrediction: '93% (Near Capacity)'
  },
  {
    id: 'evt-103',
    title: 'CodeBlitz: Inter-Collegiate Algorithmic Arena',
    category: 'Coding Competition',
    department: 'Computer Science & Engineering',
    date: '2026-10-05',
    time: '10:00 AM - 01:00 PM',
    venue: 'Central Computation Center',
    organizer: 'Competitive Programming Society (CPS)',
    organizerEmail: 'cps@campus.edu',
    organizerPhone: '+1 (555) 018-9923',
    facultyAdvisor: 'Dr. Kevin Zhao',
    shortDescription: 'Compete against top collegiate coders in 5 dynamic rounds of graph algorithms, dynamic programming, and math puzzles.',
    description: 'Sharpen your competitive coding and problem-solving skills before campus placement drives! CodeBlitz features an ICPC-style live scoreboard with instant penalties, dynamic test cases, and cash prizes for top 3 rankers. Supported languages include C++, Java, and Python.',
    banner: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    maxParticipants: 150,
    registeredCount: 112,
    registrationDeadline: '2026-10-03',
    status: 'Upcoming',
    isFeatured: false,
    skills: ['Competitive Programming', 'Data Structures', 'Algorithms', 'C++', 'Python'],
    tags: ['Coding', 'Contest', 'Leaderboard', 'Placement Prep'],
    speakers: [
      {
        name: 'Siddharth Nair',
        role: 'Candidate Master (Codeforces) & SDE II',
        organization: 'Uber',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80'
      }
    ],
    rules: [
      'Individual participation only (no teams).',
      'Plagiarism checks are strictly automated; disqualification on suspicious similarity.',
      'Allowed languages: C++20, Java 17, Python 3.11.'
    ],
    popularityScore: 91,
    turnoutPrediction: '88% (Expected Full)'
  },
  {
    id: 'evt-104',
    title: 'FAANG Placement Masterclass: Cracking Tech Interviews',
    category: 'Placement Training',
    department: 'Training & Placement Cell',
    date: '2026-10-08',
    time: '04:00 PM - 07:00 PM',
    venue: 'Main University Auditorium',
    organizer: 'Campus Placement & Career Cell',
    organizerEmail: 'placement@campus.edu',
    organizerPhone: '+1 (555) 014-7721',
    facultyAdvisor: 'Prof. Richard Sterling, Dean of Placements',
    shortDescription: 'Insider strategies on resume tailoring, system design rounds, behavioral questions, and mock salary negotiations.',
    description: 'Get hired at top tech giants! This exclusive interactive masterclass features alumni currently working at Google, Microsoft, Amazon, and Stripe. Learn how ATS filtering works, how to stand out during live system design rounds, how to navigate STAR behavioral interviews, and negotiate top-tier campus offers.',
    banner: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    maxParticipants: 400,
    registeredCount: 365,
    registrationDeadline: '2026-10-06',
    status: 'Upcoming',
    isFeatured: true,
    skills: ['Placements', 'System Design', 'Interview Prep', 'Resume Building', 'Soft Skills'],
    tags: ['Career', 'Placement', 'FAANG', 'Jobs'],
    speakers: [
      {
        name: 'Aishwarya Patil',
        role: 'Senior Staff Engineer',
        organization: 'Google Mountain View',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80'
      },
      {
        name: 'David K. Larson',
        role: 'Technical Recruiter',
        organization: 'Meta Career Advisory',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80'
      }
    ],
    rules: [
      'Open to all 3rd year and final year students across all departments.',
      'Bring a printed or digital copy of your current resume for live spot critiques.'
    ],
    popularityScore: 99,
    turnoutPrediction: '98% (High Demand)'
  },
  {
    id: 'evt-105',
    title: 'Future of Autonomous Robotics & Drones Seminar',
    category: 'Seminar',
    department: 'Electronics & Communication',
    date: '2026-10-18',
    time: '11:00 AM - 01:30 PM',
    venue: 'Seminar Hall 2, Faraday Complex',
    organizer: 'Robotics & Automation Society (IEEE)',
    organizerEmail: 'robotics@campus.edu',
    organizerPhone: '+1 (555) 016-3392',
    facultyAdvisor: 'Dr. Kenneth Clarke',
    shortDescription: 'Explore ROS2, LiDAR SLAM, and autonomous aerial navigation with live humanoid and drone flight demonstrations.',
    description: 'An inspiring tech seminar unveiling the cutting edge of industrial robotics, drone delivery corridors, and humanoid automation. Includes live stage demonstrations of quadcopters executing autonomous indoor path planning using obstacle avoidance algorithms.',
    banner: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
    maxParticipants: 120,
    registeredCount: 88,
    registrationDeadline: '2026-10-16',
    status: 'Upcoming',
    isFeatured: false,
    skills: ['Robotics', 'ROS2', 'Embedded Systems', 'IoT', 'Computer Vision'],
    tags: ['Robotics', 'Hardware', 'Drones', 'IEEE'],
    speakers: [
      {
        name: 'Dr. Hiroshi Tanaka',
        role: 'Robotics Research Director',
        organization: 'CyberDyne Tech',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80'
      }
    ],
    rules: [
      'Please arrive 15 minutes before scheduled start.',
      'Interactive Q&A session will be held at the conclusion of live demonstrations.'
    ],
    popularityScore: 86,
    turnoutPrediction: '85% (Good Turnout)'
  },
  {
    id: 'evt-106',
    title: 'Rhythm 2026: Annual Inter-College Cultural Fiesta',
    category: 'Cultural Event',
    department: 'Arts & Cultural Council',
    date: '2026-10-24',
    time: '05:00 PM - 10:30 PM',
    venue: 'Campus Open Air Amphitheatre',
    organizer: 'Student Cultural Committee',
    organizerEmail: 'rhythm@campus.edu',
    organizerPhone: '+1 (555) 019-8800',
    facultyAdvisor: 'Prof. Melissa Laurent',
    shortDescription: 'The biggest musical & dance extravaganza of the year featuring battle of bands, celebrity DJ night, and food festival.',
    description: 'Unwind with an electrifying night of live music, western and classical dance competitions, theatrical acts, fashion runway showcase, and artisanal food stalls. Bring your campus spirit and celebrate with thousands of students from over 25 visiting universities!',
    banner: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    maxParticipants: 1200,
    registeredCount: 940,
    registrationDeadline: '2026-10-22',
    status: 'Upcoming',
    isFeatured: true,
    skills: ['Music', 'Dance', 'Stage Performance', 'Event Management', 'Public Relations'],
    tags: ['Music', 'Fest', 'Cultural', 'DJ Night', 'Food'],
    speakers: [
      {
        name: 'SkyLine Beats (Live Band)',
        role: 'Headlining Musical Act',
        organization: 'Indie Sound Records',
        avatar: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&q=80'
      }
    ],
    rules: [
      'Valid student ID card is strictly mandatory for physical entry gate check.',
      'No external glass bottles or hazardous materials permitted on venue premises.'
    ],
    popularityScore: 97,
    turnoutPrediction: '95% (Capacity Alert)'
  },
  {
    id: 'evt-107',
    title: 'Campus Champions League: Inter-Dept Football Cup',
    category: 'Sports',
    department: 'Department of Physical Education',
    date: '2026-10-10',
    time: '03:30 PM - 07:00 PM',
    venue: 'University Sports Complex & Stadium',
    organizer: 'Sports Board & Football Club',
    organizerEmail: 'sports@campus.edu',
    organizerPhone: '+1 (555) 011-6677',
    facultyAdvisor: 'Coach Bradley Stevens',
    shortDescription: '7-a-side knockout tournament where departments battle for the coveted Chancellor’s Gold Trophy.',
    description: 'Experience the adrenaline of collegiate sports! 16 departmental teams compete in intense 7-a-side matches with rolling substitutions, official FIFA referees, live commentary, and player of the match awards for every fixture.',
    banner: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
    maxParticipants: 160,
    registeredCount: 140,
    registrationDeadline: '2026-10-07',
    status: 'Upcoming',
    isFeatured: false,
    skills: ['Sports', 'Athletics', 'Teamwork', 'Fitness', 'Leadership'],
    tags: ['Sports', 'Football', 'Championship', 'Tournament'],
    speakers: [
      {
        name: 'Coach Dave Miller',
        role: 'Former National League Striker',
        organization: 'State Athletic Council',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80'
      }
    ],
    rules: [
      'Teams must wear matching departmental sports jerseys with printed squad numbers.',
      'Standard FIFA rules apply with 25-minute halves.'
    ],
    popularityScore: 89,
    turnoutPrediction: '90% (High Excitement)'
  },
  {
    id: 'evt-108',
    title: 'Google Developer Student Clubs (GDSC) Orientation & Tech Talk',
    category: 'Club Activity',
    department: 'Computer Science & Engineering',
    date: '2026-09-22',
    time: '04:30 PM - 06:30 PM',
    venue: 'Seminar Hall 1, Tech Block',
    organizer: 'GDSC Campus Chapter',
    organizerEmail: 'gdsc.lead@campus.edu',
    organizerPhone: '+1 (555) 013-5588',
    facultyAdvisor: 'Prof. Anita Sharma',
    shortDescription: 'Discover club domains: Android, Cloud, AI/ML, and Open Source. Get roadmap for upcoming year projects and leadership roles.',
    description: 'Join the most vibrant student developer community on campus! Learn about upcoming Google Solution Challenge 2026, study jams, open-source cohorts, and network with senior core team leads. Swags and stickers for early attendees!',
    banner: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    maxParticipants: 100,
    registeredCount: 92,
    registrationDeadline: '2026-09-21',
    status: 'Upcoming',
    isFeatured: false,
    skills: ['Open Source', 'Community', 'Web Development', 'Cloud', 'Networking'],
    tags: ['Club', 'Community', 'GDSC', 'Orientation'],
    speakers: [
      {
        name: 'Rohan Gupta',
        role: 'GDSC Campus Lead 2025-26',
        organization: 'Campus Chapter',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80'
      }
    ],
    rules: [
      'Open to students from all years and all branches.',
      'Registration is free of cost.'
    ],
    popularityScore: 92,
    turnoutPrediction: '92% (Almost Full)'
  },
  {
    id: 'evt-109',
    title: 'Cloud Architecture & DevOps with AWS Hands-on Bootcamp',
    category: 'Workshop',
    department: 'Information Technology',
    date: '2026-10-12',
    time: '10:00 AM - 04:00 PM',
    venue: 'Cloud Computing Lab 2',
    organizer: 'AWS Student Club',
    organizerEmail: 'awsclub@campus.edu',
    organizerPhone: '+1 (555) 017-1144',
    facultyAdvisor: 'Dr. Jason Lee',
    shortDescription: 'Containerize apps with Docker, deploy to Amazon ECS, and set up automated CI/CD pipelines with GitHub Actions.',
    description: 'From code commit to cloud production! Get guided hands-on deployment experience on real AWS accounts. Learn IAM best practices, VPC architecture, Docker containerization, Kubernetes fundamentals, and zero-downtime rolling deployments.',
    banner: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    maxParticipants: 70,
    registeredCount: 65,
    registrationDeadline: '2026-10-10',
    status: 'Upcoming',
    isFeatured: false,
    skills: ['DevOps', 'AWS', 'Docker', 'Cloud Architecture', 'CI/CD'],
    tags: ['Cloud', 'DevOps', 'Workshop', 'AWS'],
    speakers: [
      {
        name: 'Priya Sundaram',
        role: 'Lead Cloud Solutions Architect',
        organization: 'Amazon Web Services',
        avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=300&q=80'
      }
    ],
    rules: [
      'Must have basic Linux command line familiarity.',
      'Bring your laptop with Docker Desktop installed.'
    ],
    popularityScore: 93,
    turnoutPrediction: '94% (Near Full)'
  },
  {
    id: 'evt-110',
    title: 'DesignSprint: UI/UX & Product Design Challenge',
    category: 'Workshop',
    department: 'Design & Media',
    date: '2026-10-20',
    time: '01:00 PM - 06:00 PM',
    venue: 'Design Studio Lab, Floor 3',
    organizer: 'Campus Design Collective',
    organizerEmail: 'design@campus.edu',
    organizerPhone: '+1 (555) 019-3311',
    facultyAdvisor: 'Prof. Chloe Bennett',
    shortDescription: '5-hour sprint designing accessible mobile apps in Figma. Learn design systems, user heuristics, and micro-interactions.',
    description: 'Transform rough ideas into polished, interactive prototypes. Work in pairs under mentorship from senior product designers. Top 3 prototype submissions receive Figma professional subscriptions and showcase features on our campus design showcase.',
    banner: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80',
    maxParticipants: 60,
    registeredCount: 48,
    registrationDeadline: '2026-10-18',
    status: 'Upcoming',
    isFeatured: false,
    skills: ['UI/UX Design', 'Figma', 'Product Thinking', 'Prototyping', 'Accessibility'],
    tags: ['Design', 'UI/UX', 'Figma', 'Sprint'],
    speakers: [
      {
        name: 'Jordan Rivera',
        role: 'Design Lead',
        organization: 'Linear App',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
      }
    ],
    rules: [
      'Have a free Figma account set up beforehand.',
      'Teams of 1 or 2 students.'
    ],
    popularityScore: 88,
    turnoutPrediction: '86% (Good Turnout)'
  },
  {
    id: 'evt-111',
    title: 'CyberDefend: Collegiate Capture The Flag (CTF)',
    category: 'Coding Competition',
    department: 'Computer Science & Engineering',
    date: '2026-09-10',
    time: '09:00 AM - 05:00 PM',
    venue: 'Cyber Security Virtual Lab',
    organizer: 'InfoSec Student Society',
    organizerEmail: 'infosec@campus.edu',
    organizerPhone: '+1 (555) 014-9911',
    facultyAdvisor: 'Dr. Arthur Pendelton',
    shortDescription: 'Hands-on ethical hacking, reverse engineering, web exploits, and cryptography challenge.',
    description: 'An exhilarating cybersecurity tournament testing defensive and offensive security skills. Solved challenges included buffer overflows, SQL injections, JWT bypasses, and wireless network analysis.',
    banner: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    maxParticipants: 100,
    registeredCount: 98,
    registrationDeadline: '2026-09-08',
    status: 'Completed',
    isFeatured: false,
    skills: ['Cybersecurity', 'Ethical Hacking', 'Cryptography', 'Linux', 'Network Security'],
    tags: ['Security', 'CTF', 'Hacking', 'Completed'],
    speakers: [
      {
        name: 'Samira Gomez',
        role: 'Senior Red Team Consultant',
        organization: 'Mandiant / Google Cloud',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'
      }
    ],
    rules: [
      'Attacking the tournament infrastructure is strictly forbidden.',
      'Flag sharing between teams results in disqualification.'
    ],
    popularityScore: 95,
    turnoutPrediction: 'Completed (98% Attended)'
  },
  {
    id: 'evt-112',
    title: 'Startup Pitch Fest: Venture Catalyst 2026',
    category: 'Seminar',
    department: 'School of Management / MBA',
    date: '2026-09-05',
    time: '10:00 AM - 04:00 PM',
    venue: 'Campus Incubation Center',
    organizer: 'E-Cell (Entrepreneurship Cell)',
    organizerEmail: 'ecell@campus.edu',
    organizerPhone: '+1 (555) 012-6633',
    facultyAdvisor: 'Dr. Walter White',
    shortDescription: 'Student founders pitch groundbreaking business ideas to angel investors and seed fund managers.',
    description: 'Over 20 collegiate startups pitched innovative products ranging from EdTech AI tools to green energy EV battery recycling. 3 teams secured seed funding grants totaling $25,000.',
    banner: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80',
    maxParticipants: 150,
    registeredCount: 148,
    registrationDeadline: '2026-09-03',
    status: 'Completed',
    isFeatured: false,
    skills: ['Entrepreneurship', 'Venture Capital', 'Pitching', 'Finance', 'Business Strategy'],
    tags: ['Startup', 'Pitch', 'Business', 'Completed'],
    speakers: [
      {
        name: 'Vikram Malhotra',
        role: 'Managing Partner',
        organization: 'Horizon Campus Ventures',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
      }
    ],
    rules: [
      '5-minute pitch followed by 3-minute investor Q&A.'
    ],
    popularityScore: 91,
    turnoutPrediction: 'Completed (99% Attended)'
  }
];

export const CATEGORIES = [
  'All',
  'Workshop',
  'Hackathon',
  'Seminar',
  'Coding Competition',
  'Cultural Event',
  'Sports',
  'Placement Training',
  'Club Activity'
];

export const DEPARTMENTS = [
  'All Departments',
  'Computer Science & Engineering',
  'Information Technology',
  'Electronics & Communication',
  'School of Management / MBA',
  'Department of Physical Education',
  'Arts & Cultural Council',
  'Training & Placement Cell',
  'Design & Media'
];
