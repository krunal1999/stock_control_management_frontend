import { Box, Button, Stack, Typography } from "@mui/material";
import UserLayout from "./UserLayout";
import Steppers from "../small componets/Steppers";
import CheckoutMain from "../../stripe/CheckoutMain";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../authrntication/UserService";
import { useEffect } from "react";
import UserService from "../UserService";
import { useState } from "react";

const PayandCheckout = () => {
  const nav = useNavigate();

  const handletranscation = () => {
    nav("/user/shop");
  };
  const handleGoBack = () => {
    nav("/user/orderaddress");
  };

  const user = getCurrentUser();
  const [orderdetails, setorderDetails] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await UserService.getOrder(user.id);

        setorderDetails(res.data);
        localStorage.setItem("orderid" , res.data.orderid)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [user.id]);

  console.log(orderdetails.totalamount)

  return (
    <UserLayout>
      <br />
      <br />
      <br />
      <br />
      <Box sx={{ minHeight: "72vh" }}>
        <Box sx={{ border: "2px solid black", width: "60%", margin: "0 auto" }}>
          <Box sx={{ height: "100px", pt: 4 }}>
            <Steppers astep={2} />
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
            Pay and Checkout
          </Typography>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h6">
              Order Id :{orderdetails.orderid}
            </Typography>
            <Typography variant="h6">
              Amount : {orderdetails.totalamount}{" "}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {orderdetails.totalamount && (
              <CheckoutMain price={orderdetails.totalamount} />
            )}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", p: 1 }}>
            <Stack direction="row" spacing={4}>
              <Button variant="contained" color="error" onClick={handleGoBack}>
                Go Back
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handletranscation}
              >
                Cancel Trasnscation
              </Button>
            </Stack>
          </Box>
        </Box>
      </Box>
    </UserLayout>
  );
};

export default PayandCheckout;
