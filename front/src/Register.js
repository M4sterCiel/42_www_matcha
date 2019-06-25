import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
//import Footer from './components/Footer';
import "materialize-css/dist/css/materialize.min.css";
import Materialize from "materialize-css";
import AuthService from "./services/AuthService";
import { NavLink } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      lastname: "",
      firstname: "",
      username: "",
      email: "",
      pwd1: "",
      pwd2: "",
      lastnameError: "",
      firstnameError: "",
      usernameError: "",
      emailError: "",
      pwd2Error: "",
      lastnameValid: false,
      firstnameValid: false,
      usernameValid: false,
      emailValid: false,
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
        {this.state.responseToPost === "success" ? (
          <div className="msg msg-info z-depth-3">Bravo!</div>
        ) : (
          ""
        )}
        <div className="row">
          <div className="col a12 m6" id="login-box">
            <div className="card-panel center">
              <i className="medium material-icons">person_add</i>
              <span className="title-page">Register</span>
              <div className="card-panel">
                <form onSubmit={this.handleSubmit}>
                  <div className="input-field col s6 name-size">
                    <i className="material-icons prefix input-icons">person_outline</i>
                    <input
                      type="text"
                      name="lastname"
                      id="lastname-register"
                      value={this.state.lastname}
                      onChange={e =>
                        this.setState({ lastname: e.target.value })
                      }
                      onKeyUp={this.validateLastName}
                      required
                    />
                    <div className="register-error">
                      {this.state.lastnameError}
                    </div>
                    <label htmlFor="lastname-register">Last name</label>
                  </div>
                  <div className="input-field col s6 name-size">
                    <i className="material-icons prefix input-icons">person_outline</i>
                    <input
                      type="text"
                      name="firstname"
                      id="firstname-register"
                      value={this.state.firstname}
                      onChange={e =>
                        this.setState({ firstname: e.target.value })
                      }
                      onKeyUp={this.validateFirstName}
                      required
                    />
                    <div className="register-error">
                      {this.state.firstnameError}
                    </div>
                    <label htmlFor="firstname-register">First name</label>
                  </div>
                  <div className="input-field col s12">
                    <i className="material-icons prefix input-icons">person_outline</i>
                    <input
                      type="text"
                      name="username"
                      id="username-register"
                      value={this.state.username}
                      onChange={e =>
                        this.setState({ username: e.target.value })
                      }
                      onKeyUp={this.validateUsername}
                      required
                    />
                    <div className="register-error">
                      {this.state.usernameError}
                    </div>
                    <label htmlFor="username-register">Username</label>
                  </div>
                  <div className="input-field col s12">
                    <i className="material-icons prefix input-icons">mail_outline</i>
                    <input
                      type="email"
                      name="email"
                      id="email-register"
                      value={this.state.mail}
                      onChange={e => this.setState({ email: e.target.value })}
                      onKeyUp={this.validateEmail}
                      required
                    />
                    <div className="register-error">
                      {this.state.emailError}
                    </div>
                    <label htmlFor="email-register">Email</label>
                  </div>
                  <div className="input-field col s12">
                    <i className="material-icons prefix input-icons">lock_outline</i>
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
                    <i className="material-icons prefix input-icons">lock_outline</i>
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
                      !this.state.lastnameValid ||
                      !this.state.firstnameValid ||
                      !this.state.usernameValid ||
                      !this.state.emailValid ||
                      !this.state.pwd1Valid ||
                      this.state.pwd2 !== this.state.pwd1
                    }
                  />
                </form>
                <p className="register-login-link">
                  Already have an account?{" "}
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

  // Checking first name format is valid
  validateFirstName = () => {
    let firstnameError = "";
    let firstnameRegex = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]*-?[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]*$/;

    if (/\s/.test(this.state.firstname)) {
      firstnameError = "First name cannot contain spaces";
      this.setState({ firstnameValid: false });
    } else if (!this.state.firstname.match(firstnameRegex)) {
      firstnameError = "First name is invalid";
      this.setState({ firstnameValid: false });
    }

    this.setState({ firstnameError });
    this.setState({ firstnameValid: true });
  };

  // Checking last name format is valid
  validateLastName = () => {
    let lastnameError = "";
    let lastnameRegex = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]*-?[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]*$/;

    if (/\s/.test(this.state.lastname)) {
      lastnameError = "Last name cannot contain spaces";
      this.setState({ lastnameValid: false });
    } else if (!this.state.lastname.match(lastnameRegex)) {
      lastnameError = "Last name is invalid";
      this.setState({ lastnameValid: false });
    } else {
      this.setState({ lastnameValid: true });
    }

    this.setState({ lastnameError });
  };

  // Checking username format is valid
  validateUsername = () => {
    let usernameError = "";
    let usernameRegex = /^[a-zA-Z0-9]*-?[a-zA-Z0-9]*$/;

    if (/\s/.test(this.state.username)) {
      usernameError = "Username cannot contain spaces";
      this.setState({ usernameValid: false });
    } else if (!this.state.username.match(usernameRegex)) {
      usernameError = "Username is invalid (use letters and numbers)";
      this.setState({ usernameValid: false });
    } else {
      this.setState({ usernameValid: true });
    }

    this.setState({ usernameError });
  };

  // Checking email format is valid
  validateEmail = () => {
    let emailError = "";
    let emailRegex = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/;

    if (/\s/.test(this.state.email)) {
      emailError = "Email cannot contain spaces";
      this.setState({ emailValid: false });
    } else if (!this.state.email.match(emailRegex)) {
      emailError = "Email is invalid (example@email.com)";
      this.setState({ emailValid: false });
    } else {
      this.setState({ emailValid: true });
    }

    this.setState({ emailError });
  };

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

  // Cleaning data before submit
  capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Submitting user data to backend
  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch("/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lastname: this.capitalizeFirstLetter(this.state.lastname.toLowerCase()),
        firstname: this.capitalizeFirstLetter(
          this.state.firstname.toLowerCase()
        ),
        username: this.state.username.toLowerCase(),
        email: this.state.email.toLowerCase(),
        pwd1: this.state.pwd1,
        pwd2: this.state.pwd2
      })
    });

    const body = await response.text();
    if (response.ok) {
      this.setState({ responseToPost: body });
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

export default Register;
