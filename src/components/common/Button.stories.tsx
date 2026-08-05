import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./Button";

const meta = {
  title: "Common/Button",
  component: Button,
  tags: ["autodocs"],
  args: { children: "버튼", property: "outlined", size: "medium" },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Outlined: Story = {};
export const Primary: Story = { args: { property: "invert", children: "확인" } };
export const Disabled: Story = { args: { disabled: true } };
