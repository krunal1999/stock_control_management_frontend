import { Box } from "@mui/material";
import Navbar from "../componets/Navbar";
import Sidebar from "../componets/Sidebar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const AdminLayout = ({ children }) => {
  return (
    <>
    <ToastContainer/>
      <Navbar />

      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Sidebar />

        <Box component="main" sx={{ flexGrow: 1, padding: 3, marginTop: 8 }}>
          {children}
        </Box>
      </Box>
    </>
  );
};

export default AdminLayout;
