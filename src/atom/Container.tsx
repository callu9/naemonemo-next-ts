import { HTMLAttributes } from "react";

interface ContainerProps extends HTMLAttributes<HTMLElement> {
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
   * 컨테이너의 테두리 색상을 지정합니다.
   */
  borderColor?: "default" | "hover" | "tertiary" | "invert" | "negative";
}
/**
 * 배경색 및 테두리 색상을 쉽게 지정하고, 자식 요소간 정렬을 돕습니다.
 */
export const Container = ({ display = "grid", className, ...props }: ContainerProps) => {
  const STYLE_KEYS = [
    "display",
    "direction",
    "justify",
    "align",
    "gap",
    "radius",
    "surface",
    "border",
  ];
  const entries = Object.entries({ ...{ ...props, display } });
  const styles = entries
    .map(([keyNm, value]: string[]) =>
      STYLE_KEYS.includes(keyNm) ? value && `${keyNm}-${value}` : undefined
    )
    .filter((el: string | undefined) => el);
  return (
    <div {...props} className={`container ${className} ${styles.join(" ")}`}>
      {props.children}
    </div>
  );
};
