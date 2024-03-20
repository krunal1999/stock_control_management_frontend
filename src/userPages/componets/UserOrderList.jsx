import { Button, IconButton, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import UserService from "../UserService";

const columns = [
  { field: "id", headerName: "ID", width: 70 },

  { field: "productname", headerName: "Product Name", width: 130 },

  {
    field: "orderid",
    headerName: "orderid",
    width: 100,
  },

  { field: "quantity", headerName: "Quantity", width: 100 },

  { field: "sellingPrice", headerName: "sellingPrice", width: 100 },

  {
    field: "totalprice",
    headerName: "Total",
    width: 100,
    renderCell: (param) => {
      return <div>{param.row.quantity * param.row.sellingPrice}</div>;
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

const UserOrderList = ({ rows }) => {
  const handleRefund = (id) => {
    console.log(id);
    try {
      UserService.userRefundProduct(id).then((res) => {
        console.log(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const actionColumn = [
    {
      field: "action",
      width: 120,
      headerName: "Action",

      renderCell: (params) => {
        return (
          <Stack
            direction="row"
            spacing={2}
            // divider={<Divider orientation="vertical" flexItem />}
          >
            <IconButton
              aria-label="view"
              variant="outlined"
              className="viewButton"
              onClick={() => handleRefund(params.row.id)}
              color="primary"
            >
              {params.row.deliveryStatus === "DELIVERED" &&
              params.row.returnProduct === "POSITIVE" ? (
                <Button>RETURN</Button>
              ) : (
                <Button disabled>RETURN</Button>
              )}
            </IconButton>
          </Stack>
        );
      },
    },
    {
      field: "Message",
      width: 300,
      headerName: "Message",

      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={2}>
            <Typography sx={{ p: 2 }}>{params.row.infoMessage}</Typography>
          </Stack>
        );
      },
    },
  ];

  return (
    <div style={{ height: "700px", width: "100%", overflowX: "scroll" }}>
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
  );
};

export default UserOrderList;
