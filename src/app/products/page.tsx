"use client";

import { Container } from "@/atom/Container";
import Loader from "@/components/common/Loader";
import ProductItem from "@/components/products/ProductItem";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getProductList, Product, ProductList } from "../api/products/route";
import "./products.scss";

export default function RecommendedProducts() {
  const params = useSearchParams();
  const [productList, setProductList] = useState<ProductList>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    setIsLoading(true);
    async function getList() {
      const list = await getProductList(params.get("recommendCode") || 0).finally(() =>
        setIsLoading(false)
      );
      setProductList(list);
    }
    getList();
  }, [params]);
  return (
    <>
      <Container className="recommend-product-list">
        {productList.map((prod: Product) => (
          <ProductItem key={prod.productNo} {...prod} />
        ))}
      </Container>
      {isLoading && <Loader />}
    </>
  );
}
