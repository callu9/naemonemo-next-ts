import { Banner } from "@/app/api/banner/route";
import Image from "next/image";
import { Container } from "@/atom/Container";
import { Text } from "@/atom/Text";

interface SlideItemProps extends Banner {
	priority?: boolean;
}

export default function SlideItem({
	bannerLink,
	bannerNo,
	bannerTitle,
	bannerContent,
	imageUrl,
	priority = false,
}: SlideItemProps) {
	const renderParagraph = (keyNm: string, paragraph: string) => {
		const splitted = paragraph.split(/(\n)/);
		return splitted.map((line: string, idx: number) => {
			return line === "\n" ? <br key={`${bannerNo}-${keyNm}-break-${idx}`} /> : line;
		});
	};
	return (
		<a href={bannerLink} target="_blank" className="slide-item-link">
			<Container
				className="slide-list-item"
				justify="left"
				align="lower"
				surface="tertiary"
				id={`banner-${bannerNo}`}>
				<Image
					src={imageUrl}
					alt="슬라이드 배너 이미지"
					fill
					priority={priority}
					quality={85}
					sizes="(max-width: 640px) 100vw, (max-width: 1200px) 100vw, 1200px"
					className="slide-item-image"
				/>
				<Container gap={12} color="invert" className="slide-item-content">
					<Text usage="headline">{renderParagraph("title", bannerTitle)}</Text>
					<Text>{renderParagraph("content", bannerContent)}</Text>
				</Container>
			</Container>
		</a>
	);
}
