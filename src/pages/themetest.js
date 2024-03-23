import { ChangeCircle } from "@mui/icons-material";
import { IconButton, useColorScheme } from "@mui/joy";
export default function Themetest() {
    const { mode, setMode } = useColorScheme();
  return (
    <IconButton sx={{borderRadius: "80px", aspectRatio: "1/1" }} variant="solid" color="primary" onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}>
        <ChangeCircle fontSize="large"/>
    </IconButton>     
  )
}
