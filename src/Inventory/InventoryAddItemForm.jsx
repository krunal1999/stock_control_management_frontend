import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const InventoryAddItemForm = () => {
  const cate = ["laptop", "computer", "monitor"];
  return (
    <>
      <form>
        <Stack direction="row" spacing={2}>
          <TextField id="" label="UUID" variant="outlined" disabled />

          <TextField id="" label="order id" variant="outlined" />
        </Stack>
        <br />

        <Typography variant="h5" gutterBottom>
          Product Detials
        </Typography>

        <div className="box1">
          <Stack spacing={2}>
            <TextField id="" label="Name" variant="outlined" />

            <TextField id="" label="Brand" variant="outlined" />

            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={cate}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField {...params} label="Categories" />
              )}
            />
            <TextField id="" variant="outlined" type="file" accept="image/*" />
          </Stack>

          <Stack>
            <div className="uploadImg">preview img</div>
          </Stack>
        </div>

        <br></br>
        <Stack>
          <TextField
            id="outlined-textarea"
            label="About"
            placeholder="About"
            multiline
          />
        </Stack>

        <br />

        <div className="box">
          <FormControl fullWidth sx={{}}>
            <InputLabel htmlFor="outlined-adornment-amount">
              Cost Price
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              label="Cost Price"
              type="number"
              helperText=" "
            />
          </FormControl>

          <FormControl fullWidth sx={{}}>
            <InputLabel htmlFor="outlined-adornment-amount">
              Selling Price
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              label="Selling Price"
              type="number"
            />
          </FormControl>

          <TextField
            label="Quantity"
            id="outlined-start-adornment"
            sx={{}}
            fullWidth
            type="number"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">unit</InputAdornment>
              ),
            }}
          />
        </div>

        <Typography variant="h5" gutterBottom>
          More details
        </Typography>

          <TextField
            label="Minimum Quantity Alert"
            id="outlined-start-adornment"
            sx={{}}
            fullWidth
            type="number"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">unit</InputAdornment>
              ),
            }}
          />
        <Stack>

          <FormControlLabel
            control={<Checkbox />}
            label="Enable Auto Reorder"
          />
          <FormHelperText>Be careful</FormHelperText>
          
        </Stack>

        <br></br>
        <br />
        <Typography variant="h5" gutterBottom>
          Location{" "}
        </Typography>
        <div className="box">
          <Stack direction="row" spacing={4}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={cate}
              sx={{ width: 200 }}
              renderInput={(params) => (
                <TextField {...params} label="Categories" />
              )}
            />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={cate}
              sx={{ width: 200 }}
              renderInput={(params) => (
                <TextField {...params} label="Categories" />
              )}
            />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={cate}
              sx={{ width: 200 }}
              renderInput={(params) => (
                <TextField {...params} label="Categories" />
              )}
            />
          </Stack>
        </div>

              <Stack direction="row" spacing={4}>
                <Button variant="contained" color="success">Save</Button>
                <Button variant="contained" color="error">Reset</Button>

              </Stack>


      </form>
    </>
  );
};

export default InventoryAddItemForm;
