import React, { Component } from "react";
import "../styles/App.css";
import NavBar from "../components/NavBar";
//import Footer from './components/Footer';
import "materialize-css/dist/css/materialize.min.css";
import AuthService from "../services/AuthService";
import { NavLink } from "react-router-dom";
import GeoPosition from "geolocator";
import Axios from "axios";
import { BackgroundAdd } from "../components/Background";
import ErrorToast from "../services/ErrorToastService";
import Materialize from "react-materialize";

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
      locationValid: false,
      pwd1VerifyBox: "box-disabled",
      pwdHasLowercase: false,
      pwdHasUppercase: false,
      pwdHasNumber: false,
      pwdHasMinLen: false,
      userLocation: "",
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
                    <i className="material-icons prefix input-icons">
                      person_outline
                    </i>
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
                    <label htmlFor="lastname-register">Lastname</label>
                  </div>
                  <div className="input-field col s6 name-size">
                    <i className="material-icons prefix input-icons">
                      person_outline
                    </i>
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
                    <label htmlFor="firstname-register">Firstname</label>
                  </div>
                  <div className="input-field col s12">
                    <i className="material-icons prefix input-icons">
                      person_outline
                    </i>
                    <input
                      type="text"
                      name="username"
                      autoComplete="username"
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
                    <i className="material-icons prefix input-icons">
                      mail_outline
                    </i>
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
                    <i className="material-icons prefix input-icons">
                      lock_outline
                    </i>
                    <input
                      type="password"
                      name="pwd"
                      id="pwd-login"
                      autoComplete="new-password"
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
                    <i className="material-icons prefix input-icons">
                      lock_outline
                    </i>
                    <input
                      type="password"
                      name="rep-pwd"
                      id="rep-pwd-login"
                      autoComplete="new-password"
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
                      !this.state.locationValid ||
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
    BackgroundAdd();
    if (this.Auth.loggedIn()) {
      ErrorToast.auth.userAlreadyLogged();
      this.props.history.replace("/");
    }
    this.getLocation();
  }

  showPosition = pos => {
    var options = {
      enableHighAccuracy: true,
      desiredAccuracy: 30,
      timeout: 5000,
      maximumWait: 5000,
      maximumAge: 0,
      fallbackToIP: true,
      addressLookup: true
    };
    GeoPosition.locate(options, (err, location) => {
      console.log(err || location);
      this.setState({ userLocation: location });
      this.setState({ locationValid: true });
    });
  };

  errorPosition = error => {
    var options = {
      homeMobileCountryCode: 208,
      homeMobileNetworkCode: 1,
      carrier: "Orange",
      radioType: GeoPosition.RadioType.GSM,
      fallbackToIP: true,
      addressLookup: true,
      timezone: false
    };
    GeoPosition.locateByMobile(options, (err, location) => {
      console.log(err || location);
      this.setState({ userLocation: location });
      this.setState({ locationValid: true });
    });
  };

  getLocation = () => {
    GeoPosition.config({
      language: "en",
      google: {
        version: "3",
        key: "AIzaSyCrQGnPtopWTSK9joyPAxlEGcl535KlQQQ"
      }
    });

    navigator.geolocation.getCurrentPosition(
      this.showPosition,
      this.errorPosition
    );
  };

  // Checking firstname format is valid
  validateFirstName = () => {
    let firstnameError = "";
    let firstnameRegex = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]*-?[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]*$/;

    if (/\s/.test(this.state.firstname)) {
      firstnameError = "Firstname cannot contain spaces";
      this.setState({ firstnameValid: false });
    } else if (!this.state.firstname.match(firstnameRegex)) {
      firstnameError = "Firstname is invalid";
      this.setState({ firstnameValid: false });
    }

    this.setState({ firstnameError });
    this.setState({ firstnameValid: true });
  };

  // Checking lastname format is valid
  validateLastName = () => {
    let lastnameError = "";
    let lastnameRegex = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]*-?[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]*$/;

    if (/\s/.test(this.state.lastname)) {
      lastnameError = "Lastname cannot contain spaces";
      this.setState({ lastnameValid: false });
    } else if (!this.state.lastname.match(lastnameRegex)) {
      lastnameError = "Lastname is invalid";
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
    await Axios.post("/users/register", {
      lastname: this.capitalizeFirstLetter(this.state.lastname.toLowerCase()),
      firstname: this.capitalizeFirstLetter(this.state.firstname.toLowerCase()),
      username: this.state.username.toLowerCase(),
      email: this.state.email.toLowerCase(),
      pwd1: this.state.pwd1,
      pwd2: this.state.pwd2,
      location: this.state.userLocation
    })
      .then(res => {
        this.setState({ responseToPost: res.data });
        Materialize.toast({
          html: "An email has been sent",
          displayLength: 5000,
          classes: "rounded confirm-toast"
        });
        this.props.history.push("/users/login");
      })
      .catch(err => {
        let message = err.response.data["error"];
        ErrorToast.default.error(message);
      });
  };
}

export default Register;
