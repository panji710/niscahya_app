import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = ({ onMenuClick }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
    }
  }

  return (
    <header 
      className={`
        fixed top-0 right-0 left-0 lg:left-64 z-30
        transition-all duration-300
        ${isScrolled ? 'glass border-b border-dark-border' : 'bg-transparent'}
      `}
    >
      <div className="flex items-center justify-between h-16 px-4 lg:px-8">
        {/* Left Section - Mobile Menu & Search */}
        <div className="flex items-center gap-4 flex-1">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg text-text-secondary hover:text-white hover:bg-dark-border/50 transition-colors"
          >
            <i className='bx bx-menu text-2xl'></i>
          </button>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md">
            <div className="relative w-full">
              <i className='bx bx-search absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted'></i>
              <input
                type="text"
                placeholder="Cari produk solar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-dark-card border border-dark-border rounded-lg text-sm text-white placeholder-text-muted focus:outline-none focus:border-solar-primary/50 focus:ring-1 focus:ring-solar-primary/50 transition-all"
              />
            </div>
          </form>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-2 lg:gap-4">
          {/* Mobile Search Button */}
          <button className="md:hidden p-2 rounded-lg text-text-secondary hover:text-white hover:bg-dark-border/50 transition-colors">
            <i className='bx bx-search text-xl'></i>
          </button>

          {/* Notifications */}
          <button className="hidden sm:flex p-2 rounded-lg text-text-secondary hover:text-white hover:bg-dark-border/50 transition-colors">
            <i className='bx bx-bell text-xl'></i>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
