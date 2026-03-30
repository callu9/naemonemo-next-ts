"use client";

import { getProductList, Product } from "@/app/api/products/route";
import { Container } from "@/atom/Container";
import Loader from "@/components/common/Loader";
import ProductItem from "@/components/products/ProductItem";
import { useEffect, useRef, useState } from "react";
import "./products.scss";

interface RecommendedResultProps {
  productList: Product[];
  offset: number;
  next?: number;
}
export default function RecommendList({ codeList }: { codeList?: number[] }) {
  const targetRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<RecommendedResultProps>({
    productList: [],
    offset: 0,
    next: 0,
  });

  // ✅ 초기 로드 트리거
  useEffect(() => {
    if (codeList) setIsLoading(true);
  }, [codeList]);

  // ✅ IntersectionObserver 설정 (ref 변경 무시)
  useEffect(() => {
    const element = targetRef.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLoading) {
            setIsLoading(true);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    observer.observe(element);
    return () => observer.disconnect();
  }, [isLoading]);

  // ✅ 데이터 로드
  useEffect(() => {
    if (isLoading) {
      getList();
    }
  }, [isLoading]);

  async function getList() {
    if (!codeList) return;
    try {
      const { data, offset, next } = await getProductList(codeList, result.offset);
      const originList = result.productList;
      setResult({ productList: [...originList, ...data], offset, next });
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      <Container className="recommend-product-list">
        {result.productList.map((prod: Product) => (
          <ProductItem key={prod.productNo} product={prod} />
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
