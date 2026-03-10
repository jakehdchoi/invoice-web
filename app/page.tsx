import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Palette, Shield } from "lucide-react";
import { TECH_STACK } from "@/lib/constants";

// 홈 페이지 (Server Component)
export default function Home() {

  const features = [
    {
      icon: Zap,
      title: "빠른 시작",
      description: "App Router, RSC, 최신 Next.js 16 기반으로 즉시 개발을 시작할 수 있습니다.",
    },
    {
      icon: Palette,
      title: "아름다운 디자인",
      description: "shadcn/ui와 Tailwind CSS 4의 OKLCH 컬러로 모던하고 일관된 UI를 제공합니다.",
    },
    {
      icon: Shield,
      title: "타입 안전성",
      description: "TypeScript strict 모드로 런타임 오류를 사전에 방지하고 코드 품질을 높입니다.",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      {/* 히어로 섹션 */}
      <section className="text-center mb-20">
        <Badge variant="secondary" className="mb-4">
          Next.js 16 + React 19
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight mb-4 md:text-6xl">
          Next.js Starter Kit
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          현대적인 웹 개발을 위한 완전한 스타터킷. 최신 기술 스택으로
          빠르게 프로덕션 수준의 앱을 만들어 보세요.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/components">컴포넌트 살펴보기</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/about">기술 스택 보기</Link>
          </Button>
        </div>
      </section>

      {/* 기능 카드 섹션 */}
      <section className="mb-20">
        <h2 className="text-2xl font-semibold text-center mb-10">주요 특징</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <Card key={title}>
              <CardHeader>
                <div className="mb-2 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 기술 배지 섹션 */}
      <section className="text-center">
        <h2 className="text-xl font-semibold mb-6 text-muted-foreground">기술 스택</h2>
        <div className="flex flex-wrap gap-2 justify-center">
          {TECH_STACK.map(({ name }) => (
            <Badge key={name} variant="outline" className="text-sm py-1 px-3">
              {name}
            </Badge>
          ))}
        </div>
      </section>
    </div>
  );
}
