import React, { useState } from 'react';
import axios from 'axios';
import { ObjectId } from 'bson';
import { Sheet, Input, Button, Typography, LinearProgress } from '@mui/joy';

const DatabaseUpload = () => {
  const [formData, setFormData] = useState({
    Name: '',
    Author: '',
    Viewcount: 0,
    Timestamp: new Date().toISOString(),
    Filename: '',
  });
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadStatus('uploading');

    // Check for empty fields
    const hasEmptyFields = Object.values(formData).some(value => value === '');

    if (hasEmptyFields) {
      console.error('Please fill in all required fields');
      setUploadStatus('error');
      return;
    }

    console.log('formData:', formData);

    try {
      // Generate a new ObjectId string
      const newObjectId = new ObjectId().toString();

      // Set the generated ObjectId as the ID field in the formData
      const requestData = { ...formData, ID: newObjectId };

      const response = await axios.put('/api/databaseupload', requestData);
      console.log(response.data);
      setUploadStatus('success');
      // Reset form data after successful upload
      setFormData({
        Name: '',
        Author: '',
        Viewcount: 0,
        Timestamp: new Date().toISOString(),
        Filename: '',
      });
    } catch (error) {
      console.error(error);
      setUploadStatus('error');
    }
  };

  return (
    <Sheet
      sx={{
        maxWidth: 400,
        mx: 'auto',
        my: 4,
        py: 3,
        px: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRadius: 'sm',
        boxShadow: 'md',
      }}
    >
      <div>
        <Typography level="h4" component="h1">
          Upload Data to Database
        </Typography>
        <form onSubmit={handleSubmit}>
          <Input
            name="Name"
            placeholder="Name"
            value={formData.Name}
            onChange={handleChange}
            required
          />
          <Input
            name="Author"
            placeholder="Author"
            value={formData.Author}
            onChange={handleChange}
            required
          />
          <Input
            name="Filename"
            placeholder="File Name"
            value={formData.Filename}
            onChange={handleChange}
            required
          />
          <Button type="submit" sx={{ mt: 1 }}>
            Upload Data
          </Button>
          {uploadStatus === 'uploading' && (
            <LinearProgress
              sx={{ mt: 2 }}
              color="primary"
              variant="soft"
              value={undefined}
            />
          )}
          {uploadStatus === 'success' && (
            <Typography level="body2" sx={{ mt: 2, color: 'success.plainColor' }}>
              Data uploaded successfully!
            </Typography>
          )}
          {uploadStatus === 'error' && (
            <Typography level="body2" sx={{ mt: 2, color: 'danger.plainColor' }}>
              Error uploading data. Please try again.
            </Typography>
          )}
        </form>
      </div>
    </Sheet>
  );
};

export default DatabaseUpload;
