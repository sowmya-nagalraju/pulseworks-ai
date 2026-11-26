
import type { LucideIcon } from 'lucide-react'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

export interface StatCardProps {
  title: string
  value: string | number
  change: string
  description: string
  icon: LucideIcon
  trend: 'up' | 'down'
  iconColor: string
  iconBackground: string
}

function StatCard({
  title,
  value,
  change,
  description,
  icon: Icon,
  trend,
  iconColor,
  iconBackground,
}: StatCardProps) {
  const TrendIcon =
    trend === 'up' ? ArrowUpRight : ArrowDownRight

  return (
    <article className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h3 className="text-3xl font-bold text-slate-900 mt-3">
            {value}
          </h3>
        </div>

        <div className={`p-3 rounded-xl ${iconBackground}`}>
          <Icon size={23} className={iconColor} />
        </div>
      </div>

      <div className="flex items-center gap-2 mt-5">
        <span
          className={`inline-flex items-center gap-1 text-xs font-semibold ${
            trend === 'up'
              ? 'text-emerald-600'
              : 'text-red-600'
          }`}
        >
          <TrendIcon size={15} />
          {change}
        </span>

        <span className="text-xs text-slate-400">
          {description}
        </span>
      </div>
    </article>
  )
}

export default StatCard
