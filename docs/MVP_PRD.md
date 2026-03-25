# ENGZ Learning Portal - MVP PRD

## 1) Product Overview
ENGZ Learning Portal은 해나쌤 수강생 전용 학습 플랫폼이다.

학생은 로그인 후 아래 기능을 사용한다.
- 강의 영상 시청
- 수업 자료 다운로드
- 과제 안내 확인
- Zoom 수업 링크 확인
- 공지사항 확인

목표:
- 수강생 학습 관리
- 자료 배포 자동화
- Zoom 수업 운영 효율화

## 2) Users
Primary:
- IELTS 학생
- OPIc 학생
- TOEIC 학생
- 영어회화 학생

Admin:
- 해나쌤 (관리자)

## 3) MVP Features
### 3.1 Authentication
- Email 로그인/회원가입
- Google 로그인
- 로그아웃
- 역할: `student`, `admin`

### 3.2 Dashboard (`/dashboard`)
- 내 코스 목록
- 공지사항 요약
- 다음 수업
- 최근 업로드 강의

### 3.3 Course System
구조:
- Course
- Module
- Lesson
- Lesson 콘텐츠: Video, PDF, Homework 안내

### 3.4 Lesson Page (`/lesson/[id]`)
- 레슨 제목
- 영상 임베드(YouTube/Vimeo)
- 자료 다운로드(PDF, 워크북)
- 과제 텍스트 안내

### 3.5 Resource Library (`/resources`)
카테고리:
- IELTS
- OPIc
- TOEIC
- Speaking

자료:
- PDF
- 워크북
- 템플릿
- 녹화본

### 3.6 Announcements (`/announcements`)
- 공지 목록
- 상세 보기

### 3.7 Live Class (`/live-class`)
- 라이브 수업 일정
- Zoom 링크
- 다시보기 링크

## 4) Admin Panel
필수 페이지:
- `/admin`
- `/admin/course`
- `/admin/upload`
- `/admin/announcements`

기능:
- 코스/모듈/레슨 생성 및 수정
- 영상 링크 등록
- PDF/워크북 업로드
- 공지 CRUD

## 5) Data Model (MVP)
기본 테이블:
- `profiles`
- `courses`
- `modules`
- `lessons`
- `announcements`
- `resources`
- `live_classes`
- `enrollments`

## 6) Tech Stack
- Frontend: Next.js + Tailwind
- Backend: Supabase (Postgres + Storage + Auth)
- Auth: Supabase Auth (Email + Google OAuth)
- Video: Vimeo or YouTube
- Deploy: Vercel

## 7) Routes
Public:
- `/login`
- `/signup`

Student:
- `/dashboard`
- `/course`
- `/course/[id]`
- `/lesson/[id]`
- `/resources`
- `/announcements`
- `/live-class`

Admin:
- `/admin`
- `/admin/course`
- `/admin/upload`
- `/admin/announcements`

## 8) Out of Scope (MVP)
- 커뮤니티
- 과제 자동 채점
- 결제 시스템
- 진도 자동 분석
- AI 튜터

## 9) Success Metrics
- 학생 로그인 가능
- 강의 시청 가능
- 자료 다운로드 가능
- 공지 확인 가능

## 10) V2 Backlog
- 과제 제출
- 첨삭 기능
- 결제 시스템
- 커뮤니티
- 학습 통계
- AI 스피킹 평가
