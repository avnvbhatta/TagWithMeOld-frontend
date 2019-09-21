import React from "react"
import LogInForm from "./LogInForm"
import axios from "axios"

class LogIn extends React.Component{
    constructor(){
        super()
        this.state = {
            email: "",
            password: ""
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    handleChange(event){
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit(event){
        event.preventDefault()
        console.log(this.state)
        var postData = {            
            email: this.state.email,
            password: this.state.password
        };
        
       
        
        axios.post('http://localhost:8848/user/login', postData)
            .then((res) => {
                console.log("RESPONSE RECEIVED: ", res);
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })
    }

    render(){
        return(
            <div>
                <h1>Login</h1>
                <LogInForm data={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
            </div>
        )
    }
}

export default LogIn