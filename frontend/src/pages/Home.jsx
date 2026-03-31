import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import axios from 'axios'

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [categoryData, setCategoryData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    setError('')

    try {
      const [productsRes, categoriesRes, allProductsRes] = await Promise.all([
        axios.get('/api/products/featured'),
        axios.get('/api/products/categories'),
        axios.get('/api/products'),
      ])

      const featured = productsRes.data?.success ? productsRes.data.data : []
      const categories = categoriesRes.data?.success ? categoriesRes.data.data : []
      const allProducts = allProductsRes.data?.success ? allProductsRes.data.data : []

      setFeaturedProducts(featured)

      const categoryCounts = allProducts.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + 1
        return acc
      }, {})

      const iconMap = {
        'Lampu Jalan': 'bx-street-view',
        'Lampu Taman': 'bx-bulb',
        'Solar Panel': 'bx-sun',
        'Baterai': 'bx-battery',
        'Inverter': 'bx-bolt-circle',
        'Pemanas Air': 'bx-water',
        'Aksesoris': 'bx-cog',
      }

      const colorMap = {
        'Lampu Jalan': 'from-yellow-500/20 to-orange-500/20',
        'Lampu Taman': 'from-green-500/20 to-emerald-500/20',
        'Solar Panel': 'from-orange-500/20 to-red-500/20',
        'Baterai': 'from-blue-500/20 to-cyan-500/20',
        'Inverter': 'from-purple-500/20 to-pink-500/20',
        'Pemanas Air': 'from-cyan-500/20 to-blue-500/20',
        'Aksesoris': 'from-gray-500/20 to-zinc-500/20',
      }

      const mappedCategories = categories.map((name) => ({
        name,
        icon: iconMap[name] || 'bx-package',
        count: categoryCounts[name] || 0,
        color: colorMap[name] || 'from-gray-500/20 to-zinc-500/20',
      }))

      setCategoryData(mappedCategories)
    } catch (error) {
      console.error('Error fetching data:', error)
      setFeaturedProducts([])
      setCategoryData([])
      setError('Gagal mengambil data produk dari API.')
    } finally {
      setLoading(false)
    }
  }

  const stats = [
    { label: 'Produk', value: '100+', icon: 'bx-package' },
    { label: 'Pelanggan', value: '5000+', icon: 'bx-group' },
    { label: 'Pengiriman', value: '24 Jam', icon: 'bx-truck' },
    { label: 'Garansi', value: '5 Tahun', icon: 'bx-shield-check' },
  ]

  return (
    <div className="space-y-12 lg:space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl lg:rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-solar-primary/20 via-transparent to-tech-primary/20"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200')] bg-cover bg-center opacity-20"></div>
        
        <div className="relative px-6 py-16 lg:py-24 lg:px-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-solar-primary/10 border border-solar-primary/30 rounded-full mb-6 animate-fade-in">
              <i className='bx bx-sun text-solar-primary'></i>
              <span className="text-sm font-medium text-solar-primary">Sinar Surya, Energiku</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight animate-slide-up">
              Distributor <span className="text-gradient">Lampu PJU Tenaga Surya & PLN</span> Terpercaya
            </h1>
            
            <p className="text-lg text-text-secondary mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Solusi penerangan jalan modern, hemat energi, dan siap untuk proyek skala kecil hingga nasional
            </p>
            
            <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Link to="/products" className="btn-primary flex items-center gap-2">
                <i className='bx bx-shopping-bag'></i>
                Lihat Produk
              </Link>
              <Link to="/products?category=Solar%20Panel" className="btn-secondary flex items-center gap-2">
                <i className='bx bx-sun'></i>
                Solar Panel
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-solar-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-1/4 w-24 h-24 bg-tech-primary/20 rounded-full blur-2xl"></div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <div 
            key={stat.label}
            className="bg-dark-card border border-dark-border rounded-xl p-4 lg:p-6 text-center hover-lift animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-solar-primary/20 to-tech-primary/20 flex items-center justify-center">
              <i className={`bx ${stat.icon} text-2xl text-solar-primary`}></i>
            </div>
            <p className="text-2xl lg:text-3xl font-bold text-white mb-1">{stat.value}</p>
            <p className="text-sm text-text-secondary">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Categories Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold mb-2">Kategori Produk</h2>
            <p className="text-text-secondary">Jelajahi produk berdasarkan kategori</p>
          </div>
          <Link to="/products" className="hidden sm:flex items-center gap-2 text-solar-primary hover:text-solar-secondary transition-colors">
            Lihat Semua
            <i className='bx bx-right-arrow-alt'></i>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categoryData.map((category, index) => (
            <Link
              key={category.name}
              to={`/products?category=${encodeURIComponent(category.name)}`}
              className="group bg-dark-card border border-dark-border rounded-xl p-4 lg:p-6 text-center hover-lift animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-14 h-14 mx-auto mb-3 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <i className={`bx ${category.icon} text-2xl text-white`}></i>
              </div>
              <h3 className="font-semibold text-white mb-1 group-hover:text-solar-primary transition-colors">
                {category.name}
              </h3>
              <p className="text-sm text-text-muted">{category.count} Produk</p>
            </Link>
          ))}
        </div>

        {!loading && categoryData.length === 0 && (
          <p className="text-sm text-text-muted mt-4">Belum ada kategori yang tersedia dari API.</p>
        )}
      </section>

      {/* Featured Products Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold mb-2">Produk Unggulan</h2>
            <p className="text-text-secondary">Produk solar system pilihan terbaik</p>
          </div>
          <Link to="/products?featured=true" className="hidden sm:flex items-center gap-2 text-solar-primary hover:text-solar-secondary transition-colors">
            Lihat Semua
            <i className='bx bx-right-arrow-alt'></i>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-dark-card border border-dark-border rounded-xl h-80 animate-pulse">
                <div className="h-48 bg-dark-border/50 rounded-t-xl"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-dark-border/50 rounded w-3/4"></div>
                  <div className="h-3 bg-dark-border/50 rounded w-full"></div>
                  <div className="h-3 bg-dark-border/50 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {featuredProducts.slice(0, 4).map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="bg-dark-card border border-dark-border rounded-xl p-6 text-center text-text-secondary">
            {error || 'Belum ada produk unggulan dari data seed.'}
          </div>
        )}

        <div className="mt-6 text-center sm:hidden">
          <Link to="/products" className="inline-flex items-center gap-2 text-solar-primary hover:text-solar-secondary transition-colors">
            Lihat Semua Produk
            <i className='bx bx-right-arrow-alt'></i>
          </Link>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-dark-card border border-dark-border rounded-2xl p-6 lg:p-10">
        <div className="text-center mb-10">
          <h2 className="text-2xl lg:text-3xl font-bold mb-3">Mengapa Memilih Kami?</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Kami menyediakan produk solar system berkualitas dengan layanan terbaik
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {[
            {
              icon: 'bx-badge-check',
              title: 'Produk Berkualitas',
              description: 'Semua produk telah teruji dan memiliki sertifikasi standar internasional.',
            },
            {
              icon: 'bx-headphone',
              title: 'Dukungan Teknis',
              description: 'Tim ahli siap membantu instalasi dan perawatan produk solar Anda.',
            },
            {
              icon: 'bx-refresh',
              title: 'Garansi Resmi',
              description: 'Nikmati garansi resmi dari produsen untuk setiap pembelian produk.',
            },
          ].map((benefit, index) => (
            <div 
              key={benefit.title}
              className="text-center animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-solar-primary/20 to-tech-primary/20 flex items-center justify-center">
                <i className={`bx ${benefit.icon} text-3xl text-solar-primary`}></i>
              </div>
              <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
              <p className="text-text-secondary text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-solar-primary/20 to-tech-primary/20 border border-solar-primary/30 p-8 lg:p-12 text-center">
        <div className="relative z-10">
          <h2 className="text-2xl lg:text-4xl font-bold mb-4">
            Siap Beralih ke Energi Surya?
          </h2>
          <p className="text-text-secondary mb-8 max-w-xl mx-auto">
            Hubungi kami untuk konsultasi gratis dan dapatkan penawaran terbaik untuk kebutuhan energi surya Anda.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/products" className="btn-primary flex items-center gap-2">
              <i className='bx bx-shopping-bag'></i>
              Belanja Sekarang
            </Link>
            <button className="btn-secondary flex items-center gap-2">
              <i className='bx bx-phone'></i>
              Hubungi Kami
            </button>
          </div>
        </div>
        
        {/* Decorative */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-solar-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-tech-primary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </section>
    </div>
  )
}

export default Home
