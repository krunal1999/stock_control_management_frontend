import axios from "axios";

 class AuthenticationService{

        registerUser(data){
                return axios.post("http://localhost:8080/auth/register" , data);
        }

        login(data){
                return axios.post("http://localhost:8080/auth/login" , data);
        }

}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthenticationService();