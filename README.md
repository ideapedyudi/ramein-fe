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
- Placeholder page untuk menu:
- Jelajah (`/jelajah`)
- Untuk Kamu (`/untuk-kamu`)
- Buat Event (`/buat-event`)

## Tech Stack

- React 19
- Vite 8
- React Router DOM 7
- Tailwind CSS 4
- ESLint 10

## Struktur Singkat

```bash
src/
  components/      # Komponen UI reusable (Navbar, EventCard, HeroSlideshow, dst)
  pages/           # Halaman utama aplikasi
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
- `/jelajah` -> placeholder
- `/untuk-kamu` -> placeholder
- `/buat-event` -> placeholder
- `/login` -> login page
- `/register` -> register page

## Catatan

- Data event saat ini masih memakai mock data lokal (`src/data/homeData.js`).
- Integrasi backend (auth, booking, payment, order history) belum diaktifkan di repo frontend ini.
