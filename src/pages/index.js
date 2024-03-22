import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Typography } from "@mui/joy";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      padding: "10px",}}>
      <Typography level="h1">Main page</Typography>
    </div>
  );
}
