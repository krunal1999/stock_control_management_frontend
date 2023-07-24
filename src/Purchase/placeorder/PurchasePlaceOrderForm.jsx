import {
  Autocomplete,
  Button,
  Divider,
  InputAdornment,
  OutlinedInput,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import "../../pagescss/purchase.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import VendorService from "../PurchaseService/VendorService";
import PlaceOrderService from "./PlaceOrderService";
import CategoriesService from "../../Inventory/Categories/CategoriesService";
import * as Yup from "yup";
import { Formik } from "formik";
import { toast } from "react-toastify";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";

const PurchasePlaceOrderForm = () => {
  const vendorDisplayName = [];
  const [inputValue, setInputValue] = useState("");
  const [inputValueSerchProduct, setInputValueSerchProduct] = useState("");
  const [inputValueCate, setInputValueCate] = useState("");
  const [amount, setamount] = useState(0);
  const [quantity, setquantity] = useState(0);
  const [price, setprice] = useState(0);
  const [tax, setTax] = useState(0);
  const [taxamount, setTaxAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [currdate, setCurrDate] = useState("");
  const [expectdate, setexpectDate] = useState("");

  const [vendorlist, setVendorlist] = useState([]);

  const [purchaseOrder, setPurchaseOrder] = useState({
    vendoruniquename: "",
    currentdate: "",
    expectdate: "",
    productname: "",
    categories: "",
    buyprice: "",
    quantity: "",
    amount: "",
    subtotal: "",
    tax: "",
    taxamount: "",
    total: "",
  });

  const onReset =()=>{
   
  }

  const nav = useNavigate();

  const Categoriesrows = [];
  const [CategoriesList, setCategoriesList] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await CategoriesService.getCategoriesList();
        setCategoriesList(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchdata();
  }, []);

  CategoriesList.forEach((pl) => {
    Categoriesrows.unshift(pl.type);
  });

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const res = await VendorService.getVendor();
        setVendorlist(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchVendor();
  }, []);

  vendorlist.forEach((v) => {
    vendorDisplayName.push(v.vendoruniquename);
  });

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "buyprice") {
      setprice(value);
    } else if (name === "quantity") {
      setquantity(value);
    } else if (name === "tax") {
      setTax(value);
    }

    setPurchaseOrder({
      ...purchaseOrder,
      [e.target.name]: e.target.value,
      amount: amount,
    });
  }

  useEffect(() => {
    const newAmount = price * quantity;
    setamount(newAmount || 0);
    const newTax = amount * (tax / 100);
    setTaxAmount(newTax);
    const newTotalAmount = amount + newTax;
    setTotalAmount(newTotalAmount);

    setPurchaseOrder({
      ...purchaseOrder,
      vendoruniquename: inputValue,
      currentdate: currdate,
      expectdate: expectdate,
      productname: inputValueSerchProduct,
      categories: inputValueCate,

      subtotal: amount,
      taxamount: taxamount,
      total: totalAmount
    });
  }, [
    price,
    tax,
    amount,
    expectdate,
    currdate,
    inputValue,
    inputValueSerchProduct,
    quantity,
    totalAmount,
    inputValueCate,
    taxamount,
    purchaseOrder,
  ]);

  function onSave(e) {
    e.preventDefault();

    setPurchaseOrder({
      ...purchaseOrder,
      // [e.target.name]: e.target.value,
      amount: amount,
      currentdate: currdate,
      expectdate: expectdate,
      taxamount: taxamount,
      total: totalAmount,
    });

    if (purchaseOrderSchema.isValidSync(purchaseOrder)) {
      // send to database
      PlaceOrderService.savePurchaseItem(purchaseOrder)
        .then((res) => {
          let purchaseid = res.data.purchaseid;
          nav(`/purchase/emailsend/${purchaseid}`);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // Form is invalid, handle validation errors
  
      toast.error("Please Fill all the fields");
      console.log(purchaseOrder);
    }
  }

  const purchaseOrderSchema = Yup.object().shape({
    vendoruniquename: Yup.string().required("Vendor Name is required"),
    currentdate: Yup.date().required("Date is required"),
    expectdate: Yup.date().required("Expected Date for delivery is required"),
    productname: Yup.string().required("Product Name is required"),
    categories: Yup.string().required("Categories is required"),
    buyprice: Yup.number().required("Buy Price is required").min(0),
    quantity: Yup.number().required("Quantity is required").min(0),
    tax: Yup.number().required("Tax is required"),
  });

  <Formik
    initialValues={{
      vendoruniquename: "",
      currentdate: "",
      expectdate: "",
      productname: "",
      categories: "",
      buyprice: "",
      quantity: "",
      amount: "",
      subtotal: "",
      tax: "",
      taxamount: "",
      total: "",
    }}
    validationSchema={purchaseOrderSchema}

  ></Formik>;

  return (
    <>
      <form>
        <div className="purchaseitembox">
          <label htmlFor="combo-box-demo" className="purchaseitemformtext">
            Selct Vendor
          </label>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={vendorDisplayName}
            sx={{ width: 260 }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Vendor Name"
                name="vendoruniquename"
              />
            )}
          />
        </div>

        <div className="purchaseitembox">
          <label htmlFor="combo-box-demo" className="purchaseitemformtext">
            Date
          </label>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              disablePast
              id="outlined-"
              variant="outlined"
              type="date"
              name="currentdate"
              format="DD-MM-YYYY"
              onChange={(newdate) => setCurrDate(newdate)}
              // onChange={(e) => {
              //   handleChange(e);
              // }}
            />
          </LocalizationProvider>
        </div>

        <div className="purchaseitembox">
          <label htmlFor="combo-box-demo" className="purchaseitemformtext">
            Expected Date for delivery
          </label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              disablePast
              id="outlined-basic"
              label=""
              variant="outlined"
              type="Date"
              name="expectdate"
              format="DD-MM-YYYY"
              onChange={(newdate) => {setexpectDate(newdate)
              console.log(newdate)}}
              // onChange={(e) => {
              //   handleChange(e);
              // }}
            />
          </LocalizationProvider>
        </div>

        <Divider />
        <div className="boxfortable">
          <TableContainer>
            <Table
              sx={{ minWidth: 700, fontSize: 14 }}
              aria-label="customized table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Product Name</TableCell>
                  <TableCell>Categories </TableCell>
                  <TableCell align="right">Buy Price</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableCell>
                  <Autocomplete
                    freeSolo
                    id="free-solo-2-demo"
                    sx={{ width: 300 }}
                    disableClearable
                    name="productname"
                    options={vendorDisplayName.map((option) => option)}
                    inputValue={inputValueSerchProduct}
                    onInputChange={(event, newin) => {
                      setInputValueSerchProduct(newin);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Search product"
                        InputProps={{
                          ...params.InputProps,
                          type: "search",
                        }}
                      />
                    )}
                  />
                </TableCell>
                <TableCell>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={Categoriesrows}
                    name="categories"
                    inputValue={inputValueCate}
                    onInputChange={(event, newina) => {
                      setInputValueCate(newina);
                    }}
                    sx={{ width: 200 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Categories" />
                    )}
                  />
                </TableCell>

                <TableCell align="right">
                  <OutlinedInput
                    placeholder="Buy Price"
                    type="number"
                    sx={{ width: 150 }}
                    name="buyprice"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    startAdornment={<InputAdornment position="start">£</InputAdornment>}
                  />
                </TableCell>
                <TableCell align="right">
                  <OutlinedInput
                    placeholder="Quantity"
                    type="number"
                    sx={{ width: 150 }}
                    name="quantity"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    endAdornment={<InputAdornment position="end">unit</InputAdornment>}
                  />
                </TableCell>
                <TableCell align="right">
                  <OutlinedInput
                    placeholder="amount"
                    type="number"
                    disabled
                    sx={{ width: 200 }}
                    value={amount}
                    name="amount"
                  />
                </TableCell>

                <TableRow>
                  <TableCell rowSpan={3} />
                  <TableCell colSpan={3}>subTotal</TableCell>
                  <TableCell align="right">
                    <OutlinedInput
                      placeholder="amount"
                      type="number"
                      disabled
                      sx={{ width: 200 }}
                      value={amount}
                      size="small"
                      name="subtotal"
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell colSpan={2}>Tax</TableCell>
                  <TableCell align="right">
                    <OutlinedInput
                      placeholder="tax rate"
                      type="number"
                      sx={{ width: 120 }}
                      size="small"
                      name="tax"
                      onChange={(e) => handleChange(e)}
                      endAdornment={<InputAdornment position="end">%</InputAdornment>}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <OutlinedInput
                      placeholder="amount"
                      type="number"
                      disabled
                      sx={{ width: 200 }}
                      value={taxamount}
                      size="small"
                      name="taxamount"
                      onChange={(e) => handleChange(e)}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell align="right">
                    <OutlinedInput
                      placeholder="amount"
                      type="number"
                      disabled
                      sx={{ width: 200 }}
                      value={totalAmount}
                      size="small"
                      name="total"
                      onChange={(e) => handleChange(e)}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Divider />
        </div>

        <Stack direction="row" spacing={2}>
          <Button variant="contained" color="success" onClick={onSave}>
            Save and Sent
          </Button>
          <Button variant="contained" color="error" onClick={onReset}>
            Reset
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default PurchasePlaceOrderForm;
