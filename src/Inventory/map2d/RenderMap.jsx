import { Box, Button, Grid, Paper, Tab, Tabs, Typography } from "@mui/material";
import AdminLayout from "../../layouts/AdminLayout";
import PropTypes from "prop-types";
import { useState } from "react";
import DisplayMap from "./DisplayMap";

const RenderMap = () => {
  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const [value, setValue] = useState(0);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const[reload , setReload] = useState(false)

  function handleClick(){
    setReload(true)
  }

  return (
    <AdminLayout>
      <Grid container spacing={2}>
        
        <Grid item xs={12}>
          <Paper varient="outlined" elevation={0}>
            <div className="addnewitem">
              <Button
                variant="contained"
        
                onClick={handleClick}
              >
                show map
              </Button>
            </div>
          </Paper>
        </Grid>

        

        <Grid item xs={12}>
          <Paper varient="outlined" elevation={1}>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="2D Map" {...a11yProps(0)} />
                  {/* <Tab label="Location" {...a11yProps(1)} /> */}
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <DisplayMap reload={reload} />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                {/* <InventoryDisplaycardList
                  products={InventoryListdata}
                  onDelete={handleDeleteProduct}
                /> */}
                tab2
              </CustomTabPanel>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default RenderMap;
