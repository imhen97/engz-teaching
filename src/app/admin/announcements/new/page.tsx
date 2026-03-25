'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createAnnouncement } from '../actions'
import Link from 'next/link'

export default function NewAnnouncementPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const result = await createAnnouncement(formData)

    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/announcements" className="text-gray-400 hover:text-gray-600 text-sm">
          ← 목록으로
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">새 공지사항 작성</h1>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">제목</label>
            <input
              name="title"
              type="text"
              required
              placeholder="공지사항 제목"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">내용</label>
            <textarea
              name="content"
              required
              rows={10}
              placeholder="공지사항 내용을 입력하세요..."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition"
            >
              {loading ? '저장 중...' : '공지 등록'}
            </button>
            <Link
              href="/admin/announcements"
              className="border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium px-6 py-2.5 rounded-lg transition"
            >
              취소
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
