"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Feedback 탭 — Badge 쇼케이스 및 Toast 알림 데모
export function FeedbackTab() {
  const [toastType, setToastType] = useState<"success" | "warning" | "error">("success");

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

  return (
    <div className="space-y-6">
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
    </div>
  );
}
