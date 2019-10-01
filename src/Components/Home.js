import React from "react"
import {Link} from "react-router-dom"
class Home extends React.Component{
    constructor(){
        super()
    }

    render(){
        return(
            <div>
                <h2>This is the home page.</h2>
                <li><Link to="/messages">Message</Link></li>
            </div>
        )
    }

}

export default Home