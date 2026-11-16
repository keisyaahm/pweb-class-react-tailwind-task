import React from "react";

export default function Input({
  type = "text",
  id,
  name,
  value,
  onChange,
  placeholder = "",
  hasError = false,
  className = "",
  disabled = false,
  ...props
}) {
  const baseClasses =
    "w-full rounded-lg border px-3.5 py-2 text-sm text-slate-800 transition-colors placeholder:text-slate-400 focus:outline-hidden focus:ring-2 disabled:bg-slate-100 disabled:cursor-not-allowed";

  const stateClasses = hasError
    ? "border-rose-400 bg-rose-50/30 text-rose-900 focus:border-rose-500 focus:ring-rose-200"
    : "border-slate-300 bg-white hover:border-slate-400 focus:border-blue-600 focus:ring-blue-100";

  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`${baseClasses} ${stateClasses} ${className}`}
      {...props}
    />
  );
}
