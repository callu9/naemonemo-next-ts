import { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 버튼의 size를 지정합니다.
   */
  size?: "small" | "medium" | "large";
  /**
   * 버튼의 radius를 지정합니다. (단위 px)
   */
  radius?: 0 | 4 | 8;
  /**
   * 버튼 색상 속성을 지정합니다.
   */
  property?: "outlined" | "brand" | "negative" | "positive" | "info" | "invert";
}
/**
 * 버튼은 사용자가 동작을 가능하게 할 때 사용합니다.
 * - Icon Size 20px * 20px로 고정
 * - Medium Size의 경우 높이 48px로 고정
 * - Radius 4px, 8px 중 자유 지정 (기본값 4px)
 */
export function Button({
  size = "small",
  property = "outlined",
  radius = 0,
  ...props
}: ButtonProps) {
  return (
    <button className={`button-${size}  button-${property} radius-${radius}`} {...props}>
      {props.children}
    </button>
  );
}
