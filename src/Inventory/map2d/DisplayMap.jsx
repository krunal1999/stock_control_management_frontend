import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import { Tooltip, Typography } from "@mui/material";


import { useLayoutEffect,  useState } from "react";

import { useEffect } from "react";
import InventoryService from "../InventoryService";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#bcbcbc",
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: "center",
  color: "#1e0413",
  order: "",
  display: "flex", 
  alignItems: "center", 
  justifyContent: "center", 
}));

const DisplayMap = () => {
  
  const printLocation = (event) => {
    const itemElement = event.currentTarget;
    const order = itemElement.getAttribute("data-mui-order");
    const computedStyle = window.getComputedStyle(itemElement);
    const styleOrder = computedStyle.getPropertyValue("order");
    console.log("Item ID:", "productID__" + order);
    console.log("Style order:", styleOrder);
  };

  const data=[];

  const [itemOrders, setItemOrders] = useState([]);
  const [updatedOrders,setupdatedOrders] = useState({});
  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        const response = await InventoryService.getMap();
        const filteredData = response.data.filter(
          (item) => item.noOfshelves !== 0
        );
        setItemOrders(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  itemOrders.forEach((pl) => {
    data.push(pl.breadthRequired);
  });


  useEffect(() => {
    const masonryContainer = document.querySelector(".MuiMasonry-root");
    const itemElements = masonryContainer.querySelectorAll("[data-mui-order]");
    const temp = {}
    itemElements.forEach((itemElement) => {
      const order = itemElement.getAttribute("data-mui-order");
      const itemIndex = parseInt(order, 10);
      const computedStyle = window.getComputedStyle(itemElement);
      const styleOrder = parseInt(computedStyle.getPropertyValue("order")); 

      
        temp[itemIndex + 1] = styleOrder;
        setupdatedOrders(temp);
      
    });
    
  },[]);
  console.log("🚀 ~ file: DisplayMap.jsx:86 ~ DisplayMap ~ data:", data);
  console.log("🚀 ~ file: DisplayMap.jsx:75 ~ updatedOrders ~ data:", updatedOrders);
  

  // useEffect(() => {
  //   // Perform the logic here to update updatedOrders based on data
  //   const newData = itemOrders.map((pl) => pl.breadthRequired);
  //   const newUpdatedOrders = {};
  //   const masonryContainer = document.querySelector(".MuiMasonry-root");
  //   const itemElements = masonryContainer.querySelectorAll("[data-mui-order]");

  //   itemElements.forEach((itemElement) => {
  //     const order = itemElement.getAttribute("data-mui-order");
  //     const itemIndex = parseInt(order, 10);
  //     const computedStyle = window.getComputedStyle(itemElement);
  //     const styleOrder = parseInt(computedStyle.getPropertyValue("order"));

  //     newUpdatedOrders[itemIndex + 1] = styleOrder;
  //   });

  //   setUpdatedOrders(newUpdatedOrders);
  // }, [itemOrders]);

 
  

  const lightHexColors = [
    "#a8e6cf",
    "#dcedc1",
    "#ffd3b6",
    "#ffaaa5",
    "#ff8b94",
  ];

  return (
    <Box sx={{ minHeight: 800 }}>
      <Masonry columns={10} spacing={3} direction="row">
        {itemOrders.map((item, index) => (
          <Tooltip
            title={
              <>
                <Typography>noOfshelves &nbsp; {item.noOfshelves}</Typography>
                <Typography>quantity &nbsp; {item.quantity}</Typography>
              </>
            }
            key={index}
          >
            <Item
              sx={{
                height: item.breadthRequired + 10,
                backgroundColor: lightHexColors[index % lightHexColors.length],
                border: "0.6px dotted grey",
              }}
              data-mui-order={index}
              onClick={printLocation}
              elevation={6}
            >
              <Typography>productId &nbsp; {item.productId}</Typography>
            </Item>
          </Tooltip>
        ))}
      </Masonry>
    </Box>
  );
};

export default DisplayMap;
