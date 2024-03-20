import axios from "axios";
import { getToken } from "../authrntication/UserService";

export const INVENTORY_BASE_URL = "http://localhost:8080/admin/product";

export const publicAxios = axios.create({
  baseURL: INVENTORY_BASE_URL,
});

export const privateAxios = axios.create({
  baseURL: INVENTORY_BASE_URL,
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

class ProductService {
  getAllProduct() {
    return privateAxios.get(INVENTORY_BASE_URL);
  }

  getProductById(id) {
    return privateAxios.get(INVENTORY_BASE_URL + "/getproductbrid/" +id);
  }

  deleteProductById(id) {
    return privateAxios.delete(INVENTORY_BASE_URL + "/" + id);
  }

  updateReorderQuantity(id, quantity) {
    return privateAxios.put(INVENTORY_BASE_URL + "/" + id + "/" + quantity);
  }
  updateSoldQuantity(id, quantity) {
    return privateAxios.put(INVENTORY_BASE_URL + "/sold/" + id + "/" + quantity);
  }

  getMap() {
    return privateAxios.get(INVENTORY_BASE_URL + "/map");
  }

  addproduct(data) {
    return privateAxios.post(INVENTORY_BASE_URL, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  updateproduct(prodid , data) {
    return privateAxios.post(INVENTORY_BASE_URL + "/updateproduct/" + prodid , data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  getuniqueproduct() {
    return privateAxios.get(INVENTORY_BASE_URL + "/uniqueproduct");
  }
  getPurchaseId(id) {
    return privateAxios.get(INVENTORY_BASE_URL + "/reorder/" + id);
  }
  
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ProductService();
