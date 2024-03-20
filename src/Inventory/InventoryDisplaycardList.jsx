import {
  Autocomplete,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

import VisibilityIcon from "@mui/icons-material/Visibility";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";

const InventoryDisplaycardList = ({ products, onDelete, onEdit,onView,onReorder }) => {
  const productNameSet = new Set(products.map((data) => data.productname));
  const productNameArr = Array.from(productNameSet);

  const [searchProduct, setSearchProduct] = useState([]);

  const filteredProducts = products.filter((product) =>
    product.productname.includes(searchProduct)
  );

  console.log(searchProduct);

  return (
    <>
      <Stack>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={productNameArr}
          sx={{ width: 300 }}
          inputValue={searchProduct}
          onInputChange={(event, newValue) => {
            setSearchProduct(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Find Product" />
          )}
        />
      </Stack>
      <br />
      <Divider />
      <br />
      <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
        {filteredProducts.map((product) => (
          <Card key={product.id} sx={{ maxWidth: 300, minWidth: 300 }}>
            <CardHeader
              title={product.productname}
              subheader={product.brand}
            ></CardHeader>

            {product.images && product.images.length > 0 && (
              <CardMedia
                component="img"
                sx={{ height: 200, objectFit: "center" }}
                image={`data:${product.images[0].fileType};base64,${product.images[0].imageData}`}
                alt={product.images[0].fileName}
              />
            )}
            <CardContent sx={{ backgroundColor: "	#ced6dc" }}>
              <Typography sx={{ fontSize: 18 }} color="	#08314f" gutterBottom>
                Categories &nbsp;&nbsp;: &nbsp;
                <Chip label={product.categories} color="primary" />
              </Typography>
              <Typography sx={{ fontSize: 18 }} color="	#08314f" gutterBottom>
                Quantity &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;
                <Chip label={product.quantity} color="primary" />
              </Typography>
              <Typography sx={{ fontSize: 18 }} color="	#08314f" gutterBottom>
                MinQty Alert : &nbsp;
                <Chip label={product.minimumQuantityAlert} color="warning" />
              </Typography>
              <Typography sx={{ fontSize: 18 }} color="	#08314f" gutterBottom>
                AutoAlert &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{" "}
                {product.autoReorderEnabled === "INACTIVE" ? (
                  <Chip
                    color="error"
                    icon={<NotificationsOffIcon />}
                    label={product.autoReorderEnabled}
                  />
                ) : (
                  <Chip
                    color="success"
                    icon={<NotificationsActiveIcon />}
                    label={product.autoReorderEnabled}
                  />
                )}
              </Typography>
            </CardContent>
            <CardActions>
              <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    endIcon={<ModeEditIcon />}
                    color="secondary"
                    onClick={() => onEdit(product.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    endIcon={<DeleteIcon />}
                    color="error"
                    onClick={() => onDelete(product.id)}
                  >
                    Delete
                  </Button>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    endIcon={<VisibilityIcon />}
                    onClick={() => onView(product.id)}
                  >
                    View
                  </Button>
                  <Button
                    variant="contained"
                    endIcon={<UpgradeIcon />}
                    color="success"
                    onClick={() => onReorder(product.id)}
                  >
                    Reorder
                  </Button>
                </Stack>
              </Stack>
            </CardActions>
          </Card>
        ))}
      </Stack>
    </>
  );
};

export default InventoryDisplaycardList;
