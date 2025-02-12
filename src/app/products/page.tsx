"use client";

import { Container } from "@/atom/Container";
import Loader from "@/components/common/Loader";
import ProductItem from "@/components/products/ProductItem";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getProductList, Product, ProductList } from "../api/products/route";
import "./products.scss";

interface ResultProps {
  productList: ProductList;
  recommendCode?: number;
  offset: number;
  next: number;
}
export default function RecommendedProducts() {
  const [searchResult, setSearchResult] = useState<ResultProps>({
    productList: [],
    offset: 0,
    next: 0,
  });
  const params = useSearchParams();
  const targetRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const strRecommendCode = params.get("recommendCode");
    if (strRecommendCode)
      setSearchResult({ ...searchResult, recommendCode: Number(strRecommendCode) });
  }, [params]);

  useEffect(() => {
    if (isLoading) getList();
  }, [isLoading]);

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

  async function getList() {
    if (searchResult.recommendCode === undefined) return;
    const { data, offset, next } = await getProductList(
      searchResult.recommendCode,
      searchResult.offset
    ).finally(() => setTimeout(() => setIsLoading(false), 500));
    setSearchResult({
      ...searchResult,
      productList: [...searchResult.productList, ...data],
      offset,
      next,
    });
  }

  return (
    <>
      <Container className="recommend-product-list">
        {searchResult.productList.map((prod: Product) => (
          <ProductItem key={prod.productNo} {...prod} />
        ))}
      </Container>
      {searchResult.next !== undefined && (
        <div
          id="infinite-scroll"
          ref={targetRef}
          className={`scroll-footer ${searchResult.next === undefined ? "none" : ""}`}
        >
          <div className="scroll-loader" />
          <div className="scroll-loader" />
          <div className="scroll-loader" />
        </div>
      )}
      {isLoading && <Loader />}
    </>
  );
}
