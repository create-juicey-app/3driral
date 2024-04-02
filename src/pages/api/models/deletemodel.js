// pages/api/deletemodel.js
import { getSession } from "next-auth/react";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "DELETE") {
    try {
      const client = await MongoClient.connect(uri);
      const db = client.db("Jdata");
      const collection = db.collection("models");

      const { ID } = req.body;

      if (!ID) {
        client.close();
        return res.status(400).json({ error: "ID is required" });
      }

      const result = await collection.deleteOne({ _id: new ObjectId(ID) });

      client.close();
      res.status(200).json({
        message: "Data deleted successfully",
        deletedCount: result.deletedCount,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to delete data" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
