import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { deleteAnnouncement } from './actions'

export default async function AdminAnnouncementsPage() {
  const supabase = await createClient()
  const { data: announcements } = await supabase
    .from('announcements')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">공지사항 관리</h1>
          <p className="text-gray-500 text-sm mt-1">총 {announcements?.length ?? 0}개</p>
        </div>
        <Link
          href="/admin/announcements/new"
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition"
        >
          + 새 공지 작성
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {announcements && announcements.length > 0 ? (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left text-xs font-medium text-gray-500 px-6 py-3">제목</th>
                <th className="text-left text-xs font-medium text-gray-500 px-6 py-3 w-32">작성일</th>
                <th className="text-left text-xs font-medium text-gray-500 px-6 py-3 w-28">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {announcements.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-800 font-medium">{a.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(a.created_at).toLocaleDateString('ko-KR')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/admin/announcements/${a.id}/edit`}
                        className="text-xs text-blue-600 hover:underline"
                      >
                        수정
                      </Link>
                      <form action={deleteAnnouncement}>
                        <input type="hidden" name="id" value={a.id} />
                        <button
                          type="submit"
                          className="text-xs text-red-500 hover:underline"
                          onClick={(e) => {
                            if (!confirm('공지사항을 삭제하시겠습니까?')) e.preventDefault()
                          }}
                        >
                          삭제
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="py-16 text-center text-gray-400 text-sm">
            아직 공지사항이 없습니다
          </div>
        )}
      </div>
    </div>
  )
}
