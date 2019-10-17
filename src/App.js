import React from 'react';
import Header from "Components/Header/Header"
import Footer from "Components/Footer/Footer";
import SignUp from "Components/SignUp/SignUp"
import LogIn from "Components/LogIn/LogIn"
import Home from "Components/Home/Home"
import MapView from "Components/MapView/MapView"
import Messages from "Components/Messages/Messages"
import Profile from "Components/Profile/Profile"
import SignUpConfirmation from "Components/SignUpConfirmation/SignUpConfirmation"
import {BrowserRouter, Route, Switch} from "react-router-dom"
import { ProtectedRoute } from "Components/ProtectedRoute/ProtectedRoute"
import "styles.app.scss"

class App extends React.Component {
  constructor(props){
    super(props);
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
