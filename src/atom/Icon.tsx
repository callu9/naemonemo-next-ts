import styled from "styled-components";
import { ReactComponent as IconAdd } from "../assets/icon/add.svg";
import { ReactComponent as IconConfirm } from "../assets/icon/check_circle.svg";
import { ReactComponent as Unchecked } from "../assets/icon/check_false.svg";
import { ReactComponent as UncheckedSquare } from "../assets/icon/check_square_false.svg";
import { ReactComponent as CheckedSquare } from "../assets/icon/check_square_true.svg";
import { ReactComponent as Checked } from "../assets/icon/check_true.svg";
import { ReactComponent as IconChevron } from "../assets/icon/chevron.svg";
import { ReactComponent as IconClose } from "../assets/icon/close.svg";
import { ReactComponent as IconDownload } from "../assets/icon/download.svg";
import { ReactComponent as IconNoti } from "../assets/icon/notifications.svg";
import { ReactComponent as RadioActive } from "../assets/icon/radio.svg";
import { ReactComponent as IconRefresh } from "../assets/icon/refresh.svg";
import { ReactComponent as IconRemove } from "../assets/icon/remove.svg";
import { ReactComponent as IconSearch } from "../assets/icon/search.svg";
import { ReactComponent as IconUpload } from "../assets/icon/upload.svg";
import { ReactComponent as IconVisible } from "../assets/icon/visibility.svg";
import { ReactComponent as IconInvisible } from "../assets/icon/visibility_off.svg";
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
  const StyledIcon = styled(IconProps.component || IconConfirm)`
    transform: rotate(${IconProps.rotate || 0}deg);
    width: ${iconSize}px;
    height: ${iconSize}px;
    fill: ${(iconColor && Object(token.icon)[iconColor]?.hex) ||
    iconColorHex ||
    token.icon.primary};
  `;
  return IconProps ? <StyledIcon className={iconNm} {...props} /> : <></>;
};
