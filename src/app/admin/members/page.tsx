import { createClient } from '@/lib/supabase/server'
import { updateMemberRole } from './actions'

export default async function AdminMembersPage() {
  const supabase = await createClient()
  const { data: members } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">회원 관리</h1>
        <p className="text-gray-500 text-sm mt-1">총 {members?.length ?? 0}명</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {members && members.length > 0 ? (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left text-xs font-medium text-gray-500 px-6 py-3">이름</th>
                <th className="text-left text-xs font-medium text-gray-500 px-6 py-3">이메일</th>
                <th className="text-left text-xs font-medium text-gray-500 px-6 py-3 w-28">역할</th>
                <th className="text-left text-xs font-medium text-gray-500 px-6 py-3 w-32">가입일</th>
                <th className="text-left text-xs font-medium text-gray-500 px-6 py-3 w-28">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {members.map((m) => (
                <tr key={m.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{m.name ?? '-'}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{m.email}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      m.role === 'admin' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {m.role === 'admin' ? '관리자' : '학생'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(m.created_at).toLocaleDateString('ko-KR')}
                  </td>
                  <td className="px-6 py-4">
                    <form action={updateMemberRole} className="flex items-center gap-2">
                      <input type="hidden" name="id" value={m.id} />
                      <select
                        name="role"
                        defaultValue={m.role}
                        className="text-xs border border-gray-200 rounded-md px-2 py-1 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="student">학생</option>
                        <option value="admin">관리자</option>
                      </select>
                      <button
                        type="submit"
                        className="text-xs text-blue-600 hover:underline"
                      >
                        변경
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="py-16 text-center text-gray-400 text-sm">
            아직 가입한 회원이 없습니다
          </div>
        )}
      </div>
    </div>
  )
}
