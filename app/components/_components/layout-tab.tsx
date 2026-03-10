"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

// 샘플 상품 카드 데이터
const products = [
  { name: "프리미엄 플랜", price: "₩29,000", desc: "모든 기능 이용 가능" },
  { name: "스타터 플랜", price: "₩9,000", desc: "기본 기능 제공" },
  { name: "엔터프라이즈", price: "협의", desc: "맞춤형 솔루션" },
];

// Layout 탭 — 카드 레이아웃 전환 및 Separator 데모
export function LayoutTab() {
  const [isWide, setIsWide] = useState(false);

  return (
    <div className="space-y-6">
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
    </div>
  );
}
