import { Button, Paper } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import AddIcon from "@mui/icons-material/Add";
import "../pagescss/inventory.css";
import InventoryList from "./InventoryList";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";

const Inventory = () => {
  const nav = useNavigate();

  function handleClick(e) {
    e.stopPropagation();
    nav("/inventory/new");
  }

  return (
    <>
      <AdminLayout>
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
      </AdminLayout>
    </>
  );
};

export default Inventory;
