
import {
  FolderKanban,
  ListTodo,
  CheckCircle2,
  Users,
  Plus,
  ArrowRight,
} from 'lucide-react'

import StatCard from '../components/StatCard'
import ProjectCard from '../components/ProjectCard'
import ActivityFeed from '../components/ActivityFeed'

interface DashboardProps {
  onCreateNew: () => void
}

const stats = [
  {
    title: 'Total Projects',
    value: 12,
    change: '+12%',
    description: 'vs last month',
    icon: FolderKanban,
    trend: 'up' as const,
    iconColor: 'text-blue-600',
    iconBackground: 'bg-blue-50',
  },
  {
    title: 'Active Tasks',
    value: 28,
    change: '+8%',
    description: 'vs last month',
    icon: ListTodo,
    trend: 'up' as const,
    iconColor: 'text-violet-600',
    iconBackground: 'bg-violet-50',
  },
  {
    title: 'Completed Tasks',
    value: 86,
    change: '+18%',
    description: 'vs last month',
    icon: CheckCircle2,
    trend: 'up' as const,
    iconColor: 'text-emerald-600',
    iconBackground: 'bg-emerald-50',
  },
  {
    title: 'Team Members',
    value: 16,
    change: '+2',
    description: 'new members',
    icon: Users,
    trend: 'up' as const,
    iconColor: 'text-amber-600',
    iconBackground: 'bg-amber-50',
  },
]

const projects = [
  {
    name: 'PulseWorks AI',
    description: 'Secure enterprise workspace and collaboration platform.',
    progress: 45,
    status: 'In Progress' as const,
    dueDate: 'Dec 10, 2026',
    members: ['Sowmya', 'Alex', 'Maya'],
    color: 'bg-blue-100',
  },
  {
    name: 'AI Document Intelligence',
    description: 'Intelligent document analysis and knowledge retrieval.',
    progress: 25,
    status: 'Planning' as const,
    dueDate: 'Dec 20, 2026',
    members: ['Sowmya', 'Ryan'],
    color: 'bg-violet-100',
  },
  {
    name: 'Team Collaboration Hub',
    description: 'Real-time communication and project coordination.',
    progress: 100,
    status: 'Completed' as const,
    dueDate: 'Nov 20, 2026',
    members: ['Maya', 'Alex', 'Ryan'],
    color: 'bg-emerald-100',
  },
]

function Dashboard({ onCreateNew }: DashboardProps) {
  const formattedDate = new Intl.DateTimeFormat('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date())

  return (
    <div className="space-y-8">

      {/* WELCOME */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">
            {formattedDate}
          </p>

          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mt-2">
            Welcome to PulseWorks AI
          </h1>

          <p className="text-sm text-slate-500 mt-2">
            Here's what's happening across your workspace.
          </p>
        </div>

        <button
          type="button"
          onClick={onCreateNew}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition"
        >
          <Plus size={18} />
          Create New
        </button>
      </section>

      {/* STATISTICS */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900">
            Workspace Overview
          </h2>

          <span className="text-xs text-slate-400">
            Sample dashboard data
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>
      </section>

      {/* PROJECTS AND ACTIVITY */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <section className="xl:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Recent Projects
              </h2>

              <p className="text-xs text-slate-500 mt-1">
                Track your team's project progress
              </p>
            </div>

            <button
              type="button"
              className="flex items-center gap-1 text-sm text-blue-600 font-semibold hover:text-blue-700"
            >
              View all <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {projects.map((project) => (
              <ProjectCard key={project.name} {...project} />
            ))}
          </div>
        </section>

        <ActivityFeed />
      </div>
    </div>
  )
}

export default Dashboard
