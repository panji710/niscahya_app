import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('description')
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await axios.get(`/api/products/${id}`)
      if (response.data.success) {
        setProduct(response.data.data)
        fetchRelatedProducts(response.data.data.category)
      }
    } catch (error) {
      console.error('Error fetching product:', error)
      setProduct(null)
      setRelatedProducts([])
      setError('Gagal mengambil detail produk dari API.')
    } finally {
      setLoading(false)
    }
  }

  const fetchRelatedProducts = async (category) => {
    try {
      const response = await axios.get(`/api/products?category=${encodeURIComponent(category)}`)
      if (response.data.success) {
        setRelatedProducts(response.data.data.filter(p => p.id !== parseInt(id)).slice(0, 4))
      }
    } catch (error) {
      console.error('Error fetching related products:', error)
      setRelatedProducts([])
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getCategoryIcon = (category) => {
    const icons = {
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

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-4 bg-dark-border/50 rounded w-32 mb-4"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="aspect-square bg-dark-border/50 rounded-xl"></div>
            <div className="space-y-4">
              <div className="h-8 bg-dark-border/50 rounded w-3/4"></div>
              <div className="h-6 bg-dark-border/50 rounded w-1/2"></div>
              <div className="h-4 bg-dark-border/50 rounded w-full"></div>
              <div className="h-4 bg-dark-border/50 rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-dark-card flex items-center justify-center">
          <i className='bx bx-error-circle text-4xl text-text-muted'></i>
        </div>
        <h3 className="text-xl font-semibold mb-2">Produk tidak ditemukan</h3>
        <p className="text-text-secondary mb-4">
          {error || 'Maaf, produk yang Anda cari tidak tersedia.'}
        </p>
        <Link to="/products" className="btn-primary">
          Kembali ke Produk
        </Link>
      </div>
    )
  }

  const images = [product.image, product.image, product.image] // Placeholder for multiple images

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-text-secondary">
        <Link to="/" className="hover:text-solar-primary transition-colors">Beranda</Link>
        <i className='bx bx-chevron-right'></i>
        <Link to="/products" className="hover:text-solar-primary transition-colors">Produk</Link>
        <i className='bx bx-chevron-right'></i>
        <Link 
          to={`/products?category=${encodeURIComponent(product.category)}`}
          className="hover:text-solar-primary transition-colors"
        >
          {product.category}
        </Link>
        <i className='bx bx-chevron-right'></i>
        <span className="text-white truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* Product Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square bg-dark-card border border-dark-border rounded-xl overflow-hidden">
            <img
              src={images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/800x800/1A1A1A/FFC107?text=Solar+Product'
              }}
            />
          </div>
          
          {/* Thumbnail Images */}
          <div className="flex gap-3">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`
                  w-20 h-20 rounded-lg overflow-hidden border-2 transition-all
                  ${selectedImage === index 
                    ? 'border-solar-primary' 
                    : 'border-dark-border hover:border-solar-primary/50'
                  }
                `}
              >
                <img
                  src={img}
                  alt={`${product.name} - ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Category & Badge */}
          <div className="flex items-center gap-3">
            <Link 
              to={`/products?category=${encodeURIComponent(product.category)}`}
              className="inline-flex items-center gap-1 px-3 py-1 bg-dark-card border border-dark-border rounded-full text-sm text-text-secondary hover:text-solar-primary hover:border-solar-primary/50 transition-colors"
            >
              <i className={`bx ${getCategoryIcon(product.category)}`}></i>
              {product.category}
            </Link>
            {product.is_featured && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-solar-primary/10 border border-solar-primary/30 rounded-full text-sm text-solar-primary">
                <i className='bx bx-star'></i>
                Unggulan
              </span>
            )}
          </div>

          {/* Product Name */}
          <h1 className="text-2xl lg:text-3xl font-bold">{product.name}</h1>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl lg:text-4xl font-bold text-solar-primary">
              {formatPrice(product.price)}
            </span>
            <span className="text-text-muted text-sm">/ unit</span>
          </div>

          {/* Short Description */}
          <p className="text-text-secondary leading-relaxed">
            {product.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <a
              href="https://wa.me/6287853536124"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[200px] flex items-center justify-center gap-2 px-6 py-3 bg-solar-primary text-dark-bg font-semibold rounded-lg hover:bg-solar-secondary transition-colors"
            >
              <i className='bx bxl-whatsapp text-xl'></i>
              Konsultasi via WhatsApp
            </a>
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-dark-card border border-dark-border text-white font-semibold rounded-lg hover:border-solar-primary/50 transition-colors">
              <i className='bx bx-share-alt'></i>
              <span className="hidden sm:inline">Bagikan</span>
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-dark-border">
            {[
              { icon: 'bx-truck', label: 'Gratis Ongkir' },
              { icon: 'bx-shield-check', label: 'Garansi Resmi' },
              { icon: 'bx-refresh', label: '30 Hari Retur' },
              { icon: 'bx-headphone', label: 'Dukungan 24/7' },
            ].map((feature) => (
              <div key={feature.label} className="flex items-center gap-2 text-sm text-text-secondary">
                <i className={`bx ${feature.icon} text-solar-primary`}></i>
                <span>{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="bg-dark-card border border-dark-border rounded-xl overflow-hidden">
        {/* Tab Headers */}
        <div className="flex border-b border-dark-border">
          {[
            { id: 'description', label: 'Deskripsi', icon: 'bx-file-text' },
            { id: 'specifications', label: 'Spesifikasi', icon: 'bx-list-ul' },
            { id: 'shipping', label: 'Pengiriman', icon: 'bx-truck' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors
                ${activeTab === tab.id
                  ? 'text-solar-primary border-b-2 border-solar-primary'
                  : 'text-text-secondary hover:text-white'
                }
              `}
            >
              <i className={`bx ${tab.icon}`}></i>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'description' && (
            <div className="prose prose-invert max-w-none">
              <p className="text-text-secondary leading-relaxed">
                {product.description}
              </p>
              <div className="mt-6">
                <h4 className="text-white font-semibold mb-3">Keunggulan Produk:</h4>
                <ul className="space-y-2">
                  {[
                    'Menggunakan teknologi LED hemat energi',
                    'Panel surya berkualitas tinggi',
                    'Baterai tahan lama dengan siklus charge banyak',
                    'Sensor cahaya otomatis',
                    'Tahan cuaca ekstrem (IP65)',
                    'Instalasi mudah tanpa kabel',
                    'Ramah lingkungan',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-text-secondary">
                      <i className='bx bx-check-circle text-solar-primary mt-0.5'></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <tbody>
                  {Object.entries(product.specifications || product.specs || {}).map(([key, value], index) => (
                    <tr 
                      key={key}
                      className={`
                        border-b border-dark-border last:border-0
                        ${index % 2 === 0 ? 'bg-dark-bg/50' : ''}
                      `}
                    >
                      <td className="py-3 px-4 text-text-secondary w-1/3">{key}</td>
                      <td className="py-3 px-4 text-white font-medium">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <i className='bx bx-truck text-solar-primary text-xl mt-0.5'></i>
                <div>
                  <h4 className="font-semibold text-white mb-1">Pengiriman</h4>
                  <p className="text-text-secondary text-sm">
                    Pengiriman dilakukan dalam 1-3 hari kerja setelah pembayaran dikonfirmasi. 
                    Gratis ongkir untuk pembelian di atas Rp 5.000.000.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <i className='bx bx-package text-solar-primary text-xl mt-0.5'></i>
                <div>
                  <h4 className="font-semibold text-white mb-1">Packing</h4>
                  <p className="text-text-secondary text-sm">
                    Produk dikemas dengan aman menggunakan bubble wrap dan kardus tebal 
                    untuk melindungi dari kerusakan selama pengiriman.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <i className='bx bx-map text-solar-primary text-xl mt-0.5'></i>
                <div>
                  <h4 className="font-semibold text-white mb-1">Area Pengiriman</h4>
                  <p className="text-text-secondary text-sm">
                    Kami melayani pengiriman ke seluruh Indonesia melalui jasa pengiriman terpercaya.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Produk Terkait</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {relatedProducts.map((relatedProduct, index) => (
              <div 
                key={relatedProduct.id}
                className="bg-dark-card border border-dark-border rounded-xl overflow-hidden card-hover animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Link to={`/products/${relatedProduct.id}`}>
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <Link 
                    to={`/products/${relatedProduct.id}`}
                    className="font-semibold text-white hover:text-solar-primary transition-colors line-clamp-2"
                  >
                    {relatedProduct.name}
                  </Link>
                  <p className="text-solar-primary font-bold mt-2">
                    {formatPrice(relatedProduct.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetail
