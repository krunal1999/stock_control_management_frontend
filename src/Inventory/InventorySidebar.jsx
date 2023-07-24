import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import InventoryIcon from "@mui/icons-material/Inventory";

import { useNavigate } from "react-router-dom";

const InventorySidebar = () => {
  const nav = useNavigate();

  const handleClick = () => {
    nav("/inventory");
  };
  const handleaddnewitem = () => {
    nav("/inventory/new");
  };
  const handleaddcategories = () => {
    nav("/inventory/categories");
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
        
      </List>
    </>
  );
};

export default InventorySidebar;
