import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function AdminDashboard() {
  const supabase = await createClient()

  const [membersRes, coursesRes, announcementsRes, liveClassesRes] = await Promise.all([
    supabase.from('profiles').select('id', { count: 'exact', head: true }),
    supabase.from('courses').select('id', { count: 'exact', head: true }),
    supabase.from('announcements').select('id', { count: 'exact', head: true }),
    supabase.from('live_classes').select('id', { count: 'exact', head: true }),
  ])

  const stats = [
    { label: '전체 회원', value: membersRes.count ?? 0, href: '/admin/members', color: 'bg-blue-500' },
    { label: '전체 강의', value: coursesRes.count ?? 0, href: '/admin/courses', color: 'bg-green-500' },
    { label: '공지사항', value: announcementsRes.count ?? 0, href: '/admin/announcements', color: 'bg-purple-500' },
    { label: '라이브 수업', value: liveClassesRes.count ?? 0, href: '/admin/upload', color: 'bg-orange-500' },
  ]

  // 최근 가입 회원
  const { data: recentMembers } = await supabase
    .from('profiles')
    .select('id, name, email, created_at, role')
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">관리자 대시보드</h1>
      <p className="text-gray-500 text-sm mb-8">ENGZ Learning Portal 현황</p>

      {/* 통계 카드 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, href, color }) => (
          <Link key={href} href={href}>
            <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition">
              <div className={`w-10 h-10 ${color} rounded-lg mb-3`} />
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-sm text-gray-500 mt-0.5">{label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* 빠른 액션 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">빠른 액션</h2>
          <div className="space-y-2">
            <Link href="/admin/announcements/new" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition text-sm text-gray-700">
              <span className="text-lg">📢</span> 새 공지사항 작성
            </Link>
            <Link href="/admin/courses/new" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition text-sm text-gray-700">
              <span className="text-lg">📚</span> 새 강의 등록
            </Link>
            <Link href="/admin/upload" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition text-sm text-gray-700">
              <span className="text-lg">📁</span> 자료 업로드
            </Link>
            <Link href="/admin/live-class/new" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition text-sm text-gray-700">
              <span className="text-lg">🎥</span> 라이브 수업 등록
            </Link>
          </div>
        </div>

        {/* 최근 가입 회원 */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">최근 가입 회원</h2>
            <Link href="/admin/members" className="text-xs text-blue-600 hover:underline">전체보기</Link>
          </div>
          {recentMembers && recentMembers.length > 0 ? (
            <ul className="space-y-3">
              {recentMembers.map((m) => (
                <li key={m.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{m.name ?? '이름 없음'}</p>
                    <p className="text-xs text-gray-400">{m.email}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      m.role === 'admin' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {m.role === 'admin' ? '관리자' : '학생'}
                    </span>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {new Date(m.created_at).toLocaleDateString('ko-KR')}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400">아직 가입한 회원이 없습니다</p>
          )}
        </div>
      </div>
    </div>
  )
}
