import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  Slide,
  Stack,
  TextField,
} from "@mui/material";
import AdminLayout from "../../layouts/AdminLayout";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import CategoriesService from "./CategoriesService";
import CategoriesList from "./CategoriesList";
import { forwardRef } from "react";
import { toast } from "react-toastify";
import StatusCards from "../../componets/StatusCards";
import {
  FaExclamationCircle,
  FaCheckCircle,
  FaAngleDoubleUp,
} from "react-icons/fa";
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Categories = () => {
  let totalCategories = 0;
  let activeCategories = 0;
  let inactiveCategories = 0;

  const [data, setData] = useState({
    type: "",
    activestatus: "",
  });

  const [reload, setReload] = useState(false);

  function handleSave(e) {
    e.stopPropagation();
    const res = CategoriesService.addCategories(data)
      .then(() => {
        console.log("🚀 ~ file: Categories.jsx:33 ~ handleSave ~ res:", res);
      })
      .catch((error) => {
        console.log(error);
      });

    toast.success("Category added successfully");
    setOpen(false);
    setReload(!reload);
  }

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setReload(!reload);
  };

  function handleChange(e) {
    e.stopPropagation();
    let value = e.target.value;

    setData({ ...data, [e.target.name]: value });
  }

  const rows = [];
  const [CategoriesList1, setCategoriesList] = useState([]);
  const [openDeleteBox, setOpenDeleteBox] = useState(false);
  const [DeleteConfirm, setDeleteConfirm] = useState(false);
  const [updateDone, setUpdateDone] = useState(false);

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
  }, [open, DeleteConfirm, updateDone]);

  CategoriesList1.forEach((category) => {
    totalCategories++;

    if (category.activestatus === "ACTIVE") {
      activeCategories++;
    } else if (category.activestatus === "INACTIVE") {
      inactiveCategories++;
    }
  });

  CategoriesList1.forEach((pl) => {
    rows.unshift(pl);
  });

  useEffect(() => {
    console.log(reload);
  }, [reload]);

  /// deleting logic---------------

  const handleClickOpenDelete = () => {
    setOpenDeleteBox(true);
  };

  const handleDeleteClose = () => {
    setDeleteConfirm(true);

    setOpenDeleteBox(false);
  };
  const handleClosedelete = () => {
    setOpenDeleteBox(false);
  };

  const [productIdToDelete, setProductIdToDelete] = useState(null);

  const handleDeleteProduct = (productId) => {
    handleClickOpenDelete();
    setProductIdToDelete(productId);
  };

  useEffect(() => {
    if (DeleteConfirm) {
      CategoriesService.deleteById(productIdToDelete)
        .then((response) => {
          toast.success("Category deleted successfully!");
          console.log("Category deleted successfully!");
          setDeleteConfirm(false);
          setReload(!reload);
        })
        .catch((error) => {
          toast.error("Error deleting Category:");
          console.error("Error deleting Category:", error);
        });
      console.log(productIdToDelete);
    }
  }, [DeleteConfirm, productIdToDelete, reload]);

  // deleting logic ------------------------------

  // change the status logic-------------------

  const [updatestatusid, setUpdateStatusId] = useState(null);
  const handleChangeStatus = (id) => {
    setUpdateStatusId(id);
    setUpdateDone(true);
  };

  useEffect(() => {
    if (updateDone) {
      CategoriesService.updateStatus(updatestatusid)
        .then((response) => {
          toast.success("Category status updated successfully!");
          console.log("Category status updated successfully!");
          setUpdateDone(false);
          setReload(!reload);
        })
        .catch((error) => {
          toast.error("Error in updateding Category status:");
          console.error("Error in updateding Category status:", error);
        });
    }
  }, [updatestatusid, updateDone, reload]);

  // change the status logic-------------------

  return (
    <>
      <AdminLayout>
        <Stack direction="row" spacing={6} width={1200}>
          <StatusCards
            title="Total Category"
            value={totalCategories}
            maxvalue={totalCategories}
            cardcolor="#ace1af"
            icon={
              <FaCheckCircle
                style={{ width: 40, height: 40, color: "#006841" }}
              />
            }
            pathcolour="#006841"
          />

          <StatusCards
            title="Active Category"
            value={activeCategories}
            maxvalue={totalCategories}
            cardcolor="#f4f4cc"
            icon={
              <FaAngleDoubleUp
                style={{ width: 40, height: 40, color: "#ffa500" }}
              />
            }
            pathcolour="#ffa500"
          />
          <StatusCards
            title="Inactive Category"
            value={inactiveCategories}
            maxvalue={totalCategories}
            cardcolor="#f4cccc"
            icon={
              <FaExclamationCircle
                style={{ width: 40, height: 40, color: "#cc2400" }}
              />
            }
            pathcolour="#cc2400"
          />
        </Stack>
        <br />
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
              <CategoriesList
                rows={rows}
                onDelete={handleDeleteProduct}
                onStatusChange={handleChangeStatus}
              />
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
              focused
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

      <Dialog
        open={openDeleteBox}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are you sure want to delete ?"}</DialogTitle>

        <DialogActions>
          <Button onClick={handleDeleteClose} color="error">
            Delete
          </Button>
          <Button onClick={handleClosedelete}>cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Categories;
