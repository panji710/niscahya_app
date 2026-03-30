import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import axios from 'axios'

const Products = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [error, setError] = useState('')

  // Parse URL params
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const category = params.get('category')
    const search = params.get('search')
    const featured = params.get('featured')

    if (category) {
      setActiveCategory(category)
    } else if (featured) {
      setActiveCategory('featured')
    } else {
      setActiveCategory('all')
    }

    if (search) {
      setSearchQuery(search)
    }
  }, [location.search])

  // Fetch products
  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [activeCategory, searchQuery, sortBy])

  const fetchProducts = async () => {
    setLoading(true)
    setError('')

    try {
      let url = '/api/products'
      const params = new URLSearchParams()

      if (activeCategory && activeCategory !== 'all') {
        if (activeCategory === 'featured') {
          params.append('featured', 'true')
        } else {
          params.append('category', activeCategory)
        }
      }

      if (searchQuery) {
        params.append('search', searchQuery)
      }

      if (params.toString()) {
        url += `?${params.toString()}`
      }

      const response = await axios.get(url)
      if (response.data.success) {
        let sortedProducts = [...response.data.data]
        
        // Sort products
        switch (sortBy) {
          case 'price-low':
            sortedProducts = sortedProducts.sort((a, b) => a.price - b.price)
            break
          case 'price-high':
            sortedProducts = sortedProducts.sort((a, b) => b.price - a.price)
            break
          case 'name':
            sortedProducts = sortedProducts.sort((a, b) => a.name.localeCompare(b.name))
            break
          default:
            // Keep default order (newest)
            break
        }

        setProducts(sortedProducts)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      setProducts([])
      setError('Gagal mengambil data produk dari API.')
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/products/categories')
      if (response.data.success) {
        setCategories(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
      setCategories([])
    }
  }

  const handleCategoryChange = (category) => {
    setActiveCategory(category)
    if (category === 'all') {
      navigate('/products')
    } else if (category === 'featured') {
      navigate('/products?featured=true')
    } else {
      navigate(`/products?category=${encodeURIComponent(category)}`)
    }
  }

  const handleSortChange = (e) => {
    setSortBy(e.target.value)
  }

  const clearFilters = () => {
    setActiveCategory('all')
    setSearchQuery('')
    navigate('/products')
  }

  const getCategoryIcon = (category) => {
    const icons = {
      'all': 'bx-grid-alt',
      'featured': 'bx-star',
      'Lampu Jalan': 'bx-street-view',
      'Lampu Taman': 'bx-bulb',
      'Solar Panel': 'bx-sun',
      'Baterai': 'bx-battery',
      'Inverter': 'bx-bolt-circle',
      'Pemanas Air': 'bx-water',
      'Aksesoris': 'bx-cog',
    }
    return icons[category] || 'bx-package'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold mb-1">Produk Solar System</h1>
          <p className="text-text-secondary">
            {searchQuery 
              ? `Hasil pencarian untuk "${searchQuery}"`
              : activeCategory === 'all' 
                ? 'Semua produk solar system tersedia'
                : activeCategory === 'featured'
                  ? 'Produk unggulan pilihan terbaik'
                  : `Produk kategori ${activeCategory}`
            }
          </p>
        </div>
        
        {/* Sort & Filter */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <i className='bx bx-sort-alt-2 absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted'></i>
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="pl-10 pr-8 py-2 bg-dark-card border border-dark-border rounded-lg text-sm text-white focus:outline-none focus:border-solar-primary/50 appearance-none cursor-pointer"
            >
              <option value="newest">Terbaru</option>
              <option value="price-low">Harga: Rendah ke Tinggi</option>
              <option value="price-high">Harga: Tinggi ke Rendah</option>
              <option value="name">Nama: A-Z</option>
            </select>
            <i className='bx bx-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted pointer-events-none'></i>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleCategoryChange('all')}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
            ${activeCategory === 'all'
              ? 'bg-solar-primary text-dark-bg'
              : 'bg-dark-card border border-dark-border text-text-secondary hover:text-white hover:border-solar-primary/50'
            }
          `}
        >
          <i className='bx bx-grid-alt'></i>
          Semua
        </button>
        <button
          onClick={() => handleCategoryChange('featured')}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
            ${activeCategory === 'featured'
              ? 'bg-solar-primary text-dark-bg'
              : 'bg-dark-card border border-dark-border text-text-secondary hover:text-white hover:border-solar-primary/50'
            }
          `}
        >
          <i className='bx bx-star'></i>
          Unggulan
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${activeCategory === category
                ? 'bg-solar-primary text-dark-bg'
                : 'bg-dark-card border border-dark-border text-text-secondary hover:text-white hover:border-solar-primary/50'
              }
            `}
          >
            <i className={`bx ${getCategoryIcon(category)}`}></i>
            {category}
          </button>
        ))}
      </div>

      {/* Active Filters */}
      {(activeCategory !== 'all' || searchQuery) && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-text-secondary">Filter aktif:</span>
          {activeCategory !== 'all' && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-solar-primary/10 border border-solar-primary/30 rounded-full text-sm text-solar-primary">
              <i className={`bx ${getCategoryIcon(activeCategory)}`}></i>
              {activeCategory === 'featured' ? 'Unggulan' : activeCategory}
              <button 
                onClick={() => handleCategoryChange('all')}
                className="ml-1 hover:text-white"
              >
                <i className='bx bx-x'></i>
              </button>
            </span>
          )}
          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-tech-primary/10 border border-tech-primary/30 rounded-full text-sm text-tech-primary">
              <i className='bx bx-search'></i>
              {searchQuery}
              <button 
                onClick={() => {
                  setSearchQuery('')
                  navigate('/products')
                }}
                className="ml-1 hover:text-white"
              >
                <i className='bx bx-x'></i>
              </button>
            </span>
          )}
          <button 
            onClick={clearFilters}
            className="text-sm text-text-muted hover:text-white transition-colors"
          >
            Hapus semua
          </button>
        </div>
      )}

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {[...Array(8)].map((_, i) => (
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
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-dark-card flex items-center justify-center">
            <i className='bx bx-package text-4xl text-text-muted'></i>
          </div>
          <h3 className="text-xl font-semibold mb-2">Tidak ada produk</h3>
          <p className="text-text-secondary mb-4">
            {error || 'Tidak ditemukan produk yang sesuai dengan filter Anda.'}
          </p>
          <button 
            onClick={clearFilters}
            className="btn-primary"
          >
            Lihat Semua Produk
          </button>
        </div>
      )}

      {/* Results Count */}
      {!loading && products.length > 0 && (
        <div className="text-center text-sm text-text-secondary">
          Menampilkan {products.length} produk
        </div>
      )}
    </div>
  )
}

export default Products
