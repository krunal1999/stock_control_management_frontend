import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";

import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Autocomplete, Badge, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logoicon from "../../img/logo2full.png";
import { getCurrentUser, isLoggedIn } from "../../authrntication/UserService";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";
import { useEffect } from "react";
import UserService from "../UserService";

const pages = ["home", "shop"];
const settings = ["Order", "Logout"];

function UserNavbar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();
  const handleClick = (setting) => {
    if (setting === "Logout") {
      localStorage.removeItem("data");
      navigate("/home");
    }
    if (setting === "Order") {
      navigate("/user/userorders");
    }
    handleCloseUserMenu();
  };

  const [cartbadge, newCartbadge] = React.useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    const cartbadge1 = localStorage.getItem("totalquantity");
    newCartbadge(cartbadge1);
  });

  // const seaA = [
  //   "MacBook Pro",
  //   "iPhone 12",
  //   "Bose Headphones",
  //   "Samsung Galaxy S21",
  //   "Amazon Echo",
  //   "PlayStation 5",
  //   "Oculus Quest 2",
  //   "Apple Watch Series 6",
  //   "Nintendo Switch",
  //   "LG OLED TV",
  // ];

  function handlePageClick(page) {
    console.log(`Clicked on page: ${page}`);
    if (page === "home") {
      navigate("/user/dashboard");
    } else {
      navigate("/user/" + page);
    }
  }

  const [firstname, setFirstname] = React.useState("");
  React.useEffect(() => {
    try {
      const user = getCurrentUser();
      if (user) {
        setFirstname(user.firstname);
      }
    } catch {}
  }, []);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await UserService.getAllProduct();
        let newProductTemp1 = [];

        res.data.forEach((newpro) => {
          if (newpro.activestatus === "ACTIVE") {
            newProductTemp1.unshift(newpro);
          }
        });
        setProducts(newProductTemp1);
      } catch (error) {
        console.log(
          "🚀 ~ file: UserProduct.jsx:67 ~ fetchdata ~ error:",
          error
        );
      }
    };
    fetchdata();
  }, []);

  const productNameSet = new Set(products.map((data) => data.productname));
  const productNameArr = Array.from(productNameSet);

  const [searchProduct, setSearchProduct] = React.useState([]);

  const filteredProducts = products.filter((product) =>
    product.productname.includes(searchProduct)
  );

  const nav = useNavigate();

  const handleSearch = () => {
    if (filteredProducts[0].id) {
      nav("/user/viewproduct/" + filteredProducts[0].id);
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor: "#011f4b", color: "black" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Button onClick={() => navigate("/user/dashboard")}>
            <img
              src={logoicon}
              alt=""
              style={{ display: { xs: "none", md: "flex" }, mr: 1, height: 40 }}
            />
          </Button>

          <Box sx={{ flexGrow: 1, ml: 5, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handlePageClick(page)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}

            <Autocomplete
              sx={{
                ml: { xs: 0, md: 2 },
                mr: { xs: 1, md: 0 },
                bgcolor: "background.paper",
                borderRadius: "10px 0 0 10px",
                width: 300,
                height: 50,
                mt: 1,
              }}
              disablePortal
              id="combo-box-demo"
              options={productNameArr}
              inputValue={searchProduct}
              onInputChange={(event, newValue) => {
                setSearchProduct(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Search Product" />
              )}
            />
            <Button
              variant="contained"
              sx={{
                borderRadius: "0px 10px 10px 0px",
                width: 40,
                height: 50,
                mt: 1,
                color: "white",
                bgcolor: "#3b5998",
              }}
              onClick={handleSearch}
            >
              Search
            </Button>
          </Box>

          {firstname === "" && !isLoggedIn() ? (
            <>
              <Button
                variant="outlined"
                sx={{
                  mr: 1,
                  color: "#03396c",
                  bgcolor: "#b3cde0",
                  "&:hover": {
                    color: "white",
                    bgcolor: "#008080",
                  },
                }}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>

              <Button
                variant="contained"
                sx={{
                  mr: 2,
                  color: "#03396c",
                  bgcolor: "#b3cde0",
                  "&:hover": {
                    color: "white",
                    bgcolor: "#008080",
                  },
                }}
                onClick={() => navigate("/register")}
              >
                Sign Up
              </Button>
            </>
          ) : (
            <>
              <Box sx={{ pr: 2 }}>
                <Badge badgeContent={cartbadge} color="secondary">
                  <ShoppingCartIcon
                    sx={{
                      color: "white",
                      height: 32,
                      width: 32,
                      cursor: "pointer",
                    }}
                    onClick={() => navigate("/user/cart")}
                  />
                </Badge>
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
                    <Avatar
                      alt={firstname}
                      sx={{ color: "white", bgcolor: "#d62d20", fontSize: 32 }}
                    >
                      {firstname.charAt(0)}
                    </Avatar>
                  </IconButton>
                </Tooltip>

                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => handleClick(setting)}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default UserNavbar;
