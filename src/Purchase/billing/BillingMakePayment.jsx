import AdminLayout from "../../layouts/AdminLayout";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState } from "react";
import { useEffect } from "react";
import PlaceOrderService from "../placeorder/PlaceOrderService";
import BillingPdf from "./BillingPdf";
import { useNavigate } from "react-router-dom";

const BillingMakePayment = () => {
  const nav = useNavigate();
  function handleCancel(e) {
    e.stopPropagation();
    nav("/admin/purchase/billing");
  }

  const [hide, setHide] = useState(0);
  const [purchaseid, setPurchaseid] = useState("");
  const [values, setValues] = useState("");
  const [purchaseitemlist, setPurchaseItemList] = useState([]);

  const [type, settype] = useState("Card");

  const handleChange = (event) => {
    settype(event.target.value);
  };

  let itemlist = [];

  useEffect(() => {
    const fetchlist = async () => {
      try {
        const res1 = await PlaceOrderService.getAllPurchaseList();
        setPurchaseItemList(res1.data);
        console.log(res1.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchlist();
  }, []);

  purchaseitemlist.forEach((l) => {
    if (l.billstatus === "UNPAID") {
      itemlist.push(l.purchaseid);
    }
  });

  console.log(itemlist);

  useEffect(() => {
    setHide(0);
    const fetchdata = async () => {
      try {
        const res = await PlaceOrderService.getPurchaseDetailsById(purchaseid);
        console.log(res.data);
        setValues(res.data);
        setHide(1);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, [purchaseid]);

  function handlePayment(e) {
    e.stopPropagation();

    PlaceOrderService.updateOrderStatus(purchaseid, type)
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      });

    nav("/admin/purchase/billing");
  }

  return (
    <>
      <AdminLayout>
        <Stack>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-between"
            alignContent="center"
          >
            <Typography variant="h5">Make Payment of Bills</Typography>
            <Button
              variant="contained"
              startIcon={<CancelIcon />}
              onClick={handleCancel}
              color="error"
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
        <br />
        <Divider />

        {/* add new item form  */}
        <Paper elevation={10} sx={{ padding: 3, marginTop: 3 }}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={itemlist}
            sx={{ width: 300 }}
            inputValue={purchaseid}
            onInputChange={(event, newInputValue) => {
              setPurchaseid(newInputValue);
            }}
            renderInput={(params) => (
              <TextField {...params} label="pending bills" name="billid" />
            )}
          />

          <br />
          <br />

          <BillingPdf />

          {hide ? (
            <div>
              <Stack spacing={4} direction="row">
                <TextField
                  id=""
                  label="Product Name"
                  variant="outlined"
                  name="productname"
                  value={values.productname}
                  disabled
                />
                <TextField
                  id=""
                  label="VendorName"
                  variant="outlined"
                  name="vendoruniquename"
                  value={values.vendoruniquename}
                  disabled
                />
                <TextField
                  id=""
                  label="Quantity"
                  variant="outlined"
                  name="quantity"
                  value={values.quantity}
                  disabled
                />
                <TextField
                  id=""
                  label="Amount"
                  variant="outlined"
                  name="amount"
                  value={values.total}
                  disabled
                />
              </Stack>
              <br />
              <br />
              <br />
              <Stack direction="row" width={150}>
                <Box sx={{ minWidth: 170 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Select Payment
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={type}
                      label="Payment Type"
                      onChange={handleChange}
                      name="payment"
                    >
                      <MenuItem value={"Cash"}>Cash</MenuItem>
                      <MenuItem value={"Card"}>Card</MenuItem>
                      <MenuItem value={"BankTransfer"}>Bank Transfer</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Stack>
              <br />
              <br />
              <br />

              <Stack width={300}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handlePayment}
                >
                  Make Payment
                </Button>
              </Stack>
            </div>
          ) : (
            ""
          )}
        </Paper>
      </AdminLayout>
    </>
  );
};

export default BillingMakePayment;
