import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Box, Stack, Typography, Button, Alert } from "@mui/joy";
import { useRouter } from "next/router";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

const ModelPage = () => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("Idle");
  const [error, setError] = useState(null);
  const [objData, setObjData] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const canvasRef = useRef(null);

  useEffect(() => {
    console.log("useEffect called");
    const pathId = router.asPath.split("/").pop();
    console.log("Path ID:", pathId);
    fetchData(pathId);
  }, [router.asPath]);

  useEffect(() => {
    if (data) {
      const { Filename } = data;
      fetchObjData(Filename);
    }
  }, [data]);

  const fetchObjData = async (filename) => {
    try {
      const response = await axios.get(`/api/loadmodel?filename=${filename}`, {
        responseType: "arraybuffer",
      });
      const objDataBuffer = response.data;
      const objDataString = new TextDecoder().decode(objDataBuffer);
      setObjData(objDataString);
    } catch (error) {
      console.error("Error fetching OBJ data", error);
      setError("Failed to load OBJ file");
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return; // Return early if canvasRef.current is null

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasRef.current.appendChild(renderer.domElement); // Append to canvas only if canvasRef.current is not null

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(0, 0, 20);
    scene.add(pointLight);

    const objLoader = new OBJLoader();
    objLoader.setPath("/models/");

    const renderModel = (objDataString) => {
      objLoader.parse(objDataString, (object) => {
        scene.add(object);
        const box = new THREE.Box3().setFromObject(object);
        const size = box.getSize(new THREE.Vector3()).length();
        const center = box.getCenter(new THREE.Vector3());
        camera.position.x = center.x;
        camera.position.y = center.y;
        camera.position.z = center.z + size / 0.5;
        camera.lookAt(center);
        camera.near = size / 100;
        camera.far = size * 100;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        const animate = () => {
          requestAnimationFrame(animate);
          object.rotation.x += 0.01;
          object.rotation.y += 0.01;
          renderer.render(scene, camera);
        };
        animate();
      });
    };

    if (objData) {
      renderModel(objData);
    }

    return () => {
      // Clean up resources when the component unmounts
      renderer.dispose();
    };
  }, [objData]);

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

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box sx={{ flex: 1, backgroundColor: "#111", padding: 2 }}>
        <canvas ref={canvasRef} />
        {error && (
          <Alert variant="soft" sx={{ marginTop: 2 }}>
            {error}
          </Alert>
        )}
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
