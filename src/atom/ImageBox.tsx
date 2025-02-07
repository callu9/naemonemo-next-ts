import { HTMLAttributes } from "react";

interface ImagaBoxProps extends HTMLAttributes<HTMLDivElement> {
  width: number | string;
  height: number | string;
  radius?: number | 9999 | "circle";
  imageUrl: string;
  alt?: string;
}
export default function ImageBox({
  width,
  height,
  radius = 0,
  imageUrl,
  alt,
  className = "",
  ...props
}: ImagaBoxProps) {
  return (
    <div
      className={`img-wrapper radius-${radius} ${className}`}
      style={{ width, height, minWidth: width }}
      {...props}
    >
      <img src={imageUrl} alt={alt} />
    </div>
  );
}
