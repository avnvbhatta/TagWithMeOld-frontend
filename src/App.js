import React from 'react';
import './App.css';
import Header from "./Components/Header"
import Footer from './Components/Footer';
import SignUp from "./Components/SignUp"
import LogIn from "./Components/LogIn"
import Home from "./Components/Home"
import MapView from "./Components/MapView"
import Messages from "./Components/Messages"
import Profile from "./Components/Profile"
import SignUpConfirmation from "./Components/SignUpConfirmation"
import {BrowserRouter, Route, Switch} from "react-router-dom"
import { ProtectedRoute } from "./Components/ProtectedRoute"
import "./styles.app.scss"

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      header: <Header />,
      footer: <Footer />
    }
  } 
  
  render(){
    return (
      <div>
        <BrowserRouter>
          <div className="app-layout">
            <Header />
            <div className="app-content">
              <Switch>
                <Route path="/" exact component={LogIn}/>
                <Route path="/login" exact component={LogIn}/>
                <Route path="/signup" exact component={SignUp}/>
                <Route path="/map" exact component={MapView}/>
                <ProtectedRoute path="/home" exact component={Home}/>
                <ProtectedRoute path="/messages" exact component={Messages}/>
                <ProtectedRoute path="/profile" exact component={Profile}/>
                <Route path="/confirm" exact component={SignUpConfirmation}/>
                <Route path="*" component={() => "404 NOT FOUND"}/>
              </Switch>
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </div>     
    );
  }
  
}



export default App;
