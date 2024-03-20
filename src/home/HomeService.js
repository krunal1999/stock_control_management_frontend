import axios from "axios";
import { getToken } from "../authrntication/UserService";

export const RECEIEVE_BASE_URL = "http://localhost:8080/auth";

export const publicAxios = axios.create({
  baseURL: RECEIEVE_BASE_URL,
});

export const privateAxios = axios.create({
  baseURL: RECEIEVE_BASE_URL,
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

class HomeService {
  getExcelProductData() {
    return publicAxios.get(RECEIEVE_BASE_URL + "/productdata",{
      responseType: 'arraybuffer' 
    })
     
  }

  getExcelcategorydata() {
    return publicAxios.get(RECEIEVE_BASE_URL + "/categorydata",{
      responseType: 'arraybuffer' 
    })
  }
  getExcelordersuccessdata() {
    return publicAxios.get(RECEIEVE_BASE_URL + "/ordersuccessdata",{
      responseType: 'arraybuffer' 
    })
  }
  getExcelbilldata() {
    return publicAxios.get(RECEIEVE_BASE_URL + "/billdata",{
      responseType: 'arraybuffer' 
    })
  }
  getExcelpurchaseitemdata() {
    return publicAxios.get(RECEIEVE_BASE_URL + "/purchaseitemdata",{
      responseType: 'arraybuffer' 
    })
  }
  getExcelvendordata() {
    return publicAxios.get(RECEIEVE_BASE_URL + "/vendordata",{
      responseType: 'arraybuffer' 
    })
  }
  getExceluserdata() {
    return publicAxios.get(RECEIEVE_BASE_URL + "/userdata",{
      responseType: 'arraybuffer' 
    })
  }

  categorycsvexport() {
    return publicAxios.get(RECEIEVE_BASE_URL + "/categorycsvexport")
  }

  ordersuccesscsvexport() {
    return publicAxios.get(RECEIEVE_BASE_URL + "/ordersuccesscsvexport")
  }

  billscsvexport() {
    return publicAxios.get(RECEIEVE_BASE_URL + "/billscsvexport")
  }
  
  purchasecsvexport() {
    return publicAxios.get(RECEIEVE_BASE_URL + "/purchasecsvexport")
  }

  vendorcsvexport() {
    return publicAxios.get(RECEIEVE_BASE_URL + "/vendorcsvexport")
  }

  usercsvexport() {
    return publicAxios.get(RECEIEVE_BASE_URL + "/usercsvexport")
  }

  productcsvexport() {
    return publicAxios.get(RECEIEVE_BASE_URL + "/productcsvexport")
  }
  
}
// eslint-disable-next-line
export default new HomeService();
