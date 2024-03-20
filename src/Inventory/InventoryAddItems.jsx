import { Button, Divider, Paper, Stack, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";
import InventoryAddItemForm from "./InventoryAddItemForm";
import AdminLayout from "../layouts/AdminLayout";

const InventoryAddItems = () => {
  const nav = useNavigate();

  function handleClick(e) {
    e.stopPropagation();
    nav("/admin/inventory");
  }
  return (
    <>
      <AdminLayout>
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
        <Paper elevation={10} sx={{ padding: 3, marginTop: 3 }}>
          <InventoryAddItemForm />
        </Paper>
      </AdminLayout>
    </>
  );
};

export default InventoryAddItems;
