# ENGZ MVP Implementation Plan

## Phase 1: Project Bootstrap
1. Next.js 앱 생성 (`app` router)
2. Tailwind 설정
3. Supabase 프로젝트 생성
4. 환경 변수 설정 (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`)

## Phase 2: Auth + Roles
1. Supabase Auth: Email/Password, Google OAuth 활성화
2. `profiles` 테이블 생성 및 회원 role 관리
3. 로그인/회원가입 페이지 구현 (`/login`, `/signup`)
4. 미들웨어로 보호 라우트 분기 (`student`, `admin`)

## Phase 3: Student Core Pages
1. `/dashboard`
2. `/course`, `/course/[id]`
3. `/lesson/[id]`
4. `/resources`
5. `/announcements`
6. `/live-class`

## Phase 4: Admin Core Pages
1. `/admin` (요약)
2. `/admin/course` (코스/모듈/레슨 생성)
3. `/admin/upload` (자료 등록)
4. `/admin/announcements` (공지 CRUD)

## Phase 5: Quality Gate
1. 권한 테스트 (student/admin)
2. 주요 흐름 점검:
   - 로그인 -> 대시보드
   - 코스 -> 레슨 -> 영상/PDF 확인
   - 공지 확인
3. Vercel 배포

## Definition of Done (MVP)
- 학생 로그인 가능
- 코스/레슨/영상 조회 가능
- 자료 다운로드 가능
- 공지 조회 가능
- 관리자 공지/코스 등록 가능
