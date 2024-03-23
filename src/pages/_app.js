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
} from "@mui/joy";
import Image from "next/image";
import Link from "next/link";
import { SessionProvider, useSession } from "next-auth/react";
import { useColorScheme } from "@mui/joy/styles";
import ViewInArRoundedIcon from "@mui/icons-material/ViewInArRounded";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import Head from "next/head";
import Aritheme from "../theme.js";
import { LoginRounded } from "@mui/icons-material";
import { useRouter } from "next/router";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <CssVarsProvider
      defaultMode="dark"
      colorSchemeSelector="forcedark"
      modeStorageKey="darkmode"
      theme={Aritheme}
      disableNestedContext
    >
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <CssBaseline>
        <SessionProvider session={session}>
          <LogoBar />
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
            }}
          >
            <Component {...pageProps} id="forcedark" />
          </Sheet>
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
            <Avatar alt="Riral" src={session.user.image} />
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
