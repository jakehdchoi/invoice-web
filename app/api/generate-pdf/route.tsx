import { NextRequest, NextResponse } from "next/server"
import { renderToBuffer, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"
import { getInvoiceById } from "@/lib/notion"
import type { Invoice } from "@/types/invoice"

// PDF 스타일 정의
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  invoiceNumber: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 24,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 8,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  row: {
    flexDirection: "row",
    marginBottom: 4,
  },
  label: {
    width: 80,
    color: "#6b7280",
  },
  value: {
    flex: 1,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    padding: "6 8",
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    padding: "6 8",
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  colName: { flex: 3 },
  colQty: { flex: 1, textAlign: "right" },
  colPrice: { flex: 2, textAlign: "right" },
  colAmount: { flex: 2, textAlign: "right" },
  colNote: { flex: 2, paddingLeft: 8 },
  totalsSection: {
    alignItems: "flex-end",
    marginTop: 12,
  },
  totalRow: {
    flexDirection: "row",
    width: 200,
    marginBottom: 4,
  },
  totalLabel: {
    flex: 1,
    color: "#6b7280",
  },
  totalValue: {
    textAlign: "right",
  },
  grandTotalRow: {
    flexDirection: "row",
    width: 200,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: "#374151",
    fontWeight: "bold",
    fontSize: 12,
  },
})

// 금액 포맷
function fmt(amount: number): string {
  return amount.toLocaleString("ko-KR") + "원"
}

// 견적서 PDF Document 컴포넌트
function InvoicePdf({ invoice }: { invoice: Invoice }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* 헤더 */}
        <Text style={styles.title}>견적서</Text>
        <Text style={styles.invoiceNumber}>No. {invoice.invoiceNumber}</Text>

        {/* 기본 정보 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>기본 정보</Text>
          <View style={styles.row}>
            <Text style={styles.label}>수신인</Text>
            <Text style={styles.value}>{invoice.clientName}</Text>
          </View>
          {invoice.clientContact && (
            <View style={styles.row}>
              <Text style={styles.label}>연락처</Text>
              <Text style={styles.value}>{invoice.clientContact}</Text>
            </View>
          )}
          <View style={styles.row}>
            <Text style={styles.label}>발행일</Text>
            <Text style={styles.value}>{invoice.issueDate}</Text>
          </View>
          {invoice.validUntil && (
            <View style={styles.row}>
              <Text style={styles.label}>유효기간</Text>
              <Text style={styles.value}>{invoice.validUntil}</Text>
            </View>
          )}
        </View>

        {/* 품목 테이블 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>견적 항목</Text>
          <View style={styles.tableHeader}>
            <Text style={styles.colName}>품목명</Text>
            <Text style={styles.colQty}>수량</Text>
            <Text style={styles.colPrice}>단가</Text>
            <Text style={styles.colAmount}>소계</Text>
            <Text style={styles.colNote}>비고</Text>
          </View>
          {invoice.items.map((item) => (
            <View key={item.id} style={styles.tableRow}>
              <Text style={styles.colName}>{item.name}</Text>
              <Text style={styles.colQty}>{item.quantity}</Text>
              <Text style={styles.colPrice}>{fmt(item.unitPrice)}</Text>
              <Text style={styles.colAmount}>{fmt(item.amount)}</Text>
              <Text style={styles.colNote}>{item.note ?? "-"}</Text>
            </View>
          ))}

          {/* 합계 */}
          <View style={styles.totalsSection}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>공급가액</Text>
              <Text style={styles.totalValue}>{fmt(invoice.subtotal)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>부가세 (10%)</Text>
              <Text style={styles.totalValue}>{fmt(invoice.tax)}</Text>
            </View>
            <View style={styles.grandTotalRow}>
              <Text style={styles.totalLabel}>총액</Text>
              <Text style={styles.totalValue}>{fmt(invoice.total)}</Text>
            </View>
          </View>
        </View>

        {/* 비고 */}
        {invoice.notes && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>비고</Text>
            <Text>{invoice.notes}</Text>
          </View>
        )}
      </Page>
    </Document>
  )
}

// POST /api/generate-pdf
export async function POST(request: NextRequest) {
  const body = await request.json()
  const { id } = body as { id: string }

  if (!id) {
    return NextResponse.json({ error: "id가 필요합니다." }, { status: 400 })
  }

  const invoice = await getInvoiceById(id)
  if (!invoice) {
    return NextResponse.json({ error: "견적서를 찾을 수 없습니다." }, { status: 404 })
  }

  const buffer = await renderToBuffer(<InvoicePdf invoice={invoice} />)
  // Buffer → Uint8Array 변환 (NextResponse BodyInit 타입 호환)
  const uint8Array = new Uint8Array(buffer)

  return new NextResponse(uint8Array, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="invoice_${invoice.invoiceNumber}.pdf"`,
    },
  })
}
