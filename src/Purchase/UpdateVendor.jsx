import { Button, Divider, Paper, Stack, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import UpdateVendorDetails from "./UpdateVendorDetails";

const UpdateVendor = () => {

  const { vendoruniquename } = useParams();
  const nav = useNavigate();

  function handleClick(e) {
    e.stopPropagation();
    nav("/admin/purchase/vendor");
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
            <Typography variant="h5"> Update Vendor</Typography>
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
          <UpdateVendorDetails id={vendoruniquename} />
        </Paper>
      </AdminLayout>
    </>
  );
};

export default UpdateVendor;
