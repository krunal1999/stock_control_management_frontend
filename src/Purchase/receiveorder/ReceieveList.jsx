import { DataGrid } from "@mui/x-data-grid";


const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "ro_id", headerName: "Receieved ID", width: 130 },
  { field: "purchaseid", headerName: "PurchaseId", width: 130 },
  { field: "productname", headerName: "Productname", width: 200 },
  { field: "quantity", headerName: "Quantity", width: 130 },
  { field: "orderstatus", headerName: "OrderStatus", width: 130 },
  { field: "receiveddate", headerName: "Receieved Date", width: 130 },
  { field: "usestatus", headerName: "Use Status", width: 130 },
];

const ReceieveList = ({rows}) => {
  // const rows = [];
  // const [receieveList, setreceieveList] = useState([]);

  // useEffect(() => {
  //   const fetchdata = async () => {
  //     try {
  //       const res = await ReceieveOrderService.getList();
  //       setreceieveList(res.data);
  //       console.log(res.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchdata();
  // }, []);

  // receieveList.forEach((pl) => {
  //   rows.unshift(pl);
  // });



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

export default ReceieveList;
