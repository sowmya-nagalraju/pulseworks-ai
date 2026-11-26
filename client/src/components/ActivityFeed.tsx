
import {
  CheckCircle2,
  FileText,
  FolderPlus,
  UserPlus,
  MessageSquare,
} from 'lucide-react'

const activities = [
  {
    id: 1,
    title: 'Task completed',
    description: 'Workspace setup was marked as completed.',
    time: '10 minutes ago',
    icon: CheckCircle2,
    color: 'text-emerald-600 bg-emerald-50',
  },
  {
    id: 2,
    title: 'New project created',
    description: 'A new project was added to the workspace.',
    time: '1 hour ago',
    icon: FolderPlus,
    color: 'text-blue-600 bg-blue-50',
  },
  {
    id: 3,
    title: 'Document uploaded',
    description: 'A project document was uploaded.',
    time: '3 hours ago',
    icon: FileText,
    color: 'text-violet-600 bg-violet-50',
  },
  {
    id: 4,
    title: 'Team member added',
    description: 'A new member joined the workspace.',
    time: 'Yesterday',
    icon: UserPlus,
    color: 'text-amber-600 bg-amber-50',
  },
  {
    id: 5,
    title: 'Discussion updated',
    description: 'A project discussion received an update.',
    time: 'Yesterday',
    icon: MessageSquare,
    color: 'text-pink-600 bg-pink-50',
  },
]

function ActivityFeed() {
  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-bold text-slate-900">
            Recent Activity
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Latest workspace updates
          </p>
        </div>

        <span className="text-xs font-medium text-blue-600">
          Live feed preview
        </span>
      </div>

      <div className="space-y-5">
        {activities.map((activity) => {
          const Icon = activity.icon

          return (
            <div key={activity.id} className="flex gap-3">
              <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center ${activity.color}`}>
                <Icon size={18} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-semibold text-slate-800">
                  {activity.title}
                </h3>

                <p className="text-xs text-slate-500 mt-1">
                  {activity.description}
                </p>

                <p className="text-[11px] text-slate-400 mt-2">
                  {activity.time}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default ActivityFeed
