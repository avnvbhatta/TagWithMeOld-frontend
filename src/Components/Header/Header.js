import React from "react"
import {withRouter} from "react-router-dom"
import "./styles.header.scss"

const Header = props => {
  if (props.location.pathname === '/' || props.location.pathname === '/login' || props.location.pathname === '/signup') return null;
  return (
    <header className="site-header">
      <p>This is the header</p>
    </header>
  );
};

export default withRouter(Header);