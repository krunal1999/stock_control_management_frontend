import {
  Autocomplete,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import ReceieveOrderService from "../Purchase/receiveorder/ReceieveOrderService";
import PlaceOrderService from "../Purchase/placeorder/PlaceOrderService";

const InventoryAddItemForm = () => {
  // Categories List ---------------------------------
  const cate = ["asds"];
  const Categoriesrows = [];
 
  // ReceievedIem List  ---------------------------------
  const Receivedrows = [];
  const [receieveList, setreceieveList] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await ReceieveOrderService.getList();
        setreceieveList(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchdata();
  }, []);

  receieveList.forEach((pl) => {
    Receivedrows.unshift(pl.ro_id);
  });

  // ReceievedIem List  ---------------------------------
  const [receieveItem, setReceiveItem] = useState([]);
  const [purchaseDetail, setpurchaseDetails] = useState({});

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const purchaseId = receieveList.find((pl) => pl.ro_id === receieveItem);

        if (purchaseId.purchaseid) {
          const purchaseDetails =
            await PlaceOrderService.getPurchaseDetailsById(
              purchaseId.purchaseid
            );
          console.log(purchaseDetails.data);
          setpurchaseDetails(purchaseDetails.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, [receieveList, receieveItem]);
  Categoriesrows.push(purchaseDetail.categories);

  return (
    <>
      <form>
        <Stack direction="row" spacing={2}>
          <TextField
            sx={{ width: 350 }}
            id=""
            label="Product_ID"
            variant="outlined"
            disabled
          />

          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={Receivedrows}
            sx={{ width: 350 }}
            name="receieveItem"
            inputValue={receieveItem}
            onInputChange={(event, newina) => {
              setReceiveItem(newina);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Received_id" />
            )}
          />
        </Stack>
        <br />

        {receieveItem ? (
          <>
            <Typography variant="h5" gutterBottom>
              Product Details
            </Typography>

            <div className="box1">
              <Stack spacing={2}>
                <TextField
                  id=""
                  label="Name"
                  variant="outlined"
                  value={purchaseDetail.productname}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <TextField id="" label="Brand" variant="outlined" />

                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={Categoriesrows}
                  sx={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField {...params} label="Categories" />
                  )}
                />

                <TextField
                  id=""
                  variant="outlined"
                  type="file"
                  accept="image/*"
                />
              </Stack>

              <Stack>
                <div className="uploadImg">
                  <img
                    src="https://stockcontrolmanagementsaveimage.s3.amazonaws.com/71b9123e-4a2c-4a6a-8ed9-a3add9f68c71.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230723T051600Z&X-Amz-SignedHeaders=host&X-Amz-Expires=60&X-Amz-Credential=AKIAYPNNYFMDABAR63YK%2F20230723%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=072e30250b8e6029693c5a26ea2ed6ad9d2191f83f08a7a0b1cceb24818f2a6b

"
                    alt="adsa"
                    width={250}
                  />
                </div>
              </Stack>
            </div>

            <br></br>
            <Stack width={710}>
              <TextField
                id="outlined-textarea"
                label="About"
                placeholder="About"
                multiline
              />
            </Stack>

            <br />

            <div className="box">
              <FormControl fullWidth sx={{}}>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Cost Price
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">£</InputAdornment>
                  }
                  label="Cost Price"
                  type="number"
                  helperText=""
                  value={purchaseDetail.buyprice}
                  disabled
                />
              </FormControl>

              <FormControl fullWidth sx={{}}>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Selling Price
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">£</InputAdornment>
                  }
                  label="Selling Price"
                  type="number"
                />
              </FormControl>
              <TextField
                label="Quantity"
                id="outlined-start-adornment"
                sx={{}}
                fullWidth
                type="number"
                value={purchaseDetail.quantity}
                disabled
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">unit</InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="box">
              <FormControl fullWidth sx={{}}>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Profit Margin per unit
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">£</InputAdornment>
                  }
                  label="Selling Price"
                  type="number"
                  disabled
                />
              </FormControl>
              <FormControl fullWidth sx={{}}>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Expected Profit
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">£</InputAdornment>
                  }
                  label="Selling Price"
                  type="number"
                  disabled
                />
              </FormControl>
            </div>

            <Typography variant="h5" gutterBottom>
              More details
            </Typography>
            <gutterBottom />
            <TextField
              label="Minimum Quantity Alert"
              id="outlined-start-adornment"
              sx={{}}
              type="number"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">unit</InputAdornment>
                ),
              }}
            />
            <Stack>
              <FormControlLabel
                control={<Checkbox />}
                label="Enable Auto Reorder"
              />
              <FormHelperText>Be careful</FormHelperText>
            </Stack>

            <br></br>
            <br />
            <Typography variant="h5" gutterBottom>
              Location{" "}
            </Typography>
            <div className="box">
              <Stack direction="row" spacing={4}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={cate}
                  sx={{ width: 200 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Location" />
                  )}
                />
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={cate}
                  sx={{ width: 200 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Location" />
                  )}
                />
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={cate}
                  sx={{ width: 200 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Location" />
                  )}
                />
              </Stack>
            </div>

            <Stack direction="row" spacing={4}>
              <Button variant="contained" color="success">
                Save
              </Button>
              <Button variant="contained" color="error">
                Reset
              </Button>
            </Stack>
          </>
        ) : (
          ""
        )}
      </form>
    </>
  );
};

export default InventoryAddItemForm;
