import Image, { type ImageProps } from "next/image";
import { type HTMLAttributes } from "react";

interface ImagaBoxProps extends HTMLAttributes<HTMLDivElement> {
  width: number | string;
  height: number | string;
  radius?: number | 9999 | "circle";
  imageUrl: string;
  alt?: string;
  sizes?: ImageProps["sizes"];
}
export default function ImageBox({
  width,
  height,
  radius = 0,
  imageUrl,
  alt,
  sizes,
  className = "",
  style,
  ...props
}: ImagaBoxProps) {
  return (
    <div
      className={`img-wrapper radius-${radius} ${className}`}
      style={{ width, height, minWidth: width, position: "relative", ...style }}
      {...props}
    >
      <Image
        src={imageUrl}
        alt={alt ?? ""}
        fill
        sizes={sizes ?? (typeof width === "number" ? `${width}px` : width.endsWith("px") ? width : "100vw")}
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}
