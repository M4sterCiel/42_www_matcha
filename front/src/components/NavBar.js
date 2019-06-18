import React, { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css";
import AuthService from "../services/AuthService";
import { withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import logo from '../assets/logo-with-name.png'
const Auth = new AuthService();

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.handleLogout = this.handleLogout.bind(this);
  }

  render() {
    let links;

    const loggedInLinks = (
      <ul className="right hide-on-med-and-down">
        <li>
          <button className="nav-buttons" onClick={this.handleLogout}>
            Log out
          </button>
        </li>
      </ul>
    );

    const loggedOutLinks = (
      <ul className="right hide-on-med-and-down">
        <li>
          <NavLink to="/users/register"> Register </NavLink>
        </li>
        <li>
          <NavLink to="/users/login"> Login</NavLink>
        </li>
      </ul>
    );

    if (this.Auth.loggedIn()) {
      links = loggedInLinks;
    } else {
      links = loggedOutLinks;
    }
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
              <img
                className="header-logo"
                src={logo}
              />
            </a>
            <a href="#" data-target="mobile-demo" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
            {links}
          </div>
        </nav>

        <ul className="sidenav" id="mobile-demo">
          <li>
            <a href="/users/register">Register</a>
          </li>
          <li>
            <a href="/users/login">Login</a>
          </li>
        </ul>
      </div>
    );
  }

  handleLogout() {
    Auth.logout();
    this.props.history.replace("/users/login");
  }
}

export default withRouter(NavBar);
