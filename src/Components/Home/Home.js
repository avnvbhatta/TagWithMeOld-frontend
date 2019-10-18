import React from "react"
import {Link, Redirect} from "react-router-dom"
import Auth from "Helpers/Auth"
import store from "JS/Store/Index"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { addArticle } from "JS/Actions/Index"

class Home extends React.Component{
    constructor(props){
        super(props)
        this.logOut = this.logOut.bind(this)
        this.makePost = this.makePost.bind(this)
    }

    logOut(){
        Auth.logout();
        this.props.history.push('/login')
    }

    makePost(){
        this.props.addArticle({ title: "test" }); // Relevant Redux part!!
        console.log(store.getState())

    }

    render(){
        return(
            <div>
                <h2>This is the home page.</h2>
                <li><Link to="/messages">Message</Link></li>
                <button onClick={this.logOut}>log out</button>
                {console.log(store.getState())}
                <button onClick={this.makePost}>make post</button>
                {console.log(store.getState())}

            </div>
        )
    }

}

function mapStateToProps(state){
    return state;
}

function mapDispatchToProps(dispatch){
    return {
        addArticle: article => dispatch(addArticle(article))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)