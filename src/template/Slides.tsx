"use client";

import { BannerList, getBannerList } from "@/app/api/banner/route";
import { Icon } from "@/atom/Icon";
import SlideItem from "@/components/SlideItem";
import { useEffect, useState } from "react";

export default function Slides() {
  const [bannerList, setBannerList] = useState<BannerList>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  useEffect(() => {
    async function getList() {
      const list = await getBannerList();
      setBannerList(list);
    }
    getList();
  }, []);
  function onClickChevron(num: number) {
    const newIdx = (currentIdx + num + bannerList.length) % bannerList.length;
    setCurrentIdx(newIdx);
  }
  return (
    <div className="slider-list">
      <Icon
        iconNm="chevronLeft"
        iconColor="invert"
        iconSize={48}
        onClick={() => onClickChevron(-1)}
      />
      {bannerList.length > 0 && <SlideItem {...bannerList[currentIdx]} />}
      <Icon
        iconNm="chevronRight"
        iconColor="invert"
        iconSize={48}
        onClick={() => onClickChevron(1)}
      />
    </div>
  );
}
