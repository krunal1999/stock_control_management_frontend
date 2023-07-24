import { useEffect } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { toast } from "react-toastify";

const Home = () => {
  useEffect(()=>{
    toast.info("home");
  },[])
  return (
    <>
     <AdminLayout>
      <div>homee</div>
     
     </AdminLayout>
    </>
  );
};

export default Home;
