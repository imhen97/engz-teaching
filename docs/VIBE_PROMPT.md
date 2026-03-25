# ENGZ MVP Build Prompt

Use this prompt in Cursor/Claude Code:

```text
Build an MVP learning portal for ENGZ English students.

Stack:
- Next.js (App Router)
- Tailwind CSS
- Supabase (Auth + Postgres + Storage)
- Deploy target: Vercel

Requirements:
1) Authentication
- Email/password login + signup
- Google login
- Roles: student, admin

2) Student pages
- /dashboard: my courses, announcements, next class, recent lessons
- /course
- /course/[id]
- /lesson/[id]: embedded video (YouTube/Vimeo), PDF/workbook download, homework text
- /resources: category filter (IELTS, OPIc, TOEIC, Speaking)
- /announcements
- /live-class: schedule + Zoom link + replay link

3) Admin pages
- /admin
- /admin/course: create/update courses/modules/lessons
- /admin/upload: upload/register PDFs and workbooks
- /admin/announcements: create/update/delete notices

4) Data model
- profiles(id, name, email, role, created_at)
- courses(id, title, description, created_at)
- modules(id, course_id, title, sort_order, created_at)
- lessons(id, module_id, title, video_url, pdf_url, workbook_url, content, homework, sort_order, created_at)
- announcements(id, title, content, created_at, created_by)
- resources(id, title, category, file_url, created_at, created_by)
- live_classes(id, title, starts_at, zoom_url, replay_url, created_at, created_by)
- enrollments(id, user_id, course_id, created_at)

5) Security
- Use Supabase RLS.
- Students can read learning content.
- Only admin can write courses/lessons/resources/announcements/live classes.

6) Non-goals (MVP out of scope)
- Community
- Auto grading
- Payments
- AI tutor
- Progress analytics

Deliverables:
- Full project structure
- SQL migration for schema + RLS
- Route protection middleware
- Seed data script
- Clean README with setup steps
```
