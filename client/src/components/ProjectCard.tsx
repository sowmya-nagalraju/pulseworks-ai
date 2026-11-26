
import { ArrowUpRight, CalendarDays } from 'lucide-react'

export interface ProjectCardProps {
  name: string
  description: string
  progress: number
  status: 'In Progress' | 'Planning' | 'Completed'
  dueDate: string
  members: string[]
  color: string
}

function ProjectCard({
  name,
  description,
  progress,
  status,
  dueDate,
  members,
  color,
}: ProjectCardProps) {
  const statusStyles = {
    'In Progress': 'bg-blue-50 text-blue-700',
    Planning: 'bg-amber-50 text-amber-700',
    Completed: 'bg-emerald-50 text-emerald-700',
  }

  return (
    <article className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <div className={`w-11 h-11 rounded-xl flex-shrink-0 ${color}`} />

          <div className="min-w-0">
            <h3 className="font-semibold text-slate-900 truncate">
              {name}
            </h3>

            <p className="text-xs text-slate-500 mt-1 line-clamp-2">
              {description}
            </p>
          </div>
        </div>

        <button
          type="button"
          aria-label={`Open ${name} project`}
          className="text-slate-400 hover:text-blue-600"
        >
          <ArrowUpRight size={19} />
        </button>
      </div>

      <div className="flex justify-between items-center mt-6">
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusStyles[status]}`}>
          {status}
        </span>

        <span className="text-sm font-semibold text-slate-700">
          {progress}%
        </span>
      </div>

      <div
        className="w-full h-2 bg-slate-100 rounded-full mt-3 overflow-hidden"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${name} progress`}
      >
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${Math.min(100, Math.max(0, progress))}%`,
            backgroundColor: '#2563eb',
          }}
        />
      </div>

      <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100">
        <div className="flex items-center -space-x-2">
          {members.slice(0, 4).map((member, index) => (
            <div
              key={`${member}-${index}`}
              title={member}
              className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs font-semibold text-slate-700"
            >
              {member.charAt(0).toUpperCase()}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <CalendarDays size={14} />
          {dueDate}
        </div>
      </div>
    </article>
  )
}

export default ProjectCard
