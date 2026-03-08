import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ExternalLink } from "lucide-react";

// About 페이지 — 기술 스택 소개 (Server Component)
export default function AboutPage() {
  const stack = [
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
      description: "577개 이상의 일관된 SVG 아이콘 라이브러리.",
      href: "https://lucide.dev",
    },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      {/* 헤더 */}
      <div className="mb-10">
        <Badge variant="secondary" className="mb-3">기술 스택</Badge>
        <h1 className="text-3xl font-bold tracking-tight mb-3">소개</h1>
        <p className="text-muted-foreground text-lg">
          이 스타터킷에 사용된 기술 스택과 각 라이브러리의 역할을 소개합니다.
        </p>
      </div>

      <Separator className="mb-10" />

      {/* 기술 스택 카드 목록 */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-6">사용 기술</h2>
        <div className="grid gap-4">
          {stack.map(({ name, version, description, href }) => (
            <Card key={name}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{name}</CardTitle>
                  <Badge variant="outline">v{version}</Badge>
                </div>
              </CardHeader>
              <CardContent className="flex items-start justify-between gap-4">
                <CardDescription className="flex-1">{description}</CardDescription>
                <Button asChild variant="ghost" size="sm" className="shrink-0">
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="mb-10" />

      {/* 프로젝트 정보 */}
      <section>
        <h2 className="text-xl font-semibold mb-4">프로젝트 정보</h2>
        <p className="text-muted-foreground mb-6">
          이 스타터킷은 실제 프로덕션 환경에서 사용 가능한 수준의 초기 설정을 제공합니다.
          다크모드, 반응형 레이아웃, 타입 안전성이 기본으로 포함되어 있습니다.
        </p>
        <Button asChild variant="outline">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" />
            GitHub에서 보기
          </a>
        </Button>
      </section>
    </div>
  );
}
