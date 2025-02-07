"use client";

import { BannerList } from "@/app/api/banner/route";
import { Container } from "@/atom/Container";
import { Icon } from "@/atom/Icon";
import SlideItem from "@/components/SlideItem";
import { useEffect, useState } from "react";

export default function Slides({ bannerList }: { bannerList: BannerList }) {
  const [currentIdx, setCurrentIdx] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => onClickChevron(1), 4000);
    return () => {
      clearInterval(intervalId);
    };
  }, [currentIdx]);
  useEffect(() => {}, [currentIdx]);

  function onClickChevron(num: number) {
    const newIdx = (currentIdx + num + bannerList.length) % bannerList.length;
    setCurrentIdx(newIdx);
    const currentBannerNo = bannerList[newIdx].bannerNo;
    const bannerElement = document.getElementById(`banner-${currentBannerNo}`);
    document
      .getElementById("slide-wrapper")
      ?.scrollTo({ behavior: "smooth", left: bannerElement?.offsetLeft });
  }
  return (
    <div className="slide-list">
      <Icon
        iconNm="chevronLeft"
        iconColor="invert"
        iconSize={48}
        onClick={() => onClickChevron(-1)}
      />
      <Container className="slide-wrapper" display="flex" justify="left" id="slide-wrapper">
        {bannerList.map((banner) => (
          <SlideItem key={banner.bannerNo} {...banner} />
        ))}
      </Container>
      <Container className="progress-bar" display="flex" justify="stretch">
        {new Array(bannerList.length).fill(undefined).map((_, idx) => (
          <div key={idx} className={idx === currentIdx ? "active" : "inactive"} />
        ))}
      </Container>
      <Icon
        iconNm="chevronRight"
        iconColor="invert"
        iconSize={48}
        onClick={() => onClickChevron(1)}
      />
    </div>
  );
}
