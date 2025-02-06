import { HTMLAttributes } from "react";

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  /**
   * 정렬 방식을 설정합니다 (vertical or horizontal)
   */
  display?: "grid" | "flex";
  /**
   * 정렬 방향을 설정합니다. (display "flex" 한정)
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
  spacing?: 0 | 2 | 4 | 8 | 12 | 16 | 20 | 24 | 32 | 40 | 56 | 64 | 72;
  /**
   * 컨테이너의 corner radius를 지정합니다.
   */
  radius?: 0 | 4 | 8 | 12 | 16;
  /**
   * 컨테이너의 배경색을 지정합니다.
   */
  bgColor?:
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
export const Container = (props: ContainerProps) => {
  const [keys, values] = Object.entries(props);
  const styles = keys
    .map((el: string, idx: number) => values[idx] && `${el}-${values[idx]}`)
    .filter((el: string | false) => el);
  return (
    <div className={`container ${styles.join(" ")}`} {...props}>
      {props.children}
    </div>
  );
};
