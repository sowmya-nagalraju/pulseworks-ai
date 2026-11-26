
import { useState } from 'react'

import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import SystemBanner from './components/SystemBanner'
import Dashboard from './pages/Dashboard'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="flex">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="min-w-0 flex-1 px-4 md:px-8 py-8">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="md:hidden mb-6 px-4 py-2 rounded-lg bg-[#101B31] text-white text-sm"
          >
            Open Workspace Menu
          </button>

          <div className="mb-8">
            <SystemBanner />
          </div>

          <Dashboard />
        </main>
      </div>
    </div>
  )
}

export default App
