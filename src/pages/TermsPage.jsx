import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import SiteFooter from '../components/SiteFooter'
import SiteLayout from '../components/SiteLayout'

const sections = [
  {
    title: '1. Penerimaan Syarat',
    body: 'Dengan mengakses dan menggunakan platform Ramein, kamu setuju untuk terikat oleh seluruh syarat dan ketentuan yang berlaku di sini. Jika kamu tidak menyetujui salah satu bagian, mohon untuk tidak menggunakan layanan kami.',
  },
  {
    title: '2. Akun Pengguna',
    body: 'Kamu bertanggung jawab menjaga kerahasiaan akun dan password. Aktivitas yang terjadi di bawah akun kamu menjadi tanggung jawab kamu sepenuhnya. Beritahu kami segera jika kamu mencurigai adanya akses tidak sah.',
  },
  {
    title: '3. Pembelian Tiket',
    body: 'Semua pembelian tiket bersifat final dan tidak dapat dikembalikan, kecuali event dibatalkan oleh organizer. Tiket digital dikirim ke email yang kamu daftarkan dan divalidasi via QR Code di lokasi acara.',
  },
  {
    title: '4. Pembuatan Event oleh Organizer',
    body: 'Organizer wajib memberikan informasi yang akurat tentang event yang dibuat. Ramein berhak menurunkan event yang melanggar hukum, mengandung informasi palsu, atau tidak sesuai dengan ketentuan platform.',
  },
  {
    title: '5. Pembayaran & Biaya',
    body: 'Ramein mengenakan biaya layanan dan biaya platform yang ditampilkan secara transparan pada halaman checkout. Pembayaran diproses melalui payment gateway terpercaya (E-Wallet, QRIS, Bank Transfer).',
  },
  {
    title: '6. Hak Kekayaan Intelektual',
    body: 'Seluruh konten, logo, dan desain di platform Ramein dilindungi hak cipta. Dilarang menyalin, memodifikasi, atau mendistribusikan tanpa izin tertulis.',
  },
  {
    title: '7. Batasan Tanggung Jawab',
    body: 'Ramein bertindak sebagai perantara antara organizer dan peserta. Kami tidak bertanggung jawab atas pelaksanaan event, kualitas acara, maupun perselisihan antara organizer dan peserta.',
  },
  {
    title: '8. Perubahan Syarat',
    body: 'Ramein dapat memperbarui syarat dan ketentuan ini sewaktu-waktu. Versi terbaru akan ditampilkan di halaman ini dengan tanggal pembaruan yang diperbarui.',
  },
]

function TermsPage() {
  return (
    <SiteLayout>
      <PageHeader title="Syarat & Ketentuan" subtitle="Terakhir diperbarui: 16 Mei 2026" />

      <div className="mx-auto max-w-[920px] px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <p className="text-gray-700 leading-relaxed">
          Selamat datang di Ramein. Dokumen ini menjelaskan ketentuan penggunaan platform Ramein. Mohon
          dibaca dengan saksama sebelum menggunakan layanan kami.
        </p>

        <div className="mt-8 space-y-6">
          {sections.map((s) => (
            <section key={s.title} className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm sm:p-6">
              <h2 className="text-base font-semibold text-gray-900 sm:text-lg">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-700">{s.body}</p>
            </section>
          ))}
        </div>

        <p className="mt-10 text-sm text-gray-500">
          Untuk pertanyaan lebih lanjut, hubungi kami melalui halaman{' '}
          <Link to="/contact" className="text-brand-600 hover:underline">
            Kontak
          </Link>
          .
        </p>
      </div>
      <SiteFooter />
    </SiteLayout>
  )
}

export default TermsPage
