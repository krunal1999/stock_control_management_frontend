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
  {
    field: "orderstatus",
    headerName: "OrderStatus",
    width: 130,
    renderCell: (param) => {
      return (
        <div className={`cellWithstatus ${param.row.orderstatus}`}>
          {param.row.orderstatus}
        </div>
      );
    },
  },
  {
    field: "billstatus",
    headerName: "Bill Status",
    width: 130,
    renderCell: (param) => {
      return (
        <div className={`cellWithstatus ${param.row.billstatus}`}>
          {param.row.billstatus}
        </div>
      );
    },
  },
];

const PurchaseList = ({ filter, onUnpaidBills }) => {
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
  }, []);

  let unpaidBills;
  let totalUnpaidAmount=0;

  
  purchaselist.forEach((pl) => {
    if (filter === "ORDERED") {
      if (pl.orderstatus === "ORDERED") {
        rows.unshift(pl);
      }else{

      }
    } else if (filter === "UNPAID") {
      if (pl.billstatus === "UNPAID") {
        rows.unshift(pl);
        
        totalUnpaidAmount += parseFloat(pl.total)
      }
    } else if (pl.orderstatus === "") {
      
    }else{
      rows.unshift(pl);
    }
  });

  
  if (filter === "UNPAID") {
   
    unpaidBills = rows.length
    onUnpaidBills(unpaidBills,totalUnpaidAmount)
  }

  

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
