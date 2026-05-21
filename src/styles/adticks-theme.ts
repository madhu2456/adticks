export const adticksTheme = {
  colors: {
    brand: {
      50: "#eaf4ff",
      100: "#d6eaff",
      200: "#acd4ff",
      300: "#78b8ff",
      400: "#3f96f5",
      500: "#1070e0",
      600: "#0b56b3",
      700: "#0a438a",
      800: "#0b366d",
      900: "#082748",
    },
    ink: "#05070a",
    surface: "#ffffff",
    surfaceMuted: "#f5f8fc",
    border: "#d8e2ef",
    borderStrong: "#b8c7da",
    text: "#243244",
    textMuted: "#66758a",
    textInverse: "#ffffff",
    critical: "#d92d20",
    warning: "#f79009",
    success: "#12b76a",
    info: "#1070e0",
  },
  radius: {
    card: "8px",
    control: "6px",
  },
  shadow: {
    focus: "0 0 0 3px rgb(16 112 224 / 22%)",
  },
} as const;

export type AdticksTheme = typeof adticksTheme;
