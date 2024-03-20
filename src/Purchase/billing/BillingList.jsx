import { DataGrid } from "@mui/x-data-grid";
import Billingservice from "./Billingservice";
import { useEffect, useState } from "react";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "bill_id", headerName: "Receieved ID", width: 130 },
  { field: "productname", headerName: "Productname", width: 200 },
  { field: "vendorname", headerName: "Vendorname", width: 200 },
  {
    field: "billstatus",
    headerName: "Bill Status",
    width: 130,
  },
  {
    field: "paidstatus",
    headerName: "Paid Status",
    width: 130,
    renderCell: (param) => {
      return (
        <div className={`cellWithstatus ${param.row.paidstatus}`}>
          {param.row.paidstatus}
        </div>
      );
    },
  },
  {
    field: "paymenttype",
    headerName: "Payment Type",
    width: 130,
    renderCell: (param) => {
      return (
        <div className={`cellWithstatus ${param.row.paymenttype}`}>
          {param.row.paymenttype}
        </div>
      );
    },
  },
  { field: "amount", headerName: "Amount", width: 130 },
  { field: "paymentdate", headerName: "Date", width: 130 },
];

const BillingList = ({ onPaidBills }) => {
  const rows = [];
  const [BillingList, setBillingList] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await Billingservice.getList();
        setBillingList(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchdata();
  }, []);
  let totalpaidAmountCard = 0;
  let totalpaidAmountCash = 0;
  let totalpaidAmountBT = 0;
  let totalpaidAmount =0;
  BillingList.forEach((pl) => {
    rows.unshift(pl);
    totalpaidAmount += parseFloat(pl.amount);
    if(pl.paymenttype === "Card"){
      totalpaidAmountCard += parseFloat(pl.amount);
    }else if(pl.paymenttype === "Cash"){
      totalpaidAmountCash += parseFloat(pl.amount);
    }else{
      totalpaidAmountBT += parseFloat(pl.amount);
    }
    
  });

  if(totalpaidAmount !==0 ){
    let totalbills = rows.length
    onPaidBills(totalbills,totalpaidAmountCash,totalpaidAmountCard,totalpaidAmountBT,totalpaidAmount)
  }

  return (
    <div style={{ height: "700px", width: "100%", overflowX: "scroll" }}>
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

export default BillingList;
