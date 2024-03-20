import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthenticationService from "./AuthenticationService";
import { doLogin } from "./UserService";
import { Link, useNavigate } from "react-router-dom";
import loginsvg from "../img/loginsvg.jpg";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import { toast } from "react-toastify";

const LoginPage = () => {
  const validationSchema = Yup.object({
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
  });
  const initialValues = {
    username: "",
    password: "",
  };
  const nav = useNavigate();
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
    handleReset,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, action) => {
      AuthenticationService.login(values)
        .then((res) => {
          console.log(res.data);
          doLogin(res.data, () => {
            let data = res.data;
            const role = data.user.authorities[0].authority;
            if (role === "ADMIN") {
              nav("/admin/home");
            } else if (role === "USER") {
              nav("/user/dashboard");
            }
          });
        })
        .catch((error) => {
         
          if(error.response.status === 404) {
           
            toast.error("Username Or Password does not match");
            
          }
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
            {/* 
            <a href="https://www.freepik.com/free-vector/access-control-system-abstract-concept_12085707.htm#query=login&position=0&from_view=search&track=sph">Image by vectorjuice</a> on Freepik */}
            <img
              src={loginsvg}
              alt="https://www.freepik.com/free-vector/access-control-system-abstract-concept_12085707.htm#query=login&position=0&from_view=search&track=sph"
              loading="lazy"
              style={{
                height: "100%",
                width: "auto",
                margin: "0 auto",
                content: "",
                backgroundColor: "#fbf7f5",
                mixBlendMode: "multiply",
              }}
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
            <LockPersonIcon sx={{ height: 50, width: 50, color: "	#ff0000" }} />
          </Typography>
          <Typography
            variant="h3"
            sx={{ textAlign: "center", color: "	#005b96" }}
          >
            Login Page
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
                    type="email"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Email"
                    autoComplete="username"
                  />
                  {errors.username && touched.username ? (
                    <FormHelperText error>{errors.username}</FormHelperText>
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
                    <FormHelperText error>{errors.password}</FormHelperText>
                  ) : null}
                </FormControl>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ backgroundColor: "	#005b96" }}
                >
                  Login
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  color="secondary"
                  onClick={handleReset}
                  sx={{ backgroundColor: "#ff7b7b", color: "#a70000" }}
                >
                  Cancel
                </Button>
              </Stack>
            </form>
          </Box>
          <Box sx={{ margin: 10, display: "flex", justifyContent: "center",flexDirection:"column" ,gap:2}}>
            <Link
              to="/register"
              style={{
                fontSize: "24px",
                textAlign: "center",
              }}
            >
              Don't have an account? Register here
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

export default LoginPage;
