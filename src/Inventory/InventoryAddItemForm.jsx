import {
  Autocomplete,
  Button,
  Divider,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import ReceieveOrderService from "../Purchase/receiveorder/ReceieveOrderService";
import PlaceOrderService from "../Purchase/placeorder/PlaceOrderService";
import { useFormik } from "formik";
import { productSchema } from "../formvalidation/ProductSchema";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import InventoryService from "./InventoryService";

const InventoryAddItemForm = () => {
  // Categories List ---------------------------------

  const Categoriesrows = [];

  // ReceievedIem List  ---------------------------------
  const Receivedrows = [];
  const [receieveList, setreceieveList] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await ReceieveOrderService.getList();
        setreceieveList(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchdata();
  }, []);

  receieveList.forEach((pl) => {
    if (pl.productstatus === "NEW" && !pl.usestatus) {
      Receivedrows.unshift(pl.roid);
    }
  });

  // ReceievedIem List  ---------------------------------
  const [receieveItem, setReceiveItem] = useState([]);
  const [purchaseDetail, setpurchaseDetails] = useState({});
  const [receieedId, setReceivedId] = useState("");
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const purchaseId = receieveList.find((pl) => pl.roid === receieveItem);
        setReceivedId(purchaseId.roid);
        if (purchaseId.purchaseid) {
          const purchaseDetails =
            await PlaceOrderService.getPurchaseDetailsById(
              purchaseId.purchaseid
            );
          console.log(purchaseDetails.data);
          setpurchaseDetails(purchaseDetails.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, [receieveList, receieveItem]);

  Categoriesrows.push(purchaseDetail.categories);

  // ----------
  const initialValues = {
    productid: "",
    receieveItem: receieedId,
    productname: "",
    brand: purchaseDetail.vendoruniquename,
    categories: "",
    about: "",
    title: "",
    buyprice: "",
    sellingPrice: "",
    quantity: purchaseDetail.quantity,
    minimumQuantityAlert: "",
    autoReorderEnabled: "ACTIVE",
    length: "",
    breadth: "",
    height: "",
    volume: "",
    vendoruniquename: purchaseDetail.vendoruniquename,
    image: null,
  };

  const [volume, setVolume] = useState("");

  const handleFileInputChange = (event) => {
    const fileList = event.target.files;
    const filesArray = Array.from(fileList);
    setFieldValue("image", filesArray);
  };

  const nav = useNavigate();

  const {
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: productSchema,
    onSubmit: async (values) => {
      // save to database
      const formData = new FormData();
      const productData = {
        receieveItem: receieedId,
        productname: purchaseDetail.productname,
        brand: purchaseDetail.vendoruniquename,
        quantity: purchaseDetail.quantity,
        sellingPrice: values.sellingPrice,
        buyprice: purchaseDetail.buyprice,
        title: values.title,
        about: values.about,
        categories: purchaseDetail.categories,
        autoReorderEnabled: values.autoReorderEnabled,
        minimumQuantityAlert: values.minimumQuantityAlert,
        breadth: values.breadth,
        length: values.length,
        height: values.height,
        volume: volume,
        vendoruniquename: purchaseDetail.vendoruniquename,
      };

      const json = JSON.stringify(productData);
      const blob = new Blob([json], {
        type: "application/json",
      });

      formData.append("product", blob);

      for (const image of values.image) {
        formData.append("image", image);
      }

      try {
        console.log(formData);
        console.log(productData);
        console.log(values.image);
        
        const response = await InventoryService.addproduct(formData)

        console.log(
          "🚀 ~ file: InventoryAddItemForm.jsx:162 ~ onSubmit: ~ response:",
          response
        );

        toast.success("Product added to Inventory");
        nav("/admin/inventory")
      } catch (error) {
        toast.error("Form is not valid please fill all the details");
        console.error("Error saving product:", error);
      }
    },
  });

  useEffect(() => {
    const newvolume = values.length * values.breadth * values.height;
    setVolume(newvolume);
  }, [values.length, values.breadth, values.height]);

  return (
    <>
      <form style={{width:"100%"}}>
        <Stack direction="row" spacing={2}>
          <TextField
            sx={{ width: 350 }}
            id=""
            label="Product_ID"
            variant="outlined"
            disabled
            name="productid"
            // value={values.productid}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={Receivedrows}
            sx={{ width: 350 }}
            name="receieveItem"
            inputValue={receieveItem}
            color="secondary"
            onInputChange={(event, newina) => {
              setReceiveItem(newina);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Received_id" />
            )}
          />
        </Stack>
        <br />

        {receieveItem ? (
          <>
            <Typography variant="h5" gutterBottom sx={{ marginBottom: 2 }}>
              Product Details
            </Typography>

            <div className="box1">
              <Stack spacing={2} direction="row">
                <TextField
                  id=""
                  label="Name"
                  variant="outlined"
                  sx={{ width: 350 }}
                  value={purchaseDetail.productname}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled
                  name="productname"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  color="secondary"
                />

                <TextField
                  id=""
                  label="Brand"
                  variant="outlined"
                  sx={{ width: 350, color: "red" }}
                  name="brand"
                  value={purchaseDetail.vendoruniquename}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled
                  InputLabelProps={{
                    shrink: true,
                  }}
                  
                />

                <TextField
                  id=""
                  label="Categories"
                  variant="outlined"
                  sx={{ width: 350 }}
                  value={purchaseDetail.categories}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled
                  name="categories"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Stack>
            </div>
            <br></br>
            <Stack spacing={2} direction="row">
              <TextField
                id="outlined-textarea"
                label="Add Images"
                placeholder=""
                variant="outlined"
                type="file"
                sx={{ width: 350 }}
                inputProps={{ multiple: true }}
                accept="image/*"
                name="image"
                onChange={handleFileInputChange} // Use the new event handler
                onBlur={handleBlur}
                helperText={
                  errors.image && touched.image ? "Image Required" : null
                }
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                id="outlined-textarea"
                label="About"
                placeholder="About"
                multiline
                sx={{ width: 720 }}
                name="about"
                value={values.about}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={
                  errors.about && touched.about ? "about  Required" : null
                }
              />
            </Stack>
            <br></br>
            <Stack spacing={2} direction="row">
              <TextField
                id="outlined-textarea"
                label="Product Title"
                placeholder="Product Title"
                multiline
                sx={{ width: 1090 }}
                name="title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={
                  errors.title && touched.title ? "title  Required" : null
                }
              />
            </Stack>
            <br></br>

            <Divider />
            <br></br>
            <Typography variant="h5" gutterBottom sx={{ marginBottom: 2 }}>
              Dimension
            </Typography>

            <Stack spacing={2} direction="row">
              <TextField
                id=""
                label="Length"
                variant="outlined"
                sx={{ width: 350 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">cm</InputAdornment>
                  ),
                }}
                name="length"
                value={values.length}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={
                  errors.length && touched.length ? "length  Required" : null
                }
              />
              <TextField
                id=""
                label="Breadth"
                variant="outlined"
                sx={{ width: 350 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">cm</InputAdornment>
                  ),
                }}
                name="breadth"
                value={values.breadth}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={
                  errors.breadth && touched.breadth ? "breadth  Required" : null
                }
              />

              <TextField
                id=""
                label="Height"
                variant="outlined"
                sx={{ width: 350 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">cm</InputAdornment>
                  ),
                }}
                name="height"
                value={values.height}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={
                  errors.height && touched.height ? "height  Required" : null
                }
              />

              <TextField
                id=""
                label="Volume"
                variant="outlined"
                sx={{ width: 350 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">cm</InputAdornment>
                  ),
                }}
                disabled
                name="volume"
                value={volume}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Stack>

            <br></br>

            <br />
            <Divider />
            <br />
            <Typography variant="h5" gutterBottom sx={{ marginBottom: 2 }}>
              Price
            </Typography>

            <div className="box">
              <Stack direction="row" spacing={2}>
                <FormControl>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Cost Price
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    startAdornment={
                      <InputAdornment position="start">£</InputAdornment>
                    }
                    label="Cost Price"
                    type="number"
                    helperText=""
                    value={purchaseDetail.buyprice}
                    disabled
                    sx={{ width: 350 }}
                    name="buyprice"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormControl>

                <TextField
                  label="Quantity"
                  id="outlined-start-adornment"
                  sx={{ width: 350 }}
                  fullWidth
                  type="number"
                  value={purchaseDetail.quantity}
                  disabled
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">unit</InputAdornment>
                    ),
                  }}
                  name="quantity"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FormControl>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Selling Price
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    startAdornment={
                      <InputAdornment position="start">£</InputAdornment>
                    }
                    label="Selling Price"
                    type="number"
                    sx={{ width: 350 }}
                    name="sellingPrice"
                    value={values.sellingPrice}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.height && touched.height
                        ? "height  Required"
                        : null
                    }
                  />
                </FormControl>
              </Stack>
            </div>
            <Divider />
            <br />
            <Typography variant="h5" gutterBottom sx={{ marginBottom: 2 }}>
              More details
            </Typography>
            <gutterBottom />

            <Stack direction="row" spacing={2}>
              <TextField
                label="Minimum Quantity Alert"
                id="outlined-start-adornment"
                type="number"
                sx={{ width: 350 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">unit</InputAdornment>
                  ),
                }}
                name="minimumQuantityAlert"
                value={values.minimumQuantityAlert}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormControl>
                <InputLabel id="demo-simple-select-label">
                  Enable Auto Reorder
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Enable Auto Reorder"
                  sx={{ width: 350 }}
                  name="autoReorderEnabled"
                  value={values.autoReorderEnabled}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <MenuItem value={"ACTIVE"}>ACTIVE</MenuItem>
                  <MenuItem value={"INACTIVE"}>INACTIVE</MenuItem>
                </Select>
              </FormControl>
            </Stack>

            <br></br>

            <Stack direction="row" spacing={4}>
              <Button
                variant="contained"
                color="success"
                onClick={handleSubmit}
              >
                Save
              </Button>
              <Button variant="contained" color="error">
                Reset
              </Button>
            </Stack>
          </>
        ) : (
          ""
        )}
      </form>
    </>
  );
};

export default InventoryAddItemForm;
