import "./styles.css";
import MainPage from "./MainPage.js";
import { Typography, Box } from "@mui/material";

export default function App() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#afe2ed",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box className="App">
        <Typography
          variant="h3"
          sx={{
            p: 2,
            color: "#ffffff",
            fontFamily: "Verdana",
          }}
        >
          Timezone Converter 🌐
        </Typography>

        <Typography variant="h5" sx={{ p: 2, color: "#ffffff" }}>
          To get started, click two points on the map!
        </Typography>

        <MainPage></MainPage>

        <Typography variant="h6" sx={{ p: 2, color: "#ffffff" }}>
          Please make sure all typed values are in HH:MM format!
        </Typography>
      </Box>
    </Box>
  );
}
