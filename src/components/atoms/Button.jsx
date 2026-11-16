import React from "react";

const variantStyles = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-xs",
  secondary: "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 focus:ring-blue-500",
  neutral: "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 focus:ring-slate-400 shadow-xs",
  danger: "bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500 shadow-xs",
  warning: "bg-amber-500 text-white hover:bg-amber-600 focus:ring-amber-400 shadow-xs",
  ghost: "bg-transparent text-slate-600 hover:bg-slate-100 focus:ring-slate-300",
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-xs font-medium",
  md: "px-4 py-2 text-sm font-semibold",
  lg: "px-5 py-2.5 text-base font-semibold",
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  ...props
}) {
  const chosenVariant = variantStyles[variant] || variantStyles.primary;
  const chosenSize = sizeStyles[size] || sizeStyles.md;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-lg transition-all duration-150 focus:outline-hidden focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${chosenVariant} ${chosenSize} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
