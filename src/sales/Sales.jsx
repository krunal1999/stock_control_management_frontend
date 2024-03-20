import { Button, Grid, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import SalesList from "./SalesList";
import { useState } from "react";
import { useEffect } from "react";
import SalesService from "./SalesService";

const Sales = () => {
  const nav = useNavigate();

  function handleClick(e) {
    e.stopPropagation();
    nav("/admin/sales/orders");
  }

   const rows = [];
   const [salesList, setsalesList] = useState([]);

   useEffect(() => {
     const fetchdata = async () => {
       try {
         const res = await SalesService.getallorder();
         setsalesList(res.data);
 
         console.log(res.data);
       } catch (error) {
         console.log(error);
       }
     };
 
     fetchdata();
   }, []);
 
   
   salesList.forEach((pl) => {
     if (pl.orderid > 0 ) {
       rows.unshift(pl);
     }
   });

  return (
    <>
      <AdminLayout>
        <Grid container spacing={2}>
          
          <Grid item xs={12}>
            <Paper varient="outlined" elevation={0}>
              <div className="addnewitem">
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleClick}
                >
                  view order
                </Button>
              </div>
            </Paper>
          </Grid>

          

          <Grid item xs={12}>
            <Paper varient="outlined" elevation={2}>
              <SalesList rows={rows}/>
            </Paper>
          </Grid>
        </Grid>
      </AdminLayout>
    </>
  );
};

export default Sales;
