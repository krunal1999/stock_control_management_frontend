import { Box, Button, Stack, Typography } from "@mui/material";
import UserLayout from "../componets/UserLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import UserService from "../UserService";
import { getCurrentUser } from "../../authrntication/UserService";
import { useState } from "react";

const OrderSuccess = () => {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const paymentIntent1 = searchParams.get("payment_intent");
  const redirectStatus1 = searchParams.get("redirect_status");

  const nav = useNavigate();
  const user = getCurrentUser();

  const [OrderProducts, setOrderProducts] = useState([]);

  

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await UserService.getOrderProduct(user.id);
        console.log("🚀 ~ file: OrderSuccess.jsx:30 ~ fetchdata ~ re̥s:", res);
        setOrderProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, [user.id]);

  const orderidt = localStorage.getItem("orderid");
  useEffect(() => {
    if (OrderProducts.length !== 0 && paymentIntent1 !== "") {
      localStorage.setItem("totalquantity", 0);
      OrderProducts.forEach((product) => {
        let data = {
          userid: user.id,
          productid: product.productid,
          orderid: orderidt,
          username: user.username,
          productname: product.productName,
          quantity: product.quantity,
          sellingPrice: product.sellingprice,
          clientIntent: paymentIntent1,
          orderStatus: redirectStatus1,
          productTrackStatus: "PAID",
        };
        UserService.saveOrderSuccess(data).then().catch();
      });
      UserService.deleteByIdOrder(user.id);

      localStorage.setItem("orderid", 0);
    }
  }, [
    user.id,
    user.username,
    OrderProducts,
    paymentIntent1,
    redirectStatus1,
    orderidt,
  ]);

  return (
    <UserLayout>
      <br />
      <br />
      <br />
      <br />
      <Box sx={{ minHeight: "72vh" }}>
        <Box sx={{ border: "2px solid black", width: "60%", margin: "0 auto" }}>
          <Stack>
            <Typography
              variant="h2"
              sx={{ textAlign: "center", color: "green" }}
            >
              Order Success
            </Typography>
            <br />
            <br />
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              Thank you, your payment has been successfully processed and your
              order is now complete! We appreciate your business and look
              forward to fulfilling your order soon. If you have any other
              questions, please don't hesitate to contact us. Enjoy the rest of
              your day!
            </Typography>

            <br />
            <br />

            <Typography sx={{ textAlign: "center" }}>
              <Button
                variant="contained"
                onClick={() => nav("/user/dashboard")}
              >
                Click here to home page
              </Button>
            </Typography>
            <br />
            <br />
            <br />
          </Stack>
        </Box>
      </Box>
    </UserLayout>
  );
};

export default OrderSuccess;
