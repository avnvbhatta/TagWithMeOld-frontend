import React from "react"
import {Link, Redirect} from "react-router-dom"
import Auth from "../Helpers/Auth"
class Home extends React.Component{
    constructor(props){
        super(props)
        this.logOut = this.logOut.bind(this)
    }

    logOut(){
        Auth.logout();
        this.props.history.push('/login')
    }

    render(){
        return(
            <div>
                <h2>This is the home page.</h2>
                <li><Link to="/messages">Message</Link></li>
                <button onClick={this.logOut}>log out</button>
            </div>
        )
    }

}

export default Home