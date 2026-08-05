import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import QuantityStepper from "./QuantityStepper";

const meta = {
  title: "Cart/QuantityStepper",
  component: QuantityStepper,
  tags: ["autodocs"],
  args: { value: 1, min: 1, max: 999, onChange: () => undefined },
} satisfies Meta<typeof QuantityStepper>;

export default meta;
type Story = StoryObj<typeof meta>;

function InteractiveStepper({ value, ...args }: React.ComponentProps<typeof QuantityStepper>) {
  const [count, setCount] = useState(value);
  return <QuantityStepper {...args} value={count} onChange={setCount} />;
}

export const Interactive: Story = {
  render: (args) => <InteractiveStepper {...args} />,
};
