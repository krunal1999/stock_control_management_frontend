import { DataGrid } from "@mui/x-data-grid";
import Billingservice from "./Billingservice";
import { useEffect, useState } from "react";


const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "bill_id", headerName: "Receieved ID", width: 130 },
  { field: "productname", headerName: "Productname", width: 200 },
  { field: "vendorname", headerName: "Vendorname", width: 200 },
  { field: "billstatus", headerName: "Bill Status", width: 130 },
  { field: "paidstatus", headerName: "Paid Status", width: 130 },
  { field: "paymenttype", headerName: "Payment Type", width: 130 },
  { field: "amount", headerName: "Amount", width: 130 },
  { field: "paymentdate", headerName: "Date", width: 130 },

];

const BillingList = () => {
  const rows = [];
  const [BillingList, setBillingList] = useState([]);
 
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await Billingservice.getList()
        setBillingList(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchdata();
  }, []);

  BillingList.forEach((pl) => {
    rows.unshift(pl);
   
  });



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
