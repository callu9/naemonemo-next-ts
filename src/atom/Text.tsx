import { HTMLAttributes, LabelHTMLAttributes } from "react";
import styled from "styled-components";
import { token } from "../foundation/color";
import { usage } from "../foundation/typography";

export type fontColor =
  | "primary"
  | "secondary"
  | "tertiary"
  | "invert"
  | "negative"
  | "positive"
  | "info";
interface TypographyProps extends HTMLAttributes<Element> {
  weight?: 300 | 400 | 500 | 600;
  fontStyle?: "Large" | "Medium" | "Small" | "ExtraSmall";
  fontColor?: fontColor;
  style?: React.CSSProperties;
  children?: any;
}
const getTypoStyleProps = (props: {
  webSize?: number;
  mobileSize?: number;
  weight: number;
  fontColor?: fontColor;
}) =>
  `font-size: ${props.webSize}px;
    @media (width < 800) {
      font-size: ${props.mobileSize}px;
    }
    font-family: "Pretendard${props.weight}";
    color: ${props.fontColor ? token.text[props.fontColor]?.hex : "inherit"};
    margin: 0;
  `;

export const Display = ({
  weight = 600,
  fontStyle = "Medium",
  fontColor,
  children: value,
  ...props
}: TypographyProps) => {
  const fontSizes: object =
    Object.values(usage)?.find(
      (el) => el.styleNm === fontStyle && el.usageWeb?.startsWith("display")
    ) || usage[".display2"];
  const StyledDisplay = styled.p`
    ${getTypoStyleProps({ ...fontSizes, weight, fontColor })}
  `;
  return (
    <StyledDisplay className="display" {...props}>
      {value}
    </StyledDisplay>
  );
};
export const Heading = ({
  weight = 600,
  fontStyle = "Large",
  fontColor,
  children: value,
  ...props
}: TypographyProps) => {
  const fontSizes: object =
    Object.values(usage)?.find(
      (el) => el.styleNm === fontStyle && el.usageMobile?.startsWith("headline")
    ) || usage.h1;
  const StyledHeading = (fontStyle === "Large"
    ? styled.h1
    : fontStyle === "Medium"
      ? styled.h2
      : styled.h3)`${getTypoStyleProps({ ...fontSizes, weight, fontColor })}`;
  return (
    <StyledHeading className="heading" {...props}>
      {value}
    </StyledHeading>
  );
};
export const Title = ({
  weight = 600,
  fontStyle = "Medium",
  fontColor,
  children: value,
  ...props
}: TypographyProps) => {
  const fontSizes: object =
    Object.values(usage)?.find(
      (el) => el.styleNm === fontStyle && el.usageMobile?.startsWith("title")
    ) || usage.h5;
  const StyledTitle = (fontStyle === "Medium"
    ? styled.h5
    : fontStyle === "Large"
      ? styled.h4
      : styled.h6)`${getTypoStyleProps({ ...fontSizes, weight, fontColor })}`;
  return (
    <StyledTitle className="title" {...props}>
      {value}
    </StyledTitle>
  );
};
export const Body = ({
  weight = 400,
  fontStyle = "Small",
  fontColor,
  children,
  ...props
}: TypographyProps) => {
  const fontSizes: object =
    Object.values(usage)?.find(
      (el) => el.styleNm === fontStyle && el.usageMobile?.startsWith("body")
    ) || usage.p;
  const StyledBody = styled.p`
    ${getTypoStyleProps({ ...fontSizes, weight, fontColor })}
  `;
  return (
    <StyledBody className={`body ${weight}`} {...props}>
      {children}
    </StyledBody>
  );
};
interface LableProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  weight?: 300 | 400 | 500 | 600;
  fontStyle?: "Large" | "Medium" | "Small" | "ExtraSmall";
  fontColor?: fontColor;
  style?: React.CSSProperties;
  children?: any;
}
export const Lable = ({
  weight = 600,
  fontStyle = "Medium",
  fontColor,
  children: value,
  required = false,
  ...props
}: LableProps) => {
  const fontSizes: object =
    Object.values(usage)?.find(
      (el) => el.styleNm === fontStyle && el.usageMobile?.startsWith("label")
    ) || usage.label;
  const StyledLable = styled.label`
    ${getTypoStyleProps({ ...fontSizes, weight, fontColor })}
    &.essential::after {
      content: "*";
      color: ${token.text.negative.hex};
      padding-left: 2px;
    }
  `;
  return (
    <StyledLable className={required ? "essential" : ""} {...props}>
      {value}
    </StyledLable>
  );
};
interface TextProps {
  /**
   * 텍스트 용도를 지정합니다.
   */
  usage?: "display" | "headline" | "title" | "body" | "lable";
  /**
   * Label 필수 표시를 지정합니다.
   */
  required?: boolean;
  /**
   * font weight를 지정합니다.
   */
  weight?: 300 | 400 | 500 | 600;
  /**
   * font style(size)를 지정합니다.
   */
  fontStyle?: "Large" | "Medium" | "Small" | "ExtraSmall";
  /**
   * font color를 지정합니다.
   */
  fontColor?: fontColor;
  style?: React.CSSProperties;
  children?: any;
}
export const Text = ({ usage = "body", ...props }: TextProps) => {
  switch (usage) {
    case "display":
      return <Display {...props} />;
    case "headline":
      return <Heading {...props} />;
    case "title":
      return <Title {...props} />;
    case "lable":
      return <Lable {...props} />;
    default:
      return <Body {...props} />;
  }
};
