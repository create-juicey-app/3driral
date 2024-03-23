// pages/api/models.js

import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const uri = process.env.MONGODB_URI; // MongoDB connection string

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const client = await MongoClient.connect(uri);
      const db = client.db("Jdata"); // Access the "Jdata" database
      const collection = db.collection("models"); // Access the "models" collection
      const data = await collection.find().toArray(); // Fetch all documents from the collection
      client.close(); // Close the MongoDB connection
      res.status(200).json(data); // Return the data as JSON
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch data" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
