import type { ButtonHTMLAttributes, ReactNode } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  children: ReactNode;
}

export function IconButton({ label, children, className = "", type = "button", ...props }: IconButtonProps) {
  return (
    <button type={type} aria-label={label} className={`icon-button ${className}`} {...props}>
      {children}
    </button>
  );
}
