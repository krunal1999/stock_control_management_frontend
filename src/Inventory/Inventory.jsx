import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  Drawer,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  Paper,
  Slide,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import AddIcon from "@mui/icons-material/Add";
import "../pagescss/inventory.css";
import InventoryList from "./InventoryList";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import PropTypes from "prop-types";
import { Fragment, useState } from "react";
import { useEffect } from "react";
import InventoryService from "./InventoryService";
import InventoryDisplaycardList from "./InventoryDisplaycardList";
import { toast } from "react-toastify";
import { forwardRef } from "react";
import InventoryReports from "./InventoryReports";
import PlaceOrderService from "../Purchase/placeorder/PlaceOrderService";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Inventory = () => {
  const nav = useNavigate();

  function handleClick(e) {
    e.stopPropagation();
    nav("/admin/inventory/new");
  }

  // tabs logic -----------------------------
  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const [value, setValue] = useState(0);
  const [InventoryListdata, setInventoryListdata] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // tabs logic -----------------------------

  const [reload, setReload] = useState(false);
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await InventoryService.getAllProduct();

        setInventoryListdata(res.data);
        console.log(
          "🚀 ~ file: Inventory.jsx:67 ~ fetchdata ~ res.data:",
          res.data
        );
      } catch (error) {
        console.log("🚀 ~ file: Inventory.jsx:67 ~ fetchdata ~ error:", error);
      }
    };
    fetchdata();
  }, [reload]);

  const rows = [];

  InventoryListdata.forEach((pl) => {
    rows.unshift(pl);
  });

  // bar grapgh---------------------------------
  const vendorProductData = InventoryListdata.reduce((acc, inputObject) => {
    const vendorName = inputObject.vendoruniquename;
    const productName = inputObject.productname;
    const quantity = inputObject.quantity;

    if (!acc[vendorName]) {
      acc[vendorName] = [];
    }

    acc[vendorName].push({
      productid: inputObject.productid,
      quantity,
      productname: productName,
    });

    return acc;
  }, {});

  // bar grapgh---------------------------------

  // piechart logic

  const piechartData = InventoryListdata.flat().reduce((acc, item) => {
    const { categories, quantity } = item;
    const existingCategory = acc.find(
      (entry) => entry.categories === categories
    );
    if (existingCategory) {
      existingCategory.totalquantity += quantity;
    } else {
      acc.push({ categories, totalquantity: quantity, name: categories });
    }
    return acc;
  }, []);

  console.log(piechartData);

  // piechart logic -------------------


  // deleting product logic ----------------------
  const [open, setOpen] = useState(false);
  const [DeleteConfirm, setDeleteConfirm] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteConfirm(true);
    setOpen(false);
    setReload(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [productIdToDelete, setProductIdToDelete] = useState(null);

  const handleDeleteProduct = (productId) => {
    handleClickOpen();
    setProductIdToDelete(productId);
  };

  useEffect(() => {
    if (DeleteConfirm) {
      InventoryService.deleteProductById(productIdToDelete)
        .then((response) => {
          setDeleteConfirm(false);
          setReload(true);
          toast.success("Product deleted successfully!");
          console.log("Product deleted successfully!");
        })
        .catch((error) => {
          toast.error("Error deleting product:");
          console.error("Error deleting product:", error);
        });
      console.log(productIdToDelete);
    }
  }, [DeleteConfirm, productIdToDelete]);

  // deleting product logic ----------------------

  // view logic
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const [filteredProducts, setfilteredProducts] = useState({});
  const handleViewProduct = (productid) => {
    openDrawer();
    console.log(productid);
    const newfilteredProducts = InventoryListdata.find(
      (product) => product.id === productid
    );

    setfilteredProducts(newfilteredProducts);
    console.log(newfilteredProducts);
  };

  const drawerWidth = 600;
  const drawerContent = (
    <>
      <br />
      <br />
      <br />
      <br />

      <Typography variant="h4" gutterBottom>
        Product Details
      </Typography>
      <Divider />
      <List>
        <ListItem>
          <Typography variant="h6" gutterBottom sx={{ color: "grey" }}>
            Product ID: {filteredProducts.id}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="h6" gutterBottom>
            Product Name:
            {filteredProducts.productname}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="h6" gutterBottom>
            Brand: {filteredProducts.brand}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="h6" gutterBottom>
            Categories: {filteredProducts.categories}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="h6" gutterBottom>
            Quantity: {filteredProducts.quantity}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="h6" gutterBottom>
            Buy Price: {filteredProducts.buyprice}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="h6" gutterBottom>
            Selling Price: {filteredProducts.sellingPrice}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="h6" gutterBottom>
            Minimum Quantity Alert: {filteredProducts.minimumQuantityAlert}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="h6" gutterBottom>
            Auto Reorder Enabled: {filteredProducts.autoReorderEnabled}
          </Typography>
        </ListItem>
        {/* Add more product details as needed */}
      </List>
      <Divider />

      {filteredProducts.images && filteredProducts.images.length > 0 && (
        <ImageList sx={{ width: 600, height: 400 }} cols={3} rowHeight={164}>
          {filteredProducts.images.map((image) => (
            <ImageListItem key={image.id}>
              <img
                src={`data:${image.fileType};base64,${image.imageData}`}
                alt={image.fileName}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      )}
      <Divider />
    </>
  );

  // view logic

  // update logic -----------------------------

  const updateProductinfo = (prodid) => {
    nav("/admin/inventory/update/" + prodid);
    
  };

  // update logic -----------------------------

  // Reorder  logic -----------------------------

  const handleReorder = async (id) =>{
    console.log(id)

        try {
          const res = await InventoryService.getPurchaseId(id)

            console.log(
              "🚀 ~ file: Inventory.jsx:67 ~ fetchdata ~ res.data:",
              res.data
            );
        
            const res1 = await PlaceOrderService.getNewReorderPurchaseId(res.data)
        
            console.log("🚀 ~ file: InventoryMinimumQuantity.jsx:119 ~ handleReorder ~ res1:", res1.data)
        
            nav(`/admin/purchase/emailsend/${res1.data}`);
          
          
        

        } catch (error) {
          console.log("🚀 ~ file: Inventory.jsx:67 ~ fetchdata ~ error:", error);
        }
      

  }

  // Reorder  logic -----------------------------



  return (
    <>
      <AdminLayout>
        <Grid container spacing={2}>
          {/* div with add new button */}
          <Grid item xs={12}>
            <Paper varient="outlined" elevation={0}>
              <div className="addnewitem">
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleClick}
                >
                  Add Item
                </Button>
              </div>
            </Paper>
          </Grid>

          {/* div with list */}

          <Grid item xs={12}>
            <Paper varient="outlined" elevation={1}>
              <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                  >
                    <Tab label="List" {...a11yProps(0)} />
                    <Tab label="Searchs" {...a11yProps(1)} />
                    <Tab label="Reports" {...a11yProps(2)} />
                  </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                  <InventoryList
                    rows={rows}
                    onDelete={handleDeleteProduct}
                    onView={handleViewProduct}
                    onEdit={updateProductinfo}
                    onReorder={handleReorder}
                  />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                  <InventoryDisplaycardList
                    products={InventoryListdata}
                    onDelete={handleDeleteProduct}
                    onEdit={updateProductinfo}
                    onView={handleViewProduct}
                    onReorder={handleReorder}
                  />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                  <InventoryReports
                    mapdata={vendorProductData}
                    piechart={piechartData}
                  />
                </CustomTabPanel>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Dialog
          open={open}
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
            <Button onClick={handleClose}>cancel</Button>
          </DialogActions>
        </Dialog>

        <Drawer
          anchor="right"
          open={isDrawerOpen}
          onClose={closeDrawer}
          sx={{
            width: drawerWidth, // Set the width of the drawer
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </AdminLayout>
    </>
  );
};

export default Inventory;
