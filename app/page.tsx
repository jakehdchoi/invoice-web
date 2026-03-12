import { FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { APP_NAME, APP_DESCRIPTION } from "@/lib/constants"

// 홈 페이지 (Server Component)
export default function HomePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <div className="mb-8 flex flex-col items-center text-center">
        <div className="mb-4 rounded-full bg-primary/10 p-4">
          <FileText className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-3xl font-bold">{APP_NAME}</h1>
        <p className="mt-2 text-muted-foreground">{APP_DESCRIPTION}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>견적서 조회 방법</CardTitle>
          <CardDescription>
            견적서 번호를 URL에 입력하여 조회하세요.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md bg-muted px-4 py-3 font-mono text-sm">
            /invoice/<span className="text-primary">견적서번호</span>
          </div>
          <p className="text-sm text-muted-foreground">
            예: 견적서 번호가 <code className="rounded bg-muted px-1 py-0.5 text-xs">INV-2024-001</code>인 경우
          </p>
          <div className="rounded-md bg-muted px-4 py-3 font-mono text-sm">
            /invoice/<span className="text-primary">INV-2024-001</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
