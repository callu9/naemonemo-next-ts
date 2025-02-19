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

  useEffect(() => {
    if (codeList) setIsLoading(true);
  }, [codeList]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!isLoading && entry.isIntersecting) setIsLoading(true);
        });
      },
      { threshold: 1 }
    );
    if (targetRef.current) observer.observe(targetRef.current as Element);
  }, [targetRef.current]);

  useEffect(() => {
    if (isLoading) getList();
  }, [isLoading]);

  async function getList() {
    if (!codeList) return;
    const { data, offset, next } = await getProductList(codeList, result.offset);
    setTimeout(() => {
      const originList = result.productList;
      setResult({ productList: [...originList, ...data], offset, next });
      setIsLoading(false);
    }, 300);
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
