import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import StoreIcon from "@mui/icons-material/Store";
import { BsFillPeopleFill } from "react-icons/bs";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import LocalAtmTwoToneIcon from '@mui/icons-material/LocalAtmTwoTone';
import { useNavigate } from "react-router-dom";

const PurchaseSidebar = () => {
  const nav = useNavigate();

  const handlePurchase = () => {
    nav("/purchase");
  };

  const handleVendor = () => {
    nav("/purchase/vendor");
  };
  const handlepurchaseOrder = () => {
    nav("/purchase/purchaseorder");
  };
  const handleReceiveOrder = () => {
    nav("/purchase/receiveorder");
  };
  const handleBilling = () => {
    nav("/purchase/billing");
  };

  return (
    <>
      <List component="div" disablePadding>
        <ListItemButton sx={{ pl: 4 }} onClick={handlePurchase}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Purchase" />
          
        </ListItemButton>

        <ListItemButton sx={{ pl: 4 }} onClick={handleVendor}>
          <ListItemIcon>
            <BsFillPeopleFill />
          </ListItemIcon>

          <ListItemText primary="Vendor" />
        </ListItemButton>

        <ListItemButton sx={{ pl: 4 }} onClick={handlepurchaseOrder}>
          <ListItemIcon>
            <StoreIcon />
          </ListItemIcon>
          <ListItemText primary="Purchase Order" />
        </ListItemButton>

        <ListItemButton sx={{ pl: 4 }} onClick={handleReceiveOrder}>
          <ListItemIcon>
            <DeliveryDiningIcon />
          </ListItemIcon>
          <ListItemText primary="Receive  Order" />
        </ListItemButton>

        <ListItemButton sx={{ pl: 4 }} onClick={handleBilling}>
          <ListItemIcon>
            <LocalAtmTwoToneIcon />
          </ListItemIcon>
          <ListItemText primary="Billing" />
        </ListItemButton>

      </List>
      {/* </Collapse> */}
    </>
  );
};

export default PurchaseSidebar;
