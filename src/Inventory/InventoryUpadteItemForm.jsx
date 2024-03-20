import {
  Button,
  Divider,
  FormControl,
  FormHelperText,
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
import { useFormik } from "formik";

import { toast } from "react-toastify";
import InventoryService from "./InventoryService";

import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const InventoryUpadteItemForm = ({ prodid }) => {
  const productSchema1 = Yup.object({
    about: Yup.string().required("About is required"),
    title: Yup.string().required("Title ID is required").max(50),

    sellingPrice: Yup.string().required("Selling Price is required").min(1),

    minimumQuantityAlert: Yup.string().required(
      "Minimum Quantity Alert is required"
    ),
    autoReorderEnabled: Yup.string(),
    length: Yup.string().required(),
    breadth: Yup.string().required(),
    height: Yup.string().required(),
  });

  const [productvalues, setproductvalues] = useState({});
 

  const [volume, setVolume] = useState("");
  const [autoOrder, setAutoOrder] = useState("");
  const [activestatus, setactivestatus] = useState("");
  const [productlabel, setproductlabel] = useState("");
  const [oldimg, setoldimg] = useState([]);

  const initialValue = {
    productid: "",
    productname: "",
    brand: "",
    quantity: "",
    sellingPrice: "",
    buyprice: "",
    title: "",
    about: "",
    categories: "",
    autoReorderEnabled: "",
    minimumQuantityAlert: "",
    breadth: "",
    length: "",
    height: "",
    volume: "",
    activestatus: "",
    receieveItem: "",
    vendoruniquename: "",
    productstatus: "",
    image: null,
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
    initialValues: { initialValue, ...productvalues },
    validationSchema: productSchema1,
    onSubmit: async (values) => {
      const formData = new FormData();
      const productData = {
        productid: values.productid,
        receieveItem: values.receieveItem,
        productstatus: values.productstatus,
        vendoruniquename: values.vendoruniquename,
        productname: values.productname,
        brand: values.brand,
        quantity: values.quantity,
        sellingPrice: values.sellingPrice,
        buyprice: values.buyprice,
        title: values.title,
        about: values.about,
        categories: values.categories,
        autoReorderEnabled: values.autoReorderEnabled,
        minimumQuantityAlert: values.minimumQuantityAlert,
        breadth: values.breadth,
        length: values.length,
        height: values.height,
        activestatus: values.activestatus,
        volume: volume,
      };

      const json = JSON.stringify(productData);
      const blob = new Blob([json], {
        type: "application/json",
      });

      formData.append("product", blob);

      if (values.image === undefined) {
        const emptyFile = new File([], "empty.jpg");
        formData.append("image", emptyFile);
        console.log("image1-----------", emptyFile);
        console.log(oldimg)
      } else {
        for (const image of values.image) {
          formData.append("image", image);
          console.log("image2-----------", image);
        }
      }

      try {
        const response = await InventoryService.updateproduct(prodid, formData);
        console.log(
          "🚀 ~ file: InventoryUpadteItemForm.jsx:100 ~ onSubmit: ~ Updateee:",
          response
        );

        nav("/admin/inventory");

        toast.success("Product Updated");
      } catch (error) {
        toast.error("Form is not valid please fill all the details");
        console.error("Error saving product:", error);
      }
    },
  });
  

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await InventoryService.getProductById(prodid);
        setproductvalues(res.data);
        setFieldValue("about", res.data.about);
        setFieldValue("autoReorderEnabled", res.data.autoReorderEnabled);
        setAutoOrder(res.data.autoReorderEnabled);
        setFieldValue("activestatus", res.data.activestatus);
        setactivestatus(res.data.activestatus);
        setFieldValue("productstatus", res.data.productstatus);
        setproductlabel(res.data.productstatus);

        setFieldValue("brand", res.data.brand);
        setFieldValue("breadth", res.data.breadth);
        setFieldValue("buyprice", res.data.buyprice);
        setFieldValue("categories", res.data.categories);

        setFieldValue("height", res.data.height);
        setFieldValue("minimumQuantityAlert", res.data.minimumQuantityAlert);
        setFieldValue("length", res.data.length);
        setFieldValue("productid", res.data.productid);
        setFieldValue("productname", res.data.productname);
        setFieldValue("quantity", res.data.quantity);

        setFieldValue("sellingPrice", res.data.sellingPrice);
        setFieldValue("title", res.data.title);
        setFieldValue("vendoruniquename", res.data.vendoruniquename);
        setFieldValue("volume", res.data.volume);

        setFieldValue("receieveItem", res.data.receieveItem);
        // setFieldValue("image", res.data.images);
        setoldimg(res.data.images);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, [prodid, setFieldValue]);


  useEffect(() => {
    const newvolume = values.length * values.breadth * values.height;
    setVolume(newvolume);
  }, [values.length, values.breadth, values.height]);


  const handleFileInputChange = (event) => {
    const fileList = event.target.files;
    const filesArray = Array.from(fileList);
    setFieldValue("image", filesArray);
  };

  return (
    <>
      <form style={{ width: "100%" }}>
        <Stack direction="row" spacing={2}>
          <TextField
            sx={{ width: 350 }}
            id=""
            label="Product_ID"
            variant="outlined"
            name="productid"
            value={values.productid}
            onChange={handleChange}
            onBlur={handleBlur}
            InputLabelProps={{
              shrink: true,
            }}
            disabled
          />
        </Stack>

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
              value={values.productname}
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
              sx={{ width: 350, color: "red" }}
              variant="outlined"
              name="brand"
              value={values.brand}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={
                errors.brand && touched.brand ? "Brand Name Required" : null
              }
              InputLabelProps={{
                shrink: true,
              }}
              disabled
            />

            <TextField
              id=""
              label="Categories"
              variant="outlined"
              sx={{ width: 350 }}
              value={values.categories}
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
            label=""
            placeholder=""
            variant="outlined"
            type="file"
            sx={{ width: 350 }}
            inputProps={{ multiple: true }}
            accept="image/*"
            name="image"
            onChange={handleFileInputChange}
            onBlur={handleBlur}
            helperText={errors.image && touched.image ? "Image Required" : null}
            required
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
            InputLabelProps={{
              shrink: true,
            }}
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
            InputLabelProps={{
              shrink: true,
            }}
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
              endAdornment: <InputAdornment position="end">cm</InputAdornment>,
            }}
            InputLabelProps={{
              shrink: true,
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
              endAdornment: <InputAdornment position="end">cm</InputAdornment>,
            }}
            InputLabelProps={{
              shrink: true,
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
              endAdornment: <InputAdornment position="end">cm</InputAdornment>,
            }}
            InputLabelProps={{
              shrink: true,
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
              endAdornment: <InputAdornment position="end">cm</InputAdornment>,
            }}
            InputLabelProps={{
              shrink: true,
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
                value={values.buyprice}
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
              value={values.quantity}
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
                  errors.height && touched.height ? "height  Required" : null
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
            InputLabelProps={{
              shrink: true,
            }}
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
              value={autoOrder}
              onChange={(e) => {
                setAutoOrder(e.target.value);
                setFieldValue("autoReorderEnabled", e.target.value);
              }}
              onBlur={handleBlur}
              InputLabelProps={{
                shrink: true,
              }}
            >
              <MenuItem value={"ACTIVE"}>ACTIVE</MenuItem>
              <MenuItem value={"INACTIVE"}>INACTIVE</MenuItem>
            </Select>
            <FormHelperText> {values.autoReorderEnabled} </FormHelperText>
          </FormControl>

          <FormControl>
            <InputLabel id="demo-simple-select-label">
              Product Active Status
            </InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Enable Auto Reorder"
              sx={{ width: 350 }}
              name="activestatus"
              value={activestatus}
              onChange={(e) => {
                setactivestatus(e.target.value);
                setFieldValue("activestatus", e.target.value);
              }}
              onBlur={handleBlur}
              InputLabelProps={{
                shrink: true,
              }}
            >
              <MenuItem value={"ACTIVE"}>ACTIVE</MenuItem>
              <MenuItem value={"INACTIVE"}>INACTIVE</MenuItem>
            </Select>
            <FormHelperText> {values.activestatus} </FormHelperText>
          </FormControl>

          <FormControl>
            <InputLabel id="demo-simple-select-label">Product Label</InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Enable Auto Reorder"
              sx={{ width: 350 }}
              name=""
              value={productlabel}
              onChange={(e) => {
                setproductlabel(e.target.value);
                setFieldValue("productstatus", e.target.value);
              }}
              onBlur={handleBlur}
              InputLabelProps={{
                shrink: true,
              }}
            >
              <MenuItem value={"NEW"}>NEW</MenuItem>
              <MenuItem value={"FEATURED"}>FEATURED</MenuItem>
              <MenuItem value={"HOT SELLING"}>HOT SELLING</MenuItem>
              <MenuItem value={"LOW SELLING"}>LOW SELLING</MenuItem>
            </Select>
            <FormHelperText> {values.productstatus} </FormHelperText>
          </FormControl>
        </Stack>

        <br></br>

        <Stack direction="row" spacing={4}>
          <Button variant="contained" color="success" onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="contained" color="error">
            Reset
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default InventoryUpadteItemForm;
