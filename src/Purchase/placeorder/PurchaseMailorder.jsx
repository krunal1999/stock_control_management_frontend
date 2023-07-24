import { Grid, Paper, Typography } from "@mui/material";

import PurchaseOrderMailForm from "./PurchaseOrderMailForm";
import AdminLayout from "./../../layouts/AdminLayout";

const PurchaseMailorder = () => {
  return (
    <>
      <AdminLayout>
        <Grid container spacing={2}>
          {/* div with add new button */}
          <Grid item xs={12}>
            <Paper varient="outlined" elevation={0}>
              <div>
                <Typography variant="h5"> Send Mail to </Typography>
              </div>
            </Paper>
          </Grid>

          {/* div with list */}

          <Grid item xs={12}>
            <Paper varient="outlined" elevation={2}>
              <PurchaseOrderMailForm />
            </Paper>
          </Grid>
        </Grid>
      </AdminLayout>
    </>
  );
};

export default PurchaseMailorder;
