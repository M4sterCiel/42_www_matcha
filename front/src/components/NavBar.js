
import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import "materialize-css";

class NavBar extends Component {
    
    render() {
        return(
          <nav>
    <div className="nav-wrapper">
      <a href="#!" className="brand-logo">Logo</a>
      <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
      <ul className="right hide-on-med-and-down">
        <li><a href="sass.html">Sass</a></li>
        <li><a href="badges.html">Components</a></li>
        <li><a href="collapsible.html">Javascript</a></li>
        <li><a href="mobile.html">Mobile</a></li>
      </ul>
    </div>
  </nav>

        );
    }
}

export default NavBar;