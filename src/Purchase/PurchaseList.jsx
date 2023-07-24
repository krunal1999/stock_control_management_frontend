import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import PlaceOrderService from "./placeorder/PlaceOrderService";
import { useState } from "react";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "purchaseid", headerName: "PurchaseId", width: 130 },
  { field: "productname", headerName: "Product Name", width: 130 },

  {
    field: "vendoruniquename",
    headerName: "Vendor Name",
    width: 160,
  },
  { field: "quantity", headerName: "Quantity", width: 130 },

  { field: "total", headerName: "Total", width: 200 },
  { field: "orderstatus", headerName: "OrderStatus", width: 130 },
  { field: "billstatus", headerName: "Bill Status", width: 130 },
];

const PurchaseList = ({ filter }) => {
  const rows = [];
  const [purchaselist, setpurchaseList] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await PlaceOrderService.getAllPurchaseList();
        setpurchaseList(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    
    fetchdata();
  },[]);

  purchaselist.forEach((pl) => {
    if (filter === "ORDERED") {
      if (pl.orderstatus === "ORDERED") {
        rows.unshift(pl);
      }
    }else if (filter === "UNPAID") {
      if (pl.billstatus === "UNPAID") {
        rows.unshift(pl);
      }
    }
    else{
      rows.unshift(pl);
    }
  });


  

  return (
    <div style={{ height: "600px", width: "100%", overflowX: "scroll" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20]}
      />
    </div>
  );
};

export default PurchaseList;
