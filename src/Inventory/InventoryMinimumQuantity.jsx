import React, { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { Button, Grid, Paper, Stack, Typography } from "@mui/material";
import InventoryService from "./InventoryService";
import { DataGrid } from "@mui/x-data-grid";
import StatusCards from "../componets/StatusCards";
import { FaCheckCircle } from "react-icons/fa";
import PlaceOrderService from "../Purchase/placeorder/PlaceOrderService";
import { useNavigate } from "react-router-dom";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "productid", headerName: "productid", width: 130 },
  { field: "brand", headerName: "brand", width: 130 },
  { field: "productname", headerName: "productname", width: 130 },

  { field: "quantity", headerName: "quantity", width: 90 },
  { field: "buyprice", headerName: "buyprice", width: 90 },
  {
    field: "remainingquantity",
    headerName: "Remaining Quantity Alert",
    width: 170,
  },
  {
    field: "minimumQuantityAlert",
    headerName: "Mini Quantity Alert",
    width: 170,
  },
  {
    field: "autoReorderEnabled",
    headerName: "Auto Order",
    width: 120,
    renderCell: (param) => {
      return (
        <div className={`cellWithstatus ${param.row.autoReorderEnabled}`}>
          {param.row.autoReorderEnabled}
        </div>
      );
    },
  },
  {
    field: "activestatus",
    headerName: "Product Status",
    width: 120,
    renderCell: (param) => {
      return (
        <div className={`cellWithstatus ${param.row.activestatus}`}>
          {param.row.activestatus}
        </div>
      );
    },
  },
];
const InventoryMinimumQuantity = () => {
  const actionColumn = [
    {
      field: "action",
      width: 120,
      headerName: "Action",
      renderCell: (param) => {
        return (
          <Stack>
            {param.row.autoReorderEnabled === "ACTIVE" ? (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleReorder(param.row.id)}
                sx={{ height: 30 }}
              >
                REORDER
              </Button>
            ) : (
              ""
            )}
          </Stack>
        );
      },
    },
  ];

  const [InventoryListdata, setInventoryListdata] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await InventoryService.getAllProduct();

        setInventoryListdata(res.data);
      } catch (error) {
        console.log("🚀 ~ file: Inventory.jsx:67 ~ fetchdata ~ error:", error);
      }
    };
    fetchdata();
  }, []);

  const rows = [];

  let minimumAlert = 0;
  InventoryListdata.forEach((pl) => {
    if (pl.minimumQuantityAlert >= pl.remainingquantity) {
      rows.unshift(pl);
      minimumAlert = minimumAlert + 1;
    }
  });
  const nav = useNavigate();

  const handleReorder = async (id) => {
    console.log(id);

    try {
      const res = await InventoryService.getPurchaseId(id);

      console.log(
        "🚀 ~ file: Inventory.jsx:67 ~ fetchdata ~ res.data:",
        res.data
      );

      const res1 = await PlaceOrderService.getNewReorderPurchaseId(res.data);

      console.log(
        "🚀 ~ file: InventoryMinimumQuantity.jsx:119 ~ handleReorder ~ res1:",
        res1.data
      );

      nav(`/admin/purchase/emailsend/${res1.data}`);
    } catch (error) {
      console.log("🚀 ~ file: Inventory.jsx:67 ~ fetchdata ~ error:", error);
    }
  };

  return (
    <AdminLayout>
      <Stack direction="row" spacing={6} width={1200}>
        <StatusCards
          title="Minimum QTY Alerts"
          value={minimumAlert}
          maxvalue={minimumAlert}
          cardcolor="#fe8181"
          icon={
            <FaCheckCircle
              style={{ width: 40, height: 40, color: "#b62020" }}
            />
          }
          pathcolour="#b62020"
        />
      </Stack>

      <br />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper varient="outlined" elevation={0}>
            <div className="addnewitem">
              <Typography variant="h5">
                Minimum Quantity Alert And REORDER
              </Typography>
            </div>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper varient="outlined" elevation={2}>
            <div
              style={{ height: "700px", width: "100%", overflowX: "scroll" }}
            >
              <DataGrid
                rows={rows}
                columns={columns.concat(actionColumn)}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                  },
                }}
                pageSizeOptions={[10, 20]}
              />
            </div>
          </Paper>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default InventoryMinimumQuantity;
