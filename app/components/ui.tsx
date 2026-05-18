import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "bg-airline px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-airline-700 hover:text-white hover:shadow-md focus:ring-airline active:scale-95 active:shadow-inner",
  secondary:
    "border border-gray-300 bg-transparent px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 hover:text-gray-900 hover:shadow-md focus:ring-airline active:scale-95 active:shadow-inner dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-100",
  ghost:
    "bg-transparent px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 hover:shadow-md focus:ring-airline active:scale-95 active:shadow-inner dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100",
  destructive:
    "bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-700 hover:text-white hover:shadow-md focus:ring-red-600 active:scale-95 active:shadow-inner",
};

export function Button({
  children,
  className = "",
  variant = "primary",
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return (
    <button
      type={type}
      className={`inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-lg transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 dark:focus:ring-offset-gray-950 ${buttonVariants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function Card({
  children,
  className = "",
  as: Component = "section",
}: {
  children: ReactNode;
  className?: string;
  as?: "section" | "article" | "aside";
}) {
  return (
    <Component
      className={`rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow duration-200 ease-in-out hover:shadow-md dark:border-gray-700 dark:bg-gray-900 ${className}`}
    >
      {children}
    </Component>
  );
}

export function Badge({
  children,
  tone = "blue",
}: {
  children: ReactNode;
  tone?: "blue" | "green" | "amber" | "gray";
}) {
  const tones = {
    blue: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-200",
    green: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-200",
    amber: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-200",
    gray: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex min-h-[240px] flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-gray-200 p-8 text-center dark:border-gray-700">
      <div
        aria-hidden="true"
        className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-airline-50 text-lg font-bold text-airline dark:bg-gray-800 dark:text-blue-200"
      >
        FL
      </div>
      <h3 className="text-base font-semibold tracking-tight text-gray-900 dark:text-gray-100">
        {title}
      </h3>
      <p className="max-w-sm text-sm leading-relaxed text-gray-600 dark:text-gray-400">
        {body}
      </p>
      {action}
    </div>
  );
}
