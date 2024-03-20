import {
  Box,
  Button,
  FormControl,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import UserLayout from "./UserLayout";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import UserService from "../UserService";
import ViewProductImages from "../small componets/ViewProductImages";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { getCurrentUser } from "../../authrntication/UserService";
import { toast } from "react-toastify";
const ViewProduct = () => {
  const { id } = useParams();
  const [UserProductListdata, setUserProductListdata] = useState({});

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await UserService.getProductById(id);

        setUserProductListdata(res.data);
      } catch (error) {
        console.log(
          "🚀 ~ file: UserProduct.jsx:67 ~ fetchdata ~ error:",
          error
        );
      }
    };
    fetchdata();
  }, [id]);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleInputChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    if (!isNaN(newQuantity)) {
      setQuantity(newQuantity);
    }
  };

  const user = getCurrentUser();
  const nav = useNavigate();

  const handleAddToCart = () => {
    const data = {
      productid: UserProductListdata.id,
      userid: user.id,
      productname: UserProductListdata.productname,
      brand: UserProductListdata.brand,
      categories: UserProductListdata.categories,
      about: UserProductListdata.about,
      title: UserProductListdata.title,
      sellingPrice: UserProductListdata.sellingPrice,
      quantity: quantity,
      totalsellingprice: 0,
      totalquantity: 0,
      finalamount: 0,
      paymentstatus: false,
      fileName: UserProductListdata.images[0].fileName,
      fileType: UserProductListdata.images[0].fileType,
      imageData: UserProductListdata.images[0].imageData,
    };

    UserService.addProductToCart(data)
      .then((response) => {
        console.log(response.data);
        toast.success("Product Added to Cart");
        nav("/user/cart");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <UserLayout>
        <br />
        <br />
        <br />
        <br />
        <Box sx={{ height: "72vh" }}>
          <Stack direction="row" spacing={4}>
            <Box
              sx={{
                height: "70vh",
                border: "0px solid black",
                width: "60%",
                bgcolor: "#f5f5f5",
              }}
            >
              <ViewProductImages img1={UserProductListdata} />
            </Box>

            {/* ------------------------------------------------ */}

            <Box
              sx={{ height: "70vh", border: "0px solid black", width: "40%" }}
            >
              <Typography
                variant="h5"
                sx={{ fontSize: 28, paddingTop: 2, fontWeight: "bold" }}
              >
                {UserProductListdata.title} &nbsp;
                <span
                  style={{
                    color: "green",
                    backgroundColor: "lightgreen",
                    paddingLeft: 2,
                    paddingRight: 2,
                    borderRadius: 5,
                    fontSize: 20,
                  }}
                >
                  {UserProductListdata.productstatus}
                </span>
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  fontSize: 32,
                  paddingTop: 2,
                  fontWeight: "bold",
                  color: "red",
                }}
              >
                $ {UserProductListdata.sellingPrice}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignContent: "center",
                  textAlign: "center",
                }}
              >
                <CheckBoxIcon
                  sx={{
                    color: "green",
                    height: 28,
                    paddingRight: 1,
                    alignSelf: "center",
                  }}
                />
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: 20,
                    paddingTop: 1,
                    fontWeight: "bold",
                    color: "grey",
                    alignSelf: "center",
                  }}
                >
                  In stock
                </Typography>
              </Box>
              <Typography
                variant="h5"
                sx={{
                  fontSize: 24,
                  paddingTop: 6,
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                OVERVIEW
              </Typography>
              <Typography
                variant="subtitle"
                sx={{
                  fontSize: 18,
                  paddingTop: 4,
                  color: "black",
                }}
              >
                <span style={{ fontWeight: "bold" }}>
                  {UserProductListdata.productname} <br />
                </span>
                {UserProductListdata.about}
              </Typography>

              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: 24,
                    paddingTop: 8,
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  QUANTITY:
                </Typography>

                <Stack direction="row" sx={{ pt: 2 }}>
                  <Button
                    variant="outlined"
                    sx={{ width: 2, height: 55 }}
                    onClick={handleIncrease}
                  >
                    <AddIcon />
                  </Button>
                  <FormControl sx={{ width: "10ch" }} variant="outlined">
                    <OutlinedInput
                      id="outlined-adornment-weight"
                      value={quantity}
                      onChange={handleInputChange}
                      aria-describedby="outlined-weight-helper-text"
                      inputProps={{
                        "aria-label": "weight",
                      }}
                    />
                  </FormControl>
                  <Button
                    variant="outlined"
                    color="error"
                    sx={{ width: 2, height: 55 }}
                    onClick={handleDecrease}
                  >
                    <RemoveIcon />
                  </Button>
                </Stack>
              </Box>

              <Stack direction="row" spacing={2} sx={{ pt: 4 }}>
                <Button
                  variant="contained"
                  el
                  sx={{
                    bgcolor: "#e97451",
                  }}
                  onClick={handleAddToCart}
                >
                  ADD TO CART
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#5cb85c",
                  }}
                  onClick={handleAddToCart}
                >
                  PROCCED TO BUY
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </UserLayout>
    </>
  );
};

export default ViewProduct;
