import { Box, Typography } from "@mui/material";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <>
      <Navbar />

      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Sidebar />

        <Box component="main" sx={{ flexGrow: 1, padding: 3, marginTop: 8 }}>
          <Typography>
            
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Home;
