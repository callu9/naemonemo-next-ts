import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";
import { Icon } from "../atom/Icon";
import { Body } from "../atom/Text";
import { token } from "../foundation/color";
import { layout } from "../foundation/layout";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 버튼 텍스트를 지정합니다.
   */
  text?: string;
  /**
   * 버튼의 size를 지정합니다.
   */
  size?: "Small" | "Medium" | "Large";
  /**
   * 버튼의 radius를 지정합니다. (단위 px)
   */
  radius?: 0 | 4 | 8;
  /**
   * 버튼 색상 속성을 지정합니다.
   */
  property?: "outlined" | "brand" | "negative" | "positive" | "info" | "invert";
  /**
   * 버튼 내 아이콘 옵션을 지정합니다.
   */
  icon?: string;
  /**
   * 버튼 상호작용 비활성화 여부를 지정합니다.
   */
  disabled?: boolean;
  /**
   * 버튼의 상호작용 이벤트를 지정합니다.
   */
  onClick?: () => void;
}

/**
 * 버튼은 사용자가 동작을 가능하게 할 때 사용합니다.
 * - Icon Size 20px * 20px로 고정
 * - Medium Size의 경우 높이 48px로 고정
 * - Radius 4px, 8px 중 자유 지정 (기본값 4px)
 */
export function Button({
  text,
  size = "Small",
  radius = 4,
  disabled = false,
  property = "outlined",
  icon,
  ...props
}: ButtonProps) {
  const BTN_STYLES = {
    outlined: {
      backgroundColor: token.surface.primary.hex,
      borderColor: token.border.default.hex,
      color: token.text.secondary.hex,
    },
    brand: { backgroundColor: token.surface.brand.hex, color: token.text.invert.hex },
    negative: { backgroundColor: token.surface.negative.hex, color: token.text.negative.hex },
    positive: { backgroundColor: token.surface.positive.hex, color: token.text.positive.hex },
    info: { backgroundColor: token.surface.info.hex, color: token.text.info.hex },
    invert: { backgroundColor: token.surface.invert.hex, color: token.text.invert.hex },
    disabled: { backgroundColor: token.surface.tertiary.hex, color: token.text.tertiary.hex },
  };
  const getBtnStyle = (btnStyles: {
    backgroundColor: string;
    borderColor?: string;
    color?: string;
  }) => `
    background-color: ${btnStyles.backgroundColor};
    border: ${btnStyles?.borderColor ? `1px solid ${btnStyles.borderColor}` : "0"};
    > .body { color: ${btnStyles.color}; }
  `;
  const BTN_SIZES = {
    Small: "padding: 7px 24px; height: 40px;",
    Medium: "padding: 14px 32px; height: 48px;",
    Large: "padding: 16px 32px; height: 54px;",
  };
  const StyledButton = styled.button`
    cursor: pointer;
    ${BTN_SIZES[size]}
    border-radius: ${radius}px;
    ${layout.flex({ justify: "center", align: "center", spacing: 8 })}
    ${disabled
      ? `${getBtnStyle(BTN_STYLES.disabled)} cursor: not-allowed;`
      : getBtnStyle(Object(BTN_STYLES[property]))}
  `;
  return (
    <StyledButton type="button" disabled={disabled} {...props}>
      {icon && (
        <Icon
          iconNm={icon}
          iconColorHex={disabled ? "tertiary" : Object(BTN_STYLES[property])?.color}
          iconSize={20}
        />
      )}
      {text && (
        <Body fontStyle={size} weight={600}>
          {text}
        </Body>
      )}
    </StyledButton>
  );
}
