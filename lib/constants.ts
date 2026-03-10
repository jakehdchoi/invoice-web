// 프로젝트 전역 상수 — 버전 정보 및 링크 단일 출처 관리

// GitHub 저장소 URL — 실제 주소로 변경하세요
export const GITHUB_URL = "https://github.com/your-username/claude-nextjs-starter"

// 기술 스택 데이터
export const TECH_STACK = [
  {
    name: "Next.js",
    version: "16.1.6",
    description: "React 기반 풀스택 프레임워크. App Router와 Server Components로 최적화된 렌더링.",
    href: "https://nextjs.org",
  },
  {
    name: "React",
    version: "19.2.3",
    description: "최신 React 19. concurrent 기능, useOptimistic, use() hook 지원.",
    href: "https://react.dev",
  },
  {
    name: "TypeScript",
    version: "5",
    description: "strict 모드 활성화. 타입 안전성과 IDE 자동완성으로 생산성 향상.",
    href: "https://www.typescriptlang.org",
  },
  {
    name: "Tailwind CSS",
    version: "4",
    description: "OKLCH 컬러 시스템, CSS 변수 기반 테마. CSS-first 설정 방식.",
    href: "https://tailwindcss.com",
  },
  {
    name: "shadcn/ui",
    version: "4.0.0",
    description: "복사-붙여넣기 방식 컴포넌트 라이브러리. radix-nova 스타일 적용.",
    href: "https://ui.shadcn.com",
  },
  {
    name: "Radix UI",
    version: "1.4.3",
    description: "접근성(WAI-ARIA)이 내장된 헤드리스 UI 프리미티브.",
    href: "https://www.radix-ui.com",
  },
  {
    name: "lucide-react",
    version: "0.577.0",
    description: "일관된 SVG 아이콘 라이브러리.",
    href: "https://lucide.dev",
  },
] as const
