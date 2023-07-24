import axios from "axios";

const BASE_URL = "http://localhost:8080/categories"
class CategoriesService{

        addCategories(data){
                return axios.post(BASE_URL + "/add" , data)

        }

        getCategoriesList(){
                return axios.get(BASE_URL + "/get" )

        }


}
// eslint-disable-next-line
export default new CategoriesService();