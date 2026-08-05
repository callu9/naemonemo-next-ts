import type { Preview } from "storybook";
import "../src/styles/global.scss";

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
    layout: "centered",
  },
};

export default preview;
