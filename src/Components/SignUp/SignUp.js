import React from "react"
import SignUpForm from "./SignUpForm"
import axios from "axios"

class SignUp extends React.Component{
    constructor(){
        super()
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            password1: "",
            password2: ""
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

        const postData = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password1: this.state.password1,
            password2: this.state.password2

        };

        axios.post('http://localhost:8848/user/register', postData)
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
                <h1>Sign Up</h1>
                <SignUpForm data={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
            </div>
        )
    }
}

export default SignUp