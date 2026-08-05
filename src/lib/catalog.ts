import { banner, feeds, gates, products } from "../mocks";

export type Product = {
  productNo: number;
  productName: string;
  price: number;
  imageUrl?: string;
  priorityScore: number;
  recommendCode: number;
  availableCoupon?: boolean;
};

export type BannerList = typeof banner;
export type Banner = BannerList[number];
export type GateList = typeof gates;
export type Gate = GateList[number];
export type RelatedProduct = {
  productNo: number;
  productName: string;
  price: number;
  imageUrl: string;
  availableCoupon: boolean;
  priorityScore: number;
};
export type Feed = {
  feedNo: number;
  feedTitle: string;
  feedContents: string;
  relatedProducts: RelatedProduct[];
  recommendCode: number;
  feedLink?: string;
  imageUrl?: string;
};

export function getBanners() {
  return banner;
}

export function getGates() {
  return gates;
}

export function getFeeds() {
  return feeds.map((feed) => ({
    ...feed,
    relatedProducts: feed.relatedProducts?.map((item) => ({ ...item })),
  }));
}

export function getProducts(codeList: number[], offset = 0, limit = 10) {
  const productList = products
    .filter((product) => codeList.includes(0) || codeList.includes(product.recommendCode))
    .sort((left, right) => right.priorityScore - left.priorityScore);
  const nextOffset = offset + 1;

  return {
    data: productList.slice(offset * limit, (offset + 1) * limit),
    offset: nextOffset,
    next: productList.length > (offset + 1) * limit ? nextOffset + 1 : undefined,
  };
}
