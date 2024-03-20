import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Divider, IconButton, Stack } from "@mui/material";
import { FaArrowsRotate , FaTrash  , FaPen} from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  
  {
    field: "fullname", 
    headerName: "Full Name",
    width: 200,
    renderCell: (params) => `${params.row.titles}. ${params.row.firstname} ${params.row.lastname}`,
  },
  { field: "brandname", headerName: "Brand name", width: 100 },


  {
    field: "vendoruniquename",
    headerName: "DisplayName",
    width: 130,
  },
  { field: "email", headerName: "Email", width: 230 },

  { field: "phonenumber", headerName: "Contact Number", width: 130 },
  { field: "location", headerName: "Location", width: 130 },
  { field: "country", headerName: "Country", width: 130 },

  {
    field: "activestatus",
    headerName: "Status",
    width: 150,
    renderCell: (param) => {
      return (
        <div className={`cellWithstatus ${param.row.activestatus}`}>
          {param.row.activestatus}
        </div>
      );
    },
  },
];

export default function VendorList({rows,onChangeStatus ,ondelete}) {

  const actionColumn = [
    {
      field: "action",
      width: 240,
      headerName: "Action",

      renderCell: (params) => {
        return (
          <Stack
            direction="row"
            spacing={1}
            divider={<Divider orientation="vertical" flexItem />}
          >
            <IconButton
              aria-label="status"
              variant="outlined"
              className="editButton"
              onClick={() => onChangeStatus(params.row.id)}
              color="secondary"
            >
              <FaArrowsRotate />
            </IconButton>
    
            <IconButton
              aria-label="update"
              variant="outlined"
              className="editButton"
              onClick={() => onUpdate(params.row.vendoruniquename)}
              color="info"
            >
              <FaPen />
            </IconButton>
            <IconButton
              aria-label="delete"
              variant="outlined"
              className="deleteButton"
              onClick={() => ondelete(params.row.id)}
              color="error"
            >
              <FaTrash />
            </IconButton>
          </Stack>
        );
      },
    },
  ];
  const nav = useNavigate()

  const onUpdate = (vendoruniquename) =>{
    nav("/admin/purchase/updatevendor/"+vendoruniquename)
  
  }

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
}
