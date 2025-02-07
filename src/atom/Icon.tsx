"use client";

import { HTMLAttributes } from "react";
import IconAdd from "../assets/icon/add.svg";
import IconConfirm from "../assets/icon/check_circle.svg";
import Unchecked from "../assets/icon/check_false.svg";
import UncheckedSquare from "../assets/icon/check_square_false.svg";
import CheckedSquare from "../assets/icon/check_square_true.svg";
import Checked from "../assets/icon/check_true.svg";
import IconChevron from "../assets/icon/chevron.svg";
import IconClose from "../assets/icon/close.svg";
import IconDownload from "../assets/icon/download.svg";
import IconNoti from "../assets/icon/notifications.svg";
import RadioActive from "../assets/icon/radio.svg";
import IconRefresh from "../assets/icon/refresh.svg";
import IconRemove from "../assets/icon/remove.svg";
import IconSearch from "../assets/icon/search.svg";
import IconUpload from "../assets/icon/upload.svg";
import IconVisible from "../assets/icon/visibility.svg";
import IconInvisible from "../assets/icon/visibility_off.svg";

/**
 * 아이콘명에 따른 아이콘 컴포넌트 및 회전 각도 지정
 */
function IconObj(iconNm: string): { component?: any; rotate?: number } {
  switch (iconNm) {
    case "chevronLess":
      return { component: IconChevron, rotate: 0 };
    case "chevronRight":
      return { component: IconChevron, rotate: 90 };
    case "chevronMore":
      return { component: IconChevron, rotate: 180 };
    case "chevronLeft":
      return { component: IconChevron, rotate: 270 };
    case "add":
      return { component: IconAdd };
    case "remove":
      return { component: IconRemove };
    case "refresh":
      return { component: IconRefresh };
    case "search":
      return { component: IconSearch };
    case "close":
      return { component: IconClose };
    case "upload":
      return { component: IconUpload };
    case "download":
      return { component: IconDownload };
    case "noti":
      return { component: IconNoti };
    case "confirm":
      return { component: IconConfirm };
    case "visible":
      return { component: IconVisible };
    case "invisible":
      return { component: IconInvisible };
    case "radio":
      return { component: RadioActive };
    case "unchecked":
      return { component: Unchecked };
    case "checked":
      return { component: Checked };
    case "uncheckedSquare":
      return { component: UncheckedSquare };
    case "checkedSquare":
      return { component: CheckedSquare };
    default:
      return {};
  }
}

export interface IconProps extends HTMLAttributes<HTMLElement> {
  /**
   * 아이콘 명을 지정합니다.
   */
  iconNm?: string;
  /**
   * 아이콘의 크기를 지정합니다.
   */
  iconSize?: number;
  /**
   * 아이콘 색상 토큰을 지정합니다.
   */
  iconColor?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "invert"
    | "negative"
    | "positive"
    | "info"
    | string;
  /**
   * 아이콘 색상을 직접 지정합니다.
   */
  iconColorHex?: string;
  /**
   * 기타 아이콘 스타일을 특정하는 경우 사용합니다. (ex. border 등)
   */
  style?: React.CSSProperties;
}
export const Icon = ({
  iconNm = "confirm",
  iconSize = 24,
  iconColor,
  iconColorHex,
  ...props
}: IconProps) => {
  const fillColor = iconColor || iconColorHex || "primary";
  const IconComponent = IconObj(iconNm).component;
  return (
    <IconComponent
      {...props}
      className={`icon icon-${fillColor} icon-rotate-${IconObj(iconNm).rotate || 0}`}
      width={iconSize}
      height={iconSize}
    />
  );
};
