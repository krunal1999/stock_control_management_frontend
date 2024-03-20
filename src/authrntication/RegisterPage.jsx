import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import AuthenticationService from "./AuthenticationService";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import registerimg from "../img/register.jpg";
import HowToRegIcon from "@mui/icons-material/HowToReg";
const RegisterPage = () => {
  const validationSchema = Yup.object({
    firstname: Yup.string()
      .min(3, "First Name must be at least 3 characters")
      .max(10, "First Name must not exceed 10 characters")
      .required("First Name is required"),
    lastname: Yup.string()
      .min(3, "Last Name must be at least 3 characters")
      .max(10, "Last Name must not exceed 10 characters")
      .required("Last Name is required"),
    username: Yup.string()
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        "Invalid email address. The domain does not found"
      )
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must not exceed 20 characters")
      .matches(
        /^(?=.*[a-z]{1,})(?=.*[A-Z]{1,})(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
        "Password must contain at least 3 lowercase, 3 uppercase, 1 symbol, and 1 number"
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    agreed: Yup.boolean().oneOf([true], "You must agree to the conditions"),
  });

  const nav = useNavigate();
  const intitialValues = {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmPassword: "",
    agreed: false,
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
    initialValues: intitialValues,
    validationSchema: validationSchema,
    onSubmit: (values, action) => {
      AuthenticationService.registerUser(values)
        .then((response) => {
          if (response.status === 200) {
            toast.success("Registeration success");

            nav("/login");
          } else {
            toast.info("User already exist, enter other email");
          }
        })
        .catch((error) => {
          if(error.response.status === 409) {
           
            toast.error("User already exist, enter other email");
            
          }
          toast.error("Registeration fail , please fill all the data again");
        });
    },
  });

  return (
    <>
      <Stack direction="row" spacing={1}>
        <Box sx={{ height: "100vh", width: "60%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            {/* https://www.freepik.com/free-vector/access-control-system-abstract-concept_12085707.htm#query=login&position=0&from_view=search&track=sph from freepik*/}
            <img
              src={registerimg}
              alt="https://www.freepik.com/free-vector/access-control-system-abstract-concept_12085707.htm#query=login&position=0&from_view=search&track=sph"
              style={{
                height: "100%",
                width: "auto",
                margin: "0 auto",
                content: "",
                backgroundColor: "#fbf7f5",
                mixBlendMode: "multiply",
              }}
              loading="lazy" 
            />
          </div>
        </Box>
        <Box
          sx={{
            height: "100vh",
            width: "40%",
            borderLeft: "5px solid #b3cde0",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            flexDirection: "column",
            backgroundColor: "		#fffff4",
          }}
        >
          <Typography sx={{ textAlign: "center" }}>
            <HowToRegIcon sx={{ height: 50, width: 50, color: "	#ff0000" }} />
          </Typography>

          <Typography
            variant="h3"
            sx={{ textAlign: "center", color: "	#005b96" }}
          >
            Register Page
          </Typography>
          <Box
            p={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <br />
            <form onSubmit={handleSubmit} style={{ width: 500 }}>
              <Stack spacing={2}>
                <FormControl fullWidth variant="outlined">
                  <OutlinedInput
                    type="text"
                    name="firstname"
                    value={values.firstname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="First Name"
                  />
                  {errors.firstname && touched.firstname ? (
                    <FormHelperText id="component-error-text" error>
                      {errors.firstname}
                    </FormHelperText>
                  ) : null}
                </FormControl>
                <FormControl fullWidth variant="outlined">
                  <OutlinedInput
                    type="text"
                    name="lastname"
                    value={values.lastname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Last Name"
                  />
                  {errors.lastname && touched.lastname ? (
                    <FormHelperText id="component-error-text" error>
                      {errors.lastname}
                    </FormHelperText>
                  ) : null}
                </FormControl>
                <FormControl fullWidth variant="outlined">
                  <OutlinedInput
                    type="username"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Email"
                  />

                  {errors.username && touched.username ? (
                    <FormHelperText id="component-error-text" error>
                      {errors.username}
                    </FormHelperText>
                  ) : null}
                </FormControl>
                <FormControl fullWidth variant="outlined">
                  <OutlinedInput
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Password"
                  />
                  {errors.password && touched.password ? (
                    <FormHelperText id="component-error-text" error>
                      {errors.password}
                    </FormHelperText>
                  ) : null}
                </FormControl>
                <FormControl fullWidth variant="outlined">
                  <OutlinedInput
                    type="password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Re-enter Password"
                  />
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <FormHelperText id="component-error-text" error>
                      {errors.confirmPassword}
                    </FormHelperText>
                  ) : null}
                </FormControl>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.agreed}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="agreed"
                    />
                  }
                  label="I agree to all conditions."
                >
                  {errors.agreed && touched.agreed ? (
                    <FormHelperText id="component-error-text" error>
                      {errors.agreed}
                    </FormHelperText>
                  ) : null}
                </FormControlLabel>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ backgroundColor: "	#005b96" }}
                >
                  Register
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  color="error"
                  onClick={handleReset}
                  sx={{ backgroundColor: "#ff7b7b", color: "#a70000" }}
                >
                  Reset
                </Button>
              </Stack>
            </form>
          </Box>
          <Box sx={{ margin: 10, display: "flex", justifyContent: "center",gap:2,flexDirection:"column" }}>
            <Link
              to="/login"
              style={{
                fontSize: "24px",
                textAlign: "center",
              }}
            >
              Already have an account? Login here
            </Link>
            <Link
              to="/home"
              style={{
                fontSize: "24px",
                textAlign: "center",
              }}
            >
              Go To HomePage
            </Link>
          </Box>
        </Box>
      </Stack>
    </>
  );
};

export default RegisterPage;
