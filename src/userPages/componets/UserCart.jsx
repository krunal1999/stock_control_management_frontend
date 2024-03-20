import { Box, Button, Stack, Typography } from "@mui/material";
import UserLayout from "./UserLayout";
import UserCartList from "../small componets/UserCartList";
import { useState } from "react";
import { useEffect } from "react";
import UserService from "../UserService";
import { getCurrentUser } from "../../authrntication/UserService";
import { useNavigate } from "react-router-dom";

const UserCart = () => {
  const [UserCartListdata, setUserCartListdata] = useState([]);
  const [reload, setReload] = useState(false);
  const user = getCurrentUser();

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await UserService.getAllCartItem(user.id);

        setUserCartListdata(res.data);

        // if (reload) {
        //   setReload(false);
        // }
        setReload(!reload)
      } catch (error) {
        console.log(
          "🚀 ~ file: UserProduct.jsx:67 ~ fetchdata ~ error:",
          error
        );
      }
    };
    fetchdata();
  }, [user.id, reload]);

  const handleDelete = (id) => {
    UserService.deleteById(id);
    setReload(!reload);
  };

  const handleDecrease = (id) => {
    UserService.minusById(id);
    setReload(!reload);
  };

  const handleIncrease = (id) => {
    UserService.addById(id);
    setReload(!reload);
  };

  const nav = useNavigate();

  const handleProceedToBuy = () => {
    nav("/user/orderconfirmation");
  };

  console.log(UserCartListdata.length);
  return (
    <>
      <UserLayout>
        <br />
        <br />
        <br />
        <br />
        <Box sx={{ minHeight: "100vh" }}>
          <Typography variant="h3" gutterBottom>
            Shopping Cart
          </Typography>
          <Box sx={{ border: "1px solid black" }}>
            <Stack direction="row" spacing={140}>
              <Typography variant="h5" sx={{ p: 1 }}>
                Products
              </Typography>
              {UserCartListdata.length <= 0 ? (
                <Button
                  variant="contained"
                  sx={{ background: "#ff9900", color: "#fff", borderRadius: 3 }}
                  onClick={handleProceedToBuy}
                  disabled
                >
                  Proceed To Buy
                </Button>
              ) : (
                <Button
                  variant="contained"
                  sx={{ background: "#ff9900", color: "#fff", borderRadius: 3 }}
                  onClick={handleProceedToBuy}
                >
                  Proceed To Buy
                </Button>
              )}
            </Stack>
          </Box>
          <Stack spacing={4}>
            <UserCartList
              list={UserCartListdata}
              handleDelete={handleDelete}
              handleIncrease={handleIncrease}
              handleDecrease={handleDecrease}
            />
          </Stack>
        </Box>
      </UserLayout>
    </>
  );
};

export default UserCart;
