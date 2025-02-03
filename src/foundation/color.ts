const gray = {
  0: "#ffffff",
  50: "#fafafa",
  100: "#f5f5f5",
  200: "#e6e6e6",
  300: "#d1d1d1",
  400: "#bfbfbf",
  500: "#a0a0a0",
  600: "#777777",
  700: "#636363",
  800: "#444444",
  900: "#232527",
  999: "#000000",
};
const navy = {
  50: "#f1f5f9",
  100: "#e2e8f0",
  200: "#cbd5e1",
  300: "#becad9",
  400: "#94a3b8",
  500: "#64748b",
  600: "#475569",
  700: "#334155",
  800: "#1e293b",
  900: "#0f172a",
};
const red = {
  50: "#ffeef0",
  100: "#ffd7d6",
  200: "#ffbaba",
  300: "#ff9195",
  400: "#ff6973",
  500: "#ff4053",
  600: "#ff1836",
  700: "#d9092b",
  800: "#b30024",
  900: "#8c0021",
};
const blue = {
  50: "#e6f4ff",
  100: "#bae0ff",
  200: "#91caff",
  300: "#69b1ff",
  400: "#4096ff",
  500: "#1677ff",
  600: "#0958d9",
  700: "#003eb3",
  800: "#002c8c",
  900: "#001d66",
};
const green = {
  50: "#E6FFEC",
  100: "#A7FABF",
  200: "#79ED9E",
  300: "#4FE082",
  400: "#28D46A",
  500: "#06C755",
  600: "#00A148",
  700: "#007A3B",
  800: "#00542B",
  900: "#002E19",
};
const purple = {
  50: "#FAE9FF",
  100: "#FCD4FF",
  200: "#F2A7FA",
  300: "#F085FC",
  400: "#E163F3",
  500: "#D041EC",
  600: "#A038BA",
  700: "#7A2594",
  800: "#56166E",
  900: "#360E47",
};
const yellow = {
  50: "#FFFBE6",
  100: "#FFF1B8",
  200: "#FFE58F",
  300: "#FFD666",
  400: "#FFC53D",
  500: "#FAAD14",
  600: "#D48806",
  700: "#AD6800",
  800: "#874D00",
  900: "#613400",
};
export const primitives = { gray, navy, red, blue, green, yellow, purple };

const surface = {
  primary: {
    styleNm: "Primary",
    palette: "gray",
    depth: 0,
    hex: gray[0],
  },
  secondary: {
    styleNm: "Secondary",
    palette: "gray",
    depth: 100,
    hex: gray[100],
  },
  tertiary: {
    styleNm: "Tertiary",
    palette: "gray",
    depth: 200,
    hex: gray[200],
  },
  invert: {
    styleNm: "Invert",
    palette: "gray",
    depth: 900,
    hex: gray[900],
  },
  brand: {
    styleNm: "Brand",
    palette: "red",
    depth: 500,
    hex: red[500],
  },
  negative: {
    styleNm: "Negative",
    palette: "red",
    depth: 50,
    hex: red[50],
  },
  positive: {
    styleNm: "Positive",
    palette: "blue",
    depth: 50,
    hex: blue[50],
  },
  info: {
    styleNm: "Info",
    palette: "navy",
    depth: 50,
    hex: navy[50],
  },
};
const text = {
  primary: {
    styleNm: "Primary",
    palette: "gray",
    depth: 900,
    hex: gray[900],
  },
  secondary: {
    styleNm: "Secondary",
    palette: "gray",
    depth: 700,
    hex: gray[700],
  },
  tertiary: {
    styleNm: "Tertiary",
    palette: "gray",
    depth: 500,
    hex: gray[500],
  },
  invert: {
    styleNm: "Invert",
    palette: "gray",
    depth: 0,
    hex: gray[0],
  },
  negative: {
    styleNm: "Negative",
    palette: "red",
    depth: 500,
    hex: red[500],
  },
  positive: {
    styleNm: "Positive",
    palette: "blue",
    depth: 500,
    hex: blue[500],
  },
  info: {
    styleNm: "Info",
    palette: "navy",
    depth: 500,
    hex: navy[500],
  },
};
const icon = {
  primary: {
    styleNm: "Primary",
    palette: "gray",
    depth: 900,
    hex: gray[900],
  },
  secondary: {
    styleNm: "Secondary",
    palette: "gray",
    depth: 700,
    hex: gray[700],
  },
  tertiary: {
    styleNm: "Tertiary",
    palette: "gray",
    depth: 500,
    hex: gray[500],
  },
  invert: {
    styleNm: "Invert",
    palette: "gray",
    depth: 0,
    hex: gray[0],
  },
  negative: {
    styleNm: "Negative",
    palette: "red",
    depth: 500,
    hex: red[500],
  },
  positive: {
    styleNm: "Positive",
    palette: "blue",
    depth: 500,
    hex: blue[500],
  },
  info: {
    styleNm: "Info",
    palette: "navy",
    depth: 500,
    hex: navy[500],
  },
};
const border = {
  default: {
    styleNm: "Default",
    palette: "gray",
    depth: 300,
    hex: gray[300],
  },
  hover: {
    styleNm: "Hover",
    palette: "gray",
    depth: 500,
    hex: gray[500],
  },
  tertiary: {
    styleNm: "Tertiary",
    palette: "gray",
    depth: 700,
    hex: gray[700],
  },
  invert: {
    styleNm: "Invert",
    palette: "gray",
    depth: 200,
    hex: gray[200],
  },
  negative: {
    styleNm: "Negative",
    palette: "red",
    depth: 500,
    hex: red[500],
  },
};
const divider = {
  default: {
    styleNm: "Default",
    palette: "gray",
    depth: 200,
    hex: gray[200],
  },
  strong: {
    styleNm: "Strong",
    palette: "gray",
    depth: 400,
    hex: gray[400],
  },
};
export const token = { surface, text, icon, border, divider };
