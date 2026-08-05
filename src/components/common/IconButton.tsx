import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./IconButton.module.css";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  children: ReactNode;
}

export function IconButton({ label, children, className = "", type = "button", ...props }: IconButtonProps) {
  return (
    <button type={type} aria-label={label} className={`${styles.button} ${className}`} {...props}>
      {children}
    </button>
  );
}
