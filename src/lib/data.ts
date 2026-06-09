export const STATS = [
  { value: 4, suffix: '+', label: 'Years with AI' },
  { value: 10, suffix: '', label: 'Agents Built' },
  { value: 6, suffix: '', label: 'Platforms Automated' },
  { value: 44, suffix: '', label: 'Design Projects' },
  { value: 603, suffix: '%', label: 'Growth Achieved' },
  { value: 711, suffix: '', label: 'Tests Passing' },
]

export const SKILL_DIMENSIONS = [
  {
    id: 'ai-agents',
    icon: '🤖',
    label: 'AI & Agents',
    tools: ['Claude API', 'OpenAI', 'Gemini', 'OpenClaw', 'Codex', 'Antigravity CLI'],
  },
  {
    id: 'prompt-eng',
    icon: '⚡',
    label: 'Prompt & Context Eng.',
    tools: ['Prompt Engineering', 'Context Engineering', 'Harness Engineering', 'Vibecoding', 'SOUL.md Architecture'],
  },
  {
    id: 'platform',
    icon: '🛠',
    label: 'Platform Dev.',
    tools: ['Next.js 14', 'TypeScript', 'Supabase', 'Node.js', 'Vercel', 'GitHub'],
  },
  {
    id: 'content',
    icon: '🎬',
    label: 'Content & Video',
    tools: ['Veo3', 'HeyGen', 'ElevenLab', 'Remotion', 'Adobe Suite', 'Kimi WebBridge'],
  },
  {
    id: 'design',
    icon: '✦',
    label: 'Design Thinking',
    tools: ['UI/UX', 'Figma', 'Canva', '3Ds Max', 'Stable Diffusion', 'Editorial Design'],
  },
  {
    id: 'business',
    icon: '📊',
    label: 'Business Strategy',
    tools: ['Marketing Strategy', 'Meta Ads', 'SEO', 'CRM Design', 'Revenue Modeling', 'OKR Management'],
  },
]

export const TIMELINE = [
  {
    year: '2020',
    title: 'Internship — Kiến Nam',
    description: 'Kỹ thuật xây dựng + Diễn họa kiến trúc',
    tech: ['AutoCAD', '3Ds Max'],
  },
  {
    year: '2022',
    title: 'B.A.T — Archviz & Design',
    description: "Applied Stable Diffusion + ChatGPT v1 to architectural visualization — one of the first GenAI applications in Vietnam's construction sector.",
    tech: ['Stable Diffusion', 'ChatGPT', '3Ds Max', 'Photoshop'],
  },
  {
    year: '2023',
    title: 'GECE Group — Marketing AI Pioneer',
    description: 'Built AI-powered CRM (Sheets+AppScript), chatbot prototype (VoiceFlow), rebuilt 80% of company website. Applied GenAI to marketing ops before mainstream.',
    tech: ['GPT-4o', 'AppScript', 'VoiceFlow', 'WordPress', 'Meta Ads'],
  },
  {
    year: '2025',
    title: 'ASL LAW — Automation + AI Film',
    description: 'Built Make.com automation suite beyond SOW, co-produced AI film "The Scent" with 6 AI models. Realized: coding agents > automation platforms.',
    tech: ['Make.com', 'Google AI Studio', 'Veo3', 'ElevenLab'],
  },
  {
    year: '2025 →',
    title: 'Solo Flows — Founder',
    description: 'Built a zero-headcount AI-native company. 10 agents across 3 machines, production platform with 711 tests, 5 revenue streams — all solo.',
    tech: ['OpenClaw', 'Claude Code', 'Next.js', 'Supabase', 'Codex'],
    isCurrent: true,
  },
]

export const PROJECTS = [
  {
    id: 'ai-movie',
    category: 'AI Film Production',
    title: 'The Scent',
    description: 'Directed a complete short film using 6 AI models simultaneously — Google AI Studio, Veo 3, ElevenLab, Minimax, ChatGPT, Gemini. Proof of multi-model orchestration and creative direction.',
    tags: ['Google AI Studio', 'Veo 3', 'ElevenLab', 'Minimax'],
    note: 'Internal at ASL LAW — not publicly released',
  },
  {
    id: 'ai-influencers',
    category: 'AI Persona System',
    title: 'AI Influencer Team',
    description: '4 autonomous AI influencer personas (Bruce, Mylara Vey, Khanh Huyen, Chu Sau) with persistent memory, SOUL.md identity architecture, daily heartbeat posts (07:00–23:00), and character evolution over time.',
    tags: ['OpenClaw', 'Prompt Engineering', 'Context Engineering', 'Discord'],
    links: [
      { label: '@mylara_vey', url: 'https://www.instagram.com/mylara_vey/' },
      { label: '@bruce_soloflows', url: 'https://www.instagram.com/bruce_soloflows/' },
    ],
  },
  {
    id: 'social-automation',
    category: 'Browser Automation',
    title: 'Social Publishing Automation',
    description: 'Built end-to-end publish pipelines for 6 platforms (Facebook, Instagram, TikTok, Threads, X, LinkedIn). Solved isTrusted wall on Facebook/Instagram via Win32 mouse_event + AttachThreadInput foreground bypass.',
    tags: ['Kimi WebBridge', 'Chrome CDP', 'AHK', 'Win32 API'],
  },
  {
    id: 'asl-automation',
    category: 'Workflow Automation',
    title: 'ASL LAW Automation Suite',
    description: 'Make.com workflows built beyond SOW: auto-create + post content in VI+EN simultaneously on Facebook and LinkedIn, batch business card scanning automation.',
    tags: ['Make.com', 'Facebook API', 'LinkedIn API'],
  },
  {
    id: 'gece-crm',
    category: 'AI Operations',
    title: 'GECE AI CRM',
    description: 'Built an internal CRM using Google Sheets + AppScript with AI-driven lead scoring and classification (IQL/MQL/SQL) — created when GPT-4o first launched, before CRM AI was standard.',
    tags: ['Google AppScript', 'GPT-4o', 'Google Sheets'],
  },
]

export const GECE_IMAGES = [
  '/images/gece/1.png',
  '/images/gece/tot nghiep ko so that nghiep.png',
  '/images/gece/PA1.png',
  '/images/gece/1.2.png',
  '/images/gece/1_1.png',
]

export const SOLOFLOWS_PILLARS = [
  {
    id: 'platform',
    icon: '🌐',
    title: 'The Platform',
    subtitle: 'soloflows.com',
    what: 'AI Influencer Booking — clients submit a brief, pay via QR, receive a full influencer campaign in 48 hours. No human ops needed.',
    how: 'Built using Vibecoding (Claude Code, Codex) and Context Engineering for product architecture. Full-stack product design from zero to production.',
    metrics: [
      '64 routes deployed',
      '711 tests passing',
      '62 DB migrations',
      '67 production bugs resolved',
      '5 revenue streams live',
    ],
    tech: 'Next.js 14 · TypeScript · Supabase · Cloudflare R2 · Vercel · Sepay + PayPal',
  },
  {
    id: 'agents',
    icon: '🤖',
    title: 'AI Agent System',
    subtitle: 'Inhouse Operations',
    what: 'Replaces a full marketing + ops team. CMO, Content team, Video team, and Comms team run autonomously — brainstorming, producing, and publishing content across 6 platforms with zero human intervention.',
    how: 'Designed using Harness Engineering (orchestration architecture), Prompt Engineering (agent identity via SOUL.md/PSYCHE.md files), and a file-based LLM pipeline with zero Python dependencies — all logic in Claude-readable instruction files.',
    metrics: [
      '10 autonomous agents',
      '3 machines (BOD · Execution · CRM)',
      '105 AI skills installed',
      '6 social platforms automated',
      'Discord as agent-to-agent bus',
    ],
    tech: 'OpenClaw · Claude Code · Codex · Antigravity CLI · Kimi WebBridge · Veo3 · HeyGen · Remotion',
  },
  {
    id: 'cs',
    icon: '💬',
    title: 'AI Customer Service',
    subtitle: 'Facebook 24/7',
    what: '24/7 Facebook auto-reply system that qualifies leads, answers queries, and routes them to the CRM pipeline — replacing a full CS team.',
    how: 'Built using conversational AI design, CRM workflow engineering, and Prompt Engineering for response logic and escalation rules.',
    metrics: [
      '24/7 uptime — no CS staff',
      'Automatic lead classification',
      'CRM pipeline integration',
    ],
    tech: 'Facebook API · CRM Integration · OpenClaw Customer Service Bot',
  },
]

export const SWOT = {
  strengths: [
    'Zero overhead — no payroll, pure margin',
    'Full-stack AI capability: engineer + marketer + operator in one',
    'Production-tested architecture (711 tests, 5 live revenue streams)',
    'Early-mover advantage in Vietnam AI influencer space',
  ],
  weaknesses: [
    'Single point of failure — founder-dependent for strategic decisions',
    'Early stage — brand awareness still growing',
    'Limited capacity to scale rapidly without infrastructure investment',
  ],
  opportunities: [
    'SME AI adoption wave — massive untapped market in Vietnam',
    'AI influencer market globally projected to grow 10× by 2027',
    'SoloAcademy: recurring education revenue stream (incoming)',
    'B2B: other companies want the same agent infrastructure',
  ],
  threats: [
    'AI tool commoditization — advantages erode as tools become mainstream',
    'Larger agencies entering AI influencer space with more capital',
    'Regulatory uncertainty around AI-generated content in Vietnam',
  ],
}

export const REVENUE_STREAMS = [
  { label: 'AI Content Credits', detail: 'VND (Sepay QR) + USD (PayPal)', icon: '💳' },
  { label: 'Booking Commission', detail: 'Per influencer campaign booked', icon: '📦' },
  { label: 'VIP Subscription', detail: '700 credits/month recurring', icon: '⭐' },
  { label: 'SoloAcademy', detail: 'Online courses (incoming)', icon: '🎓' },
  { label: 'Brand Partnerships', detail: 'Campaign collaborations', icon: '🤝' },
]

export const SOCIALS = {
  linkedin: 'https://www.linkedin.com/in/nam-nguyen-b0a463183/',
  instagram: 'https://www.instagram.com/bruce_soloflows/',
  email: 'c.nguyenhoainam11122000@gmail.com',
  soloflows: 'https://soloflows.com',
}
