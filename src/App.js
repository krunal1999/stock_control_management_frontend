import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./componets/Home";
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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />}></Route>
            <Route path="home" element={<Home />}></Route>

            <Route path="inventory">
              <Route index element={<Inventory />} />
              <Route path="new" element={<InventoryAddItems />} />
              <Route path="categories" element={<Categories />} />


            </Route>


            <Route path="purchase">
              <Route index element={<Purchase />} />
              <Route path="vendor" element={<Vendor />}></Route>
              <Route path="addvendor" element={<AddnewVendor />}></Route>
              <Route path="purchaseorder" element={<PurchaseOrders />}></Route>
              <Route path="emailsend/:purchaseid" element={<PurchaseMailorder />}></Route>
              <Route path="receiveorder" element={<ReceieveOrder />}></Route>
              <Route path="addreceieveorder" element={<ReceieveOrderForm />}></Route>
              <Route path="billing" element={<Billing />}></Route>
              <Route path="makepayment" element={<BillingMakePayment />}></Route>



            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
