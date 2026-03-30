import { HTMLAttributes } from "react";
import Image from "next/image";

interface ImageBoxProps extends HTMLAttributes<HTMLDivElement> {
	width: number | string;
	height: number | string;
	radius?: number | 9999 | "circle";
	imageUrl: string;
	alt?: string;
	priority?: boolean;
}

export default function ImageBox({
	width,
	height,
	radius = 0,
	imageUrl,
	alt,
	priority = false,
	className = "",
	...props
}: ImageBoxProps) {
	// width/height를 숫자로 변환
	let numWidth = typeof width === "string" ? parseInt(width) : width;
	let numHeight = typeof height === "string" ? parseInt(height) : height;

	// ✅ 문자열이 퍼센트거나 px 단위인 경우 처리
	if (typeof width === "string" && width.includes("%")) {
		numWidth = 100;
	}
	if (typeof height === "string" && height.includes("%")) {
		numHeight = 100;
	}

	// ✅ NaN 체크
	if (isNaN(numWidth)) numWidth = 100;
	if (isNaN(numHeight)) numHeight = 100;

	return imageUrl ? (
		<div
			className={`img-wrapper radius-${radius} ${className}`}
			style={{
				// ✅ 명시적 크기 설정 (CLS 방지)
				width: typeof width === "string" && width.includes("%") ? width : `${numWidth}px`,
				height: typeof height === "string" && height.includes("%") ? height : `${numHeight}px`,
				position: "relative",
				overflow: "hidden",
				aspectRatio: `${numWidth} / ${numHeight}`,
				// ✅ 레이아웃 안정화
				flexShrink: 0,
				willChange: "none",
			}}
			{...props}>
			<Image
				src={imageUrl}
				alt={alt || "이미지"}
				width={numWidth}
				height={numHeight}
				priority={priority}
				quality={85}
				// ✅ sizes 명시 (반응형 최적화)
				sizes={`(max-width: 640px) ${numWidth * 0.8}px, ${numWidth}px`}
				style={{
					objectFit: "cover",
				}}
			/>
		</div>
	) : null;
}
