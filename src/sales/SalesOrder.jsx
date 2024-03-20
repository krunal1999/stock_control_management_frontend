import { Button, Grid, Paper, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PendingIcon from "@mui/icons-material/Pending";
import PlaylistAddCheckCircleIcon from "@mui/icons-material/PlaylistAddCheckCircle";
import { useEffect } from "react";
import SalesService from "./SalesService";
import SalesList from "./SalesList";
import AdminLayout from "../layouts/AdminLayout";
import StatusCards from "../componets/StatusCards"

const SalesOrder = () => {
  const nav = useNavigate();

  function handleClick(e) {
    e.stopPropagation();
    nav("/admin/sales/deliverorder");
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
  const rows1 = [];

  const [salesList, setsalesList] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await SalesService.getallorder();
        setsalesList(res.data);

        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchdata();
  }, []);

  let pendingDelivery = 0;
  let doneDelivery = 0;

  salesList.forEach((pl) => {
    if (pl.orderid > 0 && pl.deliveryStatus === "NOT DELIVERED") {
      rows.push(pl);
      pendingDelivery = pendingDelivery +1;
    }
  });
  salesList.forEach((pl) => {
    if (pl.orderid > 0 && pl.deliveryStatus === "DELIVERED") {
      rows1.push(pl);
      doneDelivery = doneDelivery +1;
    }
  });

  return (
    <>
      <AdminLayout>
        <Stack direction="row" spacing={6} width={1200}>
          <StatusCards
            title="Pending Delivery"
            value={pendingDelivery}
            maxvalue={pendingDelivery}
            cardcolor="#f4cccc"
            icon={
              <PendingIcon sx={{ width: 40, height: 40, color: "#cc2400" }} />
            }
            pathcolour="#cc2400"
          />
          <StatusCards
            title="Delivered"
            value={doneDelivery}
            maxvalue={doneDelivery+pendingDelivery}
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
                  Deliver PRoduct
                </Button>
              </div>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper varient="outlined" elevation={2}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  sx={{ backgroundColor: "#ccf4f4", color: "#133467" }}
                >
                  <Tab label="Pending Orders" {...a11yProps(0)} />
                  <Tab label="All Delivered" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <SalesList rows={rows}/>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
              <SalesList rows={rows1}/>

              </CustomTabPanel>
            </Paper>
          </Grid>
        </Grid>
      </AdminLayout>
    </>
  );
};

export default SalesOrder;
