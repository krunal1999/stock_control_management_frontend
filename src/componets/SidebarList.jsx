import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ExpandMore from "@mui/icons-material/ExpandMore";
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';

const SidebarList = ({ open, name, iconName, linkName }) => {
  const [openDrawer, setOpenDrawer] = useState(true);

  const handleClick = () => {
    setOpenDrawer(()=> true);
  };

  const nav = useNavigate();

  return (
    <>
      <ListItem
        disablePadding
        sx={{ display: "block" }}
        onClick={() => {
          nav(linkName);
        }}
      >
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
          onClick={handleClick}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            {iconName}
          </ListItemIcon>

          <ListItemText>
            <Stack direction="row">
            {name}

            </Stack>
             
          </ListItemText>
        </ListItemButton>
      </ListItem>

      <Collapse in={openDrawer} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
         
          <ListItemButton sx={{ pl: 6 }}>
          <ListItemIcon>
              <SubdirectoryArrowRightIcon />
            </ListItemIcon>
            <ListItemText primary="Starrebhbhd" />
            
          </ListItemButton>
          
        </List>
      </Collapse>
    </>
  );
};

export default SidebarList;
