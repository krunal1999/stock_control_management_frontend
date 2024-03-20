import axios from "axios";
import { getToken } from "../../authrntication/UserService";



export const VENDOR_API_BASE_URL = "http://localhost:8080/admin/vendor";

export const publicAxios = axios.create({
  baseURL: VENDOR_API_BASE_URL,
});

export const privateAxios = axios.create({
  baseURL: VENDOR_API_BASE_URL,
});

privateAxios.interceptors.request.use(
  (config) => {
        const token = getToken();
    
        console.log(token);
    if (token) {

      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

class VendorService{

        saveVendor(vendor){
                return privateAxios.post(VENDOR_API_BASE_URL + "/new" , vendor)
        }

        updateVendor(name, vendor){
                return privateAxios.post(VENDOR_API_BASE_URL + "/updatevendor/" + name , vendor)
        }

        getVendor(){
                return privateAxios.get(VENDOR_API_BASE_URL + "/getallvendor")
        }

        getVendorByid(id){
                return privateAxios.get(VENDOR_API_BASE_URL + "/getevndorbyid/"+id)
        }

        getVendorDetailsByDisplayName(name){
                return privateAxios.get(VENDOR_API_BASE_URL + "/getvendorbydisplayname/" + name)
        }

        updateVendorStatus(id){
                return privateAxios.put(VENDOR_API_BASE_URL+ "/" + id);
        }

        deleteVendor(id){
                return privateAxios.delete(VENDOR_API_BASE_URL+"/"+id);
        }


}


// eslint-disable-next-line
export default new VendorService();
