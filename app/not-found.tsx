import Link from "next/link"
import { FileX } from "lucide-react"
import { Button } from "@/components/ui/button"

// 404 에러 페이지 - 견적서 유효성 검증 실패 시 표시
export default function NotFound() {
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <div className="mb-4 flex justify-center">
        <div className="rounded-full bg-destructive/10 p-4">
          <FileX className="h-10 w-10 text-destructive" />
        </div>
      </div>
      <h1 className="mb-2 text-2xl font-bold">견적서를 찾을 수 없습니다</h1>
      <p className="mb-8 text-muted-foreground">
        요청하신 견적서가 존재하지 않거나 삭제되었습니다.
        <br />
        견적서 번호를 다시 확인해 주세요.
      </p>
      <Button asChild>
        <Link href="/">홈으로 돌아가기</Link>
      </Button>
    </div>
  )
}
