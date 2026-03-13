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

// Notion 숫자 프로퍼티 추출 헬퍼 (number, formula 타입 지원)
function getNumber(property: PageObjectResponse["properties"][string]): number {
  if (property.type === "number") {
    return property.number ?? 0
  }
  // formula 타입 (금액 계산식)
  if (property.type === "formula" && property.formula.type === "number") {
    return property.formula.number ?? 0
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

// Notion select/status 프로퍼티 추출 헬퍼
function getSelect(property: PageObjectResponse["properties"][string]): string {
  if (property.type === "select") {
    return property.select?.name ?? ""
  }
  // Notion "status" 타입도 지원
  if (property.type === "status") {
    return property.status?.name ?? ""
  }
  return ""
}

// Relation 프로퍼티에서 품목 DB 직접 조회
async function getInvoiceItems(
  relationProp: PageObjectResponse["properties"][string]
): Promise<InvoiceItem[]> {
  const items: InvoiceItem[] = []

  if (relationProp.type !== "relation") return items

  for (const rel of relationProp.relation) {
    try {
      const itemPage = (await notion.pages.retrieve({ page_id: rel.id })) as PageObjectResponse
      const p = itemPage.properties

      items.push({
        id: rel.id,
        name: getText(p["항목명"]),
        quantity: getNumber(p["수량"]),
        unitPrice: getNumber(p["단가"]),
        amount: getNumber(p["금액"]),
      })
    } catch (e) {
      console.error("품목 조회 실패:", rel.id, e)
    }
  }

  return items
}

// uuid 형식 검증 (Notion Page ID)
const UUID_REGEX = /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i

// 견적서 Page ID로 Notion 직접 조회
export async function getInvoiceById(id: string): Promise<Invoice | null> {
  if (!UUID_REGEX.test(id)) return null

  try {
    // page_id로 직접 조회 (search 방식 대신)
    const page = (await notion.pages.retrieve({ page_id: id })) as PageObjectResponse
    const props = page.properties

    // 항목 Relation 프로퍼티에서 품목 조회
    const items = await getInvoiceItems(props["항목"])

    // 총금액에서 공급가액/부가세 역산 (Notion DB에 별도 컬럼 없음)
    const total = getNumber(props["총금액"])
    const subtotal = Math.round(total / 1.1)
    const tax = total - subtotal

    const statusMap: Record<string, Invoice["status"]> = {
      draft: "draft",
      sent: "sent",
      accepted: "accepted",
      rejected: "rejected",
      초안: "draft",
      발송: "sent",
      수락: "accepted",
      거절: "rejected",
      대기: "sent", // Notion 실제 상태값 매핑
    }
    const rawStatus = getSelect(props["상태"])
    const status = statusMap[rawStatus] ?? "draft"

    return {
      id: page.id,
      invoiceNumber: getText(props["견적서번호"]),
      issueDate: getDate(props["발행일"]),
      validUntil: getDate(props["유효기간"]) || undefined,
      clientName: getText(props["클라이언트명"]),
      clientContact: props["연락처"] ? getText(props["연락처"]) || undefined : undefined,
      items,
      subtotal,
      tax,
      total,
      notes: props["비고"] ? getText(props["비고"]) || undefined : undefined,
      status,
    }
  } catch (error) {
    console.error("Notion 견적서 조회 실패:", error)
    return null
  }
}

// 견적서 번호(예: INV-2025-001)로 Page ID 조회
export async function getPageIdByInvoiceNumber(invoiceNumber: string): Promise<string | null> {
  try {
    const response = await notion.search({
      query: invoiceNumber,
      filter: { value: "page", property: "object" },
    })

    const page = response.results.find(
      (r): r is PageObjectResponse =>
        r.object === "page" &&
        "properties" in r &&
        "database_id" in r.parent &&
        (r.parent as { database_id: string }).database_id.replace(/-/g, "") ===
          DATABASE_ID.replace(/-/g, "") &&
        getText(r.properties["견적서번호"]) === invoiceNumber
    )

    return page?.id ?? null
  } catch (error) {
    console.error("견적서 번호 검색 실패:", error)
    return null
  }
}
