import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const directoryPath = path.join(
    process.cwd(),
    "public",
    "models",
    "woody.obj"
  ); // Change this to the desired directory path

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error("Error occurred while reading directory:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    res.status(200).json({ files });
  });
}
