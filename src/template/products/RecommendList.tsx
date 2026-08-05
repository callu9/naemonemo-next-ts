"use client";

import { Container } from "@/atom/Container";
import Loader from "@/components/common/Loader";
import ProductItem from "@/components/products/ProductItem";
import { getProducts, getRecommendationKey, toRecommendedProducts } from "@/lib/client-api";
import type { Product } from "@/lib/catalog";
import { useCallback, useEffect, useRef, useState } from "react";
import "./products.scss";

export interface RecommendedResultProps {
  productList: Product[];
  offset: number;
  next?: number;
}

const emptyResult: RecommendedResultProps = { productList: [], offset: 0 };

export default function RecommendList({
  codeList,
  initialResult,
}: {
  codeList?: number[];
  initialResult?: RecommendedResultProps;
}) {
  const targetRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<RecommendedResultProps>(initialResult ?? emptyResult);
  const recommendationKey = getRecommendationKey(codeList);

  useEffect(() => {
    if (!recommendationKey || initialResult) return;

    let active = true;
    const recommendationCodes = recommendationKey.split(",").map(Number);
    void getProducts(recommendationCodes, 0).then((page) => {
      if (active) setResult(toRecommendedProducts(page));
    });

    return () => {
      active = false;
    };
  }, [initialResult, recommendationKey]);

  const loadNextPage = useCallback(async () => {
    if (!recommendationKey || loadingRef.current || result.next === undefined) return;

    loadingRef.current = true;
    setIsLoading(true);
    try {
      const nextResult = await getProducts(recommendationKey.split(",").map(Number), result.offset);
      setResult((current) => ({
        ...nextResult,
        productList: [...current.productList, ...nextResult.data],
      }));
    } finally {
      loadingRef.current = false;
      setIsLoading(false);
    }
  }, [recommendationKey, result.next, result.offset]);

  useEffect(() => {
    const target = targetRef.current;
    if (!target || result.next === undefined) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) void loadNextPage();
    });

    observer.observe(target);
    return () => observer.disconnect();
  }, [loadNextPage, result.next]);

  return (
    <>
      <Container className="recommend-product-list">
        {result.productList.map((product) => (
          <ProductItem key={product.productNo} product={product} />
        ))}
      </Container>
      {result.next !== undefined && (
        <div id="infinite-scroll" className="scroll-footer" ref={targetRef}>
          <div className="scroll-loader" />
          <div className="scroll-loader" />
          <div className="scroll-loader" />
        </div>
      )}
      {isLoading && <Loader />}
    </>
  );
}
