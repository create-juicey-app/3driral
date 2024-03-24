import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Stack, Typography, Button } from "@mui/joy";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

// Load the OBJModel component dynamically on the client-side
const OBJModel = dynamic(
  () => import("react-3d-viewer").then((module) => module.OBJModel),
  {
    ssr: false, // Disable server-side rendering for this component
  }
);

const ModelPage = () => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("Idle");
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    console.log("useEffect called");
    const pathId = router.asPath.split("/").pop();
    console.log("Path ID:", pathId);
    fetchData(pathId);
  }, [router.asPath]);

  const fetchData = async (itemId) => {
    setStatus("Sending");
    console.log("Fetching data from API...");
    try {
      const response = await axios.get("/api/database");
      console.log("API response:", response.data);
      const allData = response.data;
      console.log("All data:", allData);
      const itemData = allData.find((item) => item._id === itemId);
      console.log("Found item data:", itemData);
      setData(itemData);
      setStatus("Getting");
    } catch (error) {
      console.error("Error fetching data", error);
      setStatus("Error");
      setError(error);
    }
  };

  if (!data) {
    return <Typography>Loading...</Typography>;
  }

  const { Name, Author, Viewcount, Timestamp, Description, Filename } = data;

  function getSecondsDifference(date1, date2) {
    const diffInMilliseconds = Math.abs(date1 - date2);
    return diffInMilliseconds / 1000;
  }

  // Helper function to calculate the time elapsed since the Timestamp
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
        return `${count} ${interval.name}${count !== 1 ? "s" : ""}`;
      }
    }
    return "Recently";
  }

  console.log(`/models/${Filename}`);
  console.log(`File name: ${Filename}`);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box sx={{ flex: 1, backgroundColor: "#111", padding: 2 }}>
        {OBJModel && (
          <OBJModel
            width="400"
            height="400"
            position={{ x: 0, y: -100, z: 0 }}
            src={`/models/${Filename}`}
          />
        )}
        <img src={`/models/${Filename}`} alt="Model" />;
      </Box>
      <Box sx={{ flex: 1, backgroundColor: "#222", padding: 2 }}>
        <Typography level="h1" variant="soft" sx={{ borderRadius: "50px" }}>
          {Name}
        </Typography>
        <Typography level="h3" sx={{ marginLeft: "3vw" }} mb={1}>
          By {Author}
        </Typography>
        <Typography sx={{ marginLeft: "3vw" }} mb={1}>
          Views: {Viewcount}
        </Typography>
        <Typography sx={{ marginLeft: "3vw" }} mb={2}>
          Made {getTimeSinceString(new Date(Timestamp))} ago
        </Typography>
        <Typography sx={{ marginLeft: "3vw" }} level="h4" mb={1}>
          Description:
        </Typography>
        <Typography
          sx={{ marginLeft: "3vw", width: "40vw", marginBottom: "3vh" }}
          variant="soft"
        >
          {Description}
        </Typography>
        <Button sx={{ marginLeft: "3vw" }} variant="solid">
          Download Model
        </Button>
      </Box>
    </Box>
  );
};

export default ModelPage;
