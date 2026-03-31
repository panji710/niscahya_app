import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-dark-bg flex">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-64">
        {/* Navbar */}
        <Navbar onMenuClick={toggleSidebar} />

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8 pt-20 lg:pt-24">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="border-t border-dark-border py-6 px-4 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <i className='bx bx-sun text-solar-primary text-2xl'></i>
              <span className="font-semibold text-lg">CV. Niscahya Indonesia Cerdas</span>
            </div>
            <p className="text-text-secondary text-sm">
              &copy; 2026 CV. Niscahya Indonesia Cerdas. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-text-secondary hover:text-solar-primary transition-colors">
                <i className='bx bxl-instagram text-xl'></i>
              </a>
              <a href="#" className="text-text-secondary hover:text-solar-primary transition-colors">
                <i className='bx bxl-facebook text-xl'></i>
              </a>
              <a href="#" className="text-text-secondary hover:text-solar-primary transition-colors">
                <i className='bx bxl-twitter text-xl'></i>
              </a>
            </div>
          </div>
        </footer>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={closeSidebar}
        />
      )}
    </div>
  )
}

export default Layout
