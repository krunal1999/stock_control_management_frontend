import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import MuiAppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import { Avatar, Menu, MenuItem, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
  }));
  const settings = ["profile", "logout"];

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();
  const handleClick = (setting) => {
    if (setting === "logout") {
      localStorage.removeItem("data");
      navigate("/home");
    }
    handleCloseUserMenu();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: "#191970" }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="nav"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Admin DashBoard
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}></Box>

          <Box sx={{ flexGrow: 0, mr: 10 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
                <Avatar
                  alt={"K"}
                  sx={{ color: "white", bgcolor: "#d62d20", fontSize: 32 }}
                >
                  {"K"}
                </Avatar>
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: "45px", ml: "1950px" }}
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
                <MenuItem key={setting} onClick={() => handleClick(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
