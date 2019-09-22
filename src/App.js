import React from 'react';
import './App.css';
import Header from "./Components/Header"
import Footer from './Components/Footer';
import SignUp from "./Components/SignUp/SignUp"
import LogIn from "./Components/LogIn/LogIn"

function App() {
  return (
    <div className="jumbotron" style={{ "width":"50%"}}>
      <Header />
        <h1>TagWithMe</h1>
        <LogIn />
        <SignUp />
        
      <Footer />
    </div>
  );
}

export default App;
