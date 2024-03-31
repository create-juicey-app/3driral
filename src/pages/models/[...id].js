import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Box, Typography, Alert, Button } from "@mui/joy";
import { useRouter } from "next/router";
import { Canvas, extend, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { MTLLoader } from "three/addons/loaders/MTLLoader.js";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";
import * as THREE from "three";

extend({ OrbitControls });

const CameraControls = ({ target, fitToObject }) => {
  const { camera, gl } = useThree();
  const controls = useRef();

  useEffect(() => {
    controls.current = new OrbitControls(camera, gl.domElement);
    if (target) {
      const boundingBox = new THREE.Box3().setFromObject(target);
      const center = boundingBox.getCenter(new THREE.Vector3());
      const size = boundingBox.getSize(new THREE.Vector3());
      const maxSize = Math.max(size.x, size.y, size.z);
      const fitOffset = maxSize * 2;

      controls.current.target.copy(center);
      controls.current.update();

      if (fitToObject) {
        const direction = controls.current.target
          .clone()
          .sub(camera.position)
          .normalize()
          .multiplyScalar(fitOffset);
        camera.position.copy(controls.current.target.clone().add(direction));
        camera.near = fitOffset / 100;
        camera.far = fitOffset * 100;
        camera.updateProjectionMatrix();
      }
    }
    return () => controls.current.dispose();
  }, [camera, gl, target, fitToObject]);

  useFrame(() => {
    controls.current.update();
  });

  return null;
};

const ModelPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loadedObject, setLoadedObject] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pathId = router.asPath.split("/").pop();
        const response = await axios.get("/api/database");
        const itemData = response.data.find((item) => item._id === pathId);
        setData(itemData);
        loadOBJModel(itemData.Filename);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [router.asPath]);

  const loadOBJModel = async (filename) => {
    const objLoader = new OBJLoader();
    const mtlLoader = new MTLLoader();

    mtlLoader.setResourcePath("/textures/"); // Set the resource path for textures

    try {
      const materials = await new Promise((resolve, reject) => {
        mtlLoader.load(`/materials/${filename}.mtl`, resolve, null, reject);
      });

      materials.preload();

      const object = await new Promise((resolve, reject) => {
        objLoader.setMaterials(materials);
        objLoader.load(`/models/${filename}.obj`, resolve, null, reject);
      });

      traverseObject(object);
      setLoadedObject(object);
    } catch (error) {
      setError(error);
    }
  };

  const traverseObject = (object) => {
    object.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.computeBoundingBox();
      }
    });
  };

  const getTimeSince = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 60) return "Recently";
    const intervals = [
      { value: 31536000, name: "year" },
      { value: 2592000, name: "month" },
      { value: 604800, name: "week" },
      { value: 86400, name: "day" },
      { value: 3600, name: "hour" },
      { value: 60, name: "minute" },
    ];
    for (const { value, name } of intervals) {
      const count = Math.floor(seconds / value);
      if (count >= 1) return `${count} ${name}${count > 1 ? "s" : ""}`;
    }
  };

  if (!data) return <Typography>Loading...</Typography>;

  const { Name, Author, Viewcount, Timestamp, Description } = data;

  return (
    <Box sx={{ display: "flex", height: "95vh", overflow: "hidden" }}>
      <Box sx={{ flex: 1, padding: 0, overflow: "hidden" }}>
        <Canvas style={{ width: "100%", height: "100%" }}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          {loadedObject && (
            <>
              <CameraControls target={loadedObject} fitToObject={true} />
              <mesh>
                <primitive object={loadedObject} />
              </mesh>
            </>
          )}
        </Canvas>
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
          display: "flex",
          height: "100%",
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
          Made {getTimeSince(new Date(Timestamp))} ago
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
          component={Button} // Render a <button> element
        >
          Download Model
        </Button>
      </Box>
    </Box>
  );
};

export default ModelPage;
