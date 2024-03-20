import axios from "axios";
import { getToken } from "../../authrntication/UserService";

export const PURCHASE_BASE_URL = "http://localhost:8080/admin/purchase";

export const publicAxios = axios.create({
  baseURL: PURCHASE_BASE_URL,
});

export const privateAxios = axios.create({
  baseURL: PURCHASE_BASE_URL,
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

class PlaceOrderService {
  savePurchaseItem(purchaeDetails) {
    return privateAxios.post(
      PURCHASE_BASE_URL + "/purchaseitem",
      purchaeDetails
    );
  }

  getPurchaseDetailsById(purchaseid) {
    return privateAxios.get(PURCHASE_BASE_URL + "/purchaseitem/" + purchaseid);
  }

  sendEmailData(data) {
    return privateAxios.post(PURCHASE_BASE_URL + "/emaildetails", data);
  }

  getAllPurchaseList() {
    return privateAxios.get(PURCHASE_BASE_URL + "/purchaseitem");
  }

  updateOrderStatus(purchaseid, value) {
    return privateAxios.post(
      PURCHASE_BASE_URL + "/updateorderstatus/" + purchaseid,
      value
    );
  }

  getNewReorderPurchaseId(id) {
    return privateAxios.post(PURCHASE_BASE_URL + "/reorderpurchase/"+ id);
  }
}

// eslint-disable-next-line
export default new PlaceOrderService();
