import { extendTheme } from "@mui/joy";

const Aritheme = extendTheme({
  colors: {
    primary: {
      500: "#8421ea", // Primary purple color
    },
    secondary: {
      500: "#4c0d99", // Darker secondary color
    },
  },
  styles: {
    global: {
      body: {
        bg: "#1a1a1a", // Dark background color
        color: "#f4f4f4", // Light text color
      },
    },
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          solidBg: "#b476f5", // Lighter primary color for solid background
          solidHoverBg: "#aa68e2", // Hover color for solid background
          solidActiveBg: "#9d51d1", // Active color for solid background
          outlinedColor: "#b476f5", // Lighter primary color for outlined components
          outlinedBorder: "#b476f5", // Lighter primary color for outlined border
          outlinedHoverBg: "#f0f0f0", // Hover background color for outlined components (darker than default)
          outlinedActiveBg: "#e0e0e0", // Active background color for outlined components (darker than default)
          softBg: "#7e3c9e", // Darker purple background for soft secondary buttons
          softHoverBg: "#6e338b", // Hover background for soft secondary buttons
          softActiveBg: "#5e2a78", // Active background for soft secondary buttons
        },
        secondary: {
          solidBg: "#4c0d99", // Darker secondary color for solid background
          solidHoverBg: "#44098a", // Hover color for solid background
          solidActiveBg: "#3c087b", // Active color for solid background
          outlinedColor: "#4c0d99", // Darker secondary color for outlined components
          outlinedBorder: "#4c0d99", // Darker secondary color for outlined border
          outlinedHoverBg: "#f0f0f0", // Hover background color for outlined components (darker than default)
          outlinedActiveBg: "#e0e0e0", // Active background color for outlined components (darker than default)
        },
        focusVisible: "rgba(132, 33, 234, 0.6)", // Focus visible color
      },
    },
    dark: {
      palette: {
        primary: {
          solidBg: "#6a13bb", // Darker primary color for solid background
          solidHoverBg: "#5b11a2", // Hover color for solid background
          solidActiveBg: "#4d0d89", // Active color for solid background
          outlinedColor: "#6a13bb", // Darker primary color for outlined components
          outlinedBorder: "#6a13bb", // Darker primary color for outlined border
          outlinedHoverBg: "#2c2c2c", // Hover background color for outlined components (darker than default)
          outlinedActiveBg: "#1c1c1c", // Active background color for outlined components (darker than default)
          softBg: "#48166b", // Darker purple background for soft primary buttons
          softHoverBg: "#6a209d", // Hover background for soft primary buttons
          softActiveBg: "#400767", // Active background for soft primary buttons
        },
        secondary: {
          solidBg: "#3c087b", // Darker secondary color for solid background
          solidHoverBg: "#34076b", // Hover color for solid background
          solidActiveBg: "#2c065b", // Active color for solid background
          outlinedColor: "#3c087b", // Darker secondary color for outlined components
          outlinedBorder: "#3c087b", // Darker secondary color for outlined border
          outlinedHoverBg: "#2c2c2c", // Hover background color for outlined components (darker than default)
          outlinedActiveBg: "#1c1c1c", // Active background color for outlined components (darker than default)
          softBg: "#2c065b", // Darker purple background for soft secondary buttons
          softHoverBg: "#24054d", // Hover background for soft secondary buttons
          softActiveBg: "#1c043f", // Active background for soft secondary buttons
        },
        focusVisible: "rgba(132, 33, 234, 0.6)", // Focus visible color
      },
    },
  },
  focus: {
    default: {
      outlineWidth: "3px",
    },
  },
  fontFamily: {
    body: "Share Tech Mono, Arial",
  },
  components: {
    JoyButton: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          "&:focus": theme.focus.default,
          fontWeight: 600,
          ...(ownerState.size === "md" && {
            borderRadius: "0.375rem",
            paddingInline: "1rem",
          }),
        }),
      },
    },
  },
});

export default Aritheme;
