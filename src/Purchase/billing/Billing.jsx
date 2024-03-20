import { Button, Grid, Paper, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import AdminLayout from "./../../layouts/AdminLayout";
import { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PurchaseList from "../PurchaseList";

import StatusCards from "../../componets/StatusCards";
// import Billingservice from "./Billingservice";
import BillingList from "./BillingList";

import PendingActionsIcon from "@mui/icons-material/PendingActions";
import PendingIcon from "@mui/icons-material/Pending";
import CallReceivedIcon from "@mui/icons-material/CallReceived";

const Billing = () => {
  const nav = useNavigate();

  function handleClick(e) {
    e.stopPropagation();
    nav("/admin/purchase/makepayment");
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

  const [unpaidBills, setunpaidBills] = useState(0);
  const [unpaidBillstotal, setunpaidBillstotal] = useState(0);


  const getUnpaidBills = (unpaidbills, number2) => {
    console.log(unpaidbills, number2);
    if (unpaidbills !== 0) {
      setunpaidBills(unpaidbills);
      setunpaidBillstotal(number2)
    }
  };

  // const [PaidBills, setPaidBills] = useState(0);
  const [PaidBillsCash, setPaidBillsCash] = useState(0);
  const [PaidBillsCard, setPaidBillsCard] = useState(0);
  const [PaidBillsBt, setPaidBillsBt] = useState(0);
  const [PaidBillstotal, setPaidBillstotal] = useState(0);


  


  const getPaidBills = (Paidbills,cash,card,bt,total) => {
    console.log(Paidbills);
    if (Paidbills !== 0) {
      // setPaidBills(Paidbills);
      setPaidBillsCash(cash);
      setPaidBillsCard(card);
      setPaidBillsBt(bt);
      setPaidBillstotal(total)
    }
  };

  return (
    <>
      <AdminLayout>
        <Grid container spacing={2}>
          <Stack direction="row" spacing={4} width={1200}>
            <StatusCards
              title="Unpaid Bills"
              value={unpaidBills}
              maxvalue={unpaidBills}
              cardcolor="#f4cccc"
              icon={
                <PendingIcon sx={{ width: 40, height: 40, color: "#cc2400" }} />
              }
              pathcolour="#cc2400"
            />

            <StatusCards
              title="UnPaid Amount"
              value={unpaidBillstotal}
              maxvalue={unpaidBillstotal}
              cardcolor="#f4f4cc"
              icon={
                <PendingActionsIcon
                  sx={{ width: 40, height: 40, color: "#ffa500" }}
                />
              }
              pathcolour="#ffa500"
            />
            <StatusCards
              title="Bills Paid"
              value={PaidBillstotal}
              maxvalue={PaidBillstotal}
              cardcolor="#ace1af"
              icon={
                <CallReceivedIcon
                  sx={{ width: 40, height: 40, color: "#007b5e" }}
                />
              }
              pathcolour="#007b5e"
            />
            <StatusCards
            title="Payment in Cash"
            value={PaidBillsCash}
            maxvalue={PaidBillstotal}
            cardcolor="#ccf4f4"
            // icon={
            //   <PlaylistAddCheckCircleIcon
            //     sx={{ width: 40, height: 40, color: "#2a52be" }}
            //   />
            // }
            pathcolour="#2a52be"
          />
          <StatusCards
            title="Payment in Card"
            value={PaidBillsCard}
            maxvalue={PaidBillstotal}
            cardcolor="#ccf4f4"
            // icon={
            //   <PlaylistAddCheckCircleIcon
            //     sx={{ width: 40, height: 40, color: "#2a52be" }}
            //   />
            // }
            pathcolour="#2a52be"
          />
          <StatusCards
            title="Payment via BankTrans"
            value={PaidBillsBt}
            maxvalue={PaidBillstotal}
            cardcolor="#ccf4f4"
            // icon={
            //   <PlaylistAddCheckCircleIcon
            //     sx={{ width: 40, height: 40, color: "#2a52be" }}
            //   />
            // }
            pathcolour="#2a52be"
          />
          </Stack>
          <br />
          <Grid item xs={12}>
            <Paper varient="outlined" elevation={0}>
              <div className="addnewitem">
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleClick}
                  color="success"
                >
                  Make Payment
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
                >
                  <Tab label="Pending Orders" {...a11yProps(0)} />
                  <Tab label="All Receieved" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <PurchaseList
                  filter={"UNPAID"}
                  onUnpaidBills={getUnpaidBills}
                />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <BillingList onPaidBills ={getPaidBills} />
              </CustomTabPanel>
            </Paper>
          </Grid>
        </Grid>
      </AdminLayout>
    </>
  );
};

export default Billing;
