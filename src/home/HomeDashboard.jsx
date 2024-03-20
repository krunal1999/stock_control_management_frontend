import {
  Divider,
  FormControl,
  Grid,
  OutlinedInput,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import AdminLayout from "../layouts/AdminLayout";
import StatusCards from "../componets/StatusCards";
import PendingIcon from "@mui/icons-material/Pending";
import PlaylistAddCheckCircleIcon from "@mui/icons-material/PlaylistAddCheckCircle";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  RadialBar,
  RadialBarChart,
  XAxis,
  YAxis,
} from "recharts";
import { useEffect, useState } from "react";
import InventoryService from "../Inventory/InventoryService";
import SalesService from "../sales/SalesService";
import PlaceOrderService from "../Purchase/placeorder/PlaceOrderService";

const HomeDashboard = () => {
  const [InventoryListdata, setInventoryListdata] = useState([]);
  const [salesList, setsalesList] = useState([]);
  const [purchaselist, setpurchaseList] = useState([]);

  useEffect(() => {
    const fetchdataInventory = async () => {
      try {
        const res = await InventoryService.getAllProduct();
        setInventoryListdata(res.data);
      } catch (error) {
        console.log("🚀 ~ file: Inventory.jsx:67 ~ fetchdata ~ error:", error);
      }
    };

    const fetchdataSales = async () => {
      try {
        const res = await SalesService.getallorder();
        setsalesList(res.data);

        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchdataProduct = async () => {
      try {
        const res = await PlaceOrderService.getAllPurchaseList();
        setpurchaseList(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchdataProduct();
    fetchdataSales();
    fetchdataInventory();
  }, []);

  const originalData = [];

  InventoryListdata.forEach((pl) => {
    originalData.unshift(pl);
  });

  const lowStock = originalData.filter(
    (item) => item.remainingquantity < item.minimumQuantityAlert
  ).length;
  const activeStock = originalData.filter(
    (item) => item.activestatus === "ACTIVE"
  ).length;
  const inactiveStock = originalData.filter(
    (item) => item.activestatus === "INACTIVE"
  ).length;

  const totalQuantityss = originalData.reduce(
    (total, item) => total + (item.quantity - item.soldquantity),
    0
  );

  const totalInvestment = originalData.reduce(
    (total, item) => total + item.buyprice * item.quantity,
    0
  );

  const currentSellingProfit = originalData.reduce(
    (total, item) => total + item.sellingPrice * item.soldquantity,
    0
  );

  const expectedProfit = originalData.reduce(
    (total, item) =>
      total + item.sellingPrice * (item.quantity - item.soldquantity),
    0
  );

  const netProfit = currentSellingProfit - totalInvestment;

  const topsellers = originalData
    .sort((a, b) => b.soldquantity - a.soldquantity)
    .slice(0, 7);

  function formatMoney(number) {
    if (number < 0) {
      return "- " + formatMoney(-number);
    }
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + "M";
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + "K";
    } else {
      return number.toString();
    }
  }

  // salesss -------------------------------------

  const salessrows = [];

  let pendingDelivery = 0;
  let pendingQuantity = 0;

  const salesRowOnlyLastfour = salesList
    .filter((pl) => pl.orderid > 0 && pl.deliveryStatus === "NOT DELIVERED")
    .reverse()
    .slice(0, 4);

  salesList.forEach((pl) => {
    if (pl.orderid > 0 && pl.deliveryStatus === "NOT DELIVERED") {
      pendingDelivery = pendingDelivery + 1;
      pendingQuantity = pendingQuantity + pl.quantity;
      salessrows.unshift(pl);
    }
  });

  // Purchase -------------------------------------

  let orderQuantity = 0;
  let pendingReceiveOrder = 0;
  let pendingBills = 0;
  let pendingBillsAmount = 0;
  let pendingOrderCost = 0;

  purchaselist.forEach((data) => {
    if (data.orderstatus === "ORDERED") {
      orderQuantity = orderQuantity + data.quantity * 1;
      pendingReceiveOrder = pendingReceiveOrder + 1;
      pendingOrderCost = pendingOrderCost + data.total * 1;
    }
    if (data.billstatus === "UNPAID") {
      pendingBills = pendingBills + 1;
      pendingBillsAmount = pendingBillsAmount + data.total * 1;
    }
  });

  const overallRevenuedata = [
    {
      name: "Overall Revenue",
      uv: totalInvestment,
      pv: currentSellingProfit,
      cv: expectedProfit,
      tv: netProfit,
    },
  ];

  const data2 = [
    { name: "Low Stock", value: lowStock, fill: "#ff9a00" },
    { name: "Active Items", value: activeStock, fill: "#008080" },
    { name: "Inactive Items", value: inactiveStock, fill: "#ff6f69" },
    { name: "Pending Bills", value: pendingBills, fill: "	#ff4d00" },
    { name: "Pending Orders", value: pendingReceiveOrder, fill: "#ffcc5c" },
  ];

  const style = {
    top: "90%",
    right: 0,
    transform: "translate(0, -50%)",
    lineHeight: "24px",
  };

  return (
    <AdminLayout>
      <Stack
        direction="row"
        spacing={8}
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Stack>
          <Typography variant="h5">Overall Revenue</Typography>
          <br />
          <Stack direction="row" spacing={6} width={1200}>
            <StatusCards
              title="Total Investment"
              value={"£ " + formatMoney(totalInvestment)}
              maxvalue={totalInvestment}
              cardcolor="#b2d8d8"
              icon={
                <PendingIcon sx={{ width: 40, height: 40, color: "#004c4c" }} />
              }
              pathcolour="#004c4c"
            />
            <StatusCards
              title="Current Selling Profit"
              value={"£ " + formatMoney(currentSellingProfit)}
              maxvalue={currentSellingProfit}
              cardcolor="#ffc2cd"
              icon={
                <PlaylistAddCheckCircleIcon
                  sx={{ width: 40, height: 40, color: "#ff084a" }}
                />
              }
              pathcolour="#ff084a"
            />
            <StatusCards
              title="Expected Profit"
              value={"£ " + formatMoney(expectedProfit)}
              maxvalue={expectedProfit}
              cardcolor="#b8d8be"
              icon={
                <PlaylistAddCheckCircleIcon
                  sx={{ width: 40, height: 40, color: "#339900" }}
                />
              }
              pathcolour="#339900"
            />
            <StatusCards
              title="Net Profit"
              value={"£ " + formatMoney(netProfit)}
              maxvalue={netProfit}
              cardcolor="#ccf4f4"
              icon={
                <PlaylistAddCheckCircleIcon
                  sx={{ width: 40, height: 40, color: "#2a52be" }}
                />
              }
              pathcolour="#2a52be"
            />
          </Stack>
        </Stack>
        <Stack>
          <BarChart
            width={500}
            height={300}
            data={overallRevenuedata}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="uv" fill="#03fcfc" />
            <Bar dataKey="pv" fill="#03fc88" />
            <Bar dataKey="cv" fill="#e703fc" />
            {overallRevenuedata.netProfit < "0" ? (
              <Bar dataKey="tv" fill="#03fc39" />
            ) : (
              <Bar dataKey="tv" fill="#fc3003" />
            )}
          </BarChart>
        </Stack>
      </Stack>
      <br />
      <Divider />
      <br />
      <Stack
        direction="row"
        spacing={8}
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Stack>
          <Typography variant="h5">Sales Summary</Typography>
          <br />
          <Stack direction="row" spacing={4} width={550}>
            <StatusCards
              title="Pending Delivery Quantity"
              value={pendingQuantity}
              maxvalue={pendingQuantity}
              cardcolor="#f4cccc"
              icon={
                <PendingIcon sx={{ width: 40, height: 40, color: "#cc2400" }} />
              }
              pathcolour="#cc2400"
            />
            <StatusCards
              title="Pending Delivery Orders"
              value={pendingDelivery}
              maxvalue={pendingDelivery}
              cardcolor="#ffd7b5"
              icon={
                <PlaylistAddCheckCircleIcon
                  sx={{ width: 40, height: 40, color: "#ff6700" }}
                />
              }
              pathcolour="#ff6700"
            />
          </Stack>
        </Stack>

        <Stack>
          <Typography variant="h5">Bills Summary</Typography>
          <br />
          <Stack direction="row" spacing={4} width={550}>
            <StatusCards
              title="Pending Bills"
              value={pendingBills}
              maxvalue={pendingBills}
              cardcolor="#f4cccc"
              icon={
                <PlaylistAddCheckCircleIcon
                  sx={{ width: 40, height: 40, color: "#cc2400" }}
                />
              }
              pathcolour="#cc2400"
            />
            <StatusCards
              title="Pending Amount"
              value={"£ " + formatMoney(pendingBillsAmount)}
              maxvalue={pendingBillsAmount}
              cardcolor="#ffd7b5"
              icon={
                <PlaylistAddCheckCircleIcon
                  sx={{ width: 40, height: 40, color: "#ff6700" }}
                />
              }
              pathcolour="#ff6700"
            />
          </Stack>
        </Stack>

        <Stack>
          <Typography variant="h5">Inventory Summary</Typography>
          <br />
          <FormControl sx={{ display: "flex", flexDirection: "row" }}>
            <OutlinedInput
              placeholder="Quantity In Hand"
              readOnly
              sx={{ width: "30ch" }}
            />
            <OutlinedInput
              placeholder={totalQuantityss}
              value={totalQuantityss}
              readOnly
              sx={{ width: "20ch" }}
            />
          </FormControl>
          <br />
          <FormControl sx={{ display: "flex", flexDirection: "row" }}>
            <OutlinedInput
              placeholder="Quantity To Be Received"
              readOnly
              sx={{ width: "30ch" }}
            />
            <OutlinedInput
              placeholder="122"
              value={orderQuantity}
              readOnly
              sx={{ width: "20ch" }}
            />
          </FormControl>
        </Stack>
      </Stack>
      <br />
      <Divider />
      <br />
      <Grid container spacing={1}>
        <Grid item xs={5} sx={{ border: "1px solid grey", m: 2 }}>
          <Stack>
            <Stack>
              <Typography variant="h5">Product Details</Typography>
              <Divider></Divider>
            </Stack>
            <Stack
              direction="row"
              spacing={3}
              divider={<Divider orientation="vertical" flexItem />}
            >
              <Stack sx={{ width: "50%" }} direction="row" spacing={10}>
                <Stack>
                  <br />
                  <Typography variant="h6">Low Stock Item</Typography>
                  <br />
                  <Typography variant="h6">All Active Items</Typography>
                  <br />
                  <Typography variant="h6">All Inactive Items</Typography>

                  <br />
                  <Typography variant="h6">All Pending Bills</Typography>
                  <br />
                  <Typography variant="h6">
                    All Pending Receieve Order
                  </Typography>
                </Stack>
                <Stack>
                  <br />
                  <Typography variant="h6">{lowStock}</Typography>
                  <br />
                  <Typography variant="h6">{activeStock}</Typography>
                  <br />
                  <Typography variant="h6">{inactiveStock}</Typography>
                  <br />
                  <Typography variant="h6">{pendingBills}</Typography>
                  <br />
                  <Typography variant="h6">{pendingReceiveOrder}</Typography>
                  <br />
                </Stack>
              </Stack>

              <Stack>
                <Typography variant="h6" sx={{ ml: 15 }}>
                  Radial Graph
                </Typography>

                <RadialBarChart
                  width={420}
                  height={420}
                  cx="50%"
                  cy="42%"
                  innerRadius="30%"
                  outerRadius="90%"
                  barSize={30}
                  data={data2}
                >
                  <RadialBar
                    dataKey="value"
                    fill="fill"
                    background
                    clockwise={true}
                  />

                  <Legend
                    iconSize={20}
                    layout="horizontal"
                    verticalAlign="bottome"
                    wrapperStyle={style}
                  />
                </RadialBarChart>

                <br />
              </Stack>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={6} sx={{ border: "1px solid grey", m: 2 }}>
          <Stack>
            <Stack>
              <Typography variant="h5">Top Selling Products</Typography>
              <Divider></Divider>
            </Stack>
            <br />
            <Stack>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Product Name </TableCell>
                      <TableCell align="left">Category</TableCell>
                      <TableCell align="left">vendor</TableCell>
                      <TableCell align="left">Sold Qty</TableCell>
                      <TableCell align="left">Revenue</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {topsellers.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.productname}
                        </TableCell>
                        <TableCell align="left">{row.categories}</TableCell>
                        <TableCell align="left">
                          {row.vendoruniquename}
                        </TableCell>
                        <TableCell align="left">{row.soldquantity}</TableCell>
                        <TableCell align="left">
                          <span
                            style={{
                              backgroundColor: "#3e9c35",
                              color: "white",
                              padding: "4px",
                              borderRadius: "10px",
                            }}
                          >
                            {" "}
                            {row.soldquantity * row.sellingPrice}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={4} sx={{ border: "1px solid grey", m: 2 }}>
          <Stack>
            <Stack>
              <Typography variant="h5">Purchase Order</Typography>
              <Divider></Divider>
            </Stack>

            <br />
            <Stack>
              <Typography variant="h5" sx={{ textAlign: "center" }}>
                Quantity Ordered
              </Typography>
              <Typography
                variant="h3"
                sx={{ textAlign: "center", color: "orange" }}
              >
                {orderQuantity}
              </Typography>
              <br />
              <br />
              <Typography variant="h5" sx={{ textAlign: "center" }}>
                Total Cost
              </Typography>
              <Typography
                variant="h3"
                sx={{ textAlign: "center", color: "orange" }}
              >
                £&nbsp;{pendingOrderCost.toFixed(2)}
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={7} sx={{ border: "1px solid grey", m: 2 }}>
          <Stack>
            <Stack>
              <Typography variant="h5">Sales Order</Typography>
              <Divider></Divider>
            </Stack>
            <br />
            <Stack>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Product Name </TableCell>
                      <TableCell align="left">Username</TableCell>
                      <TableCell align="left">Selling Price</TableCell>
                      <TableCell align="left">Quantity</TableCell>
                      <TableCell align="left">Revenue</TableCell>
                      <TableCell align="left">deliveryStatus</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {salesRowOnlyLastfour.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.productname}
                        </TableCell>
                        <TableCell align="left">{row.username}</TableCell>
                        <TableCell align="left">{row.sellingPrice}</TableCell>
                        <TableCell align="left">{row.quantity}</TableCell>
                        <TableCell align="left">{row.totalprice}</TableCell>
                        <TableCell align="left">
                          <span
                            style={{
                              backgroundColor: "#f73535",
                              color: "white",
                              padding: "4px",
                              borderRadius: "10px",
                            }}
                          >
                            {" "}
                            {row.deliveryStatus}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default HomeDashboard;
