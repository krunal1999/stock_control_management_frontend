import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import UserLayout from "./UserLayout";
import { useState } from "react";
import { useEffect } from "react";
import { getCurrentUser } from "../../authrntication/UserService";
import UserService from "../UserService";
import { useNavigate } from "react-router-dom";
import Steppers from "../small componets/Steppers";

const OrderConfirmation = () => {
  const [UserCartListdata, setUserCartListdata] = useState([]);
  const user = getCurrentUser();
  const nav = useNavigate();
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await UserService.getAllCartItem(user.id);

        setUserCartListdata(res.data);
        
    
      } catch (error) {
        console.log(
          "🚀 ~ file: UserProduct.jsx:67 ~ fetchdata ~ error:",
          error
        );
      }
    };
    fetchdata();
  }, [user.id]);

  console.log("thisss--", UserCartListdata);

  const [totalQuantity , setTotalQuantity] = useState(0)
  const [totalAmount , setTotalAmount] = useState(0)
  const [productArray , setProductArray] = useState([])

  useEffect(() => {
    const temptotalQuantity = UserCartListdata.reduce((total, current) => {
      return total + current.quantity;
    }, 0);
    setTotalQuantity(temptotalQuantity)
    
    const temptotalAmount = UserCartListdata.reduce((total, current) => {
      return total + current.quantity * current.sellingPrice;
    }, 0);
    setTotalAmount(temptotalAmount)

    const tempproductArray = UserCartListdata.map((data) => ({
      productid: data.productid,
      productName: data.productname,
      quantity: data.quantity,
      sellingprice: data.sellingPrice,
      amount: data.quantity * data.sellingPrice,
     
      userid: data.userid,
    }));
    setProductArray(tempproductArray)

  },[UserCartListdata]);

  const handleConfirmOrder = () => {
    const data = {
      totalamount: totalAmount,
      username: user.id,
      orderProduct: productArray,
    };

    UserService.addOrder(data)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });

    nav("/user/orderaddress");
  };
  const handleGoBack = () => {
    nav("/user/cart");
  };

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
              <Steppers astep={0} />
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
              Order Confirmation
            </Typography>
            <Divider></Divider>
            <Stack
              direction="row"
              spacing={6}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Typography
                sx={{
                  fontSize: "20px",
                  width: "300px",
                  pl: 1,
                  fontWeight: "bold",
                }}
              >
                Product Name
              </Typography>
              <Typography
                sx={{ fontSize: "20px", width: "100px", fontWeight: "bold" }}
              >
                Product Price
              </Typography>
              <Typography
                sx={{ fontSize: "20px", width: "100px", fontWeight: "bold" }}
              >
                Product Quantity
              </Typography>

              <Typography
                sx={{ fontSize: "20px", width: "200px", fontWeight: "bold" }}
              >
                Total
              </Typography>
            </Stack>
            <br />
            <Divider></Divider>

            {UserCartListdata[0] && (
              <Stack spacing={2}>
                {UserCartListdata.map((product, index) => {
                  return (
                    <Stack
                      direction="row"
                      spacing={6}
                      key={index}
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <Typography
                        sx={{ fontSize: "20px", width: "300px", pl: 1 }}
                      >
                        {product.productname}
                      </Typography>
                      <Typography sx={{ fontSize: "20px", width: "100px" }}>
                        {product.quantity}
                      </Typography>
                      <Typography sx={{ fontSize: "20px", width: "100px" }}>
                        $ {product.sellingPrice}
                      </Typography>
                      <Typography sx={{ fontSize: "20px", width: "200px" }}>
                        $ {product.sellingPrice * product.quantity}
                      </Typography>
                    </Stack>
                  );
                })}
              </Stack>
            )}

            <br />
            <Divider></Divider>
            <br />

            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Stack direction="row" spacing={6}>
                <Typography sx={{ fontSize: "20px", width: "300px", pl: 1 }}>
                  Total
                </Typography>
                <Typography sx={{ fontSize: "20px", width: "100px" }}>
                  {totalQuantity}
                </Typography>
                <Typography
                  sx={{ fontSize: "20px", width: "100px" }}
                ></Typography>
                <Typography sx={{ fontSize: "20px", width: "200px" }}>
                  $ {totalAmount}
                </Typography>
              </Stack>
            </Box>
            <br />
            <Divider></Divider>
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
                  color="secondary"
                  onClick={handleConfirmOrder}
                >
                  Confirm Order
                </Button>
              </Stack>
            </Box>
          </Box>
        </Box>
      </UserLayout>
    </>
  );
};

export default OrderConfirmation;
