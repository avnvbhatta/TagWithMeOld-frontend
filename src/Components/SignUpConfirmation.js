import React from "react"
import {Link} from "react-router-dom"

class SignUpConfirmation extends React.Component{
    constructor(){
        super()
    }
    render(){
        return(
            <div>
                <h2>Thank you for signing up to Tag With Me.</h2>
                <Link to="/login">Click here to go to log in page.</Link>
            </div>
        )
    }
}

export default SignUpConfirmation