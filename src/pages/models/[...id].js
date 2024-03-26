import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Box, Typography, Alert, Button } from "@mui/joy";
import { useRouter } from "next/router";
import {
  Vector3,
  Color3,
  ActionManager,
  SetValueAction,
  SceneLoader,
} from "@babylonjs/core";
import { Cylinder, Engine, Scene, Sphere } from "react-babylonjs";

const ModelPage = () => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("Idle");
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    const pathId = router.asPath.split("/").pop();
    fetchData(pathId);
  }, [router.asPath]);

  const fetchData = async (itemId) => {
    setStatus("Sending");
    try {
      const response = await axios.get("/api/database");
      const allData = response.data;
      const itemData = allData.find((item) => item._id === itemId);
      setData(itemData);
      setStatus("Getting");
      fetchObjData(itemData.Filename);
    } catch (error) {
      setStatus("Error");
      setError(error);
    }
  };

  const fetchObjData = async (filename) => {
    try {
      const response = await axios.get(
        `/api/loadmodeltest?filename=${filename}`
      );
      const objDataString = response.data;
      renderModel(objDataString);
    } catch (error) {
      setError(error);
    }
  };

  const renderModel = (objDataString) => {
    if (sceneRef.current) {
      SceneLoader.ImportMesh(
        "",
        `data:${objDataString}`,
        "",
        sceneRef.current,
        (newMeshes) => {
          console.log("Meshes imported:", newMeshes);
          // Handle imported meshes here if needed
        },
        null,
        null,
        ".obj"
      );
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

  return (
    <Box sx={{ display: "flex", height: "95vh", overflow: "hidden" }}>
      <Box
        sx={{
          flex: 1,
          padding: 0,
          overflow: "hidden",
        }}
      >
        <Engine
          antialias={true}
          adaptToDeviceRatio={true}
          canvasId="sample-canvas"
        >
          <Scene ref={sceneRef} id="sample-canvas">
            <arcRotateCamera
              name="camera1"
              alpha={Math.PI / -2}
              beta={Math.PI / 2}
              radius={0.05}
              target={Vector3.Zero()}
              minZ={0.001}
            />
            <hemisphericLight
              name="light1"
              intensity={0.8}
              direction={Vector3.Up()}
            />
            <Sphere name="sphere1" diameter={0.005} />
            {/* model from api goes here */}
          </Scene>
        </Engine>
        {error && (
          <Alert variant="soft" sx={{ marginTop: 2 }}>
            <Typography>{error.toString()}</Typography>
          </Alert>
        )}
      </Box>
      <Box
        sx={{
          flex: 1,
          backgroundColor: "#222",
          padding: 2,
          overflowY: "hidden", // Prevent scrolling
          overflowx: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
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
        <Button
          sx={{ marginLeft: "3vw", marginRight: "3vw", marginTop: "1vh" }}
          variant="solid"
        >
          Download Model
        </Button>
      </Box>
    </Box>
  );
};

export default ModelPage;
