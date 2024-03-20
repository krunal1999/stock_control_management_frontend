import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { useNavigate } from "react-router-dom";
import RepartitionIcon from '@mui/icons-material/Repartition';
const SalesSidebar = () => {
  const nav = useNavigate();

  const handleSales = () => {
    nav("/admin/sales");
  };

  const handleOrders = () => {
    nav("/admin/sales/orders");
  };
  const handleRefundOrder = () => {
    nav("/admin/sales/refund");
  };
  

  return (
    <>
      <List component="div" disablePadding>
        <ListItemButton sx={{ pl: 4 }} onClick={handleSales}>
          <ListItemIcon>
            <MonetizationOnIcon />
          </ListItemIcon>
          <ListItemText primary="Sales" />
          
        </ListItemButton>

        <ListItemButton sx={{ pl: 4 }} onClick={handleOrders}>
          <ListItemIcon>
            <ReceiptLongIcon />
          </ListItemIcon>

          <ListItemText primary="Orders" />
        </ListItemButton>

        <ListItemButton sx={{ pl: 4 }} onClick={handleRefundOrder}>
          <ListItemIcon>
            <RepartitionIcon />
          </ListItemIcon>
          <ListItemText primary="Refund Orders" />
        </ListItemButton>

        

      </List>
     
    </>
  );
};

export default SalesSidebar;
