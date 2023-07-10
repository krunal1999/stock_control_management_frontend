import {
        ListItem,
        ListItemButton,
        ListItemIcon,
        ListItemText,
      } from "@mui/material";
import { useNavigate } from "react-router-dom";
      
      const SidebarList = ({ open, name, iconName, linkName }) => {
        const nav= useNavigate();
      
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
                <ListItemText sx={{ opacity: open ? 1 : 0 }}>{name}</ListItemText>
              </ListItemButton>
            </ListItem>
          </>
        );
      };
      
      export default SidebarList;
      