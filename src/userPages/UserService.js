import axios from "axios";
import { getToken } from "../authrntication/UserService";

export const USER_BASE_URL = "http://localhost:8080/user/";

export const publicAxios = axios.create({
  baseURL: USER_BASE_URL,
});

export const privateAxios = axios.create({
  baseURL: USER_BASE_URL,
});

privateAxios.interceptors.request.use(
  (config) => {
    const token = getToken();
    
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    localStorage.removeItem("data");
    return Promise.reject(error);
  }
);
privateAxios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response && error.response.status === 401) {
      
      
    }
    return Promise.reject(error);
  }
);

class UserService {
  getAllProduct() {
    return privateAxios.get(USER_BASE_URL +"homedashboard/getallproduct");

  }

  getProductById(id){
    return privateAxios.get(USER_BASE_URL + "homedashboard/getproduct/" + id)
  }

  addProductToCart(data){
    return privateAxios.post(USER_BASE_URL + "cart/addtocart" , data)
  }

 

  getAllCartItem(id){
    return privateAxios.get(USER_BASE_URL +"cart/getcartproduct/"+id)
  }

  deleteById(id){
    return privateAxios.delete(USER_BASE_URL +"cart/removeproduct/"+id)
  }

  addById(id){
    return privateAxios.post(USER_BASE_URL +"cart/updateaddquantity/"+id)
  }
  minusById(id){
    return privateAxios.post(USER_BASE_URL +"cart/updateminusquantity/"+id)
  }

  addOrder(data){
    return privateAxios.post(USER_BASE_URL + "order/save" , data)
  }

  getOrder(id){
    return privateAxios.get(USER_BASE_URL + "order/get/" + id )

  }

  addAddress(data){
    return privateAxios.post(USER_BASE_URL + "address/save" , data)

  }
  getAddress(id){
    return privateAxios.get(USER_BASE_URL + "address/getaddress/"+ id)

  }
  saveOrderSuccess(data){
    return privateAxios.post(USER_BASE_URL + "ordersuccess/save" , data)

  }
  getOrdersById(id){
    return privateAxios.get(USER_BASE_URL + "ordersuccess/getorder/" + id)

  }

  getOrderProduct(id){
    return privateAxios.get(USER_BASE_URL + "order/getallorderproduct/"+ id)

  }
  deleteByIdOrder(id){
    return privateAxios.delete(USER_BASE_URL +"order/delete/"+id)
  }

  userRefundProduct(id){
    return privateAxios.post(USER_BASE_URL + "ordersuccess/refundproduct/" + id)

  }


}
// eslint-disable-next-line import/no-anonymous-default-export
export default new UserService();
