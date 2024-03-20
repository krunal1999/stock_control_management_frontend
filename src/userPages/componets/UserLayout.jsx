import { Box, Container, Typography } from "@mui/material";
import UserNavbar from "./UserNavbar";

const UserLayout = ({ children }) => {
  return (
    <>
      <UserNavbar />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Container maxWidth="xl">{children}</Container>

        {/* <Box
          component="footer"
          sx={{
            p: 2,
            bgcolor: "#011f4b",
            color: "#b3cde0",

            display: "flex",
            justifyContent: "center",
          }}
        >
          <Stack direction="row" spacing={4}>
            <Box sx={{ width: 300 }}>
              <Typography
                variant="h5"
                sx={{ color: "white", paddingBottom: 2 }}
              >
                Information
              </Typography>
              <Typography>About Us</Typography>
              <Typography>Contact Us</Typography>
              <Typography>Terms & Condition</Typography>
              <Typography>Shop</Typography>
            </Box>
            <Box sx={{ width: 300 }}>
              <Typography
                variant="h5"
                sx={{ color: "white", paddingBottom: 2 }}
              >
                Useful Links
              </Typography>
              <Typography>Category</Typography>
              <Typography>Top Brands</Typography>
              <Typography>Top Seller</Typography>
            </Box>
          </Stack>
        </Box> */}
        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} CYBERSTORE. All rights reserved.
        </Typography>
      </Box>
    </>
  );
};

export default UserLayout;
