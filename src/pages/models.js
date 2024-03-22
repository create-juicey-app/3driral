import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import Link from "next/link";
import Button from "@mui/joy/Button";
import Download from "@mui/icons-material/Download";
import Stack from "@mui/joy/Stack";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function YosemiteCard() {
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  return (
    <Card variant="outlined" sx={{ maxWidth: 420, margin: "20px", borderRadius:'20px' }}>
      <CardOverflow>
        <AspectRatio ratio="2">
          <Image
            src="/Placeholder2.png"
            srcSet="/Placeholder2.png x2"
            loading="eager"
            width={700}
            height={500}
            placeholder="blur"
            blurDataURL="/blurtest.jpg"
            alt="title"
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Stack direction="row" spacing={1} alignItems="center" mb={1}>
          <LocationOnIcon color="primary" />
          <Typography level="title-md">
            <Link href="{id}" overlay underline="none">
              Testing
            </Link>
          </Typography>
        </Stack>
        <Typography level="body-sm">
          <Link href="#multiple-actions">Juicey</Link>
        </Typography>
      </CardContent>
      <CardOverflow variant="soft">
        <Divider inset="context" />
        <CardContent orientation="horizontal">
          <Typography level="body-xs">1 views</Typography>
          <Divider orientation="vertical" />
          <Typography level="body-xs">1 hour ago</Typography>
          <Stack direction="row" spacing={1} sx={{ ml: "auto" }}>
            {isSmallScreen ? (
              <>
                <IconButton variant="solid" color="primary">
                  <Download />
                </IconButton>
                <IconButton variant="outlined" color="neutral">
                  <SearchIcon />
                </IconButton>
              </>
            ) : (
              <>
                <Button
                  variant="solid"
                  color="primary"
                  startDecorator={<Download />}
                >
                  Download
                </Button>
                <Button
                  variant="outlined"
                  color="neutral"
                  startDecorator={<SearchIcon />}
                >
                  View
                </Button>
              </>
            )}
          </Stack>
        </CardContent>
      </CardOverflow>
    </Card>
  );
}
