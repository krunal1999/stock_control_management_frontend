import { Button, Divider, Paper, Stack, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import InventoryUpadteItemForm from "./InventoryUpadteItemForm";

const InventoryUpdateItem = () => {
  const { prodid } = useParams();

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
            <Typography variant="h5">Update Item</Typography>
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

        <Paper elevation={10} sx={{ padding: 3, marginTop: 3 }}>
          <InventoryUpadteItemForm prodid={prodid} />
        </Paper>
      </AdminLayout>
    </>
  );
};

export default InventoryUpdateItem;
