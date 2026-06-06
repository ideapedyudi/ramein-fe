import { useCallback, useEffect, useState } from 'react'
import { FaSyncAlt } from 'react-icons/fa'
import AdminLayout from '../../components/AdminLayout'
import { api } from '../../lib/api'
import { formatDateTime } from '../../lib/format'

function AdminFeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadFeedbacks = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await api.getFeedbacks()
      setFeedbacks(res)
    } catch (err) {
      setError(err.message || 'Gagal memuat feedback.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      loadFeedbacks()
    }, 0)

    return () => clearTimeout(timer)
  }, [loadFeedbacks])

  return (
    <AdminLayout title="Feedback" subtitle="Daftar feedback dari user">
      <section className="rounded-2xl border border-[#eee] bg-white">
        <div className="flex items-center justify-between gap-3 border-b border-[#eee] px-5 py-3">
          <div>
            <h2 className="text-sm font-semibold text-[#1f1f1f]">Daftar Feedback</h2>
            <p className="mt-1 text-xs text-[#6d6d6d]">{feedbacks.length} feedback</p>
          </div>
          <button
            type="button"
            onClick={loadFeedbacks}
            disabled={loading}
            className="inline-flex items-center gap-1.5 rounded-md border border-[#e2e2e2] px-2 py-1 text-xs font-medium text-[#4a4a4a] hover:bg-[#f7f7f7] disabled:opacity-50"
          >
            <FaSyncAlt className="text-[10px]" />
            Refresh
          </button>
        </div>

        {error && (
          <div className="border-b border-red-100 bg-red-50 px-5 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-[#fafafa] text-xs uppercase text-[#9a9a9a]">
              <tr>
                <th className="px-5 py-3 font-medium">Rating</th>
                <th className="px-5 py-3 font-medium">Review</th>
                <th className="px-5 py-3 font-medium">Dibuat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f0f0]">
              {feedbacks.map((feedback) => (
                <tr key={feedback.id} className="hover:bg-[#fafafa]">
                  <td className="px-5 py-3 font-semibold text-[#1f1f1f]">{feedback.rating}</td>
                  <td className="px-5 py-3 text-[#4a4a4a]">{feedback.review}</td>
                  <td className="px-5 py-3 text-xs text-[#6d6d6d]">
                    {formatDateTime(feedback.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {loading && <div className="p-10 text-center text-sm text-[#6d6d6d]">Memuat feedback...</div>}

        {!loading && feedbacks.length === 0 && (
          <div className="p-10 text-center text-sm text-[#6d6d6d]">Belum ada data feedback.</div>
        )}
      </section>
    </AdminLayout>
  )
}

export default AdminFeedbackPage
