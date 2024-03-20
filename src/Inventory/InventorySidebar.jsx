import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import InventoryIcon from "@mui/icons-material/Inventory";
import MapIcon from "@mui/icons-material/Map";

import { useNavigate } from "react-router-dom";
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
const InventorySidebar = () => {
  const nav = useNavigate();

  const handleClick = () => {
    nav("/admin/inventory");
  };
  const handleaddnewitem = () => {
    nav("/admin/inventory/new");
  };
  const handleaddcategories = () => {
    nav("/admin/inventory/categories");
  };

  const handlemap = () => {
    nav("/admin/inventory/map");
  };

  const handleMinimumQuantity = () => {
    nav("/admin/inventory/minimumalert");
  };

  return (
    <>
      <List component="div" disablePadding>
        <ListItemButton sx={{ pl: 4 }} onClick={handleClick}>
          <ListItemIcon>
            <InventoryIcon />
          </ListItemIcon>
          <ListItemText primary="Inventory" />
        </ListItemButton>

        <ListItemButton sx={{ pl: 4 }}>
          <ListItemIcon>
          <CrisisAlertIcon />
          </ListItemIcon>
          <ListItemText
            primary="Minimum Alert"
            onClick={handleMinimumQuantity}
          />
        </ListItemButton>

        <ListItemButton sx={{ pl: 4 }}>
          <ListItemIcon>
            <AddCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Add New Item" onClick={handleaddnewitem} />
        </ListItemButton>

        <ListItemButton sx={{ pl: 4 }}>
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText
            primary="Add Categories"
            onClick={handleaddcategories}
          />
        </ListItemButton>

        <ListItemButton sx={{ pl: 4 }}>
          <ListItemIcon>
            <MapIcon />
          </ListItemIcon>
          <ListItemText primary="2D Map" onClick={handlemap} />
        </ListItemButton>
      </List>
    </>
  );
};

export default InventorySidebar;
