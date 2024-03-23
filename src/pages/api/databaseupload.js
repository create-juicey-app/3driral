// pages/api/databaseupload.js

import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const uri = process.env.MONGODB_URI; // MongoDB connection string

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    try {
      const client = await MongoClient.connect(uri);
      const db = client.db('Jdata'); // Access the "Jdata" database
      const collection = db.collection('models'); // Access the "models" collection

      const { Name, Author, Viewcount, Timestamp, Filename, ID } = req.body;

      // Check for missing fields
      const missingFields = [];
      if (!Name) missingFields.push('Name');
      if (!Author) missingFields.push('Author');
      if (!Viewcount) missingFields.push('Viewcount');
      if (!Timestamp) missingFields.push('Timestamp');
      if (!Filename) missingFields.push('Filename');
      if (!ID) missingFields.push('ID');

      if (missingFields.length > 0) {
        client.close();
        return res.status(400).json({ error: `Missing required fields: ${missingFields.join(', ')}` });
      }

      // Insert the data into the "models" collection
      const result = await collection.insertOne({
        Name,
        Author,
        Viewcount,
        Timestamp,
        Filename,
        _id: ID, // Use the provided ID directly (already validated as a valid ObjectId)
      });

      client.close(); // Close the MongoDB connection

      res.status(201).json({ message: 'Data inserted successfully', _id: result.insertedId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to insert data' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}