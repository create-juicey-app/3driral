import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), "public/models/woody.obj");
  const fileContent = fs.readFileSync(filePath, "utf8");

  res.status(200).send(fileContent);
}
