import { Client } from "@notionhq/client"
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import type { Invoice, InvoiceItem } from "@/types/invoice"

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
})

const DATABASE_ID = process.env.NOTION_DATABASE_ID!

// Notion 텍스트 프로퍼티 추출 헬퍼
function getText(property: PageObjectResponse["properties"][string]): string {
  if (property.type === "title") {
    return property.title.map((t) => t.plain_text).join("")
  }
  if (property.type === "rich_text") {
    return property.rich_text.map((t) => t.plain_text).join("")
  }
  return ""
}

// Notion 숫자 프로퍼티 추출 헬퍼
function getNumber(property: PageObjectResponse["properties"][string]): number {
  if (property.type === "number") {
    return property.number ?? 0
  }
  return 0
}

// Notion 날짜 프로퍼티 추출 헬퍼
function getDate(property: PageObjectResponse["properties"][string]): string {
  if (property.type === "date") {
    return property.date?.start ?? ""
  }
  return ""
}

// Notion select 프로퍼티 추출 헬퍼
function getSelect(property: PageObjectResponse["properties"][string]): string {
  if (property.type === "select") {
    return property.select?.name ?? ""
  }
  return ""
}

// Notion 페이지 블록(테이블)에서 품목 파싱
async function getInvoiceItems(pageId: string): Promise<InvoiceItem[]> {
  const blocks = await notion.blocks.children.list({ block_id: pageId })
  const items: InvoiceItem[] = []

  for (const block of blocks.results) {
    if (!("type" in block)) continue

    // 테이블 블록 파싱
    if (block.type === "table") {
      const rows = await notion.blocks.children.list({ block_id: block.id })
      let isHeader = true

      for (const row of rows.results) {
        if (!("type" in row) || row.type !== "table_row") continue
        if (isHeader) {
          isHeader = false
          continue // 헤더 행 스킵
        }

        const cells = row.table_row.cells
        // 컬럼 순서: 품목명, 수량, 단가, 소계, 비고
        const name = cells[0]?.map((t) => t.plain_text).join("") ?? ""
        const quantity = parseInt(cells[1]?.map((t) => t.plain_text).join("") ?? "0", 10)
        const unitPrice = parseInt(cells[2]?.map((t) => t.plain_text).join("") ?? "0", 10)
        const amount = parseInt(cells[3]?.map((t) => t.plain_text).join("") ?? "0", 10)
        const note = cells[4]?.map((t) => t.plain_text).join("") ?? undefined

        if (name) {
          items.push({ id: row.id, name, quantity, unitPrice, amount, note: note || undefined })
        }
      }
    }
  }

  return items
}

// 견적서 ID로 Notion 데이터베이스 조회
export async function getInvoiceById(id: string): Promise<Invoice | null> {
  try {
    const response = await notion.search({
      query: id,
      filter: { value: "page", property: "object" },
    })

    if (response.results.length === 0) return null

    // DATABASE_ID 기준으로 필터링 (search는 전체 워크스페이스 검색)
    const page = response.results.find(
      (r): r is PageObjectResponse =>
        r.object === "page" &&
        "parent" in r &&
        r.parent.type === "database_id" &&
        r.parent.database_id.replace(/-/g, "") === DATABASE_ID.replace(/-/g, "")
    )

    if (!page) return null
    const props = page.properties

    const items = await getInvoiceItems(page.id)

    const subtotal = getNumber(props["공급가액"])
    const tax = getNumber(props["부가세"])
    const total = getNumber(props["총액"])

    const statusMap: Record<string, Invoice["status"]> = {
      draft: "draft",
      sent: "sent",
      accepted: "accepted",
      rejected: "rejected",
      초안: "draft",
      발송: "sent",
      수락: "accepted",
      거절: "rejected",
    }
    const rawStatus = getSelect(props["상태"])
    const status = statusMap[rawStatus] ?? "draft"

    return {
      id: page.id,
      invoiceNumber: getText(props["견적번호"]),
      issueDate: getDate(props["발행일"]),
      validUntil: getDate(props["유효기간"]) || undefined,
      clientName: getText(props["수신인"]),
      clientContact: getText(props["연락처"]) || undefined,
      items,
      subtotal,
      tax,
      total,
      notes: getText(props["비고"]) || undefined,
      status,
    }
  } catch (error) {
    console.error("Notion 견적서 조회 실패:", error)
    return null
  }
}
