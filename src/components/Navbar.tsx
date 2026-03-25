import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { signOut } from '@/app/auth/actions'
import type { Profile } from '@/types'

export default async function Navbar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let profile: Profile | null = null
  if (user) {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()
    profile = data
  }

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/dashboard" className="text-xl font-bold text-gray-900">
          ENGZ
        </Link>

        {profile && (
          <div className="flex items-center gap-4">
            {profile.role === 'admin' && (
              <Link
                href="/admin"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                관리자
              </Link>
            )}
            <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900">대시보드</Link>
            <Link href="/resources" className="text-sm text-gray-600 hover:text-gray-900">자료실</Link>
            <Link href="/announcements" className="text-sm text-gray-600 hover:text-gray-900">공지사항</Link>
            <Link href="/live-class" className="text-sm text-gray-600 hover:text-gray-900">라이브</Link>

            <div className="flex items-center gap-3 ml-2 pl-4 border-l border-gray-200">
              <span className="text-sm text-gray-500">{profile.name}</span>
              <form action={signOut}>
                <button className="text-sm text-gray-500 hover:text-gray-900">
                  로그아웃
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
