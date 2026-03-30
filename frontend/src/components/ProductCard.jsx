import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({ product, index = 0 }) => {
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

  const getCategoryColor = (category) => {
    const colors = {
      'Lampu Jalan': 'text-yellow-400',
      'Lampu Taman': 'text-green-400',
      'Solar Panel': 'text-orange-400',
      'Baterai': 'text-blue-400',
      'Inverter': 'text-purple-400',
      'Pemanas Air': 'text-cyan-400',
      'Aksesoris': 'text-gray-400',
    }
    return colors[category] || 'text-gray-400'
  }

  return (
    <div 
      className="group bg-dark-card border border-dark-border rounded-xl overflow-hidden card-hover animate-slide-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-dark-bg">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x400/1A1A1A/FFC107?text=Solar+Product'
          }}
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.is_featured && (
            <span className="px-2 py-1 bg-solar-primary text-dark-bg text-xs font-bold rounded-md flex items-center gap-1">
              <i className='bx bx-star'></i>
              Unggulan
            </span>
          )}
        </div>

        {/* Category Badge */}
        <div className="absolute bottom-3 left-3">
          <span className={`px-2 py-1 bg-dark-card/90 backdrop-blur text-xs font-medium rounded-md flex items-center gap-1 ${getCategoryColor(product.category)}`}>
            <i className={`bx ${getCategoryIcon(product.category)}`}></i>
            {product.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Product Name */}
        <h3 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-solar-primary transition-colors">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-text-secondary mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-bold text-solar-primary">
            {formatPrice(product.price)}
          </span>
        </div>

        {/* Actions */}
        <Link
          to={`/products/${product.id}`}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-dark-bg border border-dark-border rounded-lg text-sm font-medium text-text-secondary hover:text-white hover:border-solar-primary/50 transition-all"
        >
          <i className='bx bx-show'></i>
          Detail
        </Link>
      </div>
    </div>
  )
}

export default ProductCard
