import React, { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css";
import AuthService from "../services/AuthService";
import { withRouter, NavLink } from "react-router-dom";
import logo from "../assets/logo-with-name.png";
const Auth = new AuthService();

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.handleLogout = this.handleLogout.bind(this);
    this.Auth.getConfirm = this.Auth.getConfirm.bind(this);
    this.Auth.loggedIn = this.Auth.loggedIn.bind(this);
  }

  render() {
    const logout = this.handleLogout;
    function LoggedInLinks() {
      return (
        <ul className="right hide-on-med-and-down">
          <li>
            <NavLink to={"/users/profile/" + Auth.getConfirm().username}>
              {" "}
              My profile{" "}
            </NavLink>
          </li>
          <li>
            <button className="nav-buttons" onClick={logout}>
              Log out
            </button>
          </li>
        </ul>
      );
    }

    // Generates the links in the navbar for a logged out user
    function LoggedOutLinks() {
      return (
        <ul className="right hide-on-med-and-down">
          <li>
            <NavLink to="/users/register">Register</NavLink>
          </li>
          <li>
            <NavLink to="/users/login">Log in</NavLink>
          </li>
        </ul>
      );
    }

    // Generates the links in the navbar for a logged in user
    function NavLinks() {
      if (Auth.loggedIn()) return <LoggedInLinks />;
      else return <LoggedOutLinks />;
    }

    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.sidenav');
      var instances = M.Sidenav.init(elems);
    });

    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <NavLink to="/" className="brand-logo">
              <img className="header-logo" src={logo} alt="" />
            </NavLink>
            <a href="#" data-target="mobile-demo" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
            <NavLinks />
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

  // Log out the user clearing his Auth token
  handleLogout() {
    Auth.logout();
    this.props.history.replace("/users/login");
  }
}

export default withRouter(NavBar);
