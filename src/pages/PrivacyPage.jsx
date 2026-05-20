import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import SiteFooter from '../components/SiteFooter'
import SiteLayout from '../components/SiteLayout'

const sections = [
  {
    title: '1. Informasi yang Kami Kumpulkan',
    body: 'Kami mengumpulkan informasi yang kamu berikan saat mendaftar (nama, email, nomor telepon), data transaksi (tiket yang dibeli, metode pembayaran), dan data penggunaan platform (event yang dilihat, kategori favorit) untuk memberikan rekomendasi personal.',
  },
  {
    title: '2. Cara Kami Menggunakan Informasi',
    body: 'Data kamu digunakan untuk memproses pembelian tiket, mengirim e-ticket, memberikan rekomendasi event yang relevan, mendukung layanan pelanggan, dan mencegah penipuan. Kami tidak menjual data pribadi kamu ke pihak ketiga.',
  },
  {
    title: '3. Pembagian Informasi',
    body: 'Informasi terbatas dibagikan kepada organizer event yang kamu beli tiketnya (nama, email) untuk keperluan validasi. Kami juga bekerja sama dengan payment gateway terpercaya yang memenuhi standar keamanan PCI-DSS.',
  },
  {
    title: '4. Keamanan Data',
    body: 'Kami menggunakan enkripsi HTTPS, hashing password yang aman, dan sistem akses berbasis peran (role-based access). Data tiket disimpan di server yang dilindungi dan diaudit secara berkala.',
  },
  {
    title: '5. Cookies & Pelacakan',
    body: 'Kami menggunakan cookies untuk menjaga sesi login, mengingat preferensi kamu, dan menganalisis penggunaan platform. Kamu bisa menonaktifkan cookies di pengaturan browser, namun beberapa fitur mungkin tidak berfungsi optimal.',
  },
  {
    title: '6. Hak Pengguna',
    body: 'Kamu berhak meminta akses, perbaikan, atau penghapusan data pribadi kamu kapan saja. Kirim permintaan melalui email halo@ramein.id, dan kami akan memproses dalam 30 hari kerja.',
  },
  {
    title: '7. Penyimpanan Data',
    body: 'Data akun disimpan selama akun kamu aktif. Data transaksi disimpan sesuai ketentuan pajak dan akuntansi Indonesia (minimal 10 tahun). Setelah masa simpan berakhir, data dihapus secara permanen.',
  },
  {
    title: '8. Perubahan Kebijakan',
    body: 'Kebijakan privasi ini dapat diperbarui sewaktu-waktu. Kami akan memberitahu kamu melalui email atau notifikasi di platform jika ada perubahan signifikan.',
  },
]

function PrivacyPage() {
  return (
    <SiteLayout>
      <PageHeader title="Kebijakan Privasi" subtitle="Terakhir diperbarui: 16 Mei 2026" />

      <div className="mx-auto max-w-[920px] px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <p className="text-gray-700 leading-relaxed">
          Privasi kamu penting bagi kami. Dokumen ini menjelaskan bagaimana Ramein mengumpulkan, menggunakan,
          dan melindungi data pribadi yang kamu berikan.
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
          Pertanyaan tentang privasi? Hubungi kami melalui halaman{' '}
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

export default PrivacyPage
