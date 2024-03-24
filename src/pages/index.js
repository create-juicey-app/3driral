import { Inter } from "next/font/google";
import { Typography, Button } from "@mui/joy";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: "10px",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <Typography
        level="h1"
        sx={{ alignSelf: "center", textAlign: "center", marginBottom: "25px" }}
      >
        Main page
      </Typography>
    </div>
  );
}
