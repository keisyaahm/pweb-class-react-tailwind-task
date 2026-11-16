import React from "react";

const badgeStyles = {
  primary: "bg-blue-100 text-blue-800 border-blue-200",
  success: "bg-emerald-100 text-emerald-800 border-emerald-200",
  warning: "bg-amber-100 text-amber-800 border-amber-200",
  danger: "bg-rose-100 text-rose-800 border-rose-200",
  slate: "bg-slate-100 text-slate-700 border-slate-200",
  purple: "bg-purple-100 text-purple-800 border-purple-200",
};

export default function Badge({
  children,
  variant = "primary",
  size = "sm",
  className = ""
}) {
  const chosenVariant = badgeStyles[variant] || badgeStyles.primary;
  const sizeClass = size === "xs" ? "text-[11px] px-2 py-0.5" : "text-xs px-2.5 py-1";

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${chosenVariant} ${sizeClass} ${className}`}
    >
      {children}
    </span>
  );
}
