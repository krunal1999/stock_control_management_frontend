import axios from "axios";

const VENDOR_API_BASE_URL = "http://localhost:8080/vendor"

class VendorService{

        saveVendor(vendor){
                return axios.post(VENDOR_API_BASE_URL + "/new" , vendor)
        }

        getVendor(){
                return axios.get(VENDOR_API_BASE_URL + "/getallvendor")
        }

        getVendorDetailsByDisplayName(name){
                return axios.get(VENDOR_API_BASE_URL + "/getvendorbydisplayname/" + name)
        }


}


// eslint-disable-next-line
export default new VendorService();
