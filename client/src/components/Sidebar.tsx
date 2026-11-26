
import { useState } from 'react'
import {
  LayoutDashboard,
  CheckSquare,
  FolderKanban,
  FileText,
  Users,
  ChartNoAxesCombined,
  Settings,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
} from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  activeItem: string
  onNavigate: (page: string) => void
}

const navigationItems = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'My Tasks', icon: CheckSquare },
  { label: 'Projects', icon: FolderKanban },
  { label: 'Documents', icon: FileText },
  { label: 'Team Members', icon: Users },
  { label: 'Analytics', icon: ChartNoAxesCombined },
]

function Sidebar({
  isOpen,
  onClose,
  activeItem,
  onNavigate,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  const handleNavigation = (label: string) => {
    onNavigate(label)
    onClose()
  }

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 top-20 z-40 bg-slate-950/50 md:hidden"
        />
      )}

      <aside
        className={`
          fixed md:sticky top-20 left-0 z-40
          h-[calc(100vh-5rem)] flex-shrink-0
          bg-[#101B31] border-r border-slate-700
          flex flex-col transition-all duration-300
          ${collapsed ? 'md:w-20' : 'md:w-64'}
          w-64
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
      >
        <div className="flex items-center justify-between px-5 py-5 border-b border-slate-700">
          {!collapsed && (
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                Workspace
              </p>

              <p className="text-sm text-white font-semibold mt-1">
                Main Menu
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? (
              <ChevronRight size={18} />
            ) : (
              <ChevronLeft size={18} />
            )}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700"
            aria-label="Close sidebar"
          >
            <X size={19} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-5 space-y-2 overflow-y-auto">
          {!collapsed && (
            <p className="px-3 mb-3 text-[10px] font-bold text-slate-500 uppercase tracking-[2px]">
              Workspace
            </p>
          )}

          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = activeItem === item.label

            return (
              <button
                key={item.label}
                type="button"
                onClick={() => handleNavigation(item.label)}
                title={collapsed ? item.label : undefined}
                className={`
                  w-full flex items-center gap-3 px-3 py-3
                  rounded-xl text-sm transition-all duration-200
                  ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-950/30'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }
                  ${collapsed ? 'md:justify-center' : ''}
                `}
              >
                <Icon size={19} className="flex-shrink-0" />

                <span className={collapsed ? 'md:hidden' : ''}>
                  {item.label}
                </span>

                {isActive && !collapsed && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </button>
            )
          })}

          <div className="pt-5 mt-5 border-t border-slate-700">
            <button
              type="button"
              onClick={() => handleNavigation('Settings')}
              title={collapsed ? 'Settings' : undefined}
              className={`
                w-full flex items-center gap-3 px-3 py-3
                rounded-xl text-sm transition
                ${
                  activeItem === 'Settings'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }
                ${collapsed ? 'md:justify-center' : ''}
              `}
            >
              <Settings size={19} />
              <span className={collapsed ? 'md:hidden' : ''}>
                Settings
              </span>
            </button>
          </div>
        </nav>

        {!collapsed && (
          <div className="p-4">
            <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-4">
              <div className="flex items-center gap-2 text-blue-400">
                <Sparkles size={17} />
                <span className="text-xs font-semibold">
                  PulseWorks AI
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed mt-3">
                Your intelligent workspace for smarter teamwork.
              </p>

              <p className="text-[10px] text-slate-500 mt-3">
                DEVELOPMENT VERSION
              </p>
            </div>
          </div>
        )}
      </aside>
    </>
  )
}

export default Sidebar
