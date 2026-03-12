# Development Guidelines

## 프로젝트 개요

- **목적**: 노션 데이터베이스를 백엔드로 활용하는 견적서 조회/PDF 다운로드 시스템
- **스택**: Next.js 16 (App Router), React 19, TypeScript 5, TailwindCSS v4, shadcn/ui, @notionhq/client, @react-pdf/renderer
- **현재 Phase**: Phase 1 완료 (MVP), Phase 2 진행 예정 (관리자 기능)

---

## 프로젝트 아키텍처

### 디렉토리 구조 및 역할

| 경로 | 역할 |
|------|------|
| `app/layout.tsx` | 루트 레이아웃 — Navbar, Toaster, FOUC 방지 스크립트 포함 |
| `app/page.tsx` | 홈 페이지 (Server Component) |
| `app/not-found.tsx` | 전역 404 에러 페이지 |
| `app/invoice/[id]/page.tsx` | 견적서 조회 페이지 (Server Component) |
| `app/invoice/[id]/pdf-download-button.tsx` | PDF 다운로드 버튼 (Client Component) |
| `app/api/generate-pdf/route.tsx` | PDF 생성 API Route — InvoicePdf 컴포넌트 포함 |
| `lib/notion.ts` | 모든 Notion API 로직 집중 파일 |
| `lib/utils.ts` | cn() 유틸리티만 존재 |
| `lib/constants.ts` | APP_NAME, APP_DESCRIPTION 전역 상수 |
| `types/invoice.ts` | Invoice, InvoiceItem 타입 단일 정의 파일 |
| `components/layout/` | navbar.tsx, nav-links.tsx, mobile-menu.tsx, footer.tsx |
| `components/theme-toggle.tsx` | 다크/라이트 테마 토글 |
| `components/ui/` | shadcn/ui 컴포넌트 (직접 편집 가능하나 최소화) |
| `docs/PRD.md` | 기능 명세서 |
| `docs/ROADMAP.md` | 개발 로드맵 및 작업 추적 |
| `tasks/` | 작업 파일 디렉토리 (XXX-description.md 형식) |

---

## 코드 규칙

### 명명 규칙

- 컴포넌트 파일: `kebab-case.tsx` (예: `pdf-download-button.tsx`)
- 컴포넌트 함수: `PascalCase` (예: `PdfDownloadButton`)
- 유틸리티/헬퍼 함수: `camelCase`
- 타입/인터페이스: `PascalCase` (예: `Invoice`, `InvoiceItem`)
- 코드 주석: **한글 작성**

### Server vs Client Component

- **기본값: Server Component** — `"use client"` 선언 없이 작성
- **Client Component 필수 조건**: `useState`, `useEffect`, `onClick` 등 브라우저 API 사용 시
- Client Component 파일 최상단에 반드시 `"use client"` 선언
- **Notion API는 Server Component 또는 API Route에서만 호출** — Client Component에서 직접 호출 금지

### 경로 별칭

- `@/components`, `@/lib`, `@/types`, `@/hooks` 형식 사용 (상대 경로 금지)

---

## Notion API 구현 규칙

### 핵심 파일: `lib/notion.ts`

- 모든 Notion API 로직은 이 파일에만 추가
- Notion DB 프로퍼티명 (한글 고정):

| 프로퍼티 | 타입 | 설명 |
|----------|------|------|
| 견적번호 | title | 견적서 번호 |
| 발행일 | date | 발행일 |
| 유효기간 | date | 유효 기간 |
| 수신인 | rich_text | 클라이언트명 |
| 연락처 | rich_text | 클라이언트 연락처 |
| 공급가액 | number | 소계 |
| 부가세 | number | 세금 |
| 총액 | number | 총합계 |
| 상태 | select | 견적서 상태 |
| 비고 | rich_text | 메모 |

- 상태 값 양방향 매핑 유지 (한글/영문 모두):
  ```ts
  초안 → draft, 발송 → sent, 수락 → accepted, 거절 → rejected
  ```

### 견적 항목 파싱 (테이블 블록)

- 노션 페이지 내 **테이블 블록**에서 품목 파싱
- 컬럼 순서 고정: `품목명(0)`, `수량(1)`, `단가(2)`, `소계(3)`, `비고(4)`
- 헤더 행(첫 번째 행) 스킵 필수
- 새 Notion 함수 추가 시 헬퍼 함수 (getText, getNumber, getDate, getSelect) 재사용

### `getInvoiceById` 동작 방식

- `notion.search()` API로 검색 후 `DATABASE_ID` 기반으로 필터링
- DATABASE_ID 비교 시 하이픈(-) 제거 후 비교: `.replace(/-/g, "")`

---

## 타입 정의 규칙

- **모든 Invoice 관련 타입은 `types/invoice.ts`에서만 정의**
- 인라인 타입 정의 금지 — 새 타입은 반드시 `types/invoice.ts`에 추가

```ts
// 현재 정의된 타입
interface InvoiceItem { id, name, quantity, unitPrice, amount, note? }
interface Invoice { id, invoiceNumber, issueDate, validUntil?, clientName, clientContact?, items, subtotal, tax, total, notes?, status }
type InvoiceStatus = 'draft' | 'sent' | 'accepted' | 'rejected'
```

---

## PDF 생성 규칙

### 파일: `app/api/generate-pdf/route.tsx`

- `@react-pdf/renderer`의 `renderToBuffer` 사용 (서버사이드 전용)
- `Buffer → Uint8Array` 변환 필수 (NextResponse BodyInit 호환)
- PDF 컴포넌트(`InvoicePdf`)는 route.tsx 내부에 정의
- 응답 헤더: `Content-Type: application/pdf`, `Content-Disposition: attachment`
- PDF 파일명: `invoice_{invoiceNumber}.pdf`

### 다운로드 버튼: `app/invoice/[id]/pdf-download-button.tsx`

- 반드시 Client Component (`"use client"`)
- `POST /api/generate-pdf` 호출 후 Blob → `URL.createObjectURL` 패턴 사용
- 다운로드 후 `URL.revokeObjectURL` 호출 필수

---

## 에러 처리 규칙

- 견적서 미발견: `notFound()` 호출 → `app/not-found.tsx` 렌더링
- API Route 에러 응답: `400` (id 누락), `404` (견적서 없음)
- Notion API 오류: `console.error` 후 `null` 반환 (`getInvoiceById`)
- **새 라우트 추가 시 반드시 notFound() 에러 처리 포함**

---

## 스타일링 규칙

- Tailwind CSS v4 유틸리티 클래스 사용
- 클래스 병합: `cn()` 함수 사용 (`@/lib/utils`)
- 금액 표시 포맷: `amount.toLocaleString("ko-KR") + "원"`
- 다크모드: CSS 변수 기반 (`globals.css`), `dark:` 접두사 사용
- 레이아웃 최대 너비: `max-w-3xl` (견적서 페이지), `max-w-6xl` (레이아웃)
- **`components/ui/` 파일 직접 수정 최소화** — shadcn 컴포넌트는 `npx shadcn@latest add` 명령으로 추가

---

## 환경 변수 규칙

- `NOTION_API_KEY` — Notion Integration 토큰 (필수)
- `NOTION_DATABASE_ID` — 견적서 데이터베이스 ID (필수)
- `.env.local`에 저장, `.env.example`에 키만 명시
- 환경 변수는 Server Component/API Route에서만 접근 (클라이언트 노출 금지)

---

## 작업 흐름 규칙

### 새 기능 구현 시

1. `docs/ROADMAP.md`에서 다음 Task 번호 확인
2. `tasks/XXX-description.md` 파일 생성 (명세, 관련 파일, 수락 기준, 구현 단계 포함)
3. API/비즈니스 로직 작업 시 "## 테스트 체크리스트" 섹션 필수 포함
4. 각 구현 단계 완료 후 task 파일 진행상황 업데이트
5. 기능 완료 후 `docs/ROADMAP.md` 완료 상태로 업데이트

### 파일 동시 수정 요구사항

| 변경 사항 | 동시 수정 필요 파일 |
|-----------|---------------------|
| 새 Invoice 필드 추가 | `types/invoice.ts` + `lib/notion.ts` + `app/invoice/[id]/page.tsx` + `app/api/generate-pdf/route.tsx` |
| 새 API Route 추가 | `app/api/[route]/route.ts` 생성 |
| 새 페이지 추가 | `app/[path]/page.tsx` 생성 + 필요 시 `components/layout/nav-links.tsx` 수정 |
| 전역 상수 추가 | `lib/constants.ts` |
| 노션 DB 프로퍼티 변경 | `lib/notion.ts` + `types/invoice.ts` |

---

## 금지 사항

- **Client Component에서 Notion API 직접 호출 금지** — 반드시 Server Component 또는 API Route 경유
- **타입 인라인 정의 금지** — `types/invoice.ts` 사용
- **상대 경로 import 금지** — `@/` 별칭 사용
- **`components/ui/` 파일 임의 삭제 금지** — shadcn/ui 자동 관리 파일
- **환경 변수 클라이언트 노출 금지** — `NEXT_PUBLIC_` 접두사 없이 Notion 키 노출 불가
- **`"use client"` 없이 브라우저 API 사용 금지**
- **PDF 렌더링을 Client Component에서 직접 실행 금지** — 반드시 `/api/generate-pdf` 통해 서버에서 생성

---

## AI 결정 기준

### 새 기능 위치 결정

```
데이터 조회 로직?
  → lib/notion.ts에 함수 추가

브라우저 인터랙션 필요?
  → Client Component ("use client")
  → 아니면 Server Component

PDF 관련?
  → app/api/generate-pdf/route.tsx 수정

타입 추가?
  → types/invoice.ts

전역에서 재사용되는 상수?
  → lib/constants.ts
```

### 에러 처리 결정

```
데이터 없음 (페이지)?
  → notFound() 호출

API Route에서 데이터 없음?
  → NextResponse.json({ error: "..." }, { status: 404 })

Notion API 실패?
  → console.error 후 null 반환, 상위에서 notFound() 처리
```
