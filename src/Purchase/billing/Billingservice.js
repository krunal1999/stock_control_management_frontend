import axios from "axios";
import { getToken } from "../../authrntication/UserService";

export const RECEIEVE_BASE_URL ="http://localhost:8080/billing";

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


class Billingservice{
        
        getList(){
                return privateAxios.get(RECEIEVE_BASE_URL + "/getlist")
        }



}
// eslint-disable-next-line
export default new Billingservice();