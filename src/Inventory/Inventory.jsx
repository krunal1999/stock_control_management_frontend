import { Box, Button, Paper } from "@mui/material";
import Navbar from "../componets/Navbar";
import Sidebar from "../componets/Sidebar";
import Grid from "@mui/material/Unstable_Grid2";
import AddIcon from "@mui/icons-material/Add";
import "../pagescss/inventory.css";
import InventoryList from "./InventoryList";
import { useNavigate } from "react-router-dom";

const Inventory = () => {
  const nav = useNavigate();

  function handleClick(e) {
    e.stopPropagation();
    nav("/inventory/new");
  }

  return (
    <>
      <Navbar />

      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Sidebar />

        <Box component="main" sx={{ flexGrow: 1, padding: 3, marginTop: 8 }}>
          <Grid container spacing={2}>
            {/* div with add new button */}
            <Grid item xs={12}>
              <Paper varient="outlined" elevation={0}>
                
                <div className="addnewitem">
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleClick}
                  >
                    Add Item
                  </Button>
                </div>
              </Paper>
            </Grid>

            {/* div with list */}

            <Grid item xs={12}>
              <Paper varient="outlined" elevation={2}>
                <InventoryList />
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Inventory;
