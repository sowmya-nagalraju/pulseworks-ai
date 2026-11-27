
import { useState } from 'react'
import {
  User,
  Bell,
  ShieldCheck,
  Save,
  Settings as SettingsIcon,
  CheckCircle2,
} from 'lucide-react'

function Settings() {
  const [name, setName] = useState('Workspace Admin')
  const [email, setEmail] = useState('admin@pulseworks.ai')

  const [emailNotifications, setEmailNotifications] = useState(true)
  const [taskNotifications, setTaskNotifications] = useState(true)
  const [weeklyReports, setWeeklyReports] = useState(false)

  const [saved, setSaved] = useState(false)

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSaved(true)
  }

  const handleChange = (
    callback: (value: boolean) => void,
    value: boolean
  ) => {
    callback(value)
    setSaved(false)
  }

  return (
    <div className="space-y-7">

      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Settings
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your account and workspace preferences.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">

        {/* PROFILE */}

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
              <User size={21} />
            </div>

            <div>
              <h2 className="font-bold text-slate-900">
                Profile Information
              </h2>

              <p className="text-xs text-slate-500">
                Manage your workspace profile.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Display Name
              </label>

              <input
                value={name}
                onChange={(event) => {
                  setName(event.target.value)
                  setSaved(false)
                }}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                  setSaved(false)
                }}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
                required
              />
            </div>

          </div>
        </section>

        {/* NOTIFICATIONS */}

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
              <Bell size={21} />
            </div>

            <div>
              <h2 className="font-bold text-slate-900">
                Notification Preferences
              </h2>

              <p className="text-xs text-slate-500">
                Choose which notifications you want to receive.
              </p>
            </div>
          </div>

          <div className="space-y-5">

            {[
              {
                title: 'Email Notifications',
                description: 'Receive important workspace updates.',
                value: emailNotifications,
                setter: setEmailNotifications,
              },
              {
                title: 'Task Notifications',
                description: 'Get updates about task assignments and deadlines.',
                value: taskNotifications,
                setter: setTaskNotifications,
              },
              {
                title: 'Weekly Reports',
                description: 'Receive a weekly workspace summary.',
                value: weeklyReports,
                setter: setWeeklyReports,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-center justify-between gap-4"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {item.title}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {item.description}
                  </p>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={item.value}
                  onClick={() =>
                    handleChange(item.setter, !item.value)
                  }
                  className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                    item.value ? 'bg-indigo-600' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                      item.value ? 'left-6' : 'left-1'
                    }`}
                  />
                </button>
              </div>
            ))}

          </div>
        </section>

        {/* SECURITY */}

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
              <ShieldCheck size={21} />
            </div>

            <div>
              <h2 className="font-bold text-slate-900">
                Security
              </h2>

              <p className="text-xs text-slate-500">
                Authentication and access management.
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-xl bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <SettingsIcon size={17} />
              Authentication module
            </div>

            <p className="mt-2 text-xs leading-relaxed text-slate-500">
              Role-based access control and secure authentication
              will be configured in a later development phase.
            </p>
          </div>
        </section>

        {/* SAVE */}

        <div className="flex flex-wrap items-center justify-between gap-3">

          {saved && (
            <p className="flex items-center gap-2 text-sm font-medium text-emerald-600">
              <CheckCircle2 size={17} />
              Settings saved in this session.
            </p>
          )}

          <button
            type="submit"
            className="ml-auto inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            <Save size={17} />
            Save Settings
          </button>

        </div>

      </form>

      <p className="text-xs text-slate-400">
        Settings currently use local component state and are not yet
        persisted to a database.
      </p>

    </div>
  )
}

export default Settings
