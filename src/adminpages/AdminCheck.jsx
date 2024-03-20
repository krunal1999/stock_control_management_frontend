import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser, isLoggedIn } from "../authrntication/UserService";
import Un401 from "../componets/Un401";

const AdminCheck = () => {
  if (isLoggedIn()) {
    let data = getCurrentUser();
    const role = data.authorities[0].authority;
    if (role === "ADMIN") {
      return <Outlet />;
    } else {
      return <Un401 />
    }
  } else {
    return <Navigate to={"/login"}></Navigate>;
  }
};

export default AdminCheck;
