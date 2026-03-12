# Task 006: 관리자 인증 시스템 구축

## 개요

환경 변수 기반 비밀번호 인증과 JWT 세션 관리를 통해 관리자 페이지를 보호하는 인증 시스템 구현.
NextAuth.js 없이 `jose` 라이브러리를 활용한 경량 인증 방식 적용.

## 관련 파일

### 신규 생성
- `app/admin/login/page.tsx` - 관리자 로그인 페이지 UI
- `app/api/auth/login/route.ts` - 로그인 API (비밀번호 검증 + JWT 발급)
- `app/api/auth/logout/route.ts` - 로그아웃 API (쿠키 삭제)
- `middleware.ts` - `/admin` 경로 인증 미들웨어 (JWT 검증)
- `lib/auth.ts` - JWT 생성/검증 유틸리티

### 수정
- `.env.local` - `ADMIN_PASSWORD`, `JWT_SECRET` 환경 변수 추가

## 환경 변수

```env
ADMIN_PASSWORD=your-secure-password
JWT_SECRET=your-jwt-secret-key-min-32-chars
```

## 기술 결정

- **인증 방식**: 환경 변수 기반 단일 관리자 비밀번호
- **세션 관리**: JWT (jose 라이브러리) → HttpOnly 쿠키 저장
- **미들웨어**: Next.js Edge Middleware로 `/admin` 경로 전체 보호
- **jose 선택 이유**: Next.js Edge Runtime 호환 (jsonwebtoken은 Node.js 전용)

## 수락 기준

- [ ] 올바른 비밀번호 입력 시 `/admin` 페이지로 리디렉션
- [ ] 잘못된 비밀번호 입력 시 에러 메시지 표시
- [ ] 인증 없이 `/admin` 접근 시 `/admin/login`으로 리디렉션
- [ ] 로그아웃 후 `/admin/login`으로 리디렉션
- [ ] JWT 쿠키는 HttpOnly, Secure, SameSite=Lax 설정

## 구현 단계

### 단계 1: 패키지 설치 및 환경 변수 설정
- [ ] `jose` 패키지 설치
- [ ] `.env.local`에 `ADMIN_PASSWORD`, `JWT_SECRET` 추가
- [ ] `.env.example` 업데이트

### 단계 2: JWT 유틸리티 구현 (`lib/auth.ts`)
- [ ] `signJwt(payload)` - JWT 생성 (1일 만료)
- [ ] `verifyJwt(token)` - JWT 검증
- [ ] 쿠키명 상수 정의 (`ADMIN_SESSION_COOKIE`)

### 단계 3: 로그인 API 구현 (`app/api/auth/login/route.ts`)
- [ ] POST 핸들러: 비밀번호 검증
- [ ] 성공 시 JWT 생성 → HttpOnly 쿠키 설정
- [ ] 실패 시 401 에러 응답

### 단계 4: 로그아웃 API 구현 (`app/api/auth/logout/route.ts`)
- [ ] POST 핸들러: 세션 쿠키 삭제
- [ ] `/admin/login`으로 리디렉션

### 단계 5: 인증 미들웨어 구현 (`middleware.ts`)
- [ ] `/admin` 경로 매칭 (로그인 페이지 제외)
- [ ] JWT 쿠키 검증
- [ ] 미인증 시 `/admin/login?redirect=원래경로`로 리디렉션

### 단계 6: 로그인 페이지 UI 구현 (`app/admin/login/page.tsx`)
- [ ] 비밀번호 입력 폼 (shadcn/ui Input, Button 사용)
- [ ] 로그인 API 호출 Client Component
- [ ] 에러 메시지 표시
- [ ] 로딩 상태 처리
- [ ] 로그인 성공 시 redirect 파라미터 또는 `/admin`으로 이동

### 단계 7: 임시 관리자 페이지 (`app/admin/page.tsx`)
- [ ] 로그인 후 이동할 간단한 관리자 메인 페이지 (Task 007에서 본격 구현)
- [ ] 로그아웃 버튼 포함

## 테스트 체크리스트

Playwright MCP를 활용한 E2E 테스트 시나리오:

### TC-001: 로그인 페이지 접근
- 브라우저로 `http://localhost:3000/admin` 접속
- `/admin/login`으로 리디렉션 확인

### TC-002: 잘못된 비밀번호 로그인 시도
- `/admin/login` 페이지에서 틀린 비밀번호 입력 후 제출
- 에러 메시지 표시 확인 ("비밀번호가 올바르지 않습니다" 등)
- 로그인 페이지에 그대로 유지 확인

### TC-003: 올바른 비밀번호로 로그인
- `/admin/login` 페이지에서 올바른 비밀번호 입력 후 제출
- `/admin`으로 리디렉션 확인
- 관리자 페이지 콘텐츠 표시 확인

### TC-004: 로그인 후 직접 `/admin` 접근
- 로그인 상태에서 `/admin` 직접 접속
- 로그인 페이지로 리디렉션되지 않고 관리자 페이지 표시 확인

### TC-005: 로그아웃
- 로그인 상태에서 로그아웃 버튼 클릭
- `/admin/login`으로 리디렉션 확인
- 로그아웃 후 `/admin` 접속 시 `/admin/login`으로 리디렉션 확인

### TC-006: 세션 쿠키 확인
- 로그인 후 개발자 도구에서 쿠키 확인
- `admin_session` 쿠키가 HttpOnly로 설정되었는지 확인

## 진행 상황

- [ ] 단계 1: 패키지 설치 및 환경 변수 설정
- [ ] 단계 2: JWT 유틸리티 구현
- [ ] 단계 3: 로그인 API 구현
- [ ] 단계 4: 로그아웃 API 구현
- [ ] 단계 5: 인증 미들웨어 구현
- [ ] 단계 6: 로그인 페이지 UI 구현
- [ ] 단계 7: 임시 관리자 페이지
- [ ] E2E 테스트 완료
