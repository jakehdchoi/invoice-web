"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ButtonsTab } from "./buttons-tab";
import { FormsTab } from "./forms-tab";
import { FeedbackTab } from "./feedback-tab";
import { LayoutTab } from "./layout-tab";

// 탭 전체를 관리하는 Client Component
// Tabs 컴포넌트가 TabsList와 TabsContent 간 상태를 공유하므로 하나의 컨텍스트로 감싸야 함
export function TabsClient() {
  return (
    <Tabs defaultValue="buttons">
      <TabsList className="mb-8">
        <TabsTrigger value="buttons">Buttons</TabsTrigger>
        <TabsTrigger value="forms">Forms</TabsTrigger>
        <TabsTrigger value="feedback">Feedback</TabsTrigger>
        <TabsTrigger value="layout">Layout</TabsTrigger>
      </TabsList>

      <TabsContent value="buttons">
        <ButtonsTab />
      </TabsContent>

      <TabsContent value="forms">
        <FormsTab />
      </TabsContent>

      <TabsContent value="feedback">
        <FeedbackTab />
      </TabsContent>

      <TabsContent value="layout">
        <LayoutTab />
      </TabsContent>
    </Tabs>
  );
}
