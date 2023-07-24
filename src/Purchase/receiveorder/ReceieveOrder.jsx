import { Button, Grid, Paper, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import AdminLayout from "./../../layouts/AdminLayout";
import ReceieveList from "./ReceieveList";
import { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import StatusCards from "../../componets/StatusCards";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import PendingIcon from "@mui/icons-material/Pending";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import PlaylistAddCheckCircleIcon from "@mui/icons-material/PlaylistAddCheckCircle";
import { useEffect } from "react";
import ReceieveOrderService from "./ReceieveOrderService";
import PurchaseListCopy from "../PurchaseListCopy";
import PlaceOrderService from "../placeorder/PlaceOrderService";

const ReceieveOrder = () => {
  const nav = useNavigate();

  function handleClick(e) {
    e.stopPropagation();
    nav("/purchase/addreceieveorder");
  }

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const rows = [];
  const [receieveList, setreceieveList] = useState([]);
  let totalReceivedOrders = 0;
  let totalReceivedQuantity = 0;

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await ReceieveOrderService.getList();
        setreceieveList(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchdata();
  }, []);

  receieveList.forEach((pl) => {
    rows.unshift(pl);
    totalReceivedOrders++;
    const quantityAsNumber = parseInt(pl.quantity, 10);
    totalReceivedQuantity += quantityAsNumber;
  });

  const [purchaselist, setpurchaseList] = useState([]);
  let totalPurchasedOrders = 0;
  let totalPurchasedQuantity = 0;

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await PlaceOrderService.getAllPurchaseList();
        setpurchaseList(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchdata();
  }, []);

  const filter = "ORDERED";
  const rows1 = [];

  purchaselist.forEach((pl) => {
    if (filter === "ORDERED") {
      if (pl.orderstatus === "ORDERED") {
        rows1.unshift(pl);
        totalPurchasedOrders++;
        const quantityAsNumber = parseInt(pl.quantity, 10);
        totalPurchasedQuantity += quantityAsNumber;
      }
    }
  });

  return (
    <>
      <AdminLayout>
        <Stack direction="row" spacing={6} width={1200}>
          <StatusCards
            title="Pending Order"
            value={totalPurchasedOrders}
            maxvalue={totalPurchasedOrders}
            cardcolor="#f4cccc"
            icon={
              <PendingIcon sx={{ width: 40, height: 40, color: "#cc2400" }} />
            }
            pathcolour="#cc2400"
          />

          <StatusCards
            title="Pending Quantity"
            value={totalPurchasedQuantity}
            maxvalue={totalPurchasedQuantity}
            cardcolor="#f4f4cc"
            icon={
              <PendingActionsIcon
                sx={{ width: 40, height: 40, color: "#ffa500" }}
              />
            }
            pathcolour="#ffa500"
          />
          <StatusCards
            title="Receieved Order"
            value={totalReceivedOrders}
            maxvalue={totalReceivedOrders + totalPurchasedOrders}
            cardcolor="#ace1af"
            icon={
              <CallReceivedIcon
                sx={{ width: 40, height: 40, color: "#007b5e" }}
              />
            }
            pathcolour="#007b5e"
          />
          <StatusCards
            title="Receieved Quantity"
            value={totalReceivedQuantity}
            maxvalue={totalReceivedQuantity+totalPurchasedQuantity}
            cardcolor="#ccf4f4"
            icon={
              <PlaylistAddCheckCircleIcon
                sx={{ width: 40, height: 40, color: "#2a52be" }}
              />
            }
            pathcolour="#2a52be"
          />
        </Stack>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper varient="outlined" elevation={0}>
              <div className="addnewitem">
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleClick}
                >
                  Add Received Order
                </Button>
              </div>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper varient="outlined" elevation={2} >
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  sx={{backgroundColor:"#ccf4f4" , color:"#133467"}}
                >
                  <Tab label="Pending Orders" {...a11yProps(0)} />
                  <Tab label="All Receieved" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <PurchaseListCopy rows={rows1} />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <ReceieveList rows={rows} />
              </CustomTabPanel>
            </Paper>
          </Grid>
        </Grid>
      </AdminLayout>
    </>
  );
};

export default ReceieveOrder;
