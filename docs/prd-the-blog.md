# The Blog MVP PRD

## 핵심 정보

**목적**: Notion Database를 CMS로 활용하여 별도 백엔드 없이 블로그 콘텐츠를 웹에서 제공
**사용자**: 블로그 운영자 본인 및 글을 읽는 방문자

---

## 사용자 여정

```
1. 블로그 홈 (글 목록 페이지)
   ↓ 태그/카테고리 선택

   [필터 있음] → 필터된 글 목록 표시 (같은 페이지 내)
   [필터 없음] → 전체 글 목록 표시
   ↓ 글 카드 클릭

2. 글 상세 페이지
   ↓ 읽기 완료 후

   뒤로가기 → 글 목록 페이지 (필터 상태 유지)

3. 완료
```

---

## 기능 명세

### 1. MVP 핵심 기능

| ID | 기능명 | 설명 | MVP 필수 이유 | 관련 페이지 |
|----|--------|------|--------------|------------|
| **F001** | 글 목록 조회 | Notion DB에서 게시된 글 목록을 가져와 카드 형태로 표시 | 블로그의 진입점, 핵심 기능 | 글 목록 페이지 |
| **F002** | 글 상세 조회 | Notion 페이지 콘텐츠를 렌더링하여 본문 표시 | 블로그의 핵심 목적 | 글 상세 페이지 |
| **F003** | 태그 필터 | 태그를 선택하여 해당 태그의 글만 필터링 | 글이 늘어날수록 탐색 필수 | 글 목록 페이지 |
| **F004** | Notion API 연동 | 서버 유틸리티 함수(lib/notion.ts)를 통해 Notion API 호출 및 데이터 반환 | 모든 기능의 데이터 소스 | lib/notion.ts (서버 유틸리티) |

### 2. MVP 필수 지원 기능

| ID | 기능명 | 설명 | MVP 필수 이유 | 관련 페이지 |
|----|--------|------|--------------|------------|
| **F005** | ISR 캐싱 | Next.js ISR로 Notion API 호출 결과를 캐싱 (revalidate 60초) | API 호출 비용 절감, 속도 개선 | 글 목록 페이지, 글 상세 페이지 |
| **F006** | OG 메타태그 | 글 제목, 설명, 커버 이미지를 OG 태그로 생성 | 링크 공유 시 미리보기 | 글 상세 페이지 |

### 3. MVP 이후 기능 (제외)

- 검색 기능
- 댓글 시스템
- RSS 피드
- 조회수 카운터
- 관련 글 추천
- 시리즈/컬렉션 기능

---

## 메뉴 구조

```
The Blog 내비게이션
├── 홈 (글 목록)
│   └── 기능: F001 (전체 글 목록), F003 (태그 필터)
└── [글 제목 클릭]
    └── 기능: F002 (글 상세 본문)

공통 레이아웃
├── 헤더: 블로그 제목 → 홈으로 이동
└── 푸터: 운영자 정보 (선택)
```

---

## 페이지별 상세 기능

### 글 목록 페이지

> **구현 기능:** `F001`, `F003`, `F005` | **진입:** 사이트 루트 접근

| 항목 | 내용 |
|------|------|
| **역할** | 블로그 메인 페이지, 모든 게시글을 탐색하는 진입점 |
| **진입 경로** | 사이트 루트 URL 접근, 헤더 블로그 제목 클릭 |
| **사용자 행동** | 글 목록 스크롤, 태그 클릭으로 필터링, 글 카드 클릭으로 상세 이동 |
| **주요 기능** | - Notion DB에서 Published 상태 글만 가져오기<br>- 글 카드: 제목, 날짜, 태그, 설명(excerpt) 표시<br>- 태그 목록 버튼으로 클릭 필터링 (클라이언트사이드 필터링, MVP 규모에 적합, URL 쿼리 파라미터로 상태 관리)<br>- ISR revalidate 60초 적용<br>- **글 카드 클릭** 시 글 상세 페이지로 이동 |
| **다음 이동** | 글 카드 클릭 → 글 상세 페이지 |

---

### 글 상세 페이지

> **구현 기능:** `F002`, `F005`, `F006` | **진입:** 글 목록에서 카드 클릭

| 항목 | 내용 |
|------|------|
| **역할** | Notion 페이지의 전체 본문을 렌더링하여 독자에게 제공 |
| **진입 경로** | 글 목록 페이지에서 글 카드 클릭 |
| **사용자 행동** | 본문 읽기, 태그 클릭으로 목록 페이지 필터 이동, 뒤로가기 |
| **주요 기능** | - Notion 블록을 HTML로 렌더링 (텍스트, 제목, 이미지, 코드블록, 인용 등)<br>- ⚠️ Notion API는 1단계 자식 블록만 반환 → `has_children` 확인 후 재귀 호출 필요<br>- 글 상단: 제목, 날짜, 태그 표시<br>- 커버 이미지 표시 (Notion 페이지 커버 활용)<br>- OG 메타태그 동적 생성 (generateMetadata)<br>- ISR revalidate 60초 적용<br>- **뒤로가기** 버튼 |
| **다음 이동** | 뒤로가기 → 글 목록 페이지, 태그 클릭 → 글 목록 페이지 (태그 필터 적용) |

---

### 서버 유틸리티 함수 (lib/notion.ts)

> **구현 기능:** `F004` | **접근:** 프론트엔드 내부 호출 전용

| 항목 | 내용 |
|------|------|
| **역할** | Notion API 키를 서버에서 안전하게 관리하고 필요한 데이터만 가공하여 반환 |
| **진입 경로** | 글 목록 페이지, 글 상세 페이지의 서버 컴포넌트에서 직접 함수 호출 |
| **사용자 행동** | 직접 접근 없음 (서버 내부 처리) |
| **주요 기능** | - `getPosts()`: Notion DB 쿼리, Published 필터, 최신순 정렬<br>- `getPost(pageId)`: 특정 페이지 블록 콘텐츠 조회<br>- `getTags()`: DB에서 태그 목록 추출<br>- Notion API 응답을 프론트 친화적 구조로 변환 |
| **다음 이동** | 해당 없음 (서버 함수) |

---

## 데이터 모델

Notion Database 속성 스키마 (Notion에서 직접 설정):

### Post (Notion Database 행)

| 필드 | 설명 | 타입/관계 |
|------|------|----------|
| id | Notion 페이지 ID | UUID (Notion 자동 생성) |
| title | 글 제목 | Title |
| status | 게시 상태 (Published / Draft) | Select |
| tags | 태그 목록 | Multi-select |
| description | 글 요약 (excerpt) | Rich Text |
| created_at | 작성일 | Date |
| cover | 커버 이미지 | Notion 페이지 커버 (URL) |

### 프론트엔드 변환 타입 (TypeScript)

```typescript
type Post = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  createdAt: string;
  coverImage: string | null;
};

type PostDetail = Post & {
  blocks: NotionBlock[];
};
```

---

## 기술 스택

### 프론트엔드 프레임워크

- **Next.js 16** (App Router) - ISR, generateMetadata, Server Components 활용
- **TypeScript 5** (strict 모드) - Notion API 응답 타입 정의
- **React 19** - UI 컴포넌트

### 스타일링 & UI

- **TailwindCSS v4** (OKLCH 컬러, CSS 변수 기반) - 현재 프로젝트 설정 유지
- **shadcn/ui** (radix-nova) - Card, Badge, Button 컴포넌트 활용

### Notion 연동

- **@notionhq/client** - Notion 공식 SDK
- **notion-to-md** 또는 직접 블록 렌더러 - Notion 블록을 React 컴포넌트로 변환
- **환경변수**: `NOTION_TOKEN`, `NOTION_DATABASE_ID`
- ⚠️ **이미지 URL 주의**: Notion 이미지는 AWS S3 서명 URL로 약 1시간 후 만료됨
  - `next.config.ts`의 `images.remotePatterns`에 `*.notion.so`, `*.amazonaws.com` 추가 필수
  - ISR 재검증 주기를 이미지 만료 시간보다 짧게 설정 권장

### 배포

- **Vercel** - Next.js 16 ISR 최적화, 환경변수 관리
