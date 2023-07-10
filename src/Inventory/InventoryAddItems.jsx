import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import Navbar from "../componets/Navbar";
import Sidebar from "../componets/Sidebar";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";
import InventoryAddItemForm from "./InventoryAddItemForm";

const InventoryAddItems = () => {
  const nav = useNavigate();

  function handleClick(e) {
    e.stopPropagation();
    nav("/inventory");
  }
  return (
    <>
      <Navbar />

      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Sidebar />

        <Box component="main" sx={{ flexGrow: 1, padding: 3, marginTop: 8 }}>
          <Stack>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              alignContent="center"
            >
              <Typography variant="h5">Add New Item</Typography>
              <Button
                variant="contained"
                startIcon={<CancelIcon />}
                onClick={handleClick}
                color="error"
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
          <br />
          <Divider />

          {/* add new item form  */}
          <Paper elevation={10} sx={{ padding: 3, marginTop: 3 }} >
                
                <InventoryAddItemForm />

          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default InventoryAddItems;
