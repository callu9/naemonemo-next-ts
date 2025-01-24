import { HTMLAttributes } from "react";
import styled from "styled-components";
import { token } from "../foundation/color";
import { layout } from "../foundation/layout";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
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
  justify?: "flex-start" | "center" | "flex-end" | "space-between" | "space-evenly" | "stretch";
  /**
   * 자식 요소 간 상하 정렬 방식을 설정합니다.
   */
  align?: "flex-start" | "center" | "flex-end" | "space-between" | "space-evenly" | "stretch";
  /**
   * 자식 요소 간 간격을 설정합니다.
   */
  spacing?: number;
  /**
   * 컨테이너의 corner radius를 지정합니다.
   */
  radius?: number;
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
  /**
   * 기타 스타일을 지정하고 싶을 때 사용합니다. (ex. padding, margin...)
   */
  style?: React.CSSProperties;
  children?: any;
}
/**
 * 배경색 및 테두리 색상을 쉽게 지정하고, 자식 요소간 정렬을 돕습니다.
 */
export const Container = ({
  display = "grid",
  direction,
  justify = "flex-start",
  align = "center",
  spacing = 16,
  radius,
  bgColor,
  borderColor,
  ...props
}: ContainerProps) => {
  const StyledContainer = styled.div`
    ${display === "grid"
      ? layout.grid({ justify, align, spacing })
      : layout.flex({ justify, align, spacing, direction })}
    background-color: ${bgColor ? token.surface[bgColor]?.hex : "transparent"};
    ${borderColor ? `border: 1px solid ${token.border[borderColor]?.hex}` : ""};
    border-radius: ${radius || 0}px;
    font-family: "Pretendard300";
  `;
  return (
    <StyledContainer className="grid-container" {...props}>
      {props.children}
    </StyledContainer>
  );
};
