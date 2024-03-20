import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ data }) => {
  const nav = useNavigate();

  const handleQuickView = (id) => {
    nav("/user/viewproduct/"+id);
  };



  return (
    <>
      {data && data.map((product, index) => {
        return (
          <>
            <Box
              sx={{
                width: "90%",
                height: 250,
                margin: "0 auto",
                marginBottom: 2,
              }}
            >
              <Card raised elevation={6} sx={{ height: 250 }}>
                <Grid container sx={{ height: 250 }}>
                  <Grid item xs={5} sx={{ height: 250 }}>
                    <CardMedia
                      component="img"
                      sx={{ height: 250, width: "100%", objectFit: "cover" }}
                      image={`data:${product.images[0].fileType};base64,${product.images[0].imageData}`}
                      alt={product.images[0].fileName}
                    />
                  </Grid>

                  <Grid item xs={7}>
                    <CardContent>
                      <Typography
                        variant="h5"
                        sx={{
                          fontSize: 20,
                          color: "#333",
                          marginBottom: 1,
                          fontFamily: "Arial, sans-serif",
                          fontWeight:"bold"
                        }}
                      >
                        {product.title}
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{
                          fontSize: 18,
                          color: "#333",
                          marginBottom: 1,
                          fontFamily: "Arial, sans-serif",
                        }}
                      >
                        {product.productname}
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{
                          fontSize: 18,
                          color: "#333",
                          marginBottom: 1,
                          fontFamily: "Arial, sans-serif",
                        }}
                      >
                        {product.categories}
                      </Typography>

                      <Typography
                        variant="body1"
                        sx={{ fontSize: 28, color: "#666", marginBottom: 1 }}
                      >
                        $ {product.sellingPrice}
                      </Typography>
                      <Divider />
                    </CardContent>

                    <CardActions>
                     
                      
                      <Button
                        variant="contained"
                        sx={{
                          bgcolor: "#d896ff",
                          "&:hover": {
                            bgcolor: "#800080",
                          },
                        }}
                        onClick={()=>handleQuickView(product.id)}
                        startIcon={<RemoveRedEyeIcon />}
                      >
                        Quick View
                      </Button>
                    </CardActions>
                  </Grid>
                </Grid>
              </Card>
            </Box>
          </>
        );
      })}
    </>
  );
};

export default ProductCard;
