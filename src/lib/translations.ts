import type { Lang } from '@/contexts/LanguageContext'

const t = {
  vi: {
    nav: {
      about: 'Về Tôi',
      portfolio: 'Dự Án',
      soloFlows: 'Solo Flows',
      contact: 'Liên Hệ',
    },
    hero: {
      role: '// AI · Agent · Tự Động Hoá · Executive',
      tagline: 'Founder · Solo Flows · 10 Agents · 6 Nền Tảng',
      downloadCv: 'Tải CV',
      email: 'c.nguyenhoainam11122000@gmail.com',
      phone: '0964 461 206',
      scrollHint: '↓ Khám phá',
    },
    stats: {
      yearsAI: 'Năm với AI',
      agentsBuilt: 'AI Agents',
      platforms: 'Nền Tảng',
      designProjects: 'Dự Án Thiết Kế',
      growth: 'Tăng Trưởng',
      tests: 'Tests Passing',
    },
    skills: {
      sectionLabel: '02 · Kỹ Năng',
      categories: {
        'ai-agents': 'AI & Agents',
        'prompt-eng': 'Prompt & Context Eng.',
        platform: 'Phát Triển Platform',
        content: 'Content & Video',
        design: 'Tư Duy Thiết Kế',
        business: 'Chiến Lược Kinh Doanh',
      },
    },
    timeline: {
      sectionLabel: '03 · Lộ Trình Sự Nghiệp',
    },
    cta: {
      viewPortfolio: 'Xem Dự Án →',
      exploreSF: 'Khám Phá Solo Flows →',
    },
    portfolio: {
      sectionLabel: '01 · Dự Án',
      title: 'PORTFOLIO',
      subtitle: 'Xây dựng bằng Prompt Engineering, Harness Engineering, Vibecoding và AI Fluency — trong 4 năm.',
      featured: 'Dự Án Nổi Bật',
      sfTitle: 'HỆ SINH THÁI SOLO FLOWS',
      sfSubtitle: 'Một người sáng lập. Ba hệ thống. Không nhân viên.',
      whatItDoes: 'Chức năng',
      howBuilt: 'Cách xây dựng',
      otherProjects: '02 · Dự Án Khác',
      geceLabel: 'GECE Group · Showcase Thiết Kế Đồ Họa',
    },
    soloFlows: {
      heroTag: '// Tổng Quan Công Ty · 2025–Hiện Tại',
      heroTagline: 'Một người sáng lập. Ba hệ thống. Không nhân viên.',
      overviewLabel: '01 · Tổng Quan',
      overviewTitle: 'Solo Flows là gì?',
      overviewBody:
        'Solo Flows là công ty AI-native không có nhân viên chính thức — một người sáng lập, không có nhân sự cố định. Toàn bộ vận hành chạy qua ba hệ thống AI tích hợp: nền tảng booking, đội AI agent nội bộ và lớp AI customer service. Cùng nhau, chúng thay thế cả một marketing agency, team kỹ thuật và bộ phận CSKH.',
      pillars: ['Nền Tảng', 'Hệ Thống AI Agent', 'AI Chăm Sóc Khách Hàng'],
      whatItDoes: 'Chức năng',
      skillsLabel: 'Kỹ năng tạo ra',
      metricsLabel: 'Chỉ Số',
      techLabel: 'Công Nghệ',
      namRoleLabel: "04 · Vai Trò của Nam",
      namRoleTitle: 'Kiến Trúc Sư & Vận Hành Duy Nhất',
      namRoleBody:
        'Nam thiết kế, xây dựng và vận hành cả ba hệ thống. Các kỹ năng tạo nên điều này — không phải công nghệ, mà là tư duy đằng sau:',
      swotLabel: '05 · Phân Tích SWOT',
      swotQuadrants: {
        strengths: 'Điểm Mạnh',
        weaknesses: 'Điểm Yếu',
        opportunities: 'Cơ Hội',
        threats: 'Thách Thức',
      },
      revenueLabel: '06 · Mô Hình Doanh Thu',
      companyLabel: '07 · Kênh Solo Flows',
      influencersLabel: '08 · Đội Influencer AI',
      influencersSubtitle: '4 nhân vật ảo với danh tính độc lập, bộ nhớ liên tục và lịch đăng bài tự động 07:00–23:00.',
      visionLabel: '09 · Tầm Nhìn',
      visionTitle: 'Xây dựng hạ tầng cho các doanh nghiệp AI-native của tương lai.',
      visionBody:
        'Solo Flows là bằng chứng thực tế và sản phẩm đang hoạt động. Kiến trúc agent tương tự có thể triển khai cho bất kỳ SME nào — không cần nhân sự, đầy đủ năng lực.',
      visitSite: 'Truy cập soloflows.com ↗',
      getInTouch: 'Liên hệ',
    },
  },

  en: {
    nav: {
      about: 'About',
      portfolio: 'Portfolio',
      soloFlows: 'Solo Flows',
      contact: 'Contact',
    },
    hero: {
      role: '// AI · Agent · Automation · Executive',
      tagline: 'Founder · Solo Flows · 10 Agents · 6 Platforms',
      downloadCv: 'Download CV',
      email: 'c.nguyenhoainam11122000@gmail.com',
      phone: '0964 461 206',
      scrollHint: '↓ Scroll to explore',
    },
    stats: {
      yearsAI: 'Years with AI',
      agentsBuilt: 'Agents Built',
      platforms: 'Platforms',
      designProjects: 'Design Projects',
      growth: 'Growth Achieved',
      tests: 'Tests Passing',
    },
    skills: {
      sectionLabel: '02 · Skill Dimensions',
      categories: {
        'ai-agents': 'AI & Agents',
        'prompt-eng': 'Prompt & Context Eng.',
        platform: 'Platform Dev.',
        content: 'Content & Video',
        design: 'Design Thinking',
        business: 'Business Strategy',
      },
    },
    timeline: {
      sectionLabel: '03 · Career Timeline',
    },
    cta: {
      viewPortfolio: 'View Portfolio →',
      exploreSF: 'Explore Solo Flows →',
    },
    portfolio: {
      sectionLabel: '01 · Projects',
      title: 'PORTFOLIO',
      subtitle: 'Built with Prompt Engineering, Harness Engineering, Vibecoding, and AI Fluency — across 4 years.',
      featured: 'Featured Project',
      sfTitle: 'SOLO FLOWS ECOSYSTEM',
      sfSubtitle: 'One founder. Three systems. Zero staff.',
      whatItDoes: 'What it does',
      howBuilt: 'How it was built',
      otherProjects: '02 · Other Projects',
      geceLabel: 'GECE Group · Graphic Design Showcase',
    },
    soloFlows: {
      heroTag: '// Company Overview · 2025–Present',
      heroTagline: 'One founder. Three systems. Zero staff.',
      overviewLabel: '01 · Overview',
      overviewTitle: 'What is Solo Flows?',
      overviewBody:
        'Solo Flows is a zero-headcount AI-native company — one founder, no full-time staff. All operations run through three integrated AI systems: a live booking platform, an inhouse AI agent team, and an AI customer service layer. Together they deliver what would normally require a marketing agency, an engineering team, and a CS department.',
      pillars: ['Platform', 'AI Agent System', 'AI Customer Service'],
      whatItDoes: 'What it does',
      skillsLabel: 'Skills that built it',
      metricsLabel: 'Metrics',
      techLabel: 'Tech Stack',
      namRoleLabel: "04 · Nam's Role",
      namRoleTitle: 'Sole Architect & Operator',
      namRoleBody:
        'Nam designed, built, and operates all three pillars. The skills that made this possible — not the tech, but the thinking behind it:',
      swotLabel: '05 · SWOT Analysis',
      swotQuadrants: {
        strengths: 'Strengths',
        weaknesses: 'Weaknesses',
        opportunities: 'Opportunities',
        threats: 'Threats',
      },
      revenueLabel: '06 · Revenue Model',
      companyLabel: '07 · Solo Flows Channels',
      influencersLabel: '08 · AI Influencer Team',
      influencersSubtitle: '4 autonomous AI personas with independent identities, persistent memory, and automated posting schedules 07:00–23:00.',
      visionLabel: '09 · Vision',
      visionTitle: 'Building the infrastructure for tomorrow\'s AI-native businesses.',
      visionBody:
        'Solo Flows is proof of concept and live product. The same agent architecture that runs Solo Flows can be deployed for any SME — zero headcount, full capability.',
      visitSite: 'Visit soloflows.com ↗',
      getInTouch: 'Get in touch',
    },
  },
}

export function useTranslations(lang: Lang) {
  return t[lang]
}

export type Translations = typeof t['en']
