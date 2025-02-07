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
  weight?: "light" | "regular" | "medium" | "semibold" | "bold";
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
  weight,
  className,
  ...props
}: TypographyProps) => {
  const styleName = `${usage}-${fontStyle} text-${fontColor} ${weight ? `text-${weight}` : ""}`;
  const classList = [className, styleName].join(" ");
  switch (usage) {
    case "lable":
      return <label className={classList} {...props} />;
    case "headline":
      switch (fontStyle) {
        case "large":
          return <h1 className={classList} {...props} />;
        case "small":
          return <h3 className={classList} {...props} />;
        case "medium":
        default:
          return <h2 className={classList} {...props} />;
      }
    case "title":
      switch (fontStyle) {
        case "large":
          return <h4 className={classList} {...props} />;
        case "small":
          return <h6 className={classList} {...props} />;
        case "medium":
        default:
          return <h5 className={classList} {...props} />;
      }
    default:
      return <p className={classList} {...props} />;
  }
};
