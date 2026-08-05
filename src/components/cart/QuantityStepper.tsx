"use client";

export function clampQuantity(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function QuantityStepper({
  value,
  min = 1,
  max = 999,
  onChange,
}: {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="quantity-stepper" role="group" aria-label="상품 수량">
      <button type="button" aria-label="수량 줄이기" onClick={() => onChange(clampQuantity(value - 1, min, max))} disabled={value <= min}>
        −
      </button>
      <output aria-live="polite">{value}</output>
      <button type="button" aria-label="수량 늘리기" onClick={() => onChange(clampQuantity(value + 1, min, max))} disabled={value >= max}>
        +
      </button>
    </div>
  );
}
