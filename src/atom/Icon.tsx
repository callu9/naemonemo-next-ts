import styled from "styled-components";
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
import { token } from "../foundation/color";

/**
 * 아이콘명에 따른 아이콘 컴포넌트 및 회전 각도 지정
 */
export const IconObj = {
  chevronLess: { component: IconChevron, rotate: 0 },
  chevronRight: { component: IconChevron, rotate: 90 },
  chevronMore: { component: IconChevron, rotate: 180 },
  chevronLeft: { component: IconChevron, rotate: 270 },
  add: { component: IconAdd },
  remove: { component: IconRemove },
  refresh: { component: IconRefresh },
  search: { component: IconSearch },
  close: { component: IconClose },
  upload: { component: IconUpload },
  download: { component: IconDownload },
  noti: { component: IconNoti },
  confirm: { component: IconConfirm },
  visible: { component: IconVisible },
  invisible: { component: IconInvisible },
  radio: { component: RadioActive },
  unchecked: { component: Unchecked },
  checked: { component: Checked },
  uncheckedSquare: { component: UncheckedSquare },
  checkedSquare: { component: CheckedSquare },
};

export interface IconProps {
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
  const IconProps = Object(IconObj)[iconNm];
  const StyledIcon = styled(IconProps.component)`
    transform: rotate(${IconProps.rotate || 0}deg);
    width: ${iconSize}px;
    height: ${iconSize}px;
    fill: ${(iconColor && Object(token.icon)[iconColor]?.hex) ||
    iconColorHex ||
    token.icon.primary};
  `;
  return IconProps ? <StyledIcon className={iconNm} {...props} /> : <></>;
};
