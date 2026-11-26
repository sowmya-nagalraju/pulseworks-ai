
import Navbar from './components/Navbar'
import SystemBanner from './components/SystemBanner'

function App() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* APPLICATION NAVBAR */}

      <Navbar />

      {/* MAIN CONTENT */}

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">

        {/* SYSTEM STATUS */}

        <SystemBanner />

        {/* WELCOME SECTION */}

        <section className="mt-8">

          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Welcome to PulseWorks AI
          </h2>

          <p className="text-slate-500 mt-2">
            Your secure enterprise workspace is being initialized.
          </p>

        </section>

      </main>

    </div>
  )
}

export default App
