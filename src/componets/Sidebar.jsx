import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";

import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InventorySidebar from "../Inventory/InventorySidebar";
import PurchaseSidebar from "../Purchase/PurchaseSidebar";

import { ListItemButton, ListItemIcon } from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import DashboardCustomizeTwoToneIcon from "@mui/icons-material/DashboardCustomizeTwoTone";
import StoreTwoToneIcon from "@mui/icons-material/StoreTwoTone";
import MonetizationOnTwoToneIcon from "@mui/icons-material/MonetizationOnTwoTone";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  function handleDrawer(params) {
    setOpen(!open);
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader />
        <DrawerHeader>
          <ListItemButton onClick={handleDrawer}>
            <ListItemIcon>
              <MenuIcon />
            </ListItemIcon>
          </ListItemButton>
        </DrawerHeader>

        <Divider />

        <div>
          <Accordion onClick={() => setOpen(true)}>
            <AccordionSummary
              expandIcon={open ? <ExpandMoreIcon /> : ""}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                {open ? "Home" : <DashboardCustomizeTwoToneIcon />}
              </Typography>
            </AccordionSummary>
            {open ? <AccordionDetails></AccordionDetails> : ""}
          </Accordion>

          <Accordion onClick={() => setOpen(true)}>
            <AccordionSummary
              expandIcon={open ? <ExpandMoreIcon /> : ""}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>{open ? "Inventory" : <InventoryIcon />}</Typography>
            </AccordionSummary>
            {open ? (
              <AccordionDetails>
                <InventorySidebar />
              </AccordionDetails>
            ) : (
              ""
            )}
          </Accordion>

          <Accordion onClick={() => setOpen(true)}>
            <AccordionSummary
              expandIcon={open ? <ExpandMoreIcon /> : ""}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>
                {open ? "Purchase" : <StoreTwoToneIcon />}
              </Typography>
            </AccordionSummary>

            {open ? (
              <AccordionDetails>
                <PurchaseSidebar />
              </AccordionDetails>
            ) : (
              ""
            )}
          </Accordion>

          <Accordion onClick={() => setOpen(true)}>
            <AccordionSummary
              expandIcon={open ? <ExpandMoreIcon /> : ""}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>
                {open ? "Sales" : <MonetizationOnTwoToneIcon />}
              </Typography>
            </AccordionSummary>
            {open ? (
              <AccordionDetails>
                <Typography></Typography>
              </AccordionDetails>
            ) : (
              ""
            )}
          </Accordion>
        </div>

        <Divider />
      </Drawer>
    </Box>
  );
}
