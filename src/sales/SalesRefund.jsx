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
import AdminLayout from "../layouts/AdminLayout";
import StatusCards from "../componets/StatusCards";
import SalesRefundList from "./SalesRefundList";

const SalesRefund = () => {
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
  const [reload, setReload] = useState(false);
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
  }, [reload]);

  let pendingRefund = 0;
  let doneRefund = 0;
  let totalOrders = 0;

  salesList.forEach((pl) => {
    if (
      pl.orderid > 0 &&
      pl.deliveryStatus === "DELIVERED" &&
      pl.returnProduct === "USERREFUND"
    ) {
      rows1.push(pl);
      pendingRefund = pendingRefund + 1;
    }
  });

  salesList.forEach((pl) => {
    if (pl.orderid > 0 && pl.deliveryStatus === "DELIVERED" && pl.returnProduct !== "USERREFUND") {
      rows.unshift(pl);
      doneRefund = doneRefund + 1;
      totalOrders = totalOrders + 1;
    }
  });

  const reloadcallBy = (value) => {
    if (value) {
      setReload(!reload);
    }
  };

  return (
    <>
      <AdminLayout>
        <Stack direction="row" spacing={6} width={1200}>
          <StatusCards
            title="Pending Request"
            value={pendingRefund}
            maxvalue={pendingRefund}
            cardcolor="#f4cccc"
            icon={
              <PendingIcon sx={{ width: 40, height: 40, color: "#cc2400" }} />
            }
            pathcolour="#cc2400"
          />
          <StatusCards
            title="Request Resolved"
            value={doneRefund}
            maxvalue={totalOrders}
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
                  Deliver Product
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
                <SalesRefundList rows={rows1} reloadcall={reloadcallBy} />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <SalesRefundList rows={rows} />
              </CustomTabPanel>
            </Paper>
          </Grid>
        </Grid>
      </AdminLayout>
    </>
  );
};

export default SalesRefund;
