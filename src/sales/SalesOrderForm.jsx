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
import AdminLayout from "../layouts/AdminLayout";
import SalesService from "./SalesService";
import InventoryService from "../Inventory/InventoryService";

const SalesOrderForm = () => {
  const nav = useNavigate();

  function handleCancel(e) {
    e.stopPropagation();
    nav("/admin/sales/orders");
  }

  const [hide, setHide] = useState(0);
  const [orderid, setOrderid] = useState("");
  const [productid, setproductid] = useState("");

  const [values, setValues] = useState("");
  const [productvalues, setproductvalues] = useState("");

  let itemlist = [];

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
  
  salesList.forEach((pl) => {
    if (pl.orderid > 0 && pl.deliveryStatus === "NOT DELIVERED") {
      itemlist.push(pl.id);
    }
  });


  useEffect(() => {
    setHide(0);
    const fetchdata = async () => {
      try {
        const res = await SalesService.getorderByID(orderid);
        console.log(res.data);
        setValues(res.data);
        setproductid(res.data.productid);

        setHide(1);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, [orderid]);

  useEffect(() => {
    setHide(0);
    const fetchdata = async () => {
      try {
        const res = await InventoryService.getProductById(productid);

        setproductvalues(res.data);
        setHide(1);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, [productid]);

  function handleMark(e) {
    e.stopPropagation();

    SalesService.updateDeliveryStatus(values.id).then((res)=>{
      console.log("updatedddd quntitty" ,res.data)
    }).catch((error)=>{
      console.log(error)

    });
    InventoryService.updateSoldQuantity(productid,values.quantity).then((res)=>{
      console.log(res.data)
    }).catch((error)=>{
      console.log(error)

    });
    
    nav("/admin/sales/orders");
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
            <Typography variant="h5">Enter Order</Typography>
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
            inputValue={orderid}
            onInputChange={(event, newInputValue) => {
              setOrderid(newInputValue);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Order ID" name="orderid" />
            )}
          />
          <br />
          <br />
          {hide ? (
            <div>
              <Stack spacing={4}>
                <Stack Stack spacing={4} direction="row">
                  <TextField
                    id=""
                    label="Order ID"
                    variant="outlined"
                    name="orderid"
                    value={values.orderid}
                    readOnly
                  />
                  <TextField
                    id=""
                    label="Product ID"
                    variant="outlined"
                    name="productid"
                    value={values.productid}
                    readOnly
                  />
                  <TextField
                    id=""
                    label="Product Name"
                    variant="outlined"
                    name="productname"
                    value={values.productname}
                    readOnly
                  />
                  <TextField
                    id=""
                    label="User Name"
                    variant="outlined"
                    name="username"
                    value={values.username}
                    readOnly
                  />
                </Stack>
                <Stack Stack spacing={4} direction="row">
                  <TextField
                    id=""
                    label="Quantity"
                    variant="outlined"
                    name="quantity"
                    value={values.quantity}
                    readOnly
                  />
                  <TextField
                    id=""
                    label="Selling Price"
                    variant="outlined"
                    name="sellingPrice"
                    value={values.sellingPrice}
                    readOnly
                  />
                  <TextField
                    id=""
                    label="Total"
                    variant="outlined"
                    name="totalprice"
                    value={
                      values.totalprice
                        ? values.totalprice
                        : values.quantity * values.sellingPrice
                    }
                    readOnly
                  />
                </Stack>
                <Stack Stack spacing={4} direction="row">
                <TextField
                    id=""
                    label="Total Quantity"
                    variant="outlined"
                    name="proquantity"
                    value={productvalues.quantity}
                    color="success"
                    focused
                    readOnly
                  />
                  <TextField
                    id=""
                    label="Avaiable Quantity"
                    variant="outlined"
                    name="remainingquantity"
                    value={productvalues.remainingquantity}
                    color="success"
                    focused
                    readOnly
                  />
                  <TextField
                    id=""
                    label="minimumQuantityAlert"
                    variant="outlined"
                    name="minimumQuantityAlert"
                    value={productvalues.minimumQuantityAlert}
                    color="error"
                    focused
                    readOnly
                  />
                </Stack>
              </Stack>
              <br />
              <br />
              <br />

              {productvalues.quantity >= values.quantity ? (
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleMark}
                >
                  Deliver product
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="error"
                  disabled
                >
                  Deliver product
                </Button>
              )}
            </div>
          ) : (
            ""
          )}
        </Paper>
      </AdminLayout>
    </>
  );
};

export default SalesOrderForm;
