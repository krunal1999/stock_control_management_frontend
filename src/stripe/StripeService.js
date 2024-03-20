import axios from "axios";
import { getToken } from "../authrntication/UserService";

export const USER_BASE_URL =
  "http://localhost:8080/user/stripe/createpaymentintent";

export const publicAxios = axios.create({
  baseURL: USER_BASE_URL,
});

export const privateAxios = axios.create({
  baseURL: USER_BASE_URL,
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

class StripeService {
  headers = {
    "Content-Type": "application/json",
  };
  createpaymentintent(data) {
    return privateAxios.post(USER_BASE_URL , data);
  }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new StripeService();
