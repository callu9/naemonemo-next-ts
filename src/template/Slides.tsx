"use client";

import { Container } from "@/atom/Container";
import { Icon } from "@/atom/Icon";
import SlideItem from "@/components/SlideItem";
import type { BannerList } from "@/lib/catalog";
import { useCallback, useEffect, useState } from "react";

export default function Slides({ bannerList }: { bannerList: BannerList }) {
  const [currentIdx, setCurrentIdx] = useState(0);

  const onClickChevron = useCallback(
    (direction: number) => {
      const nextIndex = (currentIdx + direction + bannerList.length) % bannerList.length;
      setCurrentIdx(nextIndex);
      const bannerElement = document.getElementById(`banner-${bannerList[nextIndex].bannerNo}`);
      document
        .getElementById("slide-wrapper")
        ?.scrollTo({ behavior: "smooth", left: bannerElement?.offsetLeft });
    },
    [bannerList, currentIdx],
  );

  useEffect(() => {
    const intervalId = setInterval(() => onClickChevron(1), 4000);
    return () => clearInterval(intervalId);
  }, [onClickChevron]);

  return (
    <div className="slide-list">
      <Icon iconNm="chevronLeft" iconColor="invert" iconSize={48} onClick={() => onClickChevron(-1)} />
      <Container className="slide-wrapper" display="flex" justify="left" id="slide-wrapper">
        {bannerList.map((banner, index) => (
          <SlideItem key={banner.bannerNo} {...banner} preload={index === 0} />
        ))}
      </Container>
      <Container className="progress-bar" display="flex" justify="stretch">
        {new Array(bannerList.length).fill(undefined).map((_, index) => (
          <div key={index} className={index === currentIdx ? "active" : "inactive"} />
        ))}
      </Container>
      <Icon iconNm="chevronRight" iconColor="invert" iconSize={48} onClick={() => onClickChevron(1)} />
    </div>
  );
}
