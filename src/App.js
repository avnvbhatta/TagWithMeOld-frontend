import React from 'react';
import './App.css';
import Header from "./Components/Header"
import Footer from './Components/Footer';
import SignUp from "./Components/SignUp/SignUp"
import LogIn from "./Components/LogIn/LogIn"

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      showLogin: true
    }

    this.changeView = this.changeView.bind(this)
  } 

  changeView(event){
    const {name} = event.target
    this.setState({
      showLogin: String([name]) === 'login' ? true : false
    })
  }

  render(){
    return (
      <div id="container">
        <div className="jumbotron">
          <h1>TagWithMe</h1>
          <div className="flex-item"> 
            <button onClick={this.changeView} name="login" style={{"width": "100%"}}>Log In</button>
            <button onClick={this.changeView} name="signup" style={{"width": "100%"}}>Sign Up</button>
          </div>
          <div>
              {this.state.showLogin ? <LogIn /> : <SignUp />}
          </div>

        </div>
        
  
      </div>
    );
  }
  
}



export default App;
