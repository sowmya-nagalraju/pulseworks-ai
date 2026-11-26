
import { useState } from 'react'
import {
  Activity,
  Bell,
  Search,
  Menu,
  X,
  UserRound,
  Settings,
  LogOut,
} from 'lucide-react'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#101B31] border-b border-slate-700">

      <div className="max-w-[1600px] mx-auto px-4 md:px-8">

        <div className="h-20 flex items-center justify-between">

          {/* BRAND */}

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Activity size={23} className="text-white" />
            </div>

            <div>
              <h1 className="text-xl font-bold text-white tracking-wide">
                PulseWorks
              </h1>

              <p className="text-[10px] text-slate-400 tracking-[3px]">
                AI WORKSPACE
              </p>
            </div>

          </div>

          {/* DESKTOP SEARCH */}

          <div className="hidden md:flex items-center flex-1 max-w-md mx-10">

            <div className="relative w-full">

              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search workspace..."
                className="w-full bg-[#1D2B43] border border-slate-700 rounded-xl py-2.5 pl-11 pr-4 text-sm text-white placeholder:text-slate-400 outline-none focus:border-blue-500 transition"
              />

            </div>

          </div>

          {/* RIGHT ACTIONS */}

          <div className="flex items-center gap-2 md:gap-5">

            {/* MOBILE SEARCH */}

            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden p-2 text-slate-300 hover:bg-slate-700 rounded-lg"
              aria-label="Toggle search"
            >
              <Search size={20} />
            </button>

            {/* NOTIFICATIONS */}

            <div className="relative">

              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2.5 text-slate-300 hover:bg-slate-700 rounded-xl transition"
                aria-label="Notifications"
              >
                <Bell size={21} />

                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-[#101B31]" />
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 top-14 w-72 bg-white rounded-xl shadow-xl border border-slate-200 p-4 text-slate-800">

                  <h3 className="font-semibold text-sm">
                    Notifications
                  </h3>

                  <p className="text-sm text-slate-500 mt-3">
                    You're all caught up!
                  </p>

                </div>
              )}

            </div>

            {/* PROFILE */}

            <div className="relative hidden sm:block">

              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-700 transition"
              >

                <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  S
                </div>

                <div className="hidden lg:block text-left">
                  <p className="text-sm text-white font-medium">
                    Workspace User
                  </p>

                  <p className="text-xs text-slate-400">
                    Administrator
                  </p>
                </div>

              </button>

              {profileOpen && (
                <div className="absolute right-0 top-14 w-52 bg-white rounded-xl shadow-xl border border-slate-200 p-2 text-slate-800">

                  <button className="flex items-center gap-3 w-full p-3 text-sm hover:bg-slate-100 rounded-lg">
                    <UserRound size={17} />
                    My Profile
                  </button>

                  <button className="flex items-center gap-3 w-full p-3 text-sm hover:bg-slate-100 rounded-lg">
                    <Settings size={17} />
                    Settings
                  </button>

                  <button className="flex items-center gap-3 w-full p-3 text-sm hover:bg-slate-100 rounded-lg">
                    <LogOut size={17} />
                    Sign Out
                  </button>

                </div>
              )}

            </div>

            {/* MOBILE MENU */}

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-slate-300 hover:bg-slate-700 rounded-lg"
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

          </div>

        </div>

        {/* MOBILE SEARCH FIELD */}

        {searchOpen && (
          <div className="md:hidden pb-4">
            <input
              type="text"
              placeholder="Search workspace..."
              className="w-full bg-[#1D2B43] border border-slate-700 rounded-xl py-3 px-4 text-sm text-white outline-none focus:border-blue-500"
            />
          </div>
        )}

        {/* MOBILE NAVIGATION */}

        {menuOpen && (
          <div className="md:hidden border-t border-slate-700 py-4 space-y-2">

            {['Dashboard', 'Tasks', 'Documents', 'Team', 'Settings'].map(
              (item) => (
                <button
                  key={item}
                  className="block w-full text-left px-4 py-3 text-sm text-slate-300 hover:bg-slate-700 hover:text-white rounded-lg"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </button>
              )
            )}

          </div>
        )}

      </div>

    </nav>
  )
}

export default Navbar
