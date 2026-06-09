export const STATS = [
  { value: 4, suffix: '+', labelKey: 'yearsAI' },
  { value: 10, suffix: '', labelKey: 'agentsBuilt' },
  { value: 6, suffix: '', labelKey: 'platforms' },
  { value: 44, suffix: '', labelKey: 'designProjects' },
  { value: 603, suffix: '%', labelKey: 'growth' },
  { value: 711, suffix: '', labelKey: 'tests' },
]

export const SKILL_DIMENSIONS = [
  {
    id: 'ai-agents',
    tools: ['Claude API', 'OpenAI', 'Gemini', 'OpenClaw', 'Codex', 'Antigravity CLI'],
  },
  {
    id: 'prompt-eng',
    tools: ['Prompt Engineering', 'Context Engineering', 'Harness Engineering', 'Vibecoding', 'SOUL.md Architecture'],
  },
  {
    id: 'platform',
    tools: ['Next.js', 'TypeScript', 'Supabase', 'Node.js', 'Vercel', 'GitHub'],
  },
  {
    id: 'content',
    tools: ['Veo3', 'HeyGen', 'ElevenLab', 'Remotion', 'Adobe Suite', 'Kimi WebBridge'],
  },
  {
    id: 'design',
    tools: ['UI/UX', 'Figma', 'Canva', '3Ds Max', 'Stable Diffusion', 'Editorial Design'],
  },
  {
    id: 'business',
    tools: ['Marketing Strategy', 'Meta Ads', 'SEO', 'CRM Design', 'Revenue Modeling', 'OKR Management'],
  },
]

// Timeline stored newest first (2026 → 2020)
export const TIMELINE = [
  {
    year: '2025 →',
    title: 'Solo Flows — Founder',
    titleVi: 'Solo Flows — Người Sáng Lập',
    description: 'Built a zero-headcount AI-native company. 10 agents across 3 machines, production platform with 711 tests, 5 revenue streams — all solo.',
    descriptionVi: 'Xây dựng công ty AI-native không nhân sự. 10 agents trên 3 máy tính, nền tảng production với 711 tests, 5 luồng doanh thu — một mình.',
    tech: ['OpenClaw', 'Claude Code', 'Next.js', 'Supabase', 'Codex'],
    isCurrent: true,
  },
  {
    year: '2025',
    title: 'ASL LAW — Automation + AI Film',
    titleVi: 'ASL LAW — Tự Động Hoá + Phim AI',
    description: 'Built Make.com automation suite beyond SOW, co-produced AI film "The Scent" with 6 AI models. Realized: coding agents > automation platforms.',
    descriptionVi: 'Xây dựng bộ tự động hoá Make.com ngoài phạm vi công việc, đồng sản xuất phim AI "The Scent" với 6 AI models. Nhận ra: coding agents > automation platforms.',
    tech: ['Make.com', 'Google AI Studio', 'Veo3', 'ElevenLab'],
  },
  {
    year: '2023',
    title: 'GECE Group — Marketing AI Pioneer',
    titleVi: 'GECE Group — Tiên Phong AI Marketing',
    description: 'Built AI-powered CRM (Sheets+AppScript), chatbot prototype (VoiceFlow), rebuilt 80% of company website. Applied GenAI to marketing ops before mainstream.',
    descriptionVi: 'Xây dựng CRM bằng AI (Sheets+AppScript), prototype chatbot (VoiceFlow), làm lại 80% website công ty. Ứng dụng GenAI vào marketing trước khi phổ biến.',
    tech: ['GPT-4o', 'AppScript', 'VoiceFlow', 'WordPress', 'Meta Ads'],
  },
  {
    year: '2022',
    title: 'B.A.T — Archviz & Design',
    titleVi: 'B.A.T — Diễn Họa & Thiết Kế',
    description: "Applied Stable Diffusion + ChatGPT v1 to architectural visualization — one of the first GenAI applications in Vietnam's construction sector.",
    descriptionVi: 'Ứng dụng Stable Diffusion + ChatGPT v1 vào diễn họa kiến trúc — một trong những ứng dụng GenAI đầu tiên trong ngành xây dựng Việt Nam.',
    tech: ['Stable Diffusion', 'ChatGPT', '3Ds Max', 'Photoshop'],
  },
  {
    year: '2020',
    title: 'Internship — Kiến Nam',
    titleVi: 'Thực Tập — Kiến Nam',
    description: 'Civil engineering internship + architectural visualization.',
    descriptionVi: 'Thực tập kỹ thuật xây dựng + diễn họa kiến trúc.',
    tech: ['AutoCAD', '3Ds Max'],
  },
]

export const PROJECTS = [
  {
    id: 'ai-movie',
    category: 'AI Film Production',
    categoryVi: 'Sản Xuất Phim AI',
    title: 'The Scent',
    description: 'Directed a complete short film using 6 AI models simultaneously — Google AI Studio, Veo 3, ElevenLab, Minimax, ChatGPT, Gemini. Proof of multi-model orchestration and creative direction.',
    descriptionVi: 'Đạo diễn một bộ phim ngắn hoàn chỉnh bằng 6 AI models cùng lúc — Google AI Studio, Veo 3, ElevenLab, Minimax, ChatGPT, Gemini. Bằng chứng về multi-model orchestration.',
    tags: ['Google AI Studio', 'Veo 3', 'ElevenLab', 'Minimax'],
    note: 'Internal at ASL LAW — not publicly released',
    noteVi: 'Nội bộ ASL LAW — chưa phát hành công khai',
    images: ['/images/projects/asl-the-scent.png'],
  },
  {
    id: 'ai-influencers',
    category: 'AI Persona System',
    categoryVi: 'Hệ Thống Nhân Vật AI',
    title: 'AI Influencer Team',
    titleVi: 'Đội Influencer AI',
    description: '4 autonomous AI influencer personas with persistent memory, SOUL.md identity architecture, daily heartbeat posts (07:00–23:00), and character evolution over time.',
    descriptionVi: '4 nhân vật influencer AI với bộ nhớ liên tục, kiến trúc danh tính SOUL.md, lịch đăng tự động (07:00–23:00) và sự phát triển nhân vật theo thời gian.',
    tags: ['OpenClaw', 'Prompt Engineering', 'Context Engineering', 'Discord'],
    links: [
      { label: '@mylara_vey', url: 'https://www.instagram.com/mylara_vey/' },
      { label: '@bruce_soloflows', url: 'https://www.instagram.com/bruce_soloflows/' },
    ],
    images: ['/images/projects/sf-influencer.png'],
  },
  {
    id: 'social-automation',
    category: 'Browser Automation',
    categoryVi: 'Tự Động Hoá Trình Duyệt',
    title: 'Social Publishing Automation',
    titleVi: 'Tự Động Đăng Bài Đa Nền Tảng',
    description: 'Built end-to-end publish pipelines for 6 platforms (Facebook, Instagram, TikTok, Threads, X, LinkedIn). Solved isTrusted wall via Win32 mouse_event + AttachThreadInput foreground bypass.',
    descriptionVi: 'Xây dựng pipeline đăng bài tự động cho 6 nền tảng. Giải quyết vấn đề isTrusted trên Facebook/Instagram qua Win32 mouse_event + AttachThreadInput.',
    tags: ['Kimi WebBridge', 'Chrome CDP', 'AHK', 'Win32 API'],
    images: ['/images/projects/sf-multichannel.jpg'],
  },
  {
    id: 'asl-automation',
    category: 'Workflow Automation',
    categoryVi: 'Tự Động Hoá Quy Trình',
    title: 'ASL LAW Automation Suite',
    titleVi: 'Bộ Tự Động Hoá ASL LAW',
    description: 'Make.com workflows: auto-create + post content in VI+EN simultaneously on Facebook and LinkedIn, batch business card scanning automation.',
    descriptionVi: 'Workflow Make.com: tự động tạo + đăng nội dung VI+EN đồng thời trên Facebook và LinkedIn, quét card visit hàng loạt.',
    tags: ['Make.com', 'Facebook API', 'LinkedIn API'],
    images: ['/images/projects/make-workflow.png'],
  },
  {
    id: 'gece-crm',
    category: 'AI Operations',
    categoryVi: 'Vận Hành AI',
    title: 'GECE AI CRM',
    description: 'Built an internal CRM using Google Sheets + AppScript with AI-driven lead scoring and classification (IQL/MQL/SQL) — created when GPT-4o first launched.',
    descriptionVi: 'Xây dựng CRM nội bộ bằng Google Sheets + AppScript với AI phân loại lead (IQL/MQL/SQL) — tạo ngay khi GPT-4o ra mắt.',
    tags: ['Google AppScript', 'GPT-4o', 'Google Sheets'],
    images: ['/images/projects/gece-crm.jpg'],
  },
  {
    id: 'gece-design',
    category: 'Graphic Design',
    categoryVi: 'Thiết Kế Đồ Họa',
    title: 'GECE Group — Design Portfolio',
    titleVi: 'GECE Group — Portfolio Thiết Kế',
    description: '44 graphic design projects across brand identity, advertising, editorial, and event materials for GECE Group — a construction & real estate company in Vietnam.',
    descriptionVi: '44 dự án thiết kế đồ hoạ bao gồm nhận diện thương hiệu, quảng cáo, editorial và tài liệu sự kiện cho GECE Group — công ty xây dựng & bất động sản tại Việt Nam.',
    tags: ['Adobe Illustrator', 'Photoshop', 'InDesign', 'Canva', 'Brand Identity'],
    images: [
      '/images/gece/1.png',
      '/images/gece/tot nghiep ko so that nghiep.png',
      '/images/gece/PA1.png',
      '/images/gece/1.2.png',
      '/images/gece/1_1.png',
    ],
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
    title: 'The Platform',
    titleVi: 'Nền Tảng',
    subtitle: 'soloflows.com',
    subtitleVi: 'soloflows.com',
    what: 'AI Influencer Booking — clients submit a brief, pay via QR, receive a full influencer campaign in 48 hours. No human ops needed.',
    whatVi: 'Đặt hàng Influencer AI — khách hàng gửi brief, thanh toán QR, nhận chiến dịch influencer hoàn chỉnh trong 48 giờ. Không cần nhân sự vận hành.',
    how: 'Built using Vibecoding (Claude Code, Codex) and Context Engineering for product architecture. Full-stack product design from zero to production.',
    howVi: 'Xây dựng bằng Vibecoding (Claude Code, Codex) và Context Engineering cho kiến trúc sản phẩm. Thiết kế full-stack từ zero đến production.',
    metrics: ['64 routes deployed', '711 tests passing', '62 DB migrations', '67 production bugs resolved', '5 revenue streams live'],
    metricsVi: ['64 routes đã triển khai', '711 tests đang chạy', '62 DB migrations', '67 production bugs đã xử lý', '5 luồng doanh thu đang hoạt động'],
    tech: 'Next.js 14 · TypeScript · Supabase · Cloudflare R2 · Vercel · Sepay + PayPal',
    images: ['/images/projects/sf-platform-hero.png', '/images/projects/sf-booking.png', '/images/projects/sf-newfeed.png', '/images/projects/sf-explore.png'],
  },
  {
    id: 'agents',
    title: 'AI Agent System',
    titleVi: 'Hệ Thống AI Agent',
    subtitle: 'Inhouse Operations',
    subtitleVi: 'Vận Hành Nội Bộ',
    what: 'Replaces a full marketing + ops team. CMO, Content, Video, and Comms teams run autonomously across 6 platforms with zero human intervention.',
    whatVi: 'Thay thế cả team marketing + vận hành. CMO, Content, Video và Comms team hoạt động tự động trên 6 nền tảng, không cần can thiệp của con người.',
    how: 'Designed using Harness Engineering (orchestration architecture), Prompt Engineering (agent identity via SOUL.md/PSYCHE.md files), and a file-based LLM pipeline with zero Python dependencies.',
    howVi: 'Thiết kế bằng Harness Engineering (kiến trúc điều phối), Prompt Engineering (danh tính agent qua SOUL.md/PSYCHE.md) và LLM pipeline dựa trên file, không phụ thuộc Python.',
    metrics: ['10 autonomous agents', '3 machines (BOD · Execution · CRM)', '105 AI skills installed', '6 social platforms automated', 'Discord as agent-to-agent bus'],
    metricsVi: ['10 agents tự động', '3 máy tính (BOD · Thực Thi · CRM)', '105 AI skills đã cài', '6 nền tảng mạng xã hội tự động hoá', 'Discord làm bus giao tiếp agent'],
    tech: 'OpenClaw · Claude Code · Codex · Antigravity CLI · Kimi WebBridge · Veo3 · HeyGen · Remotion',
    images: ['/images/projects/sf-agents-log.jpg', '/images/projects/sf-agents-discord.jpg'],
  },
  {
    id: 'cs',
    title: 'AI Customer Service',
    titleVi: 'AI Chăm Sóc Khách Hàng',
    subtitle: 'Facebook 24/7',
    subtitleVi: 'Facebook 24/7',
    what: '24/7 Facebook auto-reply system that qualifies leads, answers queries, and routes them to the CRM pipeline — replacing a full CS team.',
    whatVi: 'Hệ thống tự động trả lời Facebook 24/7, phân loại lead, trả lời câu hỏi và đưa vào CRM pipeline — thay thế cả bộ phận CSKH.',
    how: 'Built using conversational AI design, CRM workflow engineering, and Prompt Engineering for response logic and escalation rules.',
    howVi: 'Xây dựng bằng thiết kế AI hội thoại, CRM workflow engineering và Prompt Engineering cho logic phản hồi và quy tắc leo thang.',
    metrics: ['24/7 uptime — no CS staff', 'Automatic lead classification', 'CRM pipeline integration'],
    metricsVi: ['24/7 không cần nhân viên CSKH', 'Tự động phân loại lead', 'Tích hợp CRM pipeline'],
    tech: 'Facebook API · CRM Integration · OpenClaw Customer Service Bot',
    images: ['/images/projects/sf-chatbot.png'],
  },
]

export const SWOT = {
  strengths: ['Zero overhead — no payroll, pure margin', 'Full-stack AI capability: engineer + marketer + operator in one', 'Production-tested architecture (711 tests, 5 live revenue streams)', 'Early-mover advantage in Vietnam AI influencer space'],
  strengthsVi: ['Không chi phí cố định — không lương nhân viên, lợi nhuận thuần', 'Năng lực AI toàn diện: kỹ sư + marketer + vận hành trong một người', 'Kiến trúc đã kiểm thử production (711 tests, 5 luồng doanh thu)', 'Lợi thế người đi đầu trong không gian AI influencer tại Việt Nam'],
  weaknesses: ['Single point of failure — founder-dependent for strategic decisions', 'Early stage — brand awareness still growing', 'Limited capacity to scale rapidly without infrastructure investment'],
  weaknessesVi: ['Điểm lỗi duy nhất — phụ thuộc founder cho các quyết định chiến lược', 'Giai đoạn đầu — nhận diện thương hiệu đang phát triển', 'Năng lực mở rộng nhanh bị giới hạn nếu không đầu tư hạ tầng'],
  opportunities: ['SME AI adoption wave — massive untapped market in Vietnam', 'AI influencer market globally projected to grow 10× by 2027', 'SoloAcademy: recurring education revenue stream (incoming)', 'B2B: other companies want the same agent infrastructure'],
  opportunitiesVi: ['Làn sóng AI cho SME — thị trường chưa khai thác khổng lồ tại Việt Nam', 'Thị trường AI influencer toàn cầu dự kiến tăng 10× vào 2027', 'SoloAcademy: luồng doanh thu giáo dục định kỳ (sắp ra mắt)', 'B2B: các công ty khác muốn cùng kiến trúc agent'],
  threats: ['AI tool commoditization — advantages erode as tools become mainstream', 'Larger agencies entering AI influencer space with more capital', 'Regulatory uncertainty around AI-generated content in Vietnam'],
  threatsVi: ['Hàng hoá hoá công cụ AI — lợi thế mất dần khi công cụ trở nên phổ biến', 'Các agency lớn hơn gia nhập không gian AI influencer với nhiều vốn hơn', 'Sự không chắc chắn về quy định nội dung do AI tạo ra tại Việt Nam'],
}

export const REVENUE_STREAMS = [
  { labelEn: 'AI Content Credits', labelVi: 'Credits Nội Dung AI', detail: 'VND (Sepay QR) + USD (PayPal)', detailVi: 'VND (Sepay QR) + USD (PayPal)', icon: 'CreditCard' },
  { labelEn: 'Booking Commission', labelVi: 'Hoa Hồng Đặt Hàng', detail: 'Per influencer campaign booked', detailVi: 'Theo chiến dịch influencer', icon: 'Package' },
  { labelEn: 'VIP Subscription', labelVi: 'Đăng Ký VIP', detail: '700 credits/month recurring', detailVi: '700 credits/tháng định kỳ', icon: 'Star' },
  { labelEn: 'SoloAcademy', labelVi: 'SoloAcademy', detail: 'Online courses (incoming)', detailVi: 'Khoá học online (sắp ra)', icon: 'GraduationCap' },
  { labelEn: 'Brand Partnerships', labelVi: 'Hợp Tác Thương Hiệu', detail: 'Campaign collaborations', detailVi: 'Hợp tác chiến dịch', icon: 'Handshake' },
]

export const SOLOFLOWS_COMPANY_SOCIALS = [
  { label: 'Facebook', url: 'https://www.facebook.com/soloflows.avim', icon: 'Facebook' },
  { label: 'Instagram', url: 'https://www.instagram.com/soloflows_official/', icon: 'Instagram' },
  { label: 'YouTube', url: 'https://www.youtube.com/@soloflows', icon: 'Youtube' },
  { label: 'X / Twitter', url: 'https://x.com/FlowsSolo86497', icon: 'Twitter' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/company/solo-flows/', icon: 'Linkedin' },
]

export const INFLUENCERS = [
  {
    id: 'bruce',
    name: 'Bruce',
    role: 'AI Co-Founder & Tech Creator',
    roleVi: 'AI Co-Founder & Tech Creator',
    bio: 'The strategic voice of Solo Flows — breaks down AI, automation, and the future of work for a tech-savvy audience.',
    bioVi: 'Tiếng nói chiến lược của Solo Flows — phân tích AI, tự động hoá và tương lai công việc cho khán giả am hiểu công nghệ.',
    avatar: '/images/bruce.png',
    socials: [
      { label: 'Instagram', url: 'https://www.instagram.com/bruce_soloflows/', icon: 'Instagram' },
      { label: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61584449700344', icon: 'Facebook' },
      { label: 'Threads', url: 'https://www.threads.com/@bruce_soloflows', icon: 'MessageCircle' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/bruce-ai-virtual-co-founder-322a51392/', icon: 'Linkedin' },
    ],
  },
  {
    id: 'mylara',
    name: 'Mylara Vey',
    role: 'Digital Musician & Artist',
    roleVi: 'Nhạc Sĩ & Nghệ Sĩ Kỹ Thuật Số',
    bio: 'A mysterious AI musician blending electronic sound, visual art, and digital fashion at the intersection of AI and culture.',
    bioVi: 'Nhạc sĩ AI bí ẩn kết hợp âm nhạc điện tử, nghệ thuật thị giác và thời trang kỹ thuật số tại giao điểm của AI và văn hoá.',
    avatar: '/images/mylara.jpg',
    socials: [
      { label: 'Instagram', url: 'https://www.instagram.com/mylara_vey/', icon: 'Instagram' },
      { label: 'Facebook', url: 'https://www.facebook.com/realmylara/', icon: 'Facebook' },
      { label: 'TikTok', url: 'https://www.tiktok.com/@mylara_vey', icon: 'Music' },
      { label: 'Threads', url: 'https://www.threads.com/@mylara_vey', icon: 'MessageCircle' },
    ],
  },
  {
    id: 'chusau',
    name: 'Chú Sáu',
    role: 'Fitness & Lifestyle Expert',
    roleVi: 'Chuyên Gia Fitness & Lifestyle',
    bio: "Vietnam's AI fitness coach — authentic, motivational content on health, discipline, and daily routines.",
    bioVi: 'Huấn luyện viên fitness AI của Việt Nam — nội dung chân thực, truyền động lực về sức khoẻ, kỷ luật và thói quen hàng ngày.',
    avatar: null,
    socials: [
      { label: 'Instagram', url: 'https://www.instagram.com/chusau.fit/', icon: 'Instagram' },
      { label: 'Facebook', url: 'https://www.facebook.com/chusau.fit/', icon: 'Facebook' },
      { label: 'TikTok', url: 'https://www.tiktok.com/@chu.sau.fit', icon: 'Music' },
      { label: 'Threads', url: 'https://www.threads.com/@chusau.fit', icon: 'MessageCircle' },
    ],
  },
  {
    id: 'khanhhuyen',
    name: 'Khánh Huyền',
    role: 'Fashion & Lifestyle Icon',
    roleVi: 'Biểu Tượng Thời Trang & Lifestyle',
    bio: 'An AI fashion influencer capturing Vietnamese Gen Z aesthetic — outfits, trends, and the intersection of technology and personal style.',
    bioVi: 'Influencer thời trang AI mang thẩm mỹ Gen Z Việt Nam — outfit, xu hướng và giao điểm của công nghệ với phong cách cá nhân.',
    avatar: null,
    socials: [
      { label: 'Instagram', url: 'https://www.instagram.com/khanhhuyen.label/', icon: 'Instagram' },
      { label: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61572127204012', icon: 'Facebook' },
      { label: 'TikTok', url: 'https://www.tiktok.com/@khanhhuyen.label', icon: 'Music' },
      { label: 'Threads', url: 'https://www.threads.com/@khanhhuyen.label', icon: 'MessageCircle' },
    ],
  },
]

export const SOCIALS = {
  linkedin: 'https://www.linkedin.com/in/nam-nguyen-b0a463183/',
  instagram: 'https://www.instagram.com/namhoai.1112/',
  facebook: 'https://www.facebook.com/hoai.nam.626',
  tiktok: 'https://www.tiktok.com/@rick_and_ai',
  email: 'c.nguyenhoainam11122000@gmail.com',
  phone: '0964 461 206',
  soloflows: 'https://soloflows.com',
}
