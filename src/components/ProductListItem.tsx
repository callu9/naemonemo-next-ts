"use client";

import { RelatedProduct } from "@/app/api/feeds/route";
import { Product } from "@/app/api/products/route";
import { Container } from "@/atom/Container";
import ImageBox from "@/atom/ImageBox";
import { Text } from "@/atom/Text";
import useCartStore from "@/store/cart";
import ToggleIconEmpty from "../assets/icon/toggledIconButton_false.svg";
import ToggleIcon from "../assets/icon/toggledIconButton_true.svg";
import { useCallback, useMemo } from "react";

export default function ProductListItem({ product }: { product: RelatedProduct }) {
	// ✅ 필요한 상태만 선택 구독 (각각 개별 selector)
	const cartList = useCartStore((state) => state.cartList);
	const addToCart = useCartStore((state) => state.addToCart);
	const removeFromCart = useCartStore((state) => state.removeFromCart);

	// ✅ useMemo로 addable 계산 최적화
	const addable = useMemo(
		() => cartList.findIndex((item) => item.productNo === product.productNo) < 0,
		[cartList, product.productNo],
	);

	// ✅ useCallback으로 함수 메모이제이션
	const addItemToCart = useCallback(() => {
		addToCart(product as Product);
	}, [addToCart, product]);

	const deleteItemfromCart = useCallback(() => {
		removeFromCart([product.productNo]);
	}, [removeFromCart, product.productNo]);

	return (
		<div className="product-list-item">
			<Container className="product-wrapper" display="flex" justify="sides" gap={16}>
				{product.imageUrl && (
					<ImageBox
						imageUrl={product.imageUrl}
						alt="상품 이미지"
						width={60}
						height={60}
						radius={8}
					/>
				)}
				<Container
					className="product-info"
					display="flex"
					direction="column"
					justify="sides"
					align="upper"
					gap={4}>
					<Text className="product-name" weight="bold">
						{product.productName}
					</Text>
					<Text>{new Intl.NumberFormat("ko-KR").format(product.price)}원</Text>
				</Container>
				<button className="toggled-icon-button">
					{addable ? (
						<ToggleIconEmpty width="24" height="24" onClick={addItemToCart} />
					) : (
						<ToggleIcon width="24" height="24" onClick={deleteItemfromCart} />
					)}
				</button>
			</Container>
		</div>
	);
}
