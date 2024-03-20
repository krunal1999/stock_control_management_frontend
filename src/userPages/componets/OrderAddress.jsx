import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import UserLayout from "./UserLayout";
import Steppers from "../small componets/Steppers";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import UserService from "../UserService";
import { getCurrentUser } from "../../authrntication/UserService";
import { useEffect, useState } from "react";

const OrderAddress = () => {
  const nav = useNavigate();

  const handleGoBack = () => {
    nav("/user/orderconfirmation");
  };
  const validationSchema = yup.object().shape({
    addressline1: yup.string().required("Address Line 1 is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    country: yup.string().required("Country is required"),
    postcode: yup.string().required("Postcode is required"),
  });
  const user = getCurrentUser();
  const [addressPresent, setAddressPresent] = useState({});
  const [preAddress, setPreAddress] = useState("");
  const [usePreviousAddress, setUsePreviousAddress] = useState(false);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await UserService.getAddress(user.id);
        setAddressPresent(res.data);
        const previousaddress = () => {
          return (
            res.data.addressline1 +
            "," +
            res.data.addressline2 +
            "," +
            res.data.city +
            "," +
            res.data.state +
            "," +
            res.data.country +
            "," +
            res.data.postcode
          );
        };
        setPreAddress(previousaddress());
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, [user.id]);

  const handleCheckboxChange = (event) => {
    setUsePreviousAddress(event.target.checked);
    if (event.target.checked) {
      UserService.addAddress(addressPresent)
      .then((res) => {
        console.log(res);
        nav("/user/payandcheckout");
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };

  useEffect(() => {
    if (usePreviousAddress) {
    }
  }, [usePreviousAddress]);

  console.log("adasdasdad", addressPresent);
  console.log("adasdasdad-------", preAddress);

  const initialValue = {
    addressline1:"",
    addressline2: "",
    city: "",
    state: "",
    country: "",
    postcode: "",
    userId: user.id,
    username: user.username,
    firstname: user.firstname,
    lastname: user.lastname,
  };
  const { values, errors, handleBlur, handleChange, touched, handleSubmit } =
    useFormik({
      initialValues: initialValue,
      validationSchema: validationSchema,
      onSubmit: (values) => {
        initialValue.userId = user.id;
        initialValue.firstname = user.firstname;
        initialValue.username = user.username;
        initialValue.lastname = user.lastname;

        UserService.addAddress(values)
          .then((res) => {
            console.log(res);
            nav("/user/payandcheckout");
          })
          .catch((error) => {
            console.log(error);
          });
      },
    });

  return (
    <>
      <UserLayout>
        <br />
        <br />
        <br />
        <br />
        <Box sx={{ minHeight: "72vh" }}>
          <Box
            sx={{ border: "2px solid black", width: "60%", margin: "0 auto" }}
          >
            <Box sx={{ height: "100px", pt: 4 }}>
              <Steppers astep={1} />
            </Box>

            <Typography
              sx={{
                fontSize: "28px",
                fontWeight: "bold",
                p: 1,
                mb: 1,
                textAlign: "center",
              }}
            >
              Add Shipping Address
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Stack sx={{ p: 1 }} spacing={2}>
                <FormControl sx={{ width: "82ch" }}>
                  <OutlinedInput
                    placeholder=" Address Line 1"
                    name="addressline1"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.addressline1}
                    // value={"asas"}
                  />
                  {errors.addressline1 && touched.addressline1 ? (
                    <FormHelperText error>{errors.addressline1}</FormHelperText>
                  ) : null}
                </FormControl>
                <FormControl sx={{ width: "82ch" }}>
                  <OutlinedInput
                    placeholder=" Address Line 2"
                    name="addressline2"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.addressline2}
                  />
                  {errors.addressline2 && touched.addressline2 ? (
                    <FormHelperText error>{errors.addressline2}</FormHelperText>
                  ) : null}
                </FormControl>
                <Stack direction="row" spacing={2}>
                  <FormControl sx={{ width: "40ch" }}>
                    <OutlinedInput
                      placeholder="City"
                      name="city"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.city}
                    />
                    {errors.city && touched.city ? (
                      <FormHelperText error>{errors.city}</FormHelperText>
                    ) : null}
                  </FormControl>
                  <FormControl sx={{ width: "40ch" }}>
                    <OutlinedInput
                      placeholder="State/Province/Region"
                      name="state"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.state}
                    />
                    {errors.state && touched.state ? (
                      <FormHelperText error>{errors.state}</FormHelperText>
                    ) : null}
                  </FormControl>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <FormControl sx={{ width: "40ch" }}>
                    <OutlinedInput
                      placeholder="Country"
                      name="country"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.country}
                    />
                    {errors.country && touched.country ? (
                      <FormHelperText error>{errors.country}</FormHelperText>
                    ) : null}
                  </FormControl>
                  <FormControl sx={{ width: "40ch" }}>
                    <OutlinedInput
                      placeholder="PostCode"
                      name="postcode"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.postcode}
                    />
                    {errors.postcode && touched.postcode ? (
                      <FormHelperText error>{errors.postcode}</FormHelperText>
                    ) : null}
                  </FormControl>
                </Stack>
              </Stack>
            </Box>
            <br />

            <Box sx={{ display: "flex", justifyContent: "center", p: 1 }}>
              <Box sx={{ width: "80%", border: "1px solid lightgrey", p: 1 }}>
                {addressPresent.addressline1 !== undefined ? (
                  <>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={usePreviousAddress}
                            onChange={handleCheckboxChange}
                          />
                        }
                        label="Use the Previous Address"
                      />
                    </FormGroup>
                    <Typography variant="subtitle">{preAddress}</Typography>
                  </>
                ) : null}
              </Box>
            </Box>

            <br />
            <Box sx={{ display: "flex", justifyContent: "center", p: 1 }}>
              <Stack direction="row" spacing={4}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleGoBack}
                >
                  Go Back
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleSubmit}
                >
                  Checkout
                </Button>
              </Stack>
            </Box>
          </Box>
        </Box>
      </UserLayout>
    </>
  );
};

export default OrderAddress;
