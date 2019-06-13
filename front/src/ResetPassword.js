import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
//import Footer from './components/Footer';
import "materialize-css/dist/css/materialize.min.css";
import Materialize from "materialize-css";
import AuthService from "./services/AuthService";
import { NavLink } from "react-router-dom";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      pwd1: "",
      pwd2: "",
      pwd2Error: "",
      pwd1Valid: false,
      pwd1VerifyBox: "box-disabled",
      pwdHasLowercase: false,
      pwdHasUppercase: false,
      pwdHasNumber: false,
      pwdHasMinLen: false,
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
                  <div className="input-field col s12">
                    <input
                      type="password"
                      name="pwd"
                      id="pwd-login"
                      value={this.state.pwd1}
                      onChange={e => this.setState({ pwd1: e.target.value })}
                      onKeyUp={this.handlePwdKeyUp}
                      onFocus={e =>
                        this.setState({ pwd1VerifyBox: "box-enabled" })
                      }
                      onBlur={e =>
                        this.setState({ pwd1VerifyBox: "box-disabled" })
                      }
                      required
                    />
                    <div
                      id="password-message"
                      className={this.state.pwd1VerifyBox}
                    >
                      <h3 id="pwd1-verify-title">
                        Password must contain the following:
                      </h3>
                      <p
                        id="letter"
                        className={
                          this.state.pwdHasLowercase ? "valid" : "invalid"
                        }
                      >
                        A <b>lowercase</b> letter
                      </p>
                      <p
                        id="capital"
                        className={
                          this.state.pwdHasUppercase ? "valid" : "invalid"
                        }
                      >
                        A <b>capital (uppercase)</b> letter
                      </p>
                      <p
                        id="number"
                        className={
                          this.state.pwdHasNumber ? "valid" : "invalid"
                        }
                      >
                        A <b>number</b>
                      </p>
                      <p
                        id="length"
                        className={
                          this.state.pwdHasMinLen ? "valid" : "invalid"
                        }
                      >
                        Minimum <b>8 characters</b>
                      </p>
                    </div>
                    <label htmlFor="pwd-login">Password</label>
                  </div>
                  <div className="input-field col s12">
                    <input
                      type="password"
                      name="rep-pwd"
                      id="rep-pwd-login"
                      value={this.state.pwd2}
                      onChange={e => this.setState({ pwd2: e.target.value })}
                      onKeyUp={this.handlePwdKeyUp}
                      required
                    />
                    <div className="register-error">{this.state.pwd2Error}</div>
                    <label htmlFor="rep-pwd-login">Repeat password</label>
                  </div>
                  <div id="error-back" />
                  <input
                    type="submit"
                    name="submit"
                    value="Register"
                    className="btn"
                    disabled={
                      !this.state.pwd1Valid ||
                      this.state.pwd2 !== this.state.pwd1
                    }
                  />
                </form>
                <p id="register-login-link">
                  Changed your mind?{" "}
                  <NavLink className="pink-link" to="/users/login">
                    Log in
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
  componentWillMount() {
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

  // Checking password format is valid
  validatePwd = () => {
    if (/[a-z]/.test(this.state.pwd1)) {
      this.setState({ pwdHasLowercase: true });
    } else {
      this.setState({ pwdHasLowercase: false });
    }

    if (/[A-Z]/g.test(this.state.pwd1)) {
      this.setState({ pwdHasUppercase: true });
    } else {
      this.setState({ pwdHasUppercase: false });
    }
    if (/[0-9]/g.test(this.state.pwd1)) {
      this.setState({ pwdHasNumber: true });
    } else {
      this.setState({ pwdHasNumber: false });
    }

    if (this.state.pwd1.length >= 8) {
      this.setState({ pwdHasMinLen: true });
    } else {
      this.setState({ pwdHasMinLen: false });
    }

    if (
      this.state.pwdHasLowercase &&
      this.state.pwdHasUppercase &&
      this.state.pwdHasNumber &&
      this.state.pwdHasMinLen
    ) {
      this.setState({ pwd1Valid: true });
    } else {
      this.setState({ pwd1Valid: false });
    }
  };

  // Checking passwords match
  validateRepeatPwd = () => {
    if (this.state.pwd1 === this.state.pwd2) {
      this.setState({ pwd2Error: "" });
    } else if (this.state.pwd2 !== "") {
      this.setState({ pwd2Error: "Passwords don't match" });
    }
  };

  // Checking over both passwords on change
  handlePwdKeyUp = async e => {
    await this.validatePwd();
    await this.validateRepeatPwd();
  };

  // Submitting user data to backend
  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch("/users/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pwd1: this.state.pwd1,
        pwd2: this.state.pwd2
      })
    });

    const body = await response.text();
    if (response.ok) {
      this.setState({ responseToPost: body });
      let message = "password has been changed";
      Materialize.toast({
        html: message,
        displayLength: 1000,
        classes: "rounded error-toast"
      });
      this.props.history.push("/users/login");
    } else {
      let message = body.substr(10, body.length - 12);
      Materialize.toast({
        html: message,
        displayLength: 1000,
        classes: "rounded error-toast"
      });
    }
  };
}

export default ResetPassword;
