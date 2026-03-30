"use client";
import { Feed } from "@/app/api/feeds/route";
import { Container } from "@/atom/Container";
import ImageBox from "@/atom/ImageBox";
import { Text } from "@/atom/Text";
import Link from "next/link";
import ProductListItem from "./ProductListItem";

export default function Card({
	feedTitle,
	feedContents,
	imageUrl,
	relatedProducts,
	recommendCode,
}: Feed) {
	return (
		<Container className="feed-card" gap={12}>
			<Container className="card" surface="secondary" radius={4}>
				{imageUrl && (
					// ✅ 이미지 컨테이너 크기 명확하게 정의 (CLS 방지)
					<div className="feed-item-image-container">
						<ImageBox
							imageUrl={imageUrl}
							alt="카드 이미지"
							width={400}
							height={250}
							priority={false}
						/>
					</div>
				)}
				<Container className="card-info" gap={8}>
					<Text usage="title">{feedTitle}</Text>
					<Text>{feedContents}</Text>
				</Container>
				{relatedProducts && (
					<Container className="product-list">
						{relatedProducts.map((product) => (
							<ProductListItem key={product.productNo} product={product} onUpdate={() => {}} />
						))}
					</Container>
				)}
			</Container>
			<Link
				href={`/products?recommendCode=${recommendCode}`}
				className="display-flex text-semibold button-medium button-invert">
				{relatedProducts.length ? "" : "모든 "}추천상품 보러가기
			</Link>
		</Container>
	);
}
