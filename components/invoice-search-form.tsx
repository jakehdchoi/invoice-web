"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// 견적서 번호 입력 후 해당 페이지로 이동하는 폼
export default function InvoiceSearchForm() {
  const [invoiceId, setInvoiceId] = useState("")
  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = invoiceId.trim()
    if (!trimmed) return
    router.push(`/invoice/${trimmed}`)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={invoiceId}
        onChange={(e) => setInvoiceId(e.target.value)}
        placeholder="견적서 번호 입력 (예: INV-2024-001)"
        className="flex-1"
      />
      <Button type="submit" disabled={!invoiceId.trim()}>
        <Search className="mr-2 h-4 w-4" />
        조회
      </Button>
    </form>
  )
}
