import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./componets/Home";
import Inventory from "./pages/Inventory";
import Sales from "./pages/Sales";
import Purchase from "./pages/Purchase";
import InventoryAddItems from "./subpages/InventoryAddItems";

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
            </Route>

            <Route path="sales" element={<Sales />}></Route>
            <Route path="purchase" element={<Purchase />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
