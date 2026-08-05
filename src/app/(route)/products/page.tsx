"use client";

import { ProductsHeader } from "@/components/common/Header";
import RecommendList from "@/template/products/RecommendList";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo } from "react";

export default function Products() {
  return (
    <Suspense fallback={null}>
      <ProductsPage />
    </Suspense>
  );
}

function ProductsPage() {
  const params = useSearchParams();
  const codeList = useMemo(() => {
    const strRecommendCode = params.get("recommendCode");
    return strRecommendCode ? [Number(strRecommendCode)] : undefined;
  }, [params]);

  return (
    <>
      <ProductsHeader />
      <RecommendList codeList={codeList} />
    </>
  );
}
