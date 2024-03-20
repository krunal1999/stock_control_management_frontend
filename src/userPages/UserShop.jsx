import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import UserLayout from "./componets/UserLayout";
import FilterSidebar from "./small componets/FilterSidebar";
import ProductCard from "./small componets/ProductCard";
import { useEffect, useState } from "react";
import UserService from "./UserService";

const UserShop = () => {
  const [sort, setsort] = useState("relevance");
  const [ProductType, setProductType] = useState("ALL");
  const [CategoryType, setCategoryType] = useState("ALL");

  const handleChange = (event) => {
    setsort(event.target.value);
  };

  const [UserProductListdata, setUserProductListdata] = useState([]);

  const [caSeti, setCaSeti] = useState(new Set());
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await UserService.getAllProduct();
        let newProductTemp1 = [];
        let caSet = new Set();

        res.data.forEach((newpro) => {
          if (newpro.activestatus === "ACTIVE") {
            newProductTemp1.unshift(newpro);
            caSet.add(newpro.categories);
          }
        });

        setCaSeti(caSet);
        let filtered = [];
        if (ProductType === "NEW") {
          filtered = newProductTemp1.filter(
            (p) => p.productstatus === ProductType
          );

          setUserProductListdata(filtered);
        } else if (ProductType === "FEATURED") {
          filtered = newProductTemp1.filter(
            (p) => p.productstatus === ProductType
          );
          setUserProductListdata(filtered);
        } else if (ProductType === "HOT SELLING") {
          filtered = newProductTemp1.filter(
            (p) => p.productstatus === ProductType
          );
          setUserProductListdata(filtered);
        } else if (CategoryType !== "ALL") {
          filtered = newProductTemp1.filter(
            (p) => p.categories === CategoryType
          );

          setUserProductListdata(filtered);
        } else {
          setUserProductListdata(newProductTemp1);
        }
      } catch (error) {
        console.log(
          "🚀 ~ file: UserProduct.jsx:67 ~ fetchdata ~ error:",
          error
        );
      }
    };
    fetchdata();
  }, [ProductType, CategoryType]);

  const [newProductTemp, setnewProductTemp] = useState([]);

  useEffect(() => {
    const sortByPrice = (sort) => {
      let sortedProducts = [...UserProductListdata];

      if (sort === "ltoh") {
        sortedProducts.sort((a, b) => a.sellingPrice - b.sellingPrice);
      }
      if (sort === "htol") {
        sortedProducts.sort((a, b) => b.sellingPrice - a.sellingPrice);
      }
      setnewProductTemp(sortedProducts);
    };

    if (sort) {
      sortByPrice(sort);
    }
  }, [sort, UserProductListdata]);

  const getProductType = (checked) => {
    setProductType(checked);
  };

  const getCategoryType = (checked) => {
    setCategoryType(checked);
  };

  return (
    <>
      <UserLayout>
        <br />
        <br />
        <br />
        <Box sx={{ padding: 2 }}>
          <Stack direction="row" spacing={4}>
            <Box
              height={1000}
              sx={{
                padding: 1,
                border: "0px solid black",
                width: "20%",
                bgcolor: "#dfebf4",
              }}
            >
              <Stack spacing={4}>
                <Box>
                  <FilterSidebar
                    pt={getProductType}
                    caSet={caSeti}
                    ct={getCategoryType}
                  />
                </Box>
              </Stack>
            </Box>

            <Box sx={{ padding: 1, border: "0px solid black", width: "80%" }}>
              <Stack>
                <Box
                  sx={{
                    border: "2px solid #eaeaea",
                    width: "90%",
                    height: 50,
                    margin: "0 auto",
                    marginBottom: 2,

                    paddingTop: 2,
                    paddingBottom: 1,
                    borderRadius: 2,
                    bgcolor: "#eaeaea",
                    color: "#0b5394",
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={4}
                    divider={<Divider orientation="vertical" flexItem />}
                  >
                    <Typography sx={{ padding: 1, fontSize: 20 }}>
                      &nbsp;&nbsp;Total 10 products
                    </Typography>

                    <FormControl sx={{ m: 1, minWidth: 170 }} size="small">
                      <InputLabel id="demo-simple-select-label">
                        Sort
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={sort}
                        label="Age"
                        onChange={handleChange}
                      >
                        <MenuItem value={"relevance"}>Relevance</MenuItem>
                        <MenuItem value={"ltoh"}>Price, low to high</MenuItem>
                        <MenuItem value={"htol"}>Price, high to low</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                </Box>

                <ProductCard data={newProductTemp} />
              </Stack>
            </Box>
          </Stack>
        </Box>

        <br />
      </UserLayout>
    </>
  );
};

export default UserShop;
