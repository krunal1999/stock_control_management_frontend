import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Stack,
} from "@mui/material";
import React from "react";
import VendorService from "./PurchaseService/VendorService";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { vendorSchema } from "../formvalidation/VendorSchema";
import { toast } from "react-toastify";

const AddnewVendorform = () => {
  const nav = useNavigate();

  const initialValues = {
    firstname: "",
    lastname: "",
    vendoruniquename: "",
    phonenumber: "",
    email: "",
    location: "",
    country: "",
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    handleReset,
  
  } = useFormik({
    initialValues: initialValues,
    validationSchema: vendorSchema,
    onSubmit: (values, action) => {
      VendorService.saveVendor(values)
        .then((response) => {
          toast.success("Vendor Added Successfully");

          setTimeout(() => {
            nav("/purchase/vendor");
          }, 2000);
        })
        .catch((error) => {
          toast.error("Failed to add Vendor");
          console.log(error);
        });
      action.resetForm();
      console.log(
        "🚀 ~ file: AddnewVendorform.jsx:42 ~ AddnewVendorform ~ values:",
        values
      );
    },
  });

  return (
    <>
      <div className="box4">
        <Stack spacing={4} direction="row">
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
            />
            {errors.lastname && touched.lastname ? (
              <FormHelperText id="component-error-text" error>
                please enter Last name
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
              required
              value={values.vendoruniquename}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.vendoruniquename && touched.vendoruniquename ? (
              <FormHelperText id="component-error-text" error>
                please enter Display name
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
              required
            />
            {errors.country && touched.country ? (
              <FormHelperText id="component-error-text" error>
                please enter Country
              </FormHelperText>
            ) : null}
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

export default AddnewVendorform;
