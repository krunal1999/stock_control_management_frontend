import { Box, CardMedia, Paper, Stack, Typography } from "@mui/material";
import UserLayout from "./componets/UserLayout";
import bannerimg from "../img/banner.jpg";
import { toast } from "react-toastify";


const UserHomeNoLogin = () => {

  function pleaseLogin() {
    toast.info("Please Login to see products")
    
  }
  setTimeout(pleaseLogin, 1000);

  return (
    <>
      <UserLayout>
        <Box sx={{ height: 900 }}>
          
          <Stack direction="row" spacing={0}>
            <Box
              sx={{
                bgcolor: "#f0f0f0",
                border: "1px solid #f0f0f0",
                height: 900,
                width: "60%",
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="h6"
                style={{
                  fontSize: "28px",
                  color: "#333",
                  fontWeight: "bold",
                  marginBottom: "10px",
                  paddingLeft: 20,
                  paddingRight: 40,
                }}
              >
                Level Up Your Build For the Future
              </Typography>
              <Typography
                variant="h4"
                style={{
                  fontSize: "36px",
                  textTransform: "uppercase",
                  color: "#ff9900",
                  marginBottom: "15px",
                  fontWeight: "bold",
                  paddingLeft: 20,
                  paddingRight: 40,
                }}
              >
                Custom PC Parts to Power Your Passion
              </Typography>
              <Typography
                variant="subtitle1"
                style={{
                  fontSize: "20px",
                  color: "#666",
                  marginBottom: "20px",
                  paddingLeft: 20,
                  paddingRight: 40,
                }}
              >
                Our wide selection of components allows you to fully customize
                and maximize your rig. Get the parts you need from brands you
                trust.
              </Typography>
              <button
                style={{
                  background: "#ff9900",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  padding: "10px 20px",
                  fontSize: "18px",
                  cursor: "pointer",
                  width: 200,
                  marginLeft: 20,
                  transition: "background-color 0.3s",
                }}
              >
                Shop now
              </button>
            </Box>
            <Box
              sx={{
                bgcolor: "#f0f0f0",
                border: "1px solid #f0f0f0",
                height: 900,
                width: "40%",
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                flexDirection: "column",
              }}
            >
              <img
                src={bannerimg}
                alt="bannerimg from freepik"
                style={{
                  width: "500px",
                  height: "500px",
                  borderRadius: "10%",
                  border: "2px solid #ccc",
                }}
              />
            </Box>
          </Stack>
        </Box>

        <Box sx={{ height: 600, bgcolor: "	#d9ead3" }}>
          <Typography
            variant="h6"
            style={{
              fontSize: "32px",
              color: "#ff9900",
              fontWeight: "bold",
              marginBottom: "10px",
              paddingTop: 20,
              textAlign: "center",
            }}
          >
            Shop By Category
          </Typography>

          <Stack direction="row" spacing={4} sx={{ padding: 1 }}>
            <Paper elevation={2}>
              <Box
                sx={{
                  textAlign: "center",
                  padding: "20px",
                  border: "1px solid #e0e0e0",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
                  alt="cpu"
                  style={{ height: 300, width: 300, objectFit: "cover" }}
                />

                <Typography
                  variant="h6"
                  style={{
                    fontSize: "24px",
                    color: "#333",
                    fontWeight: "bold",
                    marginBottom: "10px",
                    paddingLeft: 20,
                  }}
                >
                  CPU
                </Typography>
              </Box>
            </Paper>
            <Paper elevation={2}>
              <Box
                sx={{
                  textAlign: "center",
                  padding: "20px",
                  border: "1px solid #e0e0e0",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1591488320449-011701bb6704?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  alt="cpu"
                  style={{ height: 300, width: 300, objectFit: "cover" }}
                />

                <Typography
                  variant="h6"
                  style={{
                    fontSize: "24px",
                    color: "#333",
                    fontWeight: "bold",
                    marginBottom: "10px",
                    paddingLeft: 20,
                  }}
                >
                  GRAPHIC CARD
                </Typography>
              </Box>
            </Paper>
            <Paper elevation={2}>
              <Box
                sx={{
                  textAlign: "center",
                  padding: "20px",
                  border: "1px solid #e0e0e0",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1667984461299-91f50389252c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80"
                  alt="cpu"
                  style={{ height: 300, width: 300, objectFit: "cover" }}
                />

                <Typography
                  variant="h6"
                  style={{
                    fontSize: "24px",
                    color: "#333",
                    fontWeight: "bold",
                    marginBottom: "10px",
                    paddingLeft: 20,
                  }}
                >
                  CABINET
                </Typography>
              </Box>
            </Paper>
            <Paper elevation={2}>
              <Box
                sx={{
                  textAlign: "center",
                  padding: "20px",
                  border: "1px solid #e0e0e0",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <img
                  src="https://img.freepik.com/free-vector/computer-parts-decorative-icons-set_1284-5170.jpg?w=826&t=st=1691472056~exp=1691472656~hmac=706ebb6bdb729f3a440820e4f4250be8073fbea8b5122782124769f61f911a71"
                  alt="cpu"
                  style={{ height: 300, width: 300, objectFit: "cover" }}
                />

                <Typography
                  variant="h6"
                  style={{
                    fontSize: "24px",
                    color: "#333",
                    fontWeight: "bold",
                    marginBottom: "10px",
                    paddingLeft: 20,
                  }}
                >
                  <button
                    style={{
                      background: "#ff9900",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      padding: "10px 20px",
                      fontSize: "18px",
                      cursor: "pointer",
                      width: 200,
                      marginLeft: 20,
                      transition: "background-color 0.3s",
                    }}
                    onClick={() => {
                      console.log("first");
                    }}
                  >
                    Shop By Category
                  </button>
                </Typography>
              </Box>
            </Paper>
          </Stack>
        </Box>

        <Box sx={{ height: 700, bgcolor: "#f0f0f0" }}>
          <Typography
            variant="h6"
            style={{
              fontSize: "32px",
              color: "#03396c",
              fontWeight: "bold",
              marginBottom: "1px",
              paddingTop: 20,
              textAlign: "center",
            }}
          >
            NEW ARRIVALS
          </Typography>
          <Typography
            variant="h6"
            style={{
              fontSize: "24px",
              color: "#03396c",
              fontWeight: "bold",
              marginBottom: "10px",

              textAlign: "center",
            }}
          >
            Next generation now available
          </Typography>

          <Stack direction="row" spacing={4}>
            

            <Paper elevation={2}>
              <Box
                sx={{
                  textAlign: "center",
                  padding: "20px",
                  border: "1px solid #e0e0e0",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ height: 300, width: 300, objectFit: "cover" }}
                  image="https://img.freepik.com/free-photo/new-product-business-launch-word_53876-132169.jpg?w=996&t=st=1691667375~exp=1691667975~hmac=09ecb9b69037006144f0657931976a4ef339ae631c62f1810033894654058ce6"
                  alt="new product"
                />

                <Typography
                  variant="h6"
                  style={{
                    fontSize: "24px",
                    color: "#333",
                    fontWeight: "bold",
                    marginBottom: "10px",
                    paddingLeft: 20,
                    paddingTop: 2,
                  }}
                >
                  More New Product
                </Typography>
                <Typography
                  variant="h6"
                  style={{
                    fontSize: "22px",
                    color: "#333",
                    fontWeight: "bold",
                    marginBottom: "10px",
                    paddingLeft: 20,
                  }}
                >
                  From All Brands
                </Typography>

                <Typography
                  variant="h6"
                  style={{
                    fontSize: "24px",
                    color: "#333",
                    fontWeight: "bold",
                    marginBottom: "10px",
                    paddingLeft: 20,
                  }}
                >
                  <button
                    style={{
                      background: "#ff9900",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      padding: "10px 20px",
                      fontSize: "18px",
                      cursor: "pointer",
                      width: 200,
                      marginLeft: 20,
                      transition: "background-color 0.3s",
                    }}
                    onClick={() => {
                      console.log("first");
                    }}
                  >
                    Shop Here
                  </button>
                </Typography>
                <Typography
                  variant="h6"
                  style={{
                    fontSize: "24px",
                    color: "red",
                    fontWeight: "bold",
                    marginBottom: "10px",
                    paddingLeft: 20,
                  }}
                >
                  Staring at $ 49
                </Typography>
              </Box>
            </Paper>
          </Stack>
        </Box>

        <Box sx={{ height: 700 }}>
          <Stack direction="row" spacing={0}>
            <Box
              sx={{
                bgcolor: "#d0e0e3",

                height: 700,
                width: "60%",
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="h6"
                style={{
                  fontSize: "28px",
                  color: "#333",
                  fontWeight: "bold",
                  marginBottom: "10px",
                  paddingLeft: 20,
                  paddingRight: 40,
                }}
              >
                Limited time steals
              </Typography>
              <Typography
                variant="h4"
                style={{
                  fontSize: "36px",
                  textTransform: "uppercase",
                  color: "#ff9900",
                  marginBottom: "15px",
                  fontWeight: "bold",
                  paddingLeft: 20,
                  paddingRight: 40,
                }}
              >
                Just Dropped: New Products Up to 50% Off
              </Typography>
              <Typography
                variant="subtitle1"
                style={{
                  fontSize: "20px",
                  color: "#666",
                  marginBottom: "20px",
                  paddingLeft: 20,
                  paddingRight: 40,
                }}
              >
                Be the first to score major discounts on freshly released
                styles. Free delivery makes these deals even sweeter trust
              </Typography>
              <button
                style={{
                  background: "#ff9900",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  padding: "10px 20px",
                  fontSize: "18px",
                  cursor: "pointer",
                  width: 200,
                  marginLeft: 20,
                  transition: "background-color 0.3s",
                }}
              >
                Discover Now
              </button>
            </Box>
            <Box
              sx={{
                bgcolor: "#d0e0e3",

                height: 700,
                width: "40%",
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                flexDirection: "column",
              }}
            >
              <img
                src="https://img.freepik.com/free-vector/new-arrival-background-with-colorful-confetti_23-2147877471.jpg?w=826&t=st=1691473427~exp=1691474027~hmac=2cd57fc01e19bd9ed6395b1c69d0c44a5f051721d00831ad306577bf01349aed"
                alt="bannerimg from freepik"
                style={{
                  width: "500px",
                  height: "500px",
                  borderRadius: "10%",
                  border: "2px solid #ccc",
                }}
              />
            </Box>
          </Stack>
        </Box>

        <Box sx={{ height: 700, bgcolor: "#f0f0f0" }}>
          <Typography
            variant="h6"
            style={{
              fontSize: "32px",
              color: "#ff9900",
              fontWeight: "bold",
              marginBottom: "1px",
              paddingTop: 20,
              textAlign: "center",
              textTransform: "uppercase",
            }}
          >
            Our Bestselling Items This Season
          </Typography>
          <Typography
            variant="h6"
            style={{
              fontSize: "24px",
              color: "#03396c",
              fontWeight: "bold",
              marginBottom: "20px",

              textAlign: "center",
            }}
          >
            Most Wanted Right Now , Join the hype
          </Typography>
          <Stack direction="row" spacing={4}>
            

            <Paper elevation={2}>
              <Box
                sx={{
                  textAlign: "center",
                  padding: "20px",
                  border: "1px solid #e0e0e0",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ height: 300, width: 300, objectFit: "cover" }}
                  image="https://img.freepik.com/free-photo/new-product-business-launch-word_53876-132169.jpg?w=996&t=st=1691667375~exp=1691667975~hmac=09ecb9b69037006144f0657931976a4ef339ae631c62f1810033894654058ce6"
                  alt="new product"
                />

                <Typography
                  variant="h6"
                  style={{
                    fontSize: "24px",
                    color: "#333",
                    fontWeight: "bold",
                    marginBottom: "10px",
                    paddingLeft: 20,
                    paddingTop: 2,
                  }}
                >
                  More New Product
                </Typography>
                <Typography
                  variant="h6"
                  style={{
                    fontSize: "22px",
                    color: "#333",
                    fontWeight: "bold",
                    marginBottom: "10px",
                    paddingLeft: 20,
                  }}
                >
                  From All Brands
                </Typography>

                <Typography
                  variant="h6"
                  style={{
                    fontSize: "24px",
                    color: "#333",
                    fontWeight: "bold",
                    marginBottom: "10px",
                    paddingLeft: 20,
                  }}
                >
                  <button
                    style={{
                      background: "#ff9900",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      padding: "10px 20px",
                      fontSize: "18px",
                      cursor: "pointer",
                      width: 200,
                      marginLeft: 20,
                      transition: "background-color 0.3s",
                    }}
                    onClick={() => {
                      console.log("first");
                    }}
                  >
                    Shop Here
                  </button>
                </Typography>
                <Typography
                  variant="h6"
                  style={{
                    fontSize: "24px",
                    color: "red",
                    fontWeight: "bold",
                    marginBottom: "10px",
                    paddingLeft: 20,
                  }}
                >
                  Staring at $ 49
                </Typography>
              </Box>
            </Paper>
          </Stack>
        </Box>
        
      </UserLayout>
    </>
  );
};

export default UserHomeNoLogin;
