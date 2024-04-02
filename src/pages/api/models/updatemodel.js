// pages/api/updatemodel.js
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

  if (req.method === "PUT") {
    try {
      const client = await MongoClient.connect(uri);
      const db = client.db("Jdata");
      const collection = db.collection("models");

      const { Name, Author, Viewcount, Timestamp, Filename, ID, Description } =
        req.body;

      const missingFields = [];
      if (!Name) missingFields.push("Name");
      if (!Author) missingFields.push("Author");
      if (!Timestamp) missingFields.push("Timestamp");
      if (!Filename) missingFields.push("Filename");
      if (!ID) missingFields.push("ID");
      if (!Description) missingFields.push("Description");

      if (missingFields.length > 0) {
        client.close();
        return res.status(400).json({
          error: `Missing required fields: ${missingFields.join(", ")}`,
        });
      }

      const result = await collection.updateOne(
        { _id: new ObjectId(ID) },
        {
          $set: {
            Name,
            Author,
            Viewcount,
            Timestamp,
            Filename,
            Description,
          },
        }
      );

      client.close();
      res.status(200).json({
        message: "Data updated successfully",
        modifiedCount: result.modifiedCount,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to update data" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
