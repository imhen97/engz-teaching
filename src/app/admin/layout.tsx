import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { signOut } from '@/app/auth/actions'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, name')
    .eq('id', user.id)
    .single()

  if (!profile || profile.role !== 'admin') redirect('/dashboard')

  const navItems = [
    { href: '/admin', label: '대시보드', exact: true },
    { href: '/admin/announcements', label: '공지사항 관리' },
    { href: '/admin/courses', label: '강의 관리' },
    { href: '/admin/upload', label: '자료 업로드' },
    { href: '/admin/members', label: '회원 관리' },
  ]

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* 사이드바 */}
      <aside className="w-60 bg-gray-900 text-white flex flex-col">
        <div className="px-6 py-5 border-b border-gray-800">
          <p className="font-bold text-lg">ENGZ 관리자</p>
          <p className="text-gray-400 text-xs mt-1">{profile.name}</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-gray-800 space-y-1">
          <Link
            href="/dashboard"
            className="flex items-center px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition"
          >
            ← 학생 페이지로
          </Link>
          <form action={signOut}>
            <button className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition">
              로그아웃
            </button>
          </form>
        </div>
      </aside>

      {/* 메인 컨텐츠 */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  )
}
