import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser, isLoggedIn } from "../authrntication/UserService";
import Un401 from "../componets/Un401";

const UserHomePage = () => {
  if (isLoggedIn()) {
    let data = getCurrentUser();
    const user = data.username;
    const role = data.authorities[0].authority;
    console.log(user)
    if (role === "USER") {
      return <Outlet />;
    }else{
        return <Un401 />
    }
  } else {
    return <Navigate to={"/home"}></Navigate>;
  }
};

export default UserHomePage;
