import React, { useState } from "react";
import axios from "axios";
import { ObjectId } from "bson";
import {
  Sheet,
  Input,
  Button,
  Typography,
  LinearProgress,
  Textarea,
} from "@mui/joy";
import { useSession, signIn } from "next-auth/react";
import { LoginRounded } from "@mui/icons-material";

const DatabaseUpload = () => {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    Name: "",
    Author: session?.user?.name,
    Viewcount: 0,
    Timestamp: new Date().toISOString(),
    Filename: "",
    Description: "",
  });
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadStatus("uploading");
    if (!session) {
      console.error("You must be connected to upload a model");
      setUploadStatus("error");
      return;
    }
    try {
      const newObjectId = new ObjectId().toString();
      const requestData = { ...formData, ID: newObjectId };
      await axios.put("/api/databaseupload", requestData);
      setUploadStatus("success");
      setFormData({
        Name: "",
        Author: session?.user?.name || "",
        Viewcount: 0,
        Timestamp: new Date().toISOString(),
        Filename: "",
        Description: "",
      });
    } catch (error) {
      console.error(error);
      setUploadStatus("error");
    }
  };

  return (
    <Sheet
      sx={{
        maxWidth: 400,
        mx: "auto",
        my: 4,
        py: 3,
        px: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRadius: "sm",
        boxShadow: "md",
      }}
    >
      <div>
        <Typography level="h4" component="h1">
          Upload Data to Database
        </Typography>
        <br />
        <form onSubmit={handleSubmit}>
          <Input
            name="Name"
            placeholder="Name"
            value={formData.Name}
            onChange={handleChange}
            required
            variant="soft"
          />
          <br />
          <Input
            name="Filename"
            placeholder="File Name"
            value={formData.Filename}
            onChange={handleChange}
            required
            variant="soft"
          />
          <br />
          <Textarea
            name="Description"
            placeholder="Description"
            value={formData.Description}
            onChange={handleChange}
            maxRows={6}
            minRows={3}
            maxLength={2000}
            variant="soft"
          />
          <br />
          {session ? (
            <Button type="submit" sx={{ mt: 1 }}>
              Upload Model
            </Button>
          ) : (
            <Button
              type="button"
              sx={{ mt: 1 }}
              onClick={() => signIn()}
              startDecorator={<LoginRounded />}
            >
              You must be connected to upload a model
            </Button>
          )}
          {uploadStatus === "uploading" && (
            <LinearProgress
              sx={{ mt: 2 }}
              color="primary"
              variant="soft"
              value={undefined}
            />
          )}
          {uploadStatus === "success" && (
            <Typography
              level="body2"
              sx={{ mt: 2, color: "success.plainColor" }}
            >
              Data uploaded successfully!
            </Typography>
          )}
          {uploadStatus === "error" && (
            <Typography
              level="body2"
              sx={{ mt: 2, color: "danger.plainColor" }}
            >
              Error uploading data. Please try again.
            </Typography>
          )}
        </form>
      </div>
    </Sheet>
  );
};

export default DatabaseUpload;
