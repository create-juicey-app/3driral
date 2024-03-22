import { Box, IconButton } from "@mui/material";
import { Button, Stack, Typography } from "@mui/joy";
import Image from "next/image";
import Link from "next/link";
import { MenuRounded } from "@mui/icons-material";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Box
        sx={{
          p: 2,
          backgroundColor: "primary.main",
          color: "white",
          height: 50,
        }}
      >
        <Stack
          sx={{ top: "-60%", position: "relative" }}
          direction="row"
          spacing={2}
          alignItems="center"
        >
          <IconButton color="inherit">
            <MenuRounded />
          </IconButton>
          <Link href="/">
            <Button variant="contained" color="primary">
              <Image
                src="/templogo.png"
                alt="3DRIRAL"
                width={100}
                height={30}
                placeholder="blur"
                sx={{ borderRadius: "10px" }}
              />
            </Button>
          </Link>

          <Link href="/models">
            <Button variant="contained" color="primary">
              <Typography>Models</Typography>
            </Button>
          </Link>
        </Stack>
      </Box>
      <Component {...pageProps} />
    </>
  );
}
