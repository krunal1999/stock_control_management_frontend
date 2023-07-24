import axios from "axios";

const PURCHASE_BASE_URL ="http://localhost:8080/purchase";

class PlaceOrderService{

        savePurchaseItem(purchaeDetails){
                return axios.post(PURCHASE_BASE_URL + "/purchaseitem" , purchaeDetails)

        }

        getPurchaseDetailsById(purchaseid){
                return axios.get(PURCHASE_BASE_URL+ "/purchaseitem/" + purchaseid)
        }

        sendEmailData(data){
                return axios.post(PURCHASE_BASE_URL+"/emaildetails" , data)
        }

        getAllPurchaseList(){
                return axios.get(PURCHASE_BASE_URL+"/purchaseitem")
        }
        
        updateOrderStatus(purchaseid, value){
                return axios.post(PURCHASE_BASE_URL + "/updateorderstatus/" + purchaseid ,value)
        }



}

// eslint-disable-next-line
export default new PlaceOrderService();