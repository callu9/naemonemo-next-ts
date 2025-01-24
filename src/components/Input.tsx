import { InputHTMLAttributes, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Container } from "../atom/Container";
import { Icon } from "../atom/Icon";
import { Body, Lable } from "../atom/Text";
import { token } from "../foundation/color";
import { layout, radius } from "../foundation/layout";

interface TextFieldsProps {
  /**
   * Text Field 타입을 지정합니다.
   */
  type?: "text" | "password";
  /**
   * Text Field 입력값을 연결합니다.
   */
  value: string;
  /**
   * Text Field 입력값 수정 시 이벤트를 연결합니다.
   * @param value
   * @returns
   */
  onChange?: (value: any) => void;
  /**
   * Text Field 에러 표시를 위한 유효성 검사 함수를 연결합니다.
   * @returns {boolean}
   */
  isError?: () => boolean;
  /**
   * Text Field Placeholder를 지정합니다.
   */
  placeholder?: string;
  /**
   * Text Field 비활성화 여부를 지정합니다.
   */
  disabled?: boolean;
  /**
   * Text Field 크기를 지정합니다.
   */
  size?: "Small" | "Medium" | "Large";
  /**
   * 입력 제한 길이를 지정합니다.
   */
  maxLength?: number;
}
export function TextField({
  size = "Small",
  type = "text",
  placeholder = "입력",
  disabled = false,
  value = "",
  maxLength = 1000,
  onChange,
  isError,
  ...props
}: TextFieldsProps) {
  const [textType, setTextType] = useState(type);
  useEffect(() => setTextType(type), [type]);

  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (inputRef.current) setFocused(inputRef.current.contains(e.target as HTMLElement));
    };
    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, [inputRef]);

  const Sizes = { Small: 328, Medium: 440, Large: 672 };
  const TextFieldWrapperStyle = `
  .text-field {
    width: ${Sizes[size]}px;
    height: 44px;
    padding: 12px 15px;
    border-radius: ${radius[1]}px;
    border: 1px solid ${token.border.default.hex};
    background-color: ${token.surface.primary.hex};
    ${layout.flex({ justify: "space-between", spacing: 16 })}
    &:has(input:focus) {
      border-color: ${token.border.tertiary.hex};
    }
    &:has(input.error) {
      border-color: ${token.border.negative.hex};
    }
    &:has(input:disabled) {
      background-color: ${token.surface.tertiary.hex}; 
      > input {color: ${token.text.secondary.hex};}
    }
  }
  `;
  const InputStyle = `
  .text-field > input {
    background: transparent;
    width: inherit;
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    font-size: 14px;
    line-height: 130%;
    color: ${token.text.primary.hex};
    &::placeholder {
      color: ${token.text.tertiary.hex};
    }
  }
  `;
  const StyledIconContainer = styled.button`
    ${layout.grid({ justify: "center" })}
    border-radius: 20px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    background-color: transparent;
  `;
  return (
    <>
      <style type="text/css">
        {TextFieldWrapperStyle}
        {InputStyle}
      </style>
      <div className="text-field" ref={inputRef}>
        <input
          className={isError && isError() ? "error" : ""}
          {...{ ...props, value, disabled, placeholder, type: textType }}
          onChange={(e) => onChange && onChange(e.target.value.slice(0, maxLength))}
          onFocus={(e) =>
            e.currentTarget.setSelectionRange(
              e.currentTarget.value.length,
              e.currentTarget.value.length
            )
          }
          onClick={() => setFocused(true)}
        />
        {!disabled && focused && value?.length > 0 && (
          <Container display="flex" justify="flex-end">
            {type === "password" && (
              <StyledIconContainer
                type="button"
                onClick={() => setTextType(textType === "text" ? "password" : "text")}
              >
                <Icon
                  iconNm={textType === "text" ? "invisible" : "visible"}
                  iconSize={16}
                  iconColor="tertiary"
                />
              </StyledIconContainer>
            )}
            <StyledIconContainer type="reset" onClick={() => onChange && onChange("")}>
              <Icon iconNm="close" iconSize={16} iconColor="tertiary" />
            </StyledIconContainer>
          </Container>
        )}
      </div>
    </>
  );
}
interface DropdownProps {
  /**
   * 드롭다운 옵션의 key, value를 지정합니다.
   */
  keyValue?: { id: string; name: string };
  /**
   * 드롭다운 옵션 목록을 지정합니다.
   */
  optionList?: object[];
  /**
   * 드롭다운 선택값을 연결합니다.
   */
  selected?: object;
  /**
   * 드롭다운 선택값 변경 시 이벤트를 지정합니다.
   */
  onChange?: (value: any) => void;
  /**
   * 드롭다운 Placeholder를 지정합니다.
   */
  placeholder?: string;
  /**
   * 드롭다운 비활성화 여부를 지정합니다.
   */
  disabled?: boolean;
  /**
   * 드롭다운 크기를 지정합니다.
   */
  size?: "Small" | "Medium" | "Large";
}
export function Dropdown({
  size = "Small",
  selected = {},
  placeholder = "선택",
  keyValue = { id: "id", name: "name" },
  optionList = [],
  disabled = false,
  onChange,
}: DropdownProps) {
  const [value, setValue] = useState(selected);
  useEffect(() => setValue(selected), [selected]);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current) setIsOpen(dropdownRef.current.contains(e.target as HTMLElement));
    };
    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, [dropdownRef]);

  const Sizes = { Small: 328, Medium: 440, Large: 672 };
  const Wrapper = styled.div`
    width: ${Sizes[size]}px;
    height: 44px;
    padding: 12px 15px;
    position: relative;
    border-radius: ${radius[1]}px;
    border: 1px solid ${token.border[isOpen ? "tertiary" : "default"].hex};
    background-color: ${token.surface.primary.hex};
    ${layout.flex({ justify: "space-between", spacing: 16 })}
    ${disabled || optionList?.length <= 0
      ? `background-color: ${token.surface.tertiary.hex}; color: ${token.text.secondary.hex};`
      : "cursor: pointer;"}
  `;
  const StyledOptions = styled.div`
    position: absolute;
    top: 48px;
    left: 0;
    width: inherit;
    max-height: calc(44px * 4.5);
    overflow-y: auto;
    background-color: ${token.surface.primary.hex};
    border: 1px solid ${token.border.tertiary.hex};
    border-radius: ${radius[1]}px;
    > .option {
      padding: 12px 15px;
      height: 44px;
    }
    > .option:hover {
      background-color: ${token.surface.negative.hex};
    }
  `;
  const StyledChevronIcon = styled.button`
    ${layout.grid({ justify: "center" })}
    border-radius: 20px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    background-color: transparent;
  `;
  // TODO: 모바일 접속 시 select tag 사용
  return (
    <Wrapper onSubmit={(e) => e.preventDefault()} ref={dropdownRef}>
      {Object(value)[keyValue.name] ? (
        <Body>{Object(value)[keyValue.name]}</Body>
      ) : (
        <Body fontColor="tertiary">{placeholder}</Body>
      )}
      <StyledChevronIcon type="button" onClick={() => optionList?.length > 0 && setIsOpen(!isOpen)}>
        <Icon iconNm={isOpen ? "chevronLess" : "chevronMore"} iconSize={16} iconColor="secondary" />
      </StyledChevronIcon>
      {isOpen && (
        <StyledOptions className="options-wrapper">
          {optionList?.map((option, oidx) => (
            <div
              className="option"
              key={oidx}
              onClick={() => {
                onChange && onChange(option);
                setIsOpen(false);
              }}
            >
              <Body>{Object(option)[keyValue.name] || "-"}</Body>
            </div>
          ))}
        </StyledOptions>
      )}
    </Wrapper>
  );
}

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * 해당 input 태그의 ID를 설정합니다.
   */
  id: string;
  /**
   * lable text를 지정합니다.
   */
  value: string;
  /**
   * 체크 여부를 지정합니다.
   */
  checked: boolean;
  /**
   * 체크 여부 변경 시 이벤트를 지정합니다.
   * @param value lable text
   * @returns
   */
  onChange?: (value: any) => void;
  /**
   * 비활성화 여부를 지정합니다.
   */
  disabled?: boolean;
  /**
   * 라디오 버튼 색상을 지정합니다.
   * - Icon Color Token Name ("primary", "secondary", ...)
   * - Color Hex Code (ex. "#28D46A", "#E163F3", ...)
   * - Color Name (ex. "white", "black", ...)
   */
  color?: string;
  /**
   * 필수 여부를 지정합니다.
   */
  required?: boolean;
}
export function Radio({
  value: lable,
  checked = false,
  disabled = false,
  color = "negative",
  required = false,
  onChange,
  ...props
}: RadioProps) {
  function onRadioChange() {
    if (disabled) return;
    onChange && onChange(lable);
  }
  const Wrapper = styled.div`
    padding: 10px 0;
    ${layout.flex({ spacing: 8 })}
    ${disabled ? "cursor: not-allowed;" : "cursor: pointer; > * { cursor: pointer; }"}
  `;
  const StyledInput = styled.input`
    appearance: none;
    margin: 0;
    width: 0;
    &::after {
      content: "";
      display: block;
    }
  `;
  return (
    <Wrapper onClick={onRadioChange}>
      <StyledInput type="radio" {...{ ...props, checked, disabled }} />
      <Icon iconNm={checked ? "radio" : "unchecked"} iconColor={color} iconColorHex={color} />
      <Lable weight={400} htmlFor={props.id} required={required}>
        {lable}
      </Lable>
    </Wrapper>
  );
}
interface CheckboxProps extends RadioProps {
  /**
   * 체크박스의 모양을 설정합니다.
   */
  isSquared?: boolean;
  /**
   * 체크박스 버튼 색상을 지정합니다.
   * - Icon Color Token Name ("primary", "secondary", ...)
   * - Color Hex Code (ex. "#28D46A", "#E163F3", ...)
   * - Color Name (ex. "white", "black", ...)
   */
  color?: string;
}
export function Checkbox({
  value: lable,
  checked = false,
  isSquared = false,
  disabled = false,
  onChange,
  color = "negative",
  required = false,
  ...props
}: CheckboxProps) {
  function onCheckboxChange() {
    if (disabled) return;
    onChange && onChange(lable);
  }
  const Wrapper = styled.div`
    padding: 10px 0;
    ${layout.flex({ spacing: 8 })}
    ${disabled ? "cursor: not-allowed;" : "cursor: pointer; > * { cursor: pointer; }"}
  `;
  const StyledInput = styled.input`
    appearance: none;
    margin: 0;
    width: 0;
    &::after {
      content: "";
      display: block;
    }
  `;
  return (
    <Wrapper onClick={onCheckboxChange}>
      <StyledInput type="checkbox" {...{ ...props, checked, disabled }} />
      {isSquared ? (
        <Icon
          iconNm={checked ? "checkedSquare" : "uncheckedSquare"}
          iconColor={color}
          iconColorHex={color}
        />
      ) : (
        <Icon iconNm={checked ? "checked" : "unchecked"} iconColor={color} iconColorHex={color} />
      )}
      <Lable weight={400} htmlFor={props.id} required={required}>
        {lable}
      </Lable>
    </Wrapper>
  );
}
