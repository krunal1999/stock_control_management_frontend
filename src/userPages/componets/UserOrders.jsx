import { Box } from "@mui/material";
import UserLayout from "./UserLayout";
import UserOrderList from "./UserOrderList";
import { useEffect } from "react";
import { getCurrentUser } from "../../authrntication/UserService";
import UserService from "../UserService";
import { useState } from "react";

const UserOrders = () => {
  const user = getCurrentUser();
  const[orderList , setOrderList] = useState([])

  const rows = [];

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await UserService.getOrdersById(user.id)
        setOrderList(res.data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, [user.id]);

  orderList.forEach((data)=>{
    rows.unshift(data)
  })
  

  return (
    <UserLayout>
      <br />
      <br />
      <br />
      <br />
      <Box sx={{ minHeight: "72vh" }}>
        <UserOrderList rows={rows} />
      </Box>
    </UserLayout>
  );
};

export default UserOrders;
