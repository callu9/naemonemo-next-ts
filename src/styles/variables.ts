import { token } from "../foundation/color";
import { layout, radius, spacing } from "../foundation/layout";
import { usage, weight } from "../foundation/typography";

export const COLOR = `
  /* Color Token - 1. Text */
  ${Object.keys(token.text).map(
    (tokenColor) => `
    .text-${tokenColor} { color: ${Object(token.text)[tokenColor].hex}; }
  `
  )}
  /* Color Token - 2. Surface */
  ${Object.keys(token.surface).map(
    (tokenColor) => `
    .surface-${tokenColor} { background-color: ${Object(token.surface)[tokenColor].hex}; }
  `
  )}
  /* Color Token - 3. Border */
  ${Object.keys(token.border).map(
    (tokenColor) => `
    .border-${tokenColor} { 
      border-style: solid;
      border-color: ${Object(token.border)[tokenColor].hex}; 
    }
  `
  )}
  /* Color Token - 4. Icon */
  ${Object.keys(token.icon).map(
    (tokenColor) => `
    .icon-${tokenColor} > svg{ fill: ${Object(token.icon)[tokenColor].hex}; }
  `
  )}`;

export const TYPOGRAPHY = `
    /* Typography */
    ${Object.keys(usage).map(
      (styleNm) => `
      ${styleNm}${Object(usage)[styleNm].classNm ? `, .${Object(usage)[styleNm].classNm}` : ""} {
        font-family: "Pretendard${Object(usage)[styleNm].weight}";
        font-size: ${Object(usage)[styleNm].webSize}px;
        line-height: 130%;
        @media (width < 800px) {
          font-size: ${Object(usage)[styleNm].mobileSize}px;
        }
      }
    `
    )}
    /* Font Weight */
    ${Object.keys(weight).map(
      (weightNm) => `
      .weight-${Object(weight)[weightNm]} {
        font-family: "${Object(weight)[weightNm]}";
      }
    `
    )}
  `;

export const LAYOUT = `
  /* Layout */
  .grid { ${layout.grid({})} }
  .flex-center { ${layout.flex({})} }
  .flex-sides { ${layout.flex({ justify: "space-between" })} }
  .flex-left { ${layout.flex({ justify: "flex-start" })} }
  .flex-right { ${layout.flex({ justify: "flex-end" })} }
  .flex-upper-lower { ${layout.flex({
    justify: "space-between",
    align: "space-between",
    direction: "column",
  })} }
  .layout-upper {
    alight-items: start;
  }
  .layout-lower {
    alight-items: end;
  }
  .layout-sides {
    alight-items: space-between;
  }
  /* Spacing */
  ${spacing.map((space) => `.gap-${space} { gap: ${space}px; }`)}
  /* Border Radius */
  ${radius.map((rad) => `.radius-${rad} { border-radius: ${rad}px }`)}
`;
