"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Buttons 탭 — 버튼 변형 쇼케이스 및 클릭 카운터
export function ButtonsTab() {
  const [count, setCount] = useState(0);

  return (
    <div className="space-y-8">
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
    </div>
  );
}
