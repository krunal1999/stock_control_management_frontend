import {
  Autocomplete,
  Button,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";
import { useEffect, useState } from "react";
import PlaceOrderService from "../placeorder/PlaceOrderService";
import AdminLayout from "../../layouts/AdminLayout";
import InventoryService from "../../Inventory/InventoryService";
import { toast } from "react-toastify";
import ReceieveOrderService from "./ReceieveOrderService";

const ReceieveOrderForm = () => {
  const nav = useNavigate();

  function handleCancel(e) {
    e.stopPropagation();
    nav("/admin/purchase/receiveorder");
  }

  const [hide, setHide] = useState(0);
  const [purchaseid, setPurchaseid] = useState("");
  const [values, setValues] = useState("");
  const [purchaseitemlist, setPurchaseItemList] = useState([]);
  const [productstatus, setproductstatus] = useState("");

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
    if (l.orderstatus !== "RECEIVED" && l.orderstatus === "ORDERED") {
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
        setproductstatus(res.data.productStatus);
        setHide(1);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, [purchaseid]);

  function handleMark(e) {
    e.stopPropagation();

    PlaceOrderService.updateOrderStatus(purchaseid, "RECEIVED")
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      });

    nav("/admin/purchase/receiveorder");
  }

  function handleAddQuantity(e) {
    e.stopPropagation();

    PlaceOrderService.updateOrderStatus(purchaseid, "RECEIVED")
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      });

      ReceieveOrderService.updateUsedStatus(values.roid).then((res) => {})
      .catch((error) => {
        console.log(error);
      });


      InventoryService.updateReorderQuantity(values.reorderproductid,values.quantity).then((res) => {
       

        nav("/admin/purchase/receiveorder");
        toast.success("quantity added")
        
      })
      .catch((error) => {
        console.log(error);
      });

    
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
            <Typography variant="h5">Enter Receieved Order Details</Typography>
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
              <TextField
                {...params}
                label="Purchase Id"
                name="purchaseorderid"
              />
            )}
          />
          <br />
          <br />
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

              <Stack width={300}>
                {productstatus === "NEW" ? (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleMark}
                  >
                    Mark as Received
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleAddQuantity}
                  >
                    Add quantity in Existing product {values.productname}
                  </Button>
                )}
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

export default ReceieveOrderForm;
