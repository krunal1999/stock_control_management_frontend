import { Button, Grid, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import PurchaseList from "./PurchaseList";
import AdminLayout from "../layouts/AdminLayout";

const Purchase = () => {
  const nav = useNavigate();

  function handleClick(e) {
    e.stopPropagation();
    nav("/admin/purchase/purchaseorder");
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
                  Make Purchase
                </Button>
              </div>
            </Paper>
          </Grid>

          {/* div with list */}

          <Grid item xs={12}>
            <Paper varient="outlined" elevation={2}>
              <PurchaseList filter={true} />
            </Paper>
          </Grid>
        </Grid>
      </AdminLayout>
    </>
  );
};

export default Purchase;
