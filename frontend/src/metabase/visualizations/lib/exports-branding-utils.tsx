import ReactDOMServer from "react-dom/server";
import { t } from "ttag";

import { getSetting } from "metabase/selectors/settings";

type BrandingSize = "xs" | "s" | "m" | "l" | "xl" | "xxl" | "xxxl";

export const getBrandingSize = (width: number): BrandingSize => {
  const sizes: [number, BrandingSize][] = [
    [200, "xs"],
    [600, "s"],
    [960, "m"],
    [1280, "l"],
    [1600, "xl"],
    [1920, "xxl"],
  ];

  for (const [threshold, size] of sizes) {
    if (width < threshold) {
      return size;
    }
  }

  return "xxxl";
};

const svgComponentToBase64 = (Component: JSX.Element): string => {
  const svgString = ReactDOMServer.renderToStaticMarkup(Component);
  const encoded = Buffer.from(svgString, "utf-8").toString("base64");
  return `data:image/svg+xml;base64,${encoded}`;
};

type BrandingConfig = {
  /** Font size */
  fz: number;
  /** Margin between the text and the logo (if any) */
  m: number;
  /** Container padding */
  p: number;
  /** Container height */
  h: number;
  /** Logo height */
  ly: number;
};

/**
 * Returns a configuration object for a branding element based on the given size.
 *
 * @param size - The desired element size (e.g., 's', 'm', 'l', etc.)
 * @returns An object containing font size, margin, padding, height, and logo height.
 */
export const getBrandingConfig = (size: BrandingSize): BrandingConfig => {
  const sizes = ["xs", "s", "m", "l", "xl", "xxl", "xxxl"];
  const sizeIndex = sizes.indexOf(size);

  const fzValues = [10, 12, 14, 18, 20, 24, 28];
  const marginValues = [0, 8, 10, 12, 16, 20, 26];
  const paddingValues = [8, 16, 24, 24, 32, 32, 48];
  const heightValues = [60, 75, 100, 120, 145, 175, 210];
  const logoHeights = [40, 50, 65, 85, 110, 135, 165];

  const getDimension = (values: number[]): number => values[sizeIndex];

  return {
    fz: getDimension(fzValues),
    m: getDimension(marginValues),
    p: getDimension(paddingValues),
    h: getDimension(heightValues),
    ly: getDimension(logoHeights),
  };
};

export const createBrandingElement = (size: BrandingSize, state?: any) => {
  const { fz, h, ly, m, p } = getBrandingConfig(size);

  // Get custom logo from settings, fallback to default Vera Strata logo
  const customLogoUrl = state ? getSetting(state, "application-logo-url") : null;
  const logoSrc = customLogoUrl || "/app/assets/img/logo.svg";

  // Default aspect ratio for Vera Strata logo is ~1.4:1
  // For custom logos, we'll try to maintain aspect ratio but with some constraints
  const LOGO_ASPECT_RATIO = 1.4;
  const LOGO_HEIGHT = ly;
  const LOGO_WIDTH = LOGO_HEIGHT * LOGO_ASPECT_RATIO;

  const container = document.createElement("div");
  container.style.cssText = `
    height: ${h}px;
    width: 100%;
    padding-inline: ${p}px;
    background-color: var(--mb-color-bg-dashboard);
    display: flex;
    align-items: center;
    justify-content: ${size === "xs" ? "center" : "flex-end"};
  `;

  if (size !== "xs") {
    const brandingCopy = document.createElement("span");
    brandingCopy.textContent = t`Powered by`;
    brandingCopy.style.cssText = `
      font-family: "Lato", sans-serif;
      font-size: ${fz}px;
      color: var(--mb-color-text-medium);
      display: inline-block;
      margin-inline-end: ${m}px;
      vertical-align: middle;
      line-height: 1;
    `;
    container.appendChild(brandingCopy);
  }

  const logo = document.createElement("img");
  logo.src = logoSrc;
  logo.width = LOGO_WIDTH;
  logo.height = LOGO_HEIGHT;
  logo.style.cssText = "object-fit: contain; max-width: 250px;"; // Add max-width constraint for very wide logos

  container.appendChild(logo);

  return container;
};
