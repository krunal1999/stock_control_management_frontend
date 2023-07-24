import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstname", headerName: "First name", width: 130 },
  { field: "lastname", headerName: "Last name", width: 130 },

  {
    field: "vendoruniquename",
    headerName: "DisplayName",
    width: 160,
  },
  { field: "email", headerName: "Email", width: 230 },

  { field: "phonenumber", headerName: "Contact Number", width: 130 },
  { field: "location", headerName: "Location", width: 130 },
  { field: "country", headerName: "Country", width: 130 },
  { field: "activestatus", headerName: "Status", width: 130 },
];

export default function VendorList({rows}) {
  

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
}
