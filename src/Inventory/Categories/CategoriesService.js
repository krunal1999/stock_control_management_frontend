import axios from "axios";
import { getToken } from "../../authrntication/UserService";


export const CATEGORY_BASE_URL = "http://localhost:8080/categories";

export const publicAxios = axios.create({
  baseURL: CATEGORY_BASE_URL,
});

export const privateAxios = axios.create({
  baseURL: CATEGORY_BASE_URL,
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



class CategoriesService{

        addCategories(data){
                return privateAxios.post(CATEGORY_BASE_URL + "/add" , data)

        }

        getCategoriesList(){
                return privateAxios.get(CATEGORY_BASE_URL + "/get" )

        }

        deleteById(id){
                return privateAxios.delete(CATEGORY_BASE_URL + "/" + id)
        }

        updateStatus(id){
                return privateAxios.put(CATEGORY_BASE_URL + "/" + id)
        }


}
// eslint-disable-next-line
export default new CategoriesService();