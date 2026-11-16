import React from "react";

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = "blue",
  badgeText = ""
}) {
  const colorMap = {
    blue: {
      bg: "bg-blue-50 text-blue-600 border-blue-100",
      accent: "text-blue-600"
    },
    emerald: {
      bg: "bg-emerald-50 text-emerald-600 border-emerald-100",
      accent: "text-emerald-600"
    },
    amber: {
      bg: "bg-amber-50 text-amber-600 border-amber-100",
      accent: "text-amber-600"
    },
    purple: {
      bg: "bg-purple-50 text-purple-600 border-purple-100",
      accent: "text-purple-600"
    },
    rose: {
      bg: "bg-rose-50 text-rose-600 border-rose-100",
      accent: "text-rose-600"
    }
  };

  const currentTheme = colorMap[variant] || colorMap.blue;

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500">{title}</span>
        {Icon && (
          <div className={`p-2.5 rounded-lg border ${currentTheme.bg}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{value}</h3>
        {badgeText && (
          <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
            {badgeText}
          </span>
        )}
      </div>

      {subtitle && <p className="mt-1 text-xs text-slate-500">{subtitle}</p>}
    </div>
  );
}
