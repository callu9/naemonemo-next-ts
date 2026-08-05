const koreanNumberFormatter = new Intl.NumberFormat("ko-KR");

export function formatNumber(value: number) {
  return koreanNumberFormatter.format(value);
}

export function formatWon(value: number) {
  return `${formatNumber(value)}원`;
}
