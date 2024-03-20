import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

import Inventory from "./Inventory/Inventory";
import Purchase from "./Purchase/Purchase";
import InventoryAddItems from "./Inventory/InventoryAddItems";
import Vendor from "./Purchase/Vendor";
import AddnewVendor from "./Purchase/AddnewVendor";
import PurchaseOrders from "./Purchase/placeorder/PurchaseOrders";
import PurchaseMailorder from "./Purchase/placeorder/PurchaseMailorder";
import ReceieveOrder from "./Purchase/receiveorder/ReceieveOrder";
import ReceieveOrderForm from "./Purchase/receiveorder/ReceieveOrderForm";
import Billing from "./Purchase/billing/Billing";
import BillingMakePayment from "./Purchase/billing/BillingMakePayment";
import Categories from "./Inventory/Categories/Categories";

import InventoryUpdateItem from "./Inventory/InventoryUpdateItem";
import RenderMap from "./Inventory/map2d/RenderMap";
import HomeDashboard from "./home/HomeDashboard";
import RegisterPage from "./authrntication/RegisterPage";
import LoginPage from "./authrntication/LoginPage";
import { ToastContainer } from "react-toastify";
import UserHomePage from "./userPages/UserHomePage";
import UserDashBoard from "./userPages/UserDashBoard";
import AdminCheck from "./adminpages/AdminCheck";
import Page404 from "./componets/Page404";
import UserShop from "./userPages/UserShop";
import ViewProduct from "./userPages/componets/ViewProduct";
import UserCart from "./userPages/componets/UserCart";
import CheckoutMain from "./stripe/CheckoutMain";
import OrderConfirmation from "./userPages/componets/OrderConfirmation";
import OrderAddress from "./userPages/componets/OrderAddress";
import PayandCheckout from "./userPages/componets/PayandCheckout";
import OrderSuccess from "./userPages/small componets/OrderSuccess";
import UserHomeNoLogin from "./userPages/UserHomeNoLogin";
import Sales from "./sales/Sales";
import SalesOrder from "./sales/SalesOrder";
import SalesOrderForm from "./sales/SalesOrderForm";
import UserOrders from "./userPages/componets/UserOrders";
import HomeReports from "./home/HomeReports";
import InventoryMinimumQuantity from "./Inventory/InventoryMinimumQuantity";
import SalesRefund from "./sales/SalesRefund";
import HomeDownloadData from "./home/HomeDownloadData";
import UpdateVendor from "./Purchase/UpdateVendor";


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          
          <Route path="*" element={<Page404 />} />

          <Route path="/">
            <Route index element={<Navigate to="home" />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="home" element={<UserHomeNoLogin />} />
            


            <Route path="admin" element={<AdminCheck />}>
              <Route path="home">
                <Route index element={<HomeDashboard />} />
                <Route path="dashboard" element={<HomeDashboard />} />
                <Route path="reports" element={<HomeReports />} />
                <Route path="downloaddata" element={<HomeDownloadData />} />
              </Route>

              <Route path="inventory">
                <Route index element={<Inventory />} />
                <Route path="new" element={<InventoryAddItems />} />
                <Route path="categories" element={<Categories />} />
                <Route path="update/:prodid" element={<InventoryUpdateItem />} />
                <Route path="map" element={<RenderMap />} />
                <Route path="minimumalert" element={<InventoryMinimumQuantity />} />
              </Route>

              <Route path="purchase">
                <Route index element={<Purchase />} />
                <Route path="vendor" element={<Vendor />}></Route>
                <Route path="addvendor" element={<AddnewVendor />}></Route>
                <Route path="updatevendor/:vendoruniquename" element={<UpdateVendor />}></Route>
                <Route
                  path="purchaseorder"
                  element={<PurchaseOrders />}
                ></Route>
                <Route
                  path="emailsend/:purchaseid"
                  element={<PurchaseMailorder />}
                ></Route>
                <Route path="receiveorder" element={<ReceieveOrder />}></Route>
                <Route
                  path="addreceieveorder"
                  element={<ReceieveOrderForm />}
                ></Route>
                <Route path="billing" element={<Billing />}></Route>
                <Route
                  path="makepayment"
                  element={<BillingMakePayment />}
                ></Route>
              </Route>

              <Route path="sales">
                <Route index element={<Sales />} />
                <Route path="orders" element={<SalesOrder />} />
                <Route path="deliverorder" element={<SalesOrderForm />} />
                <Route path="refund" element={<SalesRefund />} />

            
              </Route>



            </Route>
          </Route>

          <Route path="/">
            <Route path="user" element={<UserHomePage />}>
              <Route path="dashboard" element={<UserDashBoard />}></Route>
              <Route path="shop" element={<UserShop />}></Route>
              <Route path="viewproduct/:id" element={<ViewProduct />}></Route>
              <Route path="cart" element={<UserCart />}></Route>
              <Route path="orderconfirmation" element={<OrderConfirmation />}></Route>
              <Route path="orderaddress" element={<OrderAddress />}></Route>
              <Route path="payandcheckout" element={<PayandCheckout />}></Route>
              <Route path="ordersuccess" element={<OrderSuccess />}></Route>
              <Route path="stripecheckout" element={<CheckoutMain />}></Route>
              <Route path="userorders" element={<UserOrders />}></Route>

              
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
