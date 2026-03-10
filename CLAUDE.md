# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 개발 명령어

```bash
npm run dev      # 개발 서버 실행 (localhost:3000)
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 실행
npm run lint     # ESLint 검사
```

테스트 명령어는 없음.

## 프로젝트 개요

**Claude Next.js Starter** - shadcn/ui, 다크모드, 반응형 디자인을 포함한 Next.js 스타터킷.

- Next.js 15+ (App Router), React 19, TypeScript 5 (strict 모드)
- Tailwind CSS 4 (OKLCH 컬러 시스템, CSS 변수 기반 테마)
- shadcn/ui (radix-nova 스타일, `components.json` 설정)
- 현재 API 라우트, 데이터베이스, 인증 시스템 없음

## 아키텍처

### 폴더 구조

```
app/                        # Next.js App Router 페이지 (기본 Server Components)
  layout.tsx                # 루트 레이아웃 (FOUC 방지 인라인 스크립트 포함)
  globals.css               # OKLCH 테마 CSS 변수
  page.tsx                  # 홈페이지
  about/page.tsx            # About 페이지
  components/page.tsx       # 컴포넌트 쇼케이스

components/
  layout/                   # Navbar, Footer, NavLinks, MobileMenu
  ui/                       # shadcn/ui 컴포넌트 (직접 편집 가능)
  theme-toggle.tsx          # 다크/라이트 토글

lib/
  utils.ts                  # cn() 유틸리티 (clsx + tailwind-merge)
  constants.ts              # 전역 상수 (TECH_STACK 등)
```

### Server vs Client Components

- **Server Components (기본)**: 페이지, Navbar, Footer
- **Client Components** (`"use client"` 선언 필요): `usePathname`, `useState`, `useEffect` 사용 시

### 경로 별칭

`tsconfig.json`에 `@/*` 별칭이 루트 기준으로 설정되어 있음:
- `@/components`, `@/components/ui`, `@/lib`, `@/hooks`

### 다크모드

`app/layout.tsx`의 `<head>` 내 인라인 스크립트로 localStorage 확인 후 `document.documentElement`에 `dark` 클래스를 적용 (FOUC 방지). `components/theme-toggle.tsx`에서 localStorage와 동기화.

## shadcn/ui 컴포넌트 추가

```bash
npx shadcn@latest add <component-name>
```

컴포넌트는 `components/ui/`에 생성되며, `cn()` 유틸리티와 CSS 변수 기반 테마를 사용.
