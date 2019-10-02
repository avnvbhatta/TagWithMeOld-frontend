import axios from "axios";
import Cookie from "js-cookie"

class Auth{

    constructor() {
        this.authenticated = false;
    }

    async login(formData){
        try{
            let res = await axios.post('http://localhost:8848/user/login', formData);
            if(res.status === 200){
                this.authenticated = true;
                Cookie.set("token", res.data.success.token);
            }
        }catch(error){
            console.log(error)
        }

    }

    logout(cb){
        this.authenticated = false;
        Cookie.remove("token");

        //Todo
        /*
        Make a request to server to invalidate the cookie.
        */
    }

    isAuthenticated(){
        return this.authenticated;
    }

    getCookie(){
        return Cookie.get("token") ? Cookie.get("token") : null;
    }

}


export default new Auth()