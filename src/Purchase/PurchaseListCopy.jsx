import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "purchaseid", headerName: "PurchaseId", width: 100 },
  { field: "productname", headerName: "Product Name", width: 230 },

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
 
  { field: "expectdate", headerName: "Expected Date", width: 130 },
];

const PurchaseListCopy = ({ rows }) => {
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

export default PurchaseListCopy;
