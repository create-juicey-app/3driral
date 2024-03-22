import { ChangeCircle } from "@mui/icons-material";
import { IconButton, useColorScheme } from "@mui/joy";
import { useState } from "react";


export default function Themetest() {
    const { mode, setMode } = useColorScheme();
    const [mounted, setMounted] = useState(false);
  return (
    <IconButton variant="solid" color="primary" onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
    >
        <ChangeCircle />
    </IconButton>     
  )
}
