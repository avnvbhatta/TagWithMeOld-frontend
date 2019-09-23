import React from 'react';
import './App.css';
import Header from "./Components/Header"
import Footer from './Components/Footer';
import SignUp from "./Components/SignUp"
import LogIn from "./Components/LogIn"
import Home from "./Components/Home"
import Messages from "./Components/Messages"
import Profile from "./Components/Profile"

import {BrowserRouter, Route, Switch} from "react-router-dom"
import { ProtectedRoute } from "./Components/ProtectedRoute"

class App extends React.Component {
  constructor(){
    super()
  } 

  render(){
    return (
      <BrowserRouter>
        <div id="container">
          <div className="jumbotron">
            <h2>TagWithMe</h2>
            <div>
                <Switch>
                  <Route path="/" exact component={LogIn}/>
                  <Route path="/login" exact component={LogIn}/>
                  <Route path="/signup" exact component={SignUp}/>
                  <ProtectedRoute path="/home" exact component={Home}/>
                  <ProtectedRoute path="/messages" exact component={Messages}/>
                  <ProtectedRoute path="/profile" exact component={Profile}/>
                  <Route path="*" component={() => "404 NOT FOUND"}/>
                </Switch>
            </div>
          </div>  
        </div>
      </BrowserRouter>
      
    );
  }
  
}



export default App;
