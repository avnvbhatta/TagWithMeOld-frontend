import React from "react"
import store from "JS/Store/Index"
import { connect } from "react-redux"
class Messages extends React.Component{
    constructor(){
        super()
    }
    render(){
        return(
            <div>
                <h2>This is the Messages page.</h2>
                {console.log(store.getState())}
            </div>
        )
    }

}

function mapStateToProps(state){
    return state;
}


export default connect(mapStateToProps, null)(Messages)