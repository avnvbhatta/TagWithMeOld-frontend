import React from "react"
import "./Styles/styles.header.scss"

function Header(){
    return (
        <header class="site-header">
  <a href="0" class="logo">Insert Logo Here... </a>
  <nav class="site-nav">
    <ul>
      <li class="active"><a href="0">Home</a></li>
      <li><a href="#">About</a></li>
    </ul>
  </nav>
  
  <div class="site-settings">
    <ul>
        <li><a href="#">Settings</a></li>
        <li><a href="#">Sign Out</a></li>
    </ul>
  </div>
</header>
    )
}
export default Header