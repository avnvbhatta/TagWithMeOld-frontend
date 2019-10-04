import React from 'react';
import './App.css';
import Header from "./Components/Header"
import Footer from './Components/Footer';
import SignUp from "./Components/SignUp"
import LogIn from "./Components/LogIn"
import Home from "./Components/Home"
import Messages from "./Components/Messages"
import Profile from "./Components/Profile"
import SignUpConfirmation from "./Components/SignUpConfirmation"
import {BrowserRouter, Route, Switch} from "react-router-dom"
import { ProtectedRoute } from "./Components/ProtectedRoute"
import "./styles.app.scss"


class App extends React.Component {
  constructor(){
    super()
  } 

  render(){
    return (
      <BrowserRouter>
            <Switch>
              <Route path="/" exact component={LogIn}/>
              <Route path="/login" exact component={LogIn}/>
              <Route path="/signup" exact component={SignUp}/>
              <ProtectedRoute path="/home" exact component={Home}/>
              <ProtectedRoute path="/messages" exact component={Messages}/>
              <ProtectedRoute path="/profile" exact component={Profile}/>
              <Route path="/confirm" exact component={SignUpConfirmation}/>
              <Route path="*" component={() => "404 NOT FOUND"}/>
            </Switch>
      </BrowserRouter>
      
    );
  }
  
}



export default App;
