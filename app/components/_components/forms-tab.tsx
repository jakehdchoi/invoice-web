"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

// Forms 탭 — 실시간 입력 미리보기
export function FormsTab() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");

  return (
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
  );
}
