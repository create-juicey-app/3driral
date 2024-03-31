import {
  Avatar,
  Button,
  Stack,
  Typography,
  CssBaseline,
  CssVarsProvider,
  Sheet,
  ButtonGroup,
  Box,
  IconButton,
  Dropdown,
  MenuButton,
  Menu,
  MenuItem,
  ListItemDecorator,
} from "@mui/joy";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SessionProvider, useSession } from "next-auth/react";
import { useColorScheme } from "@mui/joy/styles";
import ViewInArRoundedIcon from "@mui/icons-material/ViewInArRounded";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import Head from "next/head";
import Aritheme from "../theme.js";
import {
  AccountCircleRounded,
  Login,
  LoginRounded,
  LogoutRounded,
  SettingsRounded,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";

// CSS to hide scrollbars by default
const styles = `
body {
  overflow: hidden;
}
`;

const Layout = ({ children }) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.8, opacity: 0 }}
    transition={{
      type: "spring",
      stiffness: 260,
      damping: 20,
    }}
  >
    {children}
  </motion.div>
);

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();

  // Add event listener to handle scrollbar visibility
  React.useEffect(() => {
    const handleScroll = () => {
      const body = document.body;
      const html = document.documentElement;
      const height = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );
      const scrollPosition =
        window.pageYOffset ||
        (document.documentElement || body.parentNode || body).scrollTop;

      if (height > window.innerHeight && scrollPosition > 0) {
        body.style.overflowY = "auto";
      } else {
        body.style.overflowY = "hidden";
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <CssVarsProvider
      defaultMode="dark"
      colorSchemeSelector="forcedark"
      modeStorageKey="darkmode"
      theme={Aritheme}
      disableNestedContext
      sx={{ backgroundColor: "#1a1a1a" }}
    >
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <style>{styles}</style>
      </Head>
      <CssBaseline>
        <SessionProvider session={session}>
          <LogoBar />

          <Layout key={router.asPath}>
            <Sheet
              id="forcedark"
              variant="soft"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: -50,
                marginTop: "36px",
                overflow: "hidden",
                width: "100vw",
                height: "100vh",
                boxSizing: "border-box",
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <Component
                  style={{ marginTop: "36px" }}
                  {...pageProps}
                  id="forcedark"
                />
              </AnimatePresence>
            </Sheet>
          </Layout>
        </SessionProvider>
      </CssBaseline>
    </CssVarsProvider>
  );
}

const LogoBar = () => {
  const { mode } = useColorScheme();
  const logoSrc = mode === "light" ? "/3DriralLight.png" : "/3DriralDark.png";
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <Box
      id="forcedark"
      sx={{
        p: 2,
        zIndex: 100,
        position: "fixed",
        backgroundColor: "primary.solidActiveBg",
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
              src={logoSrc}
              alt="3DRIRAL"
              width={100}
              height={30}
              placeholder="blur"
              blurDataURL="/blurtest.jpg"
              sx={{ borderRadius: "10px" }}
            />
          </Button>
        </Link>
        <ButtonGroup sx={{ borderRadius: "40px" }}>
          <Link href="/models">
            <Button
              sx={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
              startDecorator={<ViewInArRoundedIcon />}
              variant={router.pathname === "/models" ? "soft" : "solid"}
              color="primary"
            >
              <Typography>Models</Typography>
            </Button>
          </Link>
          <Link href="/upload">
            <Button
              sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
              endDecorator={<FileUploadRoundedIcon />}
              variant={router.pathname === "/upload" ? "soft" : "solid"}
              color="primary"
            >
              <Typography>Upload</Typography>
            </Button>
          </Link>
        </ButtonGroup>
        <div style={{ position: "absolute", right: 1 }}>
          {session ? (
            <>
              <Dropdown>
                <MenuButton
                  slots={{ root: IconButton }}
                  slotProps={{ root: { variant: "plain", color: "neutral" } }}
                  sx={{
                    borderRadius: 40,
                    marginTop: "3px",
                    aspectRatio: "1/1",
                  }}
                >
                  <Avatar alt="Riral" src={session.user.image} />
                </MenuButton>
                <Menu
                  variant="outlined"
                  invertedColors
                  aria-labelledby="apps-menu-demo"
                  sx={{
                    "--List-padding": "0.5rem",
                    borderRadius: "10px",
                    "--ListItemDecorator-size": "3rem",
                    gridTemplateColumns: "repeat(3, 100px)",
                    gridAutoRows: "100px",
                    gap: 1,
                  }}
                >
                  <Sheet
                    variant="solid"
                    sx={{
                      padding: "50px",
                      margin: 0,
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  ></Sheet>
                  <MenuItem orientation="horizontal">
                    <ListItemDecorator>
                      <AccountCircleRounded />
                    </ListItemDecorator>
                    Profile
                  </MenuItem>
                  <MenuItem orientation="horizontal">
                    <ListItemDecorator>
                      <SettingsRounded />
                    </ListItemDecorator>
                    Settings
                  </MenuItem>
                  <MenuItem orientation="horizontal">
                    <ListItemDecorator>
                      <LogoutRounded />
                    </ListItemDecorator>
                    Logout
                  </MenuItem>
                </Menu>
              </Dropdown>
            </>
          ) : (
            <Link href="/api/auth/signin">
              <IconButton sx={{ borderRadius: "80px" }} color="primary">
                <LoginRounded />
              </IconButton>
            </Link>
          )}
        </div>
      </Stack>
    </Box>
  );
};
