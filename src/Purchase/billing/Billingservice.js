import axios from "axios";

const RECEIEVE_BASE_URL ="http://localhost:8080/billing";

class Billingservice{
        
        getList(){
                return axios.get(RECEIEVE_BASE_URL + "/getlist")
        }



}
// eslint-disable-next-line
export default new Billingservice();