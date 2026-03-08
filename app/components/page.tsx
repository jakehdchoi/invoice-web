"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

// 컴포넌트 쇼케이스 페이지 (Client Component — 인터랙티브 데모 포함)
export default function ComponentsPage() {
  // Buttons 탭: 클릭 카운터
  const [count, setCount] = useState(0);

  // Forms 탭: 실시간 입력 미리보기
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");

  // Feedback 탭: 토스트 종류 선택
  const [toastType, setToastType] = useState<"success" | "warning" | "error">("success");

  // Layout 탭: 그리드 레이아웃 전환
  const [isWide, setIsWide] = useState(false);

  // 토스트 메시지 발송
  function sendToast() {
    const messages = {
      success: { title: "성공!", description: "작업이 완료되었습니다." },
      warning: { title: "경고", description: "주의가 필요한 상황입니다." },
      error: { title: "오류", description: "문제가 발생했습니다. 다시 시도해 주세요." },
    };
    const { title, description } = messages[toastType];
    toast[toastType](title, { description });
  }

  // 샘플 상품 카드 데이터
  const products = [
    { name: "프리미엄 플랜", price: "₩29,000", desc: "모든 기능 이용 가능" },
    { name: "스타터 플랜", price: "₩9,000", desc: "기본 기능 제공" },
    { name: "엔터프라이즈", price: "협의", desc: "맞춤형 솔루션" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      {/* 헤더 */}
      <div className="mb-10">
        <Badge variant="secondary" className="mb-3">shadcn/ui</Badge>
        <h1 className="text-3xl font-bold tracking-tight mb-3">컴포넌트</h1>
        <p className="text-muted-foreground text-lg">
          실제 동작하는 인터랙티브 데모로 각 컴포넌트를 체험해 보세요.
        </p>
      </div>

      <Tabs defaultValue="buttons">
        <TabsList className="mb-8">
          <TabsTrigger value="buttons">Buttons</TabsTrigger>
          <TabsTrigger value="forms">Forms</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
        </TabsList>

        {/* ── Buttons 탭 ── */}
        <TabsContent value="buttons" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Button 변형 (Variants)</CardTitle>
              <CardDescription>6가지 스타일의 버튼</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button variant="destructive">Destructive</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Button 크기 (Sizes)</CardTitle>
              <CardDescription>4가지 크기</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon" aria-label="아이콘">🚀</Button>
            </CardContent>
          </Card>

          {/* 인터랙티브 클릭 카운터 */}
          <Card>
            <CardHeader>
              <CardTitle>인터랙티브 카운터</CardTitle>
              <CardDescription>버튼을 클릭해 카운트를 변경해 보세요</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <Button variant="outline" onClick={() => setCount((c) => c - 1)}>−</Button>
              <span className="text-3xl font-bold w-12 text-center">{count}</span>
              <Button variant="outline" onClick={() => setCount((c) => c + 1)}>+</Button>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" onClick={() => setCount(0)}>
                초기화
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* ── Forms 탭 ── */}
        <TabsContent value="forms">
          <div className="grid gap-6 md:grid-cols-2">
            {/* 입력 폼 */}
            <Card>
              <CardHeader>
                <CardTitle>프로필 입력</CardTitle>
                <CardDescription>입력하면 오른쪽 미리보기가 실시간으로 업데이트됩니다</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">이름</Label>
                  <Input
                    id="name"
                    placeholder="홍길동"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">이메일</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="hello@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">소개</Label>
                  <Textarea
                    id="bio"
                    placeholder="자기소개를 입력해 주세요..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* 실시간 미리보기 */}
            <Card>
              <CardHeader>
                <CardTitle>미리보기</CardTitle>
                <CardDescription>실시간으로 반영됩니다</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-lg font-bold text-primary">
                    {name ? name[0].toUpperCase() : "?"}
                  </div>
                  <div>
                    <p className="font-semibold">{name || "이름 미입력"}</p>
                    <p className="text-sm text-muted-foreground">{email || "이메일 미입력"}</p>
                  </div>
                </div>
                <Separator />
                <p className="text-sm text-muted-foreground">
                  {bio || "소개가 없습니다."}
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ── Feedback 탭 ── */}
        <TabsContent value="feedback" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Badge 변형</CardTitle>
              <CardDescription>상태 표시에 활용하는 배지 컴포넌트</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Toast 알림</CardTitle>
              <CardDescription>알림 유형을 선택하고 버튼을 클릭해 보세요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-3">
                {(["success", "warning", "error"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setToastType(type)}
                    className={`px-4 py-2 rounded-md text-sm font-medium border transition-colors ${
                      toastType === type
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-foreground border-border hover:bg-accent"
                    }`}
                  >
                    {type === "success" ? "성공" : type === "warning" ? "경고" : "오류"}
                  </button>
                ))}
              </div>
              <Button onClick={sendToast}>알림 보내기</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Layout 탭 ── */}
        <TabsContent value="layout" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>카드 레이아웃</CardTitle>
                  <CardDescription>Switch로 1열 ↔ 3열 레이아웃을 전환해 보세요</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="layout-switch" className="text-sm">와이드 모드</Label>
                  <Switch
                    id="layout-switch"
                    checked={isWide}
                    onCheckedChange={setIsWide}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className={`grid gap-4 ${isWide ? "md:grid-cols-3" : "grid-cols-1"}`}>
                {products.map(({ name, price, desc }) => (
                  <Card key={name} className="border-dashed">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{name}</CardTitle>
                      <CardDescription>{desc}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{price}</p>
                    </CardContent>
                    <CardFooter>
                      <Button size="sm" className="w-full">선택하기</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Separator</CardTitle>
              <CardDescription>섹션 구분선 컴포넌트</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">상단 섹션</p>
              <Separator />
              <p className="text-sm text-muted-foreground">하단 섹션</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
