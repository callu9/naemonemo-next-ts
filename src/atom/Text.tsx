"use client";

import { HTMLAttributes } from "react";

interface TypographyProps extends HTMLAttributes<Element> {
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
  weight?: "light" | "regular" | "medium" | "bold";
  /**
   * font style(size)를 지정합니다.
   */
  fontStyle?: "large" | "medium" | "small" | "extra-small";
  /**
   * font color를 지정합니다.
   */
  fontColor?: "primary" | "secondary" | "tertiary" | "invert" | "negative" | "positive" | "info";
}
export const Text = ({
  usage = "body",
  fontStyle = "medium",
  fontColor = "primary",
  ...props
}: TypographyProps) => {
  const styleName = `${usage}-${fontStyle} text-${fontColor} ${
    props.weight ? `text-${props.weight}` : ""
  }`;
  switch (usage) {
    case "lable":
      return <label className={styleName} {...props} />;
    case "headline":
      switch (fontStyle) {
        case "large":
          return <h1 className={styleName} {...props} />;
        case "small":
          return <h3 className={styleName} {...props} />;
        case "medium":
        default:
          return <h2 className={styleName} {...props} />;
      }
    case "title":
      switch (fontStyle) {
        case "large":
          return <h4 className={styleName} {...props} />;
        case "small":
          return <h6 className={styleName} {...props} />;
        case "medium":
        default:
          return <h5 className={styleName} {...props} />;
      }
    default:
      return <p className={styleName} {...props} />;
  }
};
