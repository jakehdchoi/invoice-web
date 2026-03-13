import { notFound, redirect } from "next/navigation"
import { getInvoiceById, getPageIdByInvoiceNumber } from "@/lib/notion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import PdfDownloadButton from "./pdf-download-button"

interface InvoicePageProps {
  params: Promise<{ id: string }>
}

// 견적서 상태 한글 변환
const statusLabel: Record<string, string> = {
  draft: "초안",
  sent: "발송됨",
  accepted: "수락됨",
  rejected: "거절됨",
}

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  draft: "secondary",
  sent: "default",
  accepted: "default",
  rejected: "destructive",
}

// 금액 포맷 (천 단위 콤마)
function formatCurrency(amount: number): string {
  return amount.toLocaleString("ko-KR") + "원"
}

// 견적서 상세 페이지 (Server Component)
export default async function InvoicePage({ params }: InvoicePageProps) {
  const { id } = await params
  let invoice = await getInvoiceById(id)

  // Page ID로 조회 실패 시 견적서 번호로 재검색 후 리다이렉트
  if (!invoice) {
    const pageId = await getPageIdByInvoiceNumber(id)
    if (pageId) {
      redirect(`/invoice/${pageId}`)
    }
    notFound()
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      {/* 견적서 헤더 */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">견적서</h1>
          <p className="mt-1 text-muted-foreground">No. {invoice.invoiceNumber}</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={statusVariant[invoice.status]}>
            {statusLabel[invoice.status]}
          </Badge>
          <PdfDownloadButton invoiceId={invoice.id} invoiceNumber={invoice.invoiceNumber} />
        </div>
      </div>

      {/* 기본 정보 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">기본 정보</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground">수신인</p>
            <p className="font-medium">{invoice.clientName}</p>
          </div>
          {invoice.clientContact && (
            <div>
              <p className="text-sm text-muted-foreground">연락처</p>
              <p className="font-medium">{invoice.clientContact}</p>
            </div>
          )}
          <div>
            <p className="text-sm text-muted-foreground">발행일</p>
            <p className="font-medium">{invoice.issueDate}</p>
          </div>
          {invoice.validUntil && (
            <div>
              <p className="text-sm text-muted-foreground">유효기간</p>
              <p className="font-medium">{invoice.validUntil}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 품목 테이블 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">견적 항목</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-muted-foreground">
                  <th className="pb-2 text-left font-medium">품목명</th>
                  <th className="pb-2 text-right font-medium">수량</th>
                  <th className="pb-2 text-right font-medium">단가</th>
                  <th className="pb-2 text-right font-medium">소계</th>
                  <th className="pb-2 text-left font-medium pl-4">비고</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item) => (
                  <tr key={item.id} className="border-b last:border-0">
                    <td className="py-3">{item.name}</td>
                    <td className="py-3 text-right">{item.quantity}</td>
                    <td className="py-3 text-right">{formatCurrency(item.unitPrice)}</td>
                    <td className="py-3 text-right">{formatCurrency(item.amount)}</td>
                    <td className="py-3 pl-4 text-muted-foreground">{item.note ?? "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Separator className="my-4" />

          {/* 합계 */}
          <div className="flex flex-col items-end gap-1 text-sm">
            <div className="flex w-48 justify-between">
              <span className="text-muted-foreground">공급가액</span>
              <span>{formatCurrency(invoice.subtotal)}</span>
            </div>
            <div className="flex w-48 justify-between">
              <span className="text-muted-foreground">부가세 (10%)</span>
              <span>{formatCurrency(invoice.tax)}</span>
            </div>
            <Separator className="my-2 w-48" />
            <div className="flex w-48 justify-between font-bold text-base">
              <span>총액</span>
              <span>{formatCurrency(invoice.total)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 비고 */}
      {invoice.notes && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">비고</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm whitespace-pre-wrap text-muted-foreground">{invoice.notes}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
