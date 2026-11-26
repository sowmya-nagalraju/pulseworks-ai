
import { useEffect, useState } from 'react'
import { ShieldCheck, WifiOff } from 'lucide-react'

function SystemBanner() {
  const [isOnline, setIsOnline] = useState(
    () => navigator.onLine
  )

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return (
    <div
      role="status"
      aria-live="polite"
      className={`w-full rounded-xl border px-5 py-4 flex
      items-center justify-between gap-4 ${
        isOnline
          ? 'bg-emerald-50 border-emerald-200'
          : 'bg-red-50 border-red-200'
      }`}
    >
      <div className="flex items-center gap-3">

        <div
          className={`p-2 rounded-lg ${
            isOnline ? 'bg-emerald-100' : 'bg-red-100'
          }`}
        >
          {isOnline ? (
            <ShieldCheck
              className="text-emerald-600"
              size={23}
            />
          ) : (
            <WifiOff
              className="text-red-600"
              size={23}
            />
          )}
        </div>

        <div>
          <h3
            className={`font-semibold text-sm ${
              isOnline ? 'text-emerald-800' : 'text-red-800'
            }`}
          >
            {isOnline
              ? 'All systems operational'
              : 'Connection lost'}
          </h3>

          <p
            className={`text-xs mt-1 ${
              isOnline ? 'text-emerald-700' : 'text-red-700'
            }`}
          >
            {isOnline
              ? 'Your browser has an active network connection.'
              : 'Your browser is currently offline. Check your connection.'}
          </p>
        </div>

      </div>

      <span
        className={`text-xs font-bold px-3 py-1.5 rounded-full ${
          isOnline
            ? 'bg-emerald-100 text-emerald-700'
            : 'bg-red-100 text-red-700'
        }`}
      >
        {isOnline ? 'ONLINE' : 'OFFLINE'}
      </span>
    </div>
  )
}

export default SystemBanner
