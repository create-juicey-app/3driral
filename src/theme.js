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
          solidBg: "#b476f5",
          solidHoverBg: "#aa68e2",
          solidActiveBg: "#9d51d1",
          outlinedColor: "#b476f5",
          outlinedBorder: "#b476f5",
          outlinedHoverBg: "#f5f5f5",
          outlinedActiveBg: "#e9e9e9",
        },

        secondary: {
          solidBg: "#4c0d99", // Darker secondary color for solid background
          solidHoverBg: "#44098a", // Hover color for solid background
          solidActiveBg: "#3c087b", // Active color for solid background
          outlinedColor: "#4c0d99", // Darker secondary color for outlined components
          outlinedBorder: "#4c0d99", // Darker secondary color for outlined border
          outlinedHoverBg: "#f5f5f5", // Hover background color for outlined components
          outlinedActiveBg: "#e9e9e9", // Active background color for outlined components
        },
        focusVisible: "rgba(132, 33, 234, 0.6)", // Focus visible color
      },
    },
    dark: {
      palette: {
        primary: {
          solidBg: "#8421ea", // Primary purple color for solid background
          solidHoverBg: "#7619d2", // Hover color for solid background
          solidActiveBg: "#6a13bb", // Active color for solid background
          outlinedColor: "#8421ea", // Primary purple color for outlined components
          outlinedBorder: "#8421ea", // Primary purple color for outlined border
          outlinedHoverBg: "#3b3b3b", // Hover background color for outlined components
          outlinedActiveBg: "#2c2c2c", // Active background color for outlined components
        },
        secondary: {
          solidBg: "#4c0d99", // Darker secondary color for solid background
          solidHoverBg: "#44098a", // Hover color for solid background
          solidActiveBg: "#3c087b", // Active color for solid background
          outlinedColor: "#4c0d99", // Darker secondary color for outlined components
          outlinedBorder: "#4c0d99", // Darker secondary color for outlined border
          outlinedHoverBg: "#3b3b3b", // Hover background color for outlined components
          outlinedActiveBg: "#2c2c2c", // Active background color for outlined components
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
