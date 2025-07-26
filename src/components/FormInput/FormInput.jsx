import React from "react";
import classNames from "classnames";

export default function FormInput({
  type,
  name,
  autoComplete,
  placeholder,
  value,
  onChange,
  error,
  icon: Icon
}) {
  return (
    <div className="w-full space-y-1">
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        )}
        <input
          type={type}
          name={name}
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={classNames(
            "w-full pl-10 pr-3 py-3 rounded-md border bg-gray-50 text-gray-800 placeholder-gray-400 shadow-sm transition focus:outline-none focus:ring-2",
            error ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-indigo-500"
          )}
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
