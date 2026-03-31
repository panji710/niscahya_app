# Niscahya Indonesia Cerdas

Website marketplace modern untuk produk solar system (lampu jalan tenaga surya, lampu taman, solar panel, baterai, dll) dengan teknologi Laravel backend dan React frontend.

## Fitur

- **Desain Modern**: Dark mode minimalis seperti Vercel dengan warna solar gold (#FFC107) dan tech blue (#00C2FF)
- **Responsive**: Fully responsive untuk desktop dan mobile dengan sidebar hamburger menu
- **Kategori Produk**: Lampu Jalan, Lampu Taman, Solar Panel, Baterai, Inverter, Pemanas Air, Aksesoris
- **Filter & Search**: Filter berdasarkan kategori dan pencarian produk
- **Product Detail**: Halaman detail produk dengan spesifikasi lengkap
- **Boxicons**: Icon konsisten dari Boxicons (bx bx-home, bx bx-sun, dll)

## Teknologi

### Backend
- **Laravel 10**: Framework PHP modern
- **MySQL**: Database relational
- **Eloquent ORM**: Database model
- **MVC Pattern**: Model-View-Controller architecture

### Frontend
- **React 18**: Library UI dengan functional components & hooks
- **Vite**: Build tool yang cepat
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client untuk API calls

## Struktur Folder

```
niscahya_app/
├── backend/                    # Laravel Backend
│   ├── app/
│   │   ├── Http/
│   │   │   └── Controllers/
│   │   │       └── ProductController.php
│   │   └── Models/
│   │       └── Product.php
│   ├── database/
│   │   ├── migrations/
│   │   │   └── 2024_01_01_000000_create_products_table.php
│   │   └── seeders/
│   │       ├── DatabaseSeeder.php
│   │       └── ProductSeeder.php
│   ├── routes/
│   │   ├── web.php
│   │   └── api.php
│   └── config/
│       └── cors.php
│
└── frontend/                   # React Frontend
    ├── src/
    │   ├── components/
    │   │   ├── Layout.jsx
    │   │   ├── Sidebar.jsx
    │   │   ├── Navbar.jsx
    │   │   └── ProductCard.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Products.jsx
    │   │   └── ProductDetail.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── tailwind.config.js
```

## Cara Menjalankan

### Prerequisites
- PHP 8.1+
- Composer
- Node.js 18+
- MySQL

### 1. Setup Backend (Laravel)

```bash
# Masuk ke folder backend
cd backend

# Install Laravel (jika belum ada)
composer create-project laravel/laravel . --prefer-dist

# Copy file-file yang sudah dibuat ke folder Laravel
# - app/Http/Controllers/ProductController.php
# - app/Models/Product.php
# - database/migrations/2024_01_01_000000_create_products_table.php
# - database/seeders/ProductSeeder.php
# - database/seeders/DatabaseSeeder.php
# - routes/web.php
# - routes/api.php
# - config/cors.php
# - .env.example

# Install dependencies
composer install

# Setup environment
cp .env.example .env
php artisan key:generate

# Edit .env dan sesuaikan konfigurasi database
DB_DATABASE=solar_marketplace
DB_USERNAME=root
DB_PASSWORD=your_password

# Buat database
echo "CREATE DATABASE solar_marketplace;" | mysql -u root -p

# Run migrations dan seeders
php artisan migrate
php artisan db:seed

# Jalankan server Laravel
php artisan serve
```

Server Laravel akan berjalan di `http://localhost:8000`

### 2. Setup Frontend (React)

```bash
# Masuk ke folder frontend
cd frontend

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Server React akan berjalan di `http://localhost:5173`

### 3. Akses Website

Buka browser dan akses:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000/api/products

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/products | List semua produk |
| GET | /api/products?category={category} | Filter by category |
| GET | /api/products?search={query} | Search produk |
| GET | /api/products?featured=true | Produk unggulan |
| GET | /api/products/featured | Produk unggulan (dedicated) |
| GET | /api/products/categories | List kategori |
| GET | /api/products/{id} | Detail produk |
| POST | /api/products | Create produk |
| PUT | /api/products/{id} | Update produk |
| DELETE | /api/products/{id} | Delete produk |

## Database Schema

### Tabel `products`

| Field | Type | Description |
|-------|------|-------------|
| id | bigint | Primary key |
| name | string | Nama produk |
| price | decimal(15,2) | Harga produk |
| category | string | Kategori produk |
| image | string | URL gambar |
| description | text | Deskripsi produk |
| specifications | json | Spesifikasi teknis |
| is_featured | boolean | Produk unggulan |
| created_at | timestamp | Tanggal dibuat |
| updated_at | timestamp | Tanggal diupdate |

## Warna Theme

| Variabel | Kode | Penggunaan |
|----------|------|------------|
| Background | #0D0D0D | Background utama |
| Card | #1A1A1A | Background card |
| Border | #2A2A2A | Border color |
| Text Primary | #FFFFFF | Teks utama |
| Text Secondary | #A1A1AA | Teks sekunder |
| Solar Primary | #FFC107 | Aksen solar (gold) |
| Tech Primary | #00C2FF | Aksen tech (blue) |

## Icon Boxicons

Icon yang digunakan:
- `bx bx-home` - Beranda
- `bx bx-package` - Produk
- `bx bx-sun` - Solar Panel
- `bx bx-battery` - Baterai
- `bx bx-bolt-circle` - Inverter
- `bx bx-street-view` - Lampu Jalan
- `bx bx-bulb` - Lampu Taman
- `bx bx-water` - Pemanas Air
- `bx bx-cog` - Aksesoris
- `bx bx-cart` - Keranjang
- `bx bx-heart` - Favorit
- `bx bx-search` - Pencarian
- `bx bx-menu` - Menu mobile
- `bx bx-star` - Unggulan

## Fitur yang Akan Datang

- [ ] Chatbot AI untuk customer service
- [ ] Review dan rating produk
- [ ] Admin dashboard

## Catatan Penting

1. **Chatbot AI**: Fitur ini akan ditambahkan nanti dan tidak perlu dibuat sekarang
2. **Scalable Structure**: Struktur project dirancang agar mudah ditambahkan fitur chatbot nanti
3. **CORS**: Sudah dikonfigurasi untuk mengizinkan request dari frontend
4. **Fallback Data**: Frontend memiliki data fallback jika backend tidak tersedia

## Troubleshooting

### CORS Error
Pastikan konfigurasi CORS di `backend/config/cors.php` sudah benar:
```php
'allowed_origins' => ['*'],
```

### Database Connection Error
Periksa konfigurasi database di `.env`:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=solar_marketplace
DB_USERNAME=root
DB_PASSWORD=your_password
```

### Port Conflict
Jika port 8000 atau 5173 sudah digunakan:
- Laravel: `php artisan serve --port=8001`
- React: Edit `vite.config.js` dan ubah port

## Author
Dibuat dengan untuk marketplace solar system Indonesia.

## cara run webnya
Buka terminal pertama
cd C:\xampp\htdocs\niscahya_app\backend
- php artisan serve

Buka terminal kedua
cd C:\xampp\htdocs\niscahya_app\frontend
 - npm.cmd run dev

Buka browser
http://localhost:5173

## cek database
Supaya kamu bisa cek sendiri kapan pun dari terminal VS Code:
cd C:\xampp\htdocs\solar-marketplace\backend
php artisan migrate:status
Kalau keluar daftar migration dengan status Yes, koneksi DB ke MySQL aktif.