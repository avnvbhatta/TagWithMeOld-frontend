import React from "react"
import "./Styles/styles.header.scss"

function Header() {
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
  )
}
export default Header