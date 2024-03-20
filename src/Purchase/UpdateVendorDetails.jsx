import {
  Button,
  Divider,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import VendorService from "./PurchaseService/VendorService";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { vendorSchema } from "../formvalidation/VendorSchema";
import { toast } from "react-toastify";

const UpdateVendorDetails = ({ id }) => {
  const nav = useNavigate();
  const [vendorvalues, setvendorvalues] = useState({});
  const [activestatus, setactivestatus] = useState("");

  

  const initialValues = {
    firstname: "",
    lastname: "",
    vendoruniquename: "",
    phonenumber: "",
    email: "",
    location: "",
    country: "",
    brandname: "",
    titles: "",
    activestatus: vendorvalues.activestatus,
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    handleReset,
    setFieldValue,
  } = useFormik({
    initialValues: { initialValues, ...vendorvalues },
    // validationSchema: vendorSchema,
    onSubmit: async (values, action) => {
      const newVendor = {
        firstname: values.firstname,
        lastname: values.lastname,
        vendoruniquename: values.vendoruniquename,
        phonenumber: values.phonenumber,
        email: values.email,
        location: values.location,
        country: values.country,
        brandname: values.brandname,
        titles: values.titles,
        activestatus: values.activestatus
      };

      console.log("newVendor----" ,newVendor);

      try {
        const response = await VendorService.updateVendor(id,newVendor)
        console.log("🚀 ~ file: UpdateVendorDetails.jsx:65 ~ onSubmit: ~ response:", response.data)
        
        nav("/admin/purchase/vendor");

        toast.success("Vendor Updated");
      } catch (error) {
        toast.error("Form is not valid please fill all the details");
        console.error("Error saving vendor:", error);
      }

      action.resetForm();
      console.log(
        "🚀 ~ file: AddnewVendorform.jsx:42 ~ AddnewVendorform ~ values:",
        values
      );
    },
  });

  useEffect(() => {
    const fetchdata = async () => {
      try {
        console.log(id);
        const res = await VendorService.getVendorDetailsByDisplayName(id);
        
        console.log(res.data);
        setFieldValue("firstname", res.data.firstname);
        setFieldValue("lastname", res.data.lastname);
        setFieldValue("vendoruniquename", res.data.vendoruniquename);

        setFieldValue("phonenumber", res.data.phonenumber);
        setFieldValue("email", res.data.email);
        setFieldValue("location", res.data.location);

        setFieldValue("country", res.data.country);
        setFieldValue("brandname", res.data.brandname);
        setFieldValue("titles", res.data.titles);
        setFieldValue("activestatus", res.data.activestatus);
        setactivestatus(res.data.activestatus)
        setvendorvalues(res.data);
       
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
    
  }, [id, setFieldValue]);

  

  return (
    <>
      <div className="box4">
        <Stack spacing={4} direction="row">
          <FormControl>
            <InputLabel htmlFor="component-error">Brand Name</InputLabel>
            <OutlinedInput
              id=""
              label="Brand Name"
              variant="outlined"
              name="brandname"
              value={values.brandname}
              onChange={handleChange}
              onBlur={handleBlur}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                autoFocus: true
              }}
              
            />
            {errors.brandname && touched.brandname ? (
              <FormHelperText id="component-error-text" error>
                please enter brand Number
              </FormHelperText>
            ) : null}
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="component-error">Display Name</InputLabel>
            <OutlinedInput
              id=""
              label="Display Name"
              variant="outlined"
              name="vendoruniquename"
              value={values.vendoruniquename}
              onChange={handleChange}
              onBlur={handleBlur}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {errors.vendoruniquename && touched.vendoruniquename ? (
              <FormHelperText id="component-error-text" error>
                please enter Display Name
              </FormHelperText>
            ) : null}
          </FormControl>
        </Stack>
        <br />
        <Divider />
        <Typography variant="h5">Contact Person Details</Typography>
        <br />
        <Stack spacing={4} direction="row">
          <FormControl>
            <InputLabel htmlFor="component-error">Title</InputLabel>
            <OutlinedInput
              id="component-error"
              label="Title"
              variant="component-outlined"
              name="titles"
              value={values.titles}
              onChange={handleChange}
              onBlur={handleBlur}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
            {errors.titles && touched.titles ? (
              <FormHelperText id="component-error-text" error>
                please enter title
              </FormHelperText>
            ) : null}
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="component-error">First Name</InputLabel>
            <OutlinedInput
              id="component-error"
              label="First Name"
              variant="component-outlined"
              name="firstname"
              value={values.firstname}
              onChange={handleChange}
              onBlur={handleBlur}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
            {errors.firstname && touched.firstname ? (
              <FormHelperText id="component-error-text" error>
                please enter first name
              </FormHelperText>
            ) : null}
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="component-error">Last Name</InputLabel>
            <OutlinedInput
              id=""
              label="Last Name"
              variant="outlined"
              name="lastname"
              required
              value={values.lastname}
              onChange={handleChange}
              onBlur={handleBlur}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {errors.lastname && touched.lastname ? (
              <FormHelperText id="component-error-text" error>
                please enter Last name
              </FormHelperText>
            ) : null}
          </FormControl>
        </Stack>

        <br></br>
        <Stack spacing={4} width={600}>
          <FormControl>
            <InputLabel htmlFor="component-error">Phone Number</InputLabel>
            <OutlinedInput
              id=""
              label="Phone Number"
              variant="outlined"
              name="phonenumber"
              required
              type="number"
              value={values.phonenumber}
              onChange={handleChange}
              onBlur={handleBlur}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {errors.phonenumber && touched.phonenumber ? (
              <FormHelperText id="component-error-text" error>
                please enter Phone Number
              </FormHelperText>
            ) : null}
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="component-error">Email</InputLabel>
            <OutlinedInput
              id=""
              label="Email"
              variant="outlined"
              type="email"
              name="email"
              required
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              InputLabelProps={{
                shrink: true
              }}
              
            />
            {errors.email && touched.email ? (
              <FormHelperText id="component-error-text" error>
                please enter Email
              </FormHelperText>
            ) : null}
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="component-error">Location</InputLabel>
            <OutlinedInput
              id=""
              label="Location"
              variant="outlined"
              name="location"
              value={values.location}
              onChange={handleChange}
              onBlur={handleBlur}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {errors.location && touched.location ? (
              <FormHelperText id="component-error-text" error>
                please enter Location
              </FormHelperText>
            ) : null}
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="component-error">Country</InputLabel>
            <OutlinedInput
              id=""
              label="Country"
              variant="outlined"
              name="country"
              value={values.country}
              onChange={handleChange}
              onBlur={handleBlur}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
            {errors.country && touched.country ? (
              <FormHelperText id="component-error-text" error>
                please enter Country
              </FormHelperText>
            ) : null}
          </FormControl>

          <FormControl>
            <InputLabel id="demo-simple-select-label">
              Vendor Active Status
            </InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Enable Auto Reorder"
              sx={{ width: 350 }}
              name="activestatus              "
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

        </Stack>
        <br></br>

        <Stack direction="row" spacing={4}>
          <Button variant="contained" color="success" onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="contained" color="error" onClick={handleReset}>
            reset
          </Button>
        </Stack>
      </div>
    </>
  );
};

export default UpdateVendorDetails;
