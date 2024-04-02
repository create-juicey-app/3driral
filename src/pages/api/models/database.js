// pages/api/models.js

import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const uri = process.env.MONGODB_URI; // MongoDB connection string
const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return "[Circular Reference]";
      }
      seen.add(value);
    }
    return value;
  };
};
export default async function handler(req, res) {
  const {
    query: { id },
  } = req;
  if (req.method === "GET") {
    try {
      const client = await MongoClient.connect(uri);
      const db = client.db("Jdata");
      const collection = db.collection("models");
      const data = id
        ? await collection.findOne({ _id: id[0] })
        : await collection.find().toArray();
      client.close();

      // Convert data to JSON, replacing circular references
      const safeData = JSON.stringify(data, getCircularReplacer());

      res.status(200).json(JSON.parse(safeData));
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch data" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
