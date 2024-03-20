import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Divider, IconButton, Stack } from "@mui/material";
import "../pagescss/inventory.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import UpgradeIcon from '@mui/icons-material/Upgrade';

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "productid", headerName: "productid", width: 130 },
  { field: "brand", headerName: "brand", width: 130 },
  { field: "productname", headerName: "productname", width: 130 },
  { field: "categories", headerName: "categories", width: 130 },
  { field: "quantity", headerName: "quantity", width: 90 },
  { field: "buyprice", headerName: "buyprice", width: 90 },
  { field: "sellingPrice", headerName: "sellingPrice", width: 90 },
  {
    field: "minimumQuantityAlert",
    headerName: "Mini Quantity Alert",
    width: 170,
  },
  {
    field: "productstatus",
    headerName: "Product Label",
    width: 170,
  },
  {
    field: "autoReorderEnabled",
    headerName: "Auto Order",
    width: 120,
    renderCell: (param) => {
      return (
        <div className={`cellWithstatus ${param.row.autoReorderEnabled}`}>
          {param.row.autoReorderEnabled}
        </div>
      );
    },
  },
  {
    field: "activestatus",
    headerName: "Product Status",
    width: 120,
    renderCell: (param) => {
      return (
        <div className={`cellWithstatus ${param.row.activestatus}`}>
          {param.row.activestatus}
        </div>
      );
    },
  },
];

export default function InventoryList({ rows, onDelete, onView,onEdit ,onReorder}) {
  const actionColumn = [
    {
      field: "action",
      width: 250,
      headerName: "Action",

      renderCell: (params) => {
        return (
          <Stack
            direction="row"
            spacing={1}
            divider={<Divider orientation="vertical" flexItem />}
          >
            <IconButton
              aria-label="view"
              variant="outlined"
              className="viewButton"
              onClick={() => onView(params.row.id)}
              color="primary"
            >
              <VisibilityIcon />
            </IconButton>
            <IconButton
              aria-label="edit"
              variant="outlined"
              className="editButton"
              onClick={() => onEdit(params.row.id)}
              color="secondary"
            >
              <ModeEditIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              variant="outlined"
              className="deleteButton"
              onClick={() => onDelete(params.row.id)}
              color="error"
            >
              <DeleteForeverIcon />
            </IconButton>
            {params.row.autoReorderEnabled === "ACTIVE" ?  
            <IconButton
              aria-label="reorder"
              variant="outlined"
              className="reorder"
              onClick={() => onReorder(params.row.id)}
              color="success"
            > 
              <UpgradeIcon />
            </IconButton>
            : null }
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
}
