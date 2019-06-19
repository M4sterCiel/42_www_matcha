import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
//import Footer from './components/Footer';
import "materialize-css/dist/css/materialize.min.css";
import Materialize from "materialize-css";
import AuthService from "./services/AuthService";
import { NavLink } from "react-router-dom";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      loginError: "",
      loginValid: false,
      responseToPost: ""
    };
    this.Auth = new AuthService();
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <div className="row">
          <div className="col a12 m6" id="login-box">
            <div className="card-panel center">
              <i className="medium material-icons">lock</i>
              <div className="card-panel">
                <form onSubmit={this.handleSubmit}>
                  <div className="input-field">
                    <input
                      type="text"
                      name="name"
                      id="user-login"
                      value={this.state.login}
                      onChange={this.handleChange}
                      onKeyUp={this.validateLogin}
                      required
                    />
                    <div className="login-error">{this.state.loginError}</div>
                    <label htmlFor="user-login">Username or email</label>
                  </div>
                  <input
                    type="submit"
                    name="submit"
                    value="reset password"
                    className="btn"
                    disabled={!this.state.loginValid}
                  />
                </form>
                <p className="register-login-link">
                  Go back to{" "}
                  <NavLink className="pink-link" to="/users/login">
                    Login
                  </NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Redirect user if already logged in
  componentDidMount() {
    if (this.Auth.loggedIn()) {
      let message = "you are already logged in";
      Materialize.toast({
        html: message,
        displayLength: 1000,
        classes: "rounded error-toast"
      });
      this.props.history.replace("/");
    }
  }

  // Checking username or email format is valid
  validateLogin = () => {
    let loginError = "";
    let regexLogin = /^[a-zA-Z0-9]*-?[a-zA-Z0-9]*$/;
    let regexEmail = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/;

    if (
      !this.state.login.match(regexLogin) &&
      !this.state.login.match(regexEmail)
    ) {
      loginError = "Please enter a valid Username/Email";
    } else if (this.state.login === "") {
      loginError = "Username/Email cannot be empty";
    } else if (this.state.login.length > 20) {
      loginError = "Username/Email must be less or equal to 20 chars";
    }

    if (loginError) {
      this.setState({ loginValid: false });
    } else if (this.state.login !== "") {
      this.setState({ loginValid: true });
    }

    this.setState({ loginError });
  };

  // On user input change, update states
  handleChange = e => {
    this.setState({ login: e.target.value });
  };

  // On user button submit, execute this
  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch("/users/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        login: this.state.login.toLowerCase()
      })
    });

    const body = await response.json();
    if (response.ok) {
      this.setState({ responseToPost: body.status });
      let message = "An email to reset your password has been sent";
      Materialize.toast({
        html: message,
        displayLength: 1400,
        classes: "rounded info-toast"
      });
      this.props.history.push("/");
    } else {
      console.log(body);
      let message = body.message;
      Materialize.toast({
        html: message,
        displayLength: 1000,
        classes: "rounded error-toast"
      });
    }
  };
}

export default ForgotPassword;
