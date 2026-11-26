
import SystemBanner from './components/SystemBanner'

function App() {
  return (
    <div className="min-h-screen bg-slate-50">

      <header className="bg-white border-b border-slate-200 px-8 py-5">
        <h1 className="text-2xl font-bold text-slate-900">
          PulseWorks AI
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          Secure Enterprise Workspace
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">

        <SystemBanner />

        <section className="mt-8">
          <h2 className="text-2xl font-bold text-slate-900">
            Welcome to PulseWorks AI
          </h2>

          <p className="text-slate-500 mt-2">
            Your enterprise workspace is being initialized.
          </p>
        </section>

      </main>

    </div>
  )
}

export default App
