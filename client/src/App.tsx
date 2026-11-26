
import { useState } from 'react'

import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import SystemBanner from './components/SystemBanner'

import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'

import type { Task } from './types/task'

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Design dashboard interface',
    description: 'Create the main dashboard layout and responsive components.',
    priority: 'High',
    status: 'In Progress',
    dueDate: '2026-12-02',
    assignedTo: 'Alex Morgan',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Prepare project documentation',
    description: 'Document the project architecture and development workflow.',
    priority: 'Medium',
    status: 'Todo',
    dueDate: '2026-12-05',
    assignedTo: 'Sarah Lee',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Set up frontend components',
    description: 'Build reusable React components for the workspace.',
    priority: 'High',
    status: 'Completed',
    dueDate: '2026-11-25',
    assignedTo: 'John Carter',
    createdAt: new Date().toISOString(),
  },
]

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activePage, setActivePage] = useState('Dashboard')
  const [openCreateForm, setOpenCreateForm] = useState(false)

  // Shared task state: survives navigation between pages.
  const [tasks, setTasks] = useState<Task[]>(initialTasks)

  const handleCreateNew = () => {
    setActivePage('My Tasks')
    setOpenCreateForm(true)
  }

  const handleSaveTask = (updatedTask: Task) => {
    setTasks((currentTasks) => {
      const existingTask = currentTasks.some(
        (task) => task.id === updatedTask.id
      )

      if (existingTask) {
        return currentTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      }

      return [updatedTask, ...currentTasks]
    })
  }

  const handleStatusChange = (
    id: string,
    status: Task['status']
  ) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, status } : task
      )
    )
  }

  const handleDeleteTask = (id: string) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id)
    )
  }

  const renderPage = () => {
    switch (activePage) {
      case 'Dashboard':
        return <Dashboard onCreateNew={handleCreateNew} />

      case 'My Tasks':
        return (
          <Tasks
            tasks={tasks}
            onSaveTask={handleSaveTask}
            onStatusChange={handleStatusChange}
            onDelete={handleDeleteTask}
            openCreateForm={openCreateForm}
            onCreateFormOpened={() => setOpenCreateForm(false)}
          />
        )

      default:
        return (
          <section className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
            <h1 className="text-2xl font-bold text-slate-900">
              {activePage}
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              This workspace module is planned for a future development phase.
            </p>
          </section>
        )
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="flex">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activeItem={activePage}
          onNavigate={setActivePage}
        />

        <main className="min-w-0 flex-1 px-4 py-8 md:px-8">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="mb-6 rounded-lg bg-[#101B31] px-4 py-2 text-sm text-white md:hidden"
          >
            Open Workspace Menu
          </button>

          <div className="mb-8">
            <SystemBanner />
          </div>

          {renderPage()}
        </main>
      </div>
    </div>
  )
}

export default App
