import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useState } from "react";
import CategoriesService from "./CategoriesService";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "type", headerName: "Type", width: 330 },
  { field: "activestatus", headerName: "Status", width: 200 },
];

const CategoriesList = ({open}) => {
  const rows = [];
  const [CategoriesList, setCategoriesList] = useState([]);
  

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await CategoriesService.getCategoriesList();
        setCategoriesList(res.data);
        
      } catch (error) {
        console.log(error);
      }
    };
    
      fetchdata();
    
  }, [open]);

  CategoriesList.forEach((pl) => {
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

export default CategoriesList;
