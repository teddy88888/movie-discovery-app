# Movie Explorer App

Selamat datang ! membangun sebuah aplikasi web Movie Explorer menggunakan React, TypeScript, dan berbagai modern tools yang sering digunakan di industri.

## Deskripsi Project

membuat aplikasi web yang menampilkan informasi film dari **The Movie Database (TMDB)** API. Aplikasi ini harus mengikuti design yang sudah disediakan di Figma dan menggunakan tech stack yang telah ditentukan.

## Design Reference

design dari Figma :
[Movie Explorer App - Figma Design](https://www.figma.com/design/PjR3Adxi8eZbS2cmdPuG52/Front-End-Developer-Test---Movie-Explorer-App?node-id=8411-143671&t=y7BzTJGevPesnrNE-1)

## Tech Stack yang Wajib Digunakan

- **React 19** - UI Library
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **TanStack React Query** - Data Fetching & Caching
- **Zustand** - State Management
- **React Router** - Routing
- **Radix UI & shadcn/ui** - UI Components
- **Zod & React Hook Form** - Form Validation
- **Framer Motion** - Animations
- **Tailwind CSS** - Styling

## Setup Awal

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment Variables

Copy file `.env.example` menjadi `.env`:

```bash
cp .env.example .env
```

### 3. TMDB API Key

1. Buat akun di [TheMovieDB](https://www.themoviedb.org/signup)
2. Login dan pergi ke [Settings → API](https://www.themoviedb.org/settings/api)
3. Request API key (pilih developer/educational purpose)
4. Copy API key dan paste ke file `.env`:

```env
VITE_TMDB_API_KEY=your_api_key_here
```

### 4. Jalankan Development Server

```bash
npm run dev
```

## Fitur yang Harus Diimplementasikan

Berdasarkan design Figma, minimal implementasikan fitur-fitur berikut:

### Core Features

1. **Home Page**
   - Display popular movies
   - Display now playing movies
   - Search functionality
   - Filter/sorting options

2. **Movie Detail Page**
   - Movie information (title, poster, overview, rating, release date, etc.)
   - Cast & crew information
   - Similar movies recommendations
   - Trailers/videos

3. **State Management**
   - Favorites/Watchlist menggunakan Zustand
   - Persist favorites ke localStorage

4. **Data Fetching**
   - Gunakan React Query untuk semua API calls
   - Implementasikan loading states
   - Implementasikan error handling

5. **Form & Validation**
   - Search form dengan validation menggunakan Zod + React Hook Form
   - (Optional) Newsletter subscription form

6. **Animations**
   - Page transitions
   - Component animations (fade in, slide, etc.)
   - Hover effects
   - Loading animations

## Resources & Documentation

### API Documentation

- [TMDB API Documentation](https://developer.themoviedb.org/docs)
- [TMDB API Reference](https://developer.themoviedb.org/reference/intro/getting-started)

### Library Documentation

- [React Query](https://tanstack.com/query/latest/docs/framework/react/overview)
- [Zustand](https://zustand.docs.pmnd.rs/)
- [React Router](https://reactrouter.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Framer Motion](https://www.framer.com/motion/)

## Struktur Project

```
src/
├── components/       # Reusable components
│   └── ui/          # shadcn/ui components
├── pages/           # Page components
├── hooks/           # Custom React hooks
├── services/        # API service functions
├── store/           # Zustand stores
├── types/           # TypeScript interfaces/types
├── lib/             # Utility libraries (axios, utils)
└── utils/           # Helper functions
```

## Tips Pengerjaan

1. **Mulai dari API Integration**
   - Setup axios instance di `lib/axios.ts`
   - Buat service functions di `services/movieService.ts`
   - Test API calls dengan React Query

2. **Setup UI Components**
   - Install shadcn/ui components yang dibutuhkan:
     ```bash
     npx shadcn@latest add button
     npx shadcn@latest add card
     npx shadcn@latest add input
     # dst...
     ```

3. **Implementasi Routing**
   - Setup React Router untuk navigasi antar halaman
   - Buat route untuk Home dan Detail page

4. **State Management**
   - Gunakan Zustand untuk favorites/watchlist
   - Implementasi persist middleware untuk localStorage

5. **Styling & Animations**
   - Gunakan Tailwind untuk styling
   - Tambahkan Framer Motion untuk smooth animations

## Bantuan & Pertanyaan

Jika ada pertanyaan atau butuh klarifikasi:

1. Baca dokumentasi library yang digunakan
2. Check TMDB API documentation

## Catatan Penting

- **DILARANG** copy-paste code dari internet tanpa memahami
- **DILARANG** menggunakan AI untuk menulis seluruh code (boleh untuk reference/learning)
- **WAJIB** memahami setiap line code yang kalian tulis
- **WAJIB** menggunakan semua tech stack yang sudah ditentukan

---
