import React, { useState, useEffect, useRef, Suspense } from "react";
import axios from "axios";
import { Box, Typography, Alert, Button } from "@mui/joy";
import { useRouter } from "next/router";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

const ProgressFallback = ({ loadProgress }) => (
  <mesh>
    <boxGeometry args={[1, 0.1, 0.1]} />
    <meshBasicMaterial color={0xffffff} />
    <meshBasicMaterial
      color={0xff8c00}
      scale={new THREE.Vector3(loadProgress, 1, 1)}
    />
  </mesh>
);

const ScaledModelWithProgress = ({ loadedObject, scaleTo }) => {
  return (
    <Suspense fallback={<ProgressFallback loadProgress={0} />}>
      <primitive
        object={loadedObject}
        scale={new THREE.Vector3(scaleTo, scaleTo, scaleTo)}
      />
    </Suspense>
  );
};

const ModelPage = () => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("Idle");
  const [error, setError] = useState(null);
  const [loadedObject, setLoadedObject] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    const pathId = router.asPath.split("/").pop();
    fetchData(pathId);
  });

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
      const blob = new Blob([objDataString], { type: "text/plain" });
      const url = URL.createObjectURL(blob);

      const objLoader = new OBJLoader();
      objLoader.load(url, (object) => {
        setLoadedObject(object);
      });
    } catch (error) {
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
        <div
          ref={canvasRef}
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          {loadedObject && (
            <React.Suspense fallback={<div>Loading...</div>}>
              <ScaledModelWithProgress
                loadedObject={loadedObject}
                scaleTo={1}
              />
            </React.Suspense>
          )}
        </div>
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
          overflowY: "hidden",
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
