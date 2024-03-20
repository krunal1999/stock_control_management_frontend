import { Divider, IconButton, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "type", headerName: "Type", width: 330 },
  {
    field: "activestatus",
    headerName: "Status",
    width: 200,
    renderCell: (param) => {
      return (
        <div className={`cellWithstatus ${param.row.activestatus}`}>
          {param.row.activestatus}
        </div>
      );
    },
  },
];

const CategoriesList = ({ rows , onDelete , onStatusChange }) => {
  const actionColumn = [
    {
      field: "action",
      width: 200,
      headerName: "Action",

      renderCell: (params) => {
        return (
          <Stack
            direction="row"
            spacing={1}
            divider={<Divider orientation="vertical" flexItem />}
          >
            <IconButton
              aria-label="edit"
              variant="outlined"
              className="editButton"
              onClick={() => onStatusChange(params.row.id)}
              color="secondary"
            >
              <FlipCameraAndroidIcon />
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
          </Stack>
        );
      },
    },
  ];
  return (
    <div style={{ height: "800px", width: "100%", overflowX: "scroll" }}>
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

export default CategoriesList;
