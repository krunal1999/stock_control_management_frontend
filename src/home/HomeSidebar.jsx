import {
        List,
        ListItemButton,
        ListItemIcon,
        ListItemText,
      } from "@mui/material";
      
      import AssessmentIcon from '@mui/icons-material/Assessment';
      import { useNavigate } from "react-router-dom";
      import GridViewIcon from '@mui/icons-material/GridView';
      import FilePresentIcon from '@mui/icons-material/FilePresent';
      const HomeSidebar = () => {
        const nav = useNavigate();
      
        const handleClick = () => {
          nav("/admin/home/dashboard");
        };
        const handleaddnewitem = () => {
          nav("/admin/home/reports");
        };

        const handledownloadData = () => {
          nav("/admin/home/downloaddata");
        };
        
      
        return (
          <>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={handleClick}>
                <ListItemIcon>
                  <GridViewIcon />
                </ListItemIcon>
                <ListItemText primary="DashBoard" />
              </ListItemButton>
      
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <AssessmentIcon />
                </ListItemIcon>
                <ListItemText primary="Reports" onClick={handleaddnewitem} />
              </ListItemButton>

              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <FilePresentIcon />
                </ListItemIcon>
                <ListItemText primary="DOWNLOAD DATA" onClick={handledownloadData} />
              </ListItemButton>
      
              
              
            </List>
          </>
        );
      };
      
      export default HomeSidebar;
      