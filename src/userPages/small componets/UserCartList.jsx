import {
  Box,
  Button,
  CardMedia,
  Divider,
  FormControl,
  IconButton,
  
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";


const UserCartList = ({
  list,
  handleDelete,
  handleIncrease,
  handleDecrease,
}) => {
  if (list != null) {
    const totalquantity = list.reduce(
      (total, product) => total + product.quantity,
      0
    );
    console.log(totalquantity);
    localStorage.setItem("totalquantity", totalquantity);
  }

  return (
    <>
      {list &&
        list.map((product, index) => {
          return (
            <Box sx={{ border: "1px solid black", p: 2 }}>
              <Stack
                direction="row"
                spacing={4}
                divider={<Divider orientation="vertical" flexItem />}
              >
                <Box>
                  <CardMedia
                    component="img"
                    key={index}
                    sx={{
                      height: 150,
                      width: "100%",
                      minWidth: 300,
                      maxWidth: 300,
                      objectFit: "cover",
                    }}
                    image={`data:${product.fileType};base64,${product.imageData}`}
                    alt={product.fileName}
                  />
                </Box>

                <Box sx={{ minWidth: 300, maxWidth: 300 }}>
                  <Typography variant="h5">{product.productname}</Typography>
                  <Typography variant="h6">
                    Category: {product.categories}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ color: "red", fontWeight: "bold" }}
                  >
                    $ {product.sellingPrice}
                  </Typography>
                  <Typography variant="h6">
                    Quantity: {product.quantity}
                  </Typography>
                </Box>

                <Box sx={{ minWidth: 200, maxWidth: 200 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: 24,
                      padding: 1,
                      fontWeight: "bold",
                      color: "black",
                    }}
                  >
                    QUANTITY:
                  </Typography>

                  {/* <FormControl
                    sx={{ width: "16ch", zIndex: 1 }}
                    variant="outlined"
                  >
                    <OutlinedInput
                      id="outlined-adornment-weight"
                      endAdornment={
                        <InputAdornment position="end">Unit</InputAdornment>
                      }
                      type="number"
                      value={product.quantity}
                      aria-describedby="outlined-weight-helper-text"
                      inputProps={{
                        "aria-label": "weight",
                      }}
                    />
                  </FormControl> */}
                  <Stack direction="row" sx={{ pt: 2 }}>
                    <Button
                      variant="outlined"
                      sx={{ width: 2, height: 55 }}
                      onClick={() => handleIncrease(product.id)}
                    >
                      <AddIcon />
                    </Button>
                    <FormControl sx={{ width: "10ch" }} variant="outlined">
                      <OutlinedInput
                        id="outlined-adornment-weight"
                        value={product.quantity}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                          "aria-label": "weight",
                        }}
                      />
                    </FormControl>
                    <Button
                      variant="outlined"
                      color="error"
                      sx={{ width: 2, height: 55 }}
                     
                      onClick={() => handleDecrease(product.id)}
                    >
                      <RemoveIcon />
                    </Button>
                  </Stack>
                </Box>
                <Typography
                  variant="h4"
                  sx={{ color: "red", fontWeight: "bold", width: 200, pt: 7 }}
                >
                  $ {product.quantity * product.sellingPrice}
                </Typography>
                <Box>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDelete(product.id)}
                  >
                    <DeleteForeverIcon
                      sx={{ height: 32, width: 32, color: "red", mt: 6 }}
                    />
                  </IconButton>
                </Box>
              </Stack>
            </Box>
          );
        })}
    </>
  );
};

export default UserCartList;
