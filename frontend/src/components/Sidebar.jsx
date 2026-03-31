import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation()

  const menuItems = [
    { path: '/', label: 'Beranda', icon: 'bx-home' },
    { path: '/products', label: 'Produk', icon: 'bx-package' },
  ]

  const isActivePath = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    if (path.includes('?')) {
      const [basePath, query] = path.split('?')
      return location.pathname === basePath && location.search === `?${query}`
    }
    return location.pathname === path
  }

  return (
    <aside 
      className={`
        fixed top-0 left-0 h-full w-64 bg-dark-card border-r border-dark-border z-40
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}
    >
      {/* Logo Section */}
      <div className="p-6 border-b border-dark-border">
        <NavLink to="/" className="flex items-center gap-3" onClick={onClose}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-solar-primary to-tech-primary flex items-center justify-center">
            <i className='bx bx-sun text-dark-bg text-xl'></i>
          </div>
          <div>
            <h1 className="font-bold text-xl text-white">CV. Niscahya Indonesia Cerdas</h1>
          </div>
        </NavLink>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4">
        <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-4 px-3">
          Menu Utama
        </p>
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300
                  ${isActivePath(item.path) 
                    ? 'bg-solar-primary/10 text-solar-primary border border-solar-primary/30' 
                    : 'text-text-secondary hover:text-white hover:bg-dark-border/50'
                  }
                `}
              >
                <i className={`bx ${item.icon} text-xl`}></i>
                <span className="font-medium">{item.label}</span>
                {isActivePath(item.path) && (
                  <i className='bx bx-chevron-right ml-auto'></i>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Stats Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-dark-border">
        <div className="bg-dark-bg rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <i className='bx bx-leaf text-green-500'></i>
            <span className="text-sm font-medium text-text-secondary">Energi Terbarukan</span>
          </div>
          <p className="text-xs text-text-muted">
            Produk solar berkualitas untuk masa depan yang lebih hijau.
          </p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
