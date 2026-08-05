import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { IconButton } from "./IconButton";

const meta = {
  title: "Common/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  args: { label: "닫기", children: "×" },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
