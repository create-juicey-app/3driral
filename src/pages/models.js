import React, { useState, useEffect } from "react";
import axios from "axios";
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
import CircularProgress from "@mui/joy/CircularProgress";
import { Grid, Input, Select, Option } from "@mui/joy";
import Tooltip from "@mui/material/Tooltip";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import {
  DisabledByDefaultRounded,
  Filter1Rounded,
  FilterAltRounded,
  FilterRounded,
  KeyboardArrowDownRounded,
  StarBorderRounded,
  StarRateRounded,
  VisibilityRounded,
} from "@mui/icons-material";

const YosemiteCards = () => {
  const [models, setModels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortValue, setSortValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/database");
        setModels(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setHasError(error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  function getSecondsDifference(date1, date2) {
    const diffInMilliseconds = Math.abs(date1 - date2);
    return diffInMilliseconds / 1000;
  }

  function getTimeSinceString(date) {
    const currentDate = new Date();
    const secondsDifference = getSecondsDifference(currentDate, date);

    const intervals = [
      { value: 31536000, name: "year" },
      { value: 2592000, name: "month" },
      { value: 604800, name: "week" },
      { value: 86400, name: "day" },
      { value: 3600, name: "hour" },
      { value: 60, name: "minute" },
      { value: 1, name: "second" },
    ];

    for (const interval of intervals) {
      const count = Math.floor(secondsDifference / interval.value);
      if (count >= 1) {
        return `${count} ${interval.name}${count !== 1 ? "s" : ""} ago`;
      }
    }

    return "Just now";
  }

  const sortedModels = models.filter((model) =>
    model.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (sortValue === "newest") {
    sortedModels.sort((a, b) => new Date(b.Timestamp) - new Date(a.Timestamp));
  } else if (sortValue === "oldest") {
    sortedModels.sort((a, b) => new Date(a.Timestamp) - new Date(b.Timestamp));
  } else if (sortValue === "mostViews") {
    sortedModels.sort((a, b) => b.Viewcount - a.Viewcount);
  } else if (sortValue === "leastViews") {
    sortedModels.sort((a, b) => a.Viewcount - b.Viewcount);
  }

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress
          color="primary"
          determinate={false}
          size="lg"
          value={25}
          variant="soft"
        />
      </div>
    );
  }

  if (hasError) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress
          color="danger"
          determinate={false}
          size="lg"
          value={50}
          variant="soft"
        />
        <Typography variant="h6" color="danger" style={{ marginTop: "20px" }}>
          Error: {hasError.message}
        </Typography>
      </div>
    );
  }

  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        sx={{ margin: "20px", justifyContent: "center" }}
      >
        <Input
          sx={{ borderRadius: "40px" }}
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          startDecorator={<SearchIcon />}
        />
        <Select
          sx={{ borderRadius: "18px" }}
          color="neutral"
          placeholder="Sort"
          size="md"
          variant="outlined"
          startDecorator={<FilterAltRounded />}
          value={sortValue}
          onChange={(e, value) => setSortValue(value)}
        >
          <Option value="">
            <DisabledByDefaultRounded />
            Default
          </Option>
          <Option value="newest">
            <KeyboardArrowUpRoundedIcon />
            Newest
          </Option>
          <Option value="oldest">
            <KeyboardArrowDownRounded />
            Oldest
          </Option>
          <Option value="mostViews">
            <StarRateRounded />
            Most Views
          </Option>
          <Option value="leastViews">
            <StarBorderRounded />
            Least Views
          </Option>
        </Select>
      </Stack>
      {sortedModels.length === 0 ? (
        <>
          <Typography
            level="h4"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
          >
            Nothing meets your criteria
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "10vh", // This will make the div take the full height of the viewport
            }}
          >
            <Image
              alt="Nothing"
              src="/Nothin.png"
              width={210.5}
              height={320}
            ></Image>
          </div>
        </>
      ) : (
        <Grid
          sx={{ margin: "20px", flexGrow: 1 }}
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {sortedModels.map((model) => (
            <Card
              key={model._id}
              variant="outlined"
              sx={{ maxWidth: 420, margin: "10px", borderRadius: "20px" }}
            >
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
                    <Link href={`/models/${model._id}`} underline="none">
                      {model.Name}
                    </Link>
                  </Typography>
                </Stack>
                <Typography level="body-sm">
                  <Link href="#multiple-actions">{model.Author}</Link>
                </Typography>
              </CardContent>
              <CardOverflow variant="soft">
                <Divider inset="context" />
                <CardContent orientation="horizontal">
                  <Stack direction="column" alignItems="center">
                    <div>
                      <Typography level="body">{model.Viewcount}</Typography>
                    </div>
                    Views
                  </Stack>
                  <Divider orientation="vertical" />
                  <Typography level="body">
                    {getTimeSinceString(new Date(model.Timestamp))}
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ ml: "auto" }}>
                    {isSmallScreen ? (
                      <>
                        <Tooltip
                          sx={{ borderRadius: "40px" }}
                          title="Download"
                          variant="outlined"
                        >
                          <IconButton
                            sx={{ borderRadius: "40px" }}
                            variant="solid"
                            color="primary"
                          >
                            <Download />
                          </IconButton>
                        </Tooltip>
                        <Tooltip
                          sx={{ borderRadius: "40px" }}
                          title="View"
                          variant="outlined"
                        >
                          <IconButton
                            sx={{ borderRadius: "40px" }}
                            variant="outlined"
                            color="neutral"
                          >
                            <SearchIcon />
                          </IconButton>
                        </Tooltip>
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
          ))}
        </Grid>
      )}
    </>
  );
};

export default YosemiteCards;
