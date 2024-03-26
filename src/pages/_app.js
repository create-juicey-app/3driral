import { Box, IconButton } from "@mui/material";
import { Avatar, Button, Stack, Typography, CssBaseline, CssVarsProvider, ThemeProvider, Sheet  } from "@mui/joy";
import Image from "next/image";
import Link from "next/link";
import { MenuRounded } from "@mui/icons-material";
import "@/styles/globals.css";
import { extendTheme, useColorScheme } from '@mui/joy/styles';
import Themetest from "./themetest";

export default function App({ Component, pageProps }) 
{
  const Aritheme = extendTheme({
  colors: {
    primary: {
      500: '#8421ea', // Primary purple color
    },
    secondary: {
      500: '#4c0d99', // Darker secondary color
    },
  },
  styles: {
    global: {
      body: {
        bg: '#1a1a1a', // Dark background color
        color: '#f4f4f4', // Light text color
      },
    },
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          solidBg: '#8421ea', // Primary purple color for solid background
          solidHoverBg: '#7619d2', // Hover color for solid background
          solidActiveBg: '#6a13bb', // Active color for solid background
          outlinedColor: '#8421ea', // Primary purple color for outlined components
          outlinedBorder: '#8421ea', // Primary purple color for outlined border
          outlinedHoverBg: '#f5f5f5', // Hover background color for outlined components
          outlinedActiveBg: '#e9e9e9', // Active background color for outlined components
        },
        secondary: {
          solidBg: '#4c0d99', // Darker secondary color for solid background
          solidHoverBg: '#44098a', // Hover color for solid background
          solidActiveBg: '#3c087b', // Active color for solid background
          outlinedColor: '#4c0d99', // Darker secondary color for outlined components
          outlinedBorder: '#4c0d99', // Darker secondary color for outlined border
          outlinedHoverBg: '#f5f5f5', // Hover background color for outlined components
          outlinedActiveBg: '#e9e9e9', // Active background color for outlined components
        },
        focusVisible: 'rgba(132, 33, 234, 0.6)', // Focus visible color
      },
    },
    dark: {
      palette: {
        primary: {
          solidBg: '#8421ea', // Primary purple color for solid background
          solidHoverBg: '#7619d2', // Hover color for solid background
          solidActiveBg: '#6a13bb', // Active color for solid background
          outlinedColor: '#8421ea', // Primary purple color for outlined components
          outlinedBorder: '#8421ea', // Primary purple color for outlined border
          outlinedHoverBg: '#3b3b3b', // Hover background color for outlined components
          outlinedActiveBg: '#2c2c2c', // Active background color for outlined components
        },
        secondary: {
          solidBg: '#4c0d99', // Darker secondary color for solid background
          solidHoverBg: '#44098a', // Hover color for solid background
          solidActiveBg: '#3c087b', // Active color for solid background
          outlinedColor: '#4c0d99', // Darker secondary color for outlined components
          outlinedBorder: '#4c0d99', // Darker secondary color for outlined border
          outlinedHoverBg: '#3b3b3b', // Hover background color for outlined components
          outlinedActiveBg: '#2c2c2c', // Active background color for outlined components
        },
        focusVisible: 'rgba(132, 33, 234, 0.6)', // Focus visible color
      },
    },
  },
  focus: {
    default: {
      outlineWidth: '3px',
    },
  },
  fontFamily: {
    body: 'Share Tech Mono, Arial',
  },
  components: {
    JoyButton: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          '&:focus': theme.focus.default,
          fontWeight: 600,
          ...(ownerState.size === 'md' && {
            borderRadius: '0.375rem',
            paddingInline: '1rem',
          }),
        }),
      },
    },
  },
});
  const { mode, setMode } = useColorScheme();
  return (
    <CssVarsProvider 
    defaultMode="dark"
    colorSchemeSelector="forcedark"
    modeStorageKey="darkmode"
    theme={Aritheme}
    disableNestedContext >
      <CssBaseline>
        <Box
          id="forcedark"
          sx={{
            p: 2,
            position: "fixed",
            backgroundColor: "gray",
            borderBottomLeftRadius: "15px",
            borderBottomRightRadius: "15px",
            color: "white",
            width: "100%",
            height: 50,
          }}
        >
          <Stack
            sx={{ top: "-60%", position: "relative" }}
            direction="row"
            spacing={2}
            alignItems="center"
          >
            <Link href="/">
              <Button variant="plain" color="primary" size="sm">
                <Image
                  src="/templogo.png"
                  alt="3DRIRAL"
                  width={100}
                  height={30}
                  placeholder="blur"
                  blurDataURL="/blurtest.jpg"
                  sx={{ borderRadius: "10px" }}
                />
              </Button>
            </Link>
            
            <Link href="/models">
              <Button variant="solid" color="primary">
                <Typography>Models</Typography>
              </Button>
            </Link>
            <div style={{position: "absolute", right: 1}}>
              <Stack direction="row" spacing={2} alignItems="right">
                <Themetest/>
                <Avatar alt="Riral" />
              </Stack>
            </div>
          </Stack>
          
        </Box>
        <Sheet id="forcedark" variant="soft" sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -50, marginTop: '36px' }}>
          <Component {...pageProps} id="forcedark"/>
        </Sheet>
      </CssBaseline>
    </CssVarsProvider>
  );
}