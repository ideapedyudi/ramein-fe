# Ramein FE

Frontend aplikasi **Ramein**, platform pemesanan tiket event untuk membantu user menemukan event, melihat rekomendasi, dan melakukan proses pembelian tiket dengan pengalaman UI yang simpel.

## Fitur Saat Ini

- Halaman beranda event (`/home`) dengan:
- Hero slideshow banner
- Section **Trending Events**
- Section **Browse by Category**
- Section **Recommended For You**
- Section **Browse by Region**
- Halaman autentikasi:
- Login (`/login`)
- Register (`/register`)
- Halaman jelajah & rekomendasi:
- Jelajahi Event dengan filter kategori/wilayah (`/jelajahi`)
- Untuk Kamu — rekomendasi personal (`/untuk-kamu`)
- Detail event (`/event/:eventId`)
- Alur pembelian tiket:
- Checkout (`/checkout`)
- Order Success (`/order/success`)
- Buat & kelola event (organizer):
- Pilih tipe event (`/buat-event`)
- Festival / Ticketing (`/buat-event/festival`)
- Meetup / Gathering (`/buat-event/gathering`)
- Event Kamu — list event organizer (`/event-kamu`)
- Detail event organizer (`/event-kamu/:eventId`)
- Halaman informasi:
- Tentang Kami (`/about`)
- Kontak (`/contact`)
- Syarat & Ketentuan (`/terms`)
- Kebijakan Privasi (`/privacy`)

## Tech Stack

- React 19
- Vite 8
- React Router DOM 7
- Tailwind CSS 4
- ESLint 10

## Struktur Singkat

```bash
src/
  components/      # Komponen UI reusable (Navbar, EventCard, HeroSlideshow, PageHeader, EventCardPreview, dst)
  pages/           # Halaman utama aplikasi (Home, Login, Register, Jelajahi, UntukKamu, EventDetail, Checkout, OrderSuccess, BuatEvent*, EventKamu*, About, Contact, Terms, Privacy)
  lib/             # Helper (api dummy + format Rupiah/angka)
  data/            # Dummy/mock data untuk homepage
  assets/          # Asset gambar/banner
```

## Cara Menjalankan Project

1. Install dependency:
```bash
npm install
```

2. Jalankan mode development:
```bash
npm run dev
```

3. Build production:
```bash
npm run build
```

4. Jalankan lint:
```bash
npm run lint
```

## Routing

- `/` -> redirect ke `/home`
- `/home` -> halaman utama
- `/jelajah` -> redirect ke `/jelajahi`
- `/jelajahi` -> halaman jelajah event + filter
- `/untuk-kamu` -> rekomendasi personal
- `/event/:eventId` -> detail event publik
- `/checkout` -> halaman pembayaran
- `/order/success` -> konfirmasi pesanan
- `/buat-event` -> pilih tipe event
- `/buat-event/festival` -> form Festival / Ticketing
- `/buat-event/gathering` -> form Meetup / Gathering
- `/event-kamu` -> list event milik organizer
- `/event-kamu/:eventId` -> detail & statistik event organizer
- `/about` -> tentang Ramein
- `/contact` -> hubungi tim
- `/terms` -> syarat & ketentuan
- `/privacy` -> kebijakan privasi
- `/login` -> login page
- `/register` -> register page

## Catatan

- Data event saat ini masih memakai dummy/mock di `src/lib/api.js` (event catalog, organizer my-events, carousel, kategori, wilayah) dan `src/data/homeData.js` (untuk homepage lama).
- API dummy mengembalikan Promise sehingga halaman seperti `Jelajahi`, `UntukKamu`, `EventDetail`, dan `EventKamu` siap diganti dengan integrasi backend tanpa restrukturisasi besar.
- Integrasi backend (auth, booking, payment, order history) belum diaktifkan di repo frontend ini.
