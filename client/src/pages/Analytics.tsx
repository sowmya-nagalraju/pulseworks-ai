
import { useEffect, useState } from 'react'
import {
  Users,
  FolderKanban,
  CheckCircle2,
  TrendingUp,
  RefreshCw,
  Mail,
  Building2,
} from 'lucide-react'

import { fetchUsers } from '../services/userApi'
import type { ExternalUser } from '../schemas/externalUserSchema'

function Analytics() {
  const [users, setUsers] = useState<ExternalUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    const loadUsers = async () => {
      setLoading(true)
      setError('')

      try {
        const data = await fetchUsers(controller.signal)
        setUsers(data)
      } catch (err) {
        if (
          err instanceof Error &&
          err.name === 'AbortError'
        ) {
          return
        }

        setError(
          err instanceof Error
            ? err.message
            : 'Something went wrong.'
        )
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadUsers()

    return () => controller.abort()
  }, [retryCount])

  const stats = [
    {
      title: 'Total Projects',
      value: '12',
      change: '+12%',
      icon: FolderKanban,
      color: 'bg-indigo-50 text-indigo-600',
    },
    {
      title: 'Active Tasks',
      value: '28',
      change: '+8%',
      icon: TrendingUp,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Completed Tasks',
      value: '86',
      change: '+18%',
      icon: CheckCircle2,
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      title: 'Team Members',
      value: '16',
      change: '+4%',
      icon: Users,
      color: 'bg-amber-50 text-amber-600',
    },
  ]

  return (
    <div className="space-y-7">

      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Analytics
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Monitor workspace performance and external data.
        </p>
      </div>

      {/* ANALYTICS CARDS */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">
                  {stat.title}
                </p>

                <div className={`rounded-xl p-3 ${stat.color}`}>
                  <Icon size={21} />
                </div>
              </div>

              <h2 className="mt-4 text-3xl font-bold text-slate-900">
                {stat.value}
              </h2>

              <p className="mt-3 text-xs font-semibold text-emerald-600">
                {stat.change} from previous period
              </p>
            </div>
          )
        })}
      </div>

      {/* EXTERNAL API SECTION */}

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-bold text-slate-900">
              External API Integration
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Sample user records retrieved from JSONPlaceholder.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setRetryCount((count) => count + 1)}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
          >
            <RefreshCw
              size={15}
              className={loading ? 'animate-spin' : ''}
            />
            Refresh API Data
          </button>
        </div>

        <div className="p-5">

          {loading && (
            <div className="py-10 text-center">
              <RefreshCw
                size={25}
                className="mx-auto animate-spin text-indigo-600"
              />

              <p className="mt-3 text-sm text-slate-500">
                Fetching external API data...
              </p>
            </div>
          )}

          {!loading && error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-5">
              <p className="font-semibold text-red-700">
                Unable to load API data
              </p>

              <p className="mt-1 text-sm text-red-600">
                {error}
              </p>

              <button
                type="button"
                onClick={() => setRetryCount((count) => count + 1)}
                className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
              >
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && users.length === 0 && (
            <p className="py-8 text-center text-sm text-slate-500">
              No user records were returned by the API.
            </p>
          )}

          {!loading && !error && users.length > 0 && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="rounded-xl border border-slate-100 p-4 transition hover:border-indigo-200 hover:bg-slate-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-600">
                      {user.name.charAt(0)}
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate font-semibold text-slate-900">
                        {user.name}
                      </h3>

                      <p className="text-xs text-slate-400">
                        @{user.username}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2 text-sm text-slate-500">
                    <p className="flex items-center gap-2 break-all">
                      <Mail size={15} className="shrink-0" />
                      {user.email}
                    </p>

                    <p className="flex items-center gap-2">
                      <Building2 size={15} className="shrink-0" />
                      {user.company.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      <p className="text-xs text-slate-400">
        Note: The displayed workspace metrics are demonstration data.
        External user records are fetched and validated at runtime.
      </p>

    </div>
  )
}

export default Analytics
