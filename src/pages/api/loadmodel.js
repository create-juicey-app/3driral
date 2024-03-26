// pages/api/loadmodel.js
import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const { filename } = req.query;

  try {
    const filePath = path.join(process.cwd(), "public", "models", filename);
    const fileData = await fs.promises.readFile(filePath);
    res.status(200).send(fileData);
  } catch (err) {
    console.error("Error loading OBJ file:", err);
    res.status(500).json({ error: "Failed to load OBJ file" });
  }
}
