import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const [profileRes, announcementsRes, liveClassRes] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', user.id).single(),
    supabase.from('announcements').select('*').order('created_at', { ascending: false }).limit(3),
    supabase.from('live_classes').select('*').gte('starts_at', new Date().toISOString()).order('starts_at').limit(1),
  ])

  const profile = profileRes.data
  const announcements = announcementsRes.data ?? []
  const nextClass = liveClassRes.data?.[0] ?? null

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          안녕하세요, {profile?.name ?? '학생'}님 👋
        </h1>
        <p className="text-gray-500 text-sm mb-8">오늘도 열심히 공부해봐요!</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* 다음 수업 */}
          <div className="bg-blue-600 text-white rounded-2xl p-6">
            <p className="text-blue-200 text-xs font-medium uppercase tracking-wide mb-2">다음 라이브 수업</p>
            {nextClass ? (
              <>
                <p className="font-semibold text-lg">{nextClass.title}</p>
                <p className="text-blue-200 text-sm mt-1">
                  {new Date(nextClass.starts_at).toLocaleString('ko-KR', {
                    month: 'long', day: 'numeric', weekday: 'short',
                    hour: '2-digit', minute: '2-digit',
                  })}
                </p>
                <a
                  href={nextClass.zoom_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block bg-white text-blue-600 text-xs font-semibold px-4 py-2 rounded-lg hover:bg-blue-50 transition"
                >
                  Zoom 입장하기
                </a>
              </>
            ) : (
              <p className="text-blue-200 text-sm">예정된 수업이 없습니다</p>
            )}
          </div>

          {/* 공지사항 */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 md:col-span-1">
            <div className="flex items-center justify-between mb-4">
              <p className="font-semibold text-gray-900">공지사항</p>
              <Link href="/announcements" className="text-xs text-blue-600 hover:underline">전체보기</Link>
            </div>
            {announcements.length > 0 ? (
              <ul className="space-y-3">
                {announcements.map((a) => (
                  <li key={a.id}>
                    <p className="text-sm text-gray-800 font-medium truncate">{a.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {new Date(a.created_at).toLocaleDateString('ko-KR')}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-400">공지사항이 없습니다</p>
            )}
          </div>

          {/* 바로가기 */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <p className="font-semibold text-gray-900 mb-4">바로가기</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { href: '/course', label: '강의', icon: '📚' },
                { href: '/resources', label: '자료실', icon: '📁' },
                { href: '/live-class', label: '라이브', icon: '🎥' },
                { href: '/announcements', label: '공지', icon: '📢' },
              ].map(({ href, label, icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex flex-col items-center justify-center gap-1 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition text-center"
                >
                  <span className="text-2xl">{icon}</span>
                  <span className="text-xs text-gray-600 font-medium">{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
