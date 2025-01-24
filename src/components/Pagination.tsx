import styled from "styled-components";
import { Container } from "../atom/Container";
import { Icon } from "../atom/Icon";
import { ChangeEvent, useEffect, useRef, useState } from "react";

export interface PaginationProps {
  currentPageIndex?: number;
  totalPageCnt?: number;
  onPageChange?: (v: any) => void;
}
export default function Pagination({
  currentPageIndex = 0,
  totalPageCnt = 0,
  onPageChange,
}: PaginationProps) {
  const PageInputWrapperStyle = `
  .pagination-input-wrapper {
    border-radius: 8px;
    border: 1px solid var(--gray-300, #d1d1d1);
    :focus-within {
      border-radius: 8px;
      border: 1px solid var(--gray-900, #232527);
    }
    > input {
      background-color: transparent;
      text-align: center;
      padding: 8px 10px;
      height: 40px;
      width: 68px;
      outline: 0;
    }
  }
  `;
  const IconWrapper = styled(Container)`
    cursor: pointer;
  `;

  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setValue] = useState(currentPageIndex + 1);
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as HTMLElement))
        setValue(currentPageIndex + 1);
    };
    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, [inputValue, inputRef]);

  useEffect(() => {
    setValue(currentPageIndex + 1);
  }, [currentPageIndex]);

  function onChangePageIdx(newIdx: any) {
    if (isNaN(newIdx)) return;
    let result = newIdx;
    if (newIdx < 1) result = 1;
    else if (newIdx > totalPageCnt) result = totalPageCnt;
    setValue(result);
    onPageChange && onPageChange(result - 1);
  }
  return (
    <>
      <style type="text/css">{PageInputWrapperStyle}</style>
      <div className="flex-center gap-16">
        <IconWrapper display="flex" align="center" onClick={() => onChangePageIdx(inputValue - 1)}>
          <Icon iconNm="chevronLeft" iconColor={currentPageIndex > 0 ? "primary" : "tertiary"} />
        </IconWrapper>
        <div className="pagination-input-wrapper">
          <input
            type="text"
            ref={inputRef}
            value={inputValue}
            onChange={(e: ChangeEvent) =>
              setValue(Number((e.target as HTMLInputElement).value.replaceAll(/[^0-9]/g, "")))
            }
            onKeyDown={(e) => e.key === "Enter" && onChangePageIdx(inputValue)}
          />
        </div>
        <p>/</p>
        <p>{totalPageCnt}</p>
        <IconWrapper display="flex" align="center" onClick={() => onChangePageIdx(inputValue + 1)}>
          <Icon
            iconNm="chevronRight"
            iconColor={totalPageCnt - 1 > currentPageIndex ? "primary" : "tertiary"}
          />
        </IconWrapper>
      </div>
    </>
  );
}
