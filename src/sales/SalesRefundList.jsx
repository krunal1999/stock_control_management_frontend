import { Button, Divider, IconButton, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SalesService from "./SalesService";
import { toast } from "react-toastify";


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
      return <div>{param.row.quantity * param.row.sellingPrice}</div>;
    },
  },

  {
    field: "returnProduct",
    headerName: "User Request Refund",
    width: 180,
    renderCell: (param) => {
      return (
        <>
          {`${param.row.returnProduct}` === "USERREFUND" ? (
            <div
              className={`cellWithstatus ${param.row.returnProduct}`}
              style={{
                backgroundColor: "red",
                padding: 4,
                color: "white",
                borderRadius: 4,
              }}
            >
              {param.row.returnProduct}
            </div>
          ) : (
            <div
              className={`cellWithstatus ${param.row.returnProduct}`}
              style={{
                backgroundColor: "green",
                padding: 4,
                color: "white",
                borderRadius: 4,
              }}
            >
              {param.row.returnProduct}
            </div>
          )}
        </>
      );
    },
  },
];

const SalesRefundList = ({ rows,reloadcall }) => {
  const actionColumn = [
    {
      field: "action",
      width: 250,
      headerName: "Action",

      renderCell: (params) => {
        return (
          <>
            {`${params.row.returnProduct}` === "USERREFUND" ? (
              <Stack
                direction="row"
                spacing={1}
                divider={<Divider orientation="vertical" flexItem />}
              >
                <IconButton
                  aria-label="view"
                  variant="outlined"
                  className="viewButton"
                  onClick={() => handleRefund(params.row.id)}
                  color="primary"
                >
                  <Button variant="contained" color="secondary">
                    REFUND
                  </Button>
                </IconButton>
                <IconButton
                  aria-label="view"
                  variant="outlined"
                  className="viewButton"
                  onClick={() => handleDecline(params.row.id)}
                  color="error"
                >
                  <Button variant="contained" color="error">
                    DECLINE
                  </Button>
                </IconButton>
              </Stack>
            ) : (
              ""
            )}
          </>
        );
      },
    },
  ];
  
  const handleDecline = (id) => {
    console.log(id);
    SalesService.refundDeclineByAdmin(id)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  const handleRefund = async (id) => {
    try {
      const response = await SalesService.refundToUserId(id);
      SalesService.refundSuccessSave(id,response.data);
      
      reloadcall(true)
      toast.success("Refund success")
    } catch (error) {
      console.log(error);
    }
  };

 
  return (
    <div style={{ height: "600px", width: "100%", overflowX: "scroll" }}>
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

export default SalesRefundList;
