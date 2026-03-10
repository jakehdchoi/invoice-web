import { Badge } from "@/components/ui/badge";
import { TabsClient } from "./_components/tabs-client";

// 컴포넌트 쇼케이스 페이지 (Server Component)
// 인터랙티브 탭 영역은 TabsClient(Client Component)로 위임
export default function ComponentsPage() {
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

      <TabsClient />
    </div>
  );
}
