import React from "react"
import {withRouter} from "react-router-dom"

const Footer = props => {
  if (props.location.pathname === '/' || props.location.pathname === '/login' || props.location.pathname === '/signup') return null;
  return (
    <div>
        <h1>This is the footer</h1>
    </div>
  );
};

export default withRouter(Footer);