import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ExternalLink } from "lucide-react";
import { TECH_STACK, GITHUB_URL } from "@/lib/constants";

// About 페이지 — 기술 스택 소개 (Server Component)
export default function AboutPage() {
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
          {TECH_STACK.map(({ name, version, description, href }) => (
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
        {/* GITHUB_URL은 lib/constants.ts에서 관리합니다 */}
        <Button asChild variant="outline">
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" />
            GitHub에서 보기
          </a>
        </Button>
      </section>
    </div>
  );
}
