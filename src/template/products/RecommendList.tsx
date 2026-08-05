"use client";

import { Container } from "@/atom/Container";
import Loader from "@/components/common/Loader";
import ProductItem from "@/components/products/ProductItem";
import { getProducts } from "@/lib/client-api";
import type { Product } from "@/lib/catalog";
import { useCallback, useEffect, useRef, useState } from "react";
import "./products.scss";

interface RecommendedResultProps {
  productList: Product[];
  offset: number;
  next?: number;
}

const initialResult: RecommendedResultProps = { productList: [], offset: 0, next: 0 };

export default function RecommendList({ codeList }: { codeList?: number[] }) {
  const targetRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<RecommendedResultProps>(initialResult);

  useEffect(() => {
    if (!codeList) return;

    let active = true;
    void getProducts(codeList, 0).then((nextResult) => {
      if (active) setResult(nextResult);
    });

    return () => {
      active = false;
    };
  }, [codeList]);

  const loadNextPage = useCallback(async () => {
    if (!codeList || isLoading || result.next === undefined) return;

    setIsLoading(true);
    try {
      const nextResult = await getProducts(codeList, result.offset);
      setResult((current) => ({
        ...nextResult,
        productList: [...current.productList, ...nextResult.data],
      }));
    } finally {
      setIsLoading(false);
    }
  }, [codeList, isLoading, result.next, result.offset]);

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
