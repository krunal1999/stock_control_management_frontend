import { DataGrid } from "@mui/x-data-grid";


const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "productid", headerName: "Productid", width: 100 },
  { field: "productname", headerName: "Product Name", width: 130 },

  {
    field: "username",
    headerName: "username",
    width: 160,
  },
  {
    field: "orderid",
    headerName: "orderid",
    width: 100,
  },
  {
    field: "clientIntent",
    headerName: "clientIntent",
    width: 260,
  },
  { field: "quantity", headerName: "Quantity", width: 100 },

  { field: "sellingPrice", headerName: "sellingPrice", width: 100 },

  {
    field: "totalprice",
    headerName: "Total",
    width: 100,
    renderCell: (param) => {
      return <div>{param.row.quantity * param.row.sellingPrice }</div>;
    },
  },

  {
    field: "productTrackStatus",
    headerName: "productTrackStatus",
    width: 70,
    renderCell: (param) => {
      return (
        <div className={`cellWithstatus ${param.row.productTrackStatus}`}>
          {param.row.productTrackStatus}
        </div>
      );
    },
  },
  {
    field: "orderStatus",
    headerName: "orderStatus",
    width: 130,
    renderCell: (param) => {
      return (
        <div className={`cellWithstatus ${param.row.orderStatus}`}>
          {param.row.orderStatus}
        </div>
      );
    },
  },
  {
    field: "deliveryStatus",
    headerName: "deliveryStatus",
    width: 130,
    renderCell: (param) => {
      return (
        <div className={`cellWithstatus ${param.row.deliveryStatus}`}>
          {param.row.deliveryStatus}
        </div>
      );
    },
  },
];

const SalesList = ({ rows }) => {
 
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

export default SalesList;
