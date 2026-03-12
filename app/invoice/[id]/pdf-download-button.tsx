"use client"

import { useState } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PdfDownloadButtonProps {
  invoiceId: string
  invoiceNumber: string
}

// PDF 다운로드 버튼 (Client Component)
export default function PdfDownloadButton({ invoiceId, invoiceNumber }: PdfDownloadButtonProps) {
  const [loading, setLoading] = useState(false)

  async function handleDownload() {
    setLoading(true)
    try {
      const response = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: invoiceId }),
      })

      if (!response.ok) {
        throw new Error("PDF 생성에 실패했습니다.")
      }

      // Blob으로 받아 다운로드 트리거
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `견적서_${invoiceNumber}.pdf`
      a.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("PDF 다운로드 오류:", error)
      alert("PDF 생성 중 오류가 발생했습니다.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={handleDownload} disabled={loading}>
      <Download className="mr-2 h-4 w-4" />
      {loading ? "생성 중..." : "PDF 다운로드"}
    </Button>
  )
}
