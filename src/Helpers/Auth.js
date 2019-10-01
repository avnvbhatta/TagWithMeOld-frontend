import axios from "axios";
class Auth{
    
    authenticated = false;

    async login(formData){
        try{
            let res = await axios.post('http://localhost:8848/user/login', formData);
            if(res.status === 200){
                this.authenticated = true;
                console.log("status 200 from Auth.login()")
            }
        }catch(error){
            console.log(error)
        }

    }

   

    logout(cb){
        this.authenticated = false;
        //cb()
    }

    isAuthenticated(){
        return this.authenticated;
    }

}


export default new Auth()