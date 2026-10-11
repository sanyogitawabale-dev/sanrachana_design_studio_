import React, {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  SelectHTMLAttributes,
  forwardRef,
} from "react";
import { cn } from "@/lib/utils";

// --- Input Component ---
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, required, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs uppercase tracking-wider font-medium text-stone-700 dark:text-stone-300"
          >
            {label} {required && <span className="text-amber-600">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          required={required}
          className={cn(
            "w-full px-4 py-2.5 bg-stone-50/50 dark:bg-stone-900 border rounded-sm text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-[#C5A880] focus:border-[#C5A880] disabled:bg-stone-100 dark:disabled:bg-stone-800 disabled:cursor-not-allowed",
            error
              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
              : "border-stone-300 dark:border-stone-700 hover:border-stone-400 dark:hover:border-stone-600",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-500 tracking-wide font-normal">{error}</p>}
        {helperText && !error && (
          <p className="text-xs text-stone-500 dark:text-stone-400">{helperText}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

// --- Textarea Component ---
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, required, rows = 4, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-xs uppercase tracking-wider font-medium text-stone-700 dark:text-stone-300"
          >
            {label} {required && <span className="text-amber-600">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          required={required}
          rows={rows}
          className={cn(
            "w-full px-4 py-2.5 bg-stone-50/50 dark:bg-stone-900 border rounded-sm text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-[#C5A880] focus:border-[#C5A880] disabled:bg-stone-100 dark:disabled:bg-stone-800 disabled:cursor-not-allowed resize-y",
            error
              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
              : "border-stone-300 dark:border-stone-700 hover:border-stone-400 dark:hover:border-stone-600",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-500 tracking-wide font-normal">{error}</p>}
        {helperText && !error && (
          <p className="text-xs text-stone-500 dark:text-stone-400">{helperText}</p>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

// --- Select Component ---
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: { label: string; value: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, helperText, id, required, options, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs uppercase tracking-wider font-medium text-stone-700 dark:text-stone-300"
          >
            {label} {required && <span className="text-amber-600">*</span>}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          required={required}
          className={cn(
            "w-full px-4 py-2.5 bg-stone-50/50 dark:bg-stone-900 border rounded-sm text-sm text-stone-900 dark:text-stone-100 transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-[#C5A880] focus:border-[#C5A880] disabled:bg-stone-100 dark:disabled:bg-stone-800 disabled:cursor-not-allowed",
            error
              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
              : "border-stone-300 dark:border-stone-700 hover:border-stone-400 dark:hover:border-stone-600",
            className
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-xs text-red-500 tracking-wide font-normal">{error}</p>}
        {helperText && !error && (
          <p className="text-xs text-stone-500 dark:text-stone-400">{helperText}</p>
        )}
      </div>
    );
  }
);
Select.displayName = "Select";
