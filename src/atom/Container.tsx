import type { HTMLAttributes } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 정렬 방식을 설정합니다 (vertical or horizontal)
   */
  display?: "grid" | "flex";
  /**
   * 정렬 방향을 설정합니다.
   */
  direction?: "row" | "column";
  /**
   * 자식 요소 간 좌우 정렬 방식을 설정합니다.
   */
  justify?: "left" | "center" | "right" | "sides" | "evenly" | "stretch";
  /**
   * 자식 요소 간 상하 정렬 방식을 설정합니다.
   */
  align?: "upper" | "center" | "lower" | "sides" | "evenly" | "stretch";
  /**
   * 자식 요소 간 간격을 설정합니다.
   */
  gap?: number;
  /**
   * 컨테이너의 corner radius를 지정합니다.
   */
  radius?: number | 9999 | "circle";
  /**
   * 컨테이너의 배경색을 지정합니다.
   */
  surface?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "invert"
    | "brand"
    | "negative"
    | "positive"
    | "info";
  /**
   * 컨테이너의 글씨 색상을 지정합니다.
   */
  color?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "invert"
    | "brand"
    | "negative"
    | "positive"
    | "info";
  /**
   * 컨테이너의 테두리 색상을 지정합니다.
   */
  borderColor?: "default" | "hover" | "tertiary" | "invert" | "negative";
}
/**
 * 배경색 및 테두리 색상을 쉽게 지정하고, 자식 요소간 정렬을 돕습니다.
 */
export const Container = ({
  display = "grid",
  direction,
  justify,
  align,
  gap,
  radius,
  surface,
  color,
  borderColor,
  className = "",
  children,
  ...props
}: ContainerProps) => {
  const styles = [
    `display-${display}`,
    direction && `direction-${direction}`,
    justify && `justify-${justify}`,
    align && `align-${align}`,
    gap !== undefined && `gap-${gap}`,
    radius !== undefined && `radius-${radius}`,
    surface && `surface-${surface}`,
    color && `text-${color}`,
    borderColor && `border-${borderColor}`,
  ].filter(Boolean);
  return (
    <div {...props} className={`container ${className} ${styles.join(" ")}`}>
      {children}
    </div>
  );
};
