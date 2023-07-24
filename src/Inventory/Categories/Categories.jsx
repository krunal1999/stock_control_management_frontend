import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import AdminLayout from "../../layouts/AdminLayout";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import CategoriesService from "./CategoriesService";
import CategoriesList from "./CategoriesList";

const Categories = () => {
  const [data, setData] = useState({
    type: "",
    activestatus: "",
  });

  function handleSave(e) {
    e.stopPropagation();
    const res = CategoriesService.addCategories(data)
      .then(() => {
    console.log("🚀 ~ file: Categories.jsx:33 ~ handleSave ~ res:", res)

        
      })
      .catch((error) => {
        console.log(error);
      });
    setOpen(false);
  }

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleChange(e) {
    e.stopPropagation();
    let value = e.target.value;
    setData({ ...data, [e.target.name]: value });
  }

  return (
    <>
      <AdminLayout>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper varient="outlined" elevation={0}>
              <div className="addnewitem">
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleClickOpen}
                >
                  Add New Category
                </Button>
              </div>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper varient="outlined" elevation={2}>
              <CategoriesList open={open} />
            </Paper>
          </Grid>
        </Grid>
      </AdminLayout>
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Open form dialog
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add New Categories</DialogTitle>
          <DialogContent>
            <DialogContentText>Enter Text Below</DialogContentText>
            <br />

            <TextField
              autoFocus
              id="name"
              label="categories"
              type="text"
              fullWidth
              variant="outlined"
              onChange={handleChange}
              name="type"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={handleClose} color="error">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default Categories;
