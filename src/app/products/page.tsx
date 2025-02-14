"use client";

import { ProductsHeader } from "@/components/common/Header";
import RecommendList from "@/template/products/RecommendList";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Products() {
  const params = useSearchParams();
  const [codeList, setCodeList] = useState<number[] | undefined>();

  useEffect(() => {
    const strRecommendCode = params.get("recommendCode");
    if (strRecommendCode) setCodeList([Number(strRecommendCode)]);
  }, [params]);

  return (
    <>
      <ProductsHeader />
      <RecommendList codeList={codeList} />
    </>
  );
}
