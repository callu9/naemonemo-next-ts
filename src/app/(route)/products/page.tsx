import { ProductsHeader } from "@/components/common/Header";
import RecommendList, { type RecommendedResultProps } from "@/template/products/RecommendList";
import { getProducts } from "@/lib/catalog";
import { Suspense } from "react";

export default function Products({ searchParams }: PageProps<"/products">) {
  return (
    <>
      <ProductsHeader />
      <Suspense fallback={null}>
        <ProductsPage searchParams={searchParams} />
      </Suspense>
    </>
  );
}

async function ProductsPage({ searchParams }: Pick<PageProps<"/products">, "searchParams">) {
  const { recommendCode } = await searchParams;
  const code = typeof recommendCode === "string" ? Number(recommendCode) : NaN;
  const codeList = Number.isFinite(code) ? [code] : undefined;
  const page = codeList ? getProducts(codeList) : undefined;
  const initialResult: RecommendedResultProps | undefined = page && {
    productList: page.data,
    offset: page.offset,
    next: page.next,
  };

  return <RecommendList key={codeList?.join(",") ?? "all"} codeList={codeList} initialResult={initialResult} />;
}
