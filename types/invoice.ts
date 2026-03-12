export interface InvoiceItem {
  id: string
  name: string        // 품목명
  quantity: number    // 수량
  unitPrice: number   // 단가
  amount: number      // 소계
  note?: string       // 비고
}

export interface Invoice {
  id: string
  invoiceNumber: string
  issueDate: string
  validUntil?: string
  clientName: string
  clientContact?: string
  items: InvoiceItem[]
  subtotal: number    // 공급가액
  tax: number         // 부가세
  total: number       // 총액
  notes?: string
  status: 'draft' | 'sent' | 'accepted' | 'rejected'
}
