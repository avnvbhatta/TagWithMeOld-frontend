import React from "react"
import {withRouter} from "react-router-dom"
import "./styles.header.scss"

const Header = props => {
  if (props.location.pathname === '/' || props.location.pathname === '/login' || props.location.pathname === '/signup') return null;
  return (
    <header className="site-header">
    <a href="0" className="logo">Insert Logo Here... </a>
    <nav className="site-nav">
      <ul>
        <li className="active"><a href="0">Home</a></li>
        <li><a href="#">About</a></li>
      </ul>
    </nav>

    <div className="site-settings">
      <ul>
        <li><a href="#">Settings</a></li>
        <li><a href="#">Sign Out</a></li>
      </ul>
    </div>
  </header>
  );
};

export default withRouter(Header);