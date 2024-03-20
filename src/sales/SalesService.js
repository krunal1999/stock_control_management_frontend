import axios from "axios";
import { getToken } from "../authrntication/UserService";

export const RECEIEVE_BASE_URL = "http://localhost:8080/admin/sales";

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

class SalesService {
  getallorder() {
    return privateAxios.get(RECEIEVE_BASE_URL + "/getallorder");
  }
  getorderByID(id) {
    return privateAxios.get(RECEIEVE_BASE_URL + "/getorder/" + id);
  }
  updateDeliveryStatus(id) {
    return privateAxios.put(RECEIEVE_BASE_URL + "/updatedeliverystatus/" + id);
  }
  refundDeclineByAdmin(id) {
    return privateAxios.post(RECEIEVE_BASE_URL + "/refunddecline/" + id);
  }
  refundToUserId(id) {
    return privateAxios.post(RECEIEVE_BASE_URL + "/refund/" + id);
  }
  refundSuccessSave(id, intent) {
    return privateAxios.post(
      RECEIEVE_BASE_URL + "/refundproductsuccess/" + id + "/" + intent
    );
  }
}
// eslint-disable-next-line
export default new SalesService();
