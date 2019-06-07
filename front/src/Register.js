import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
//import Footer from './components/Footer';
import "materialize-css/dist/css/materialize.min.css";

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
      pw1Error: "",
      pw2Error: "",
      lastnameValid: false,
      firstnameValid: false,
      usernameValid: false,
      emailValid: false,
      pw1Valid: false,
      pw1VerifyBox: "box-disabled",
      pw1HasLetter: false,
      pw1HasCapital: false,
      pw1HasNumber: false,
      pw1HasMinChar: false,
      pw2Valid: false,
      responseToPost: ""
    };
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
              <div className="card-panel">
                <form onSubmit={this.handleSubmit}>
                  <div className="input-field col s6 name-size">
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
                    <input
                      type="password"
                      name="pwd"
                      id="pwd-login"
                      value={this.state.pwd1}
                      onChange={e => this.setState({ pwd1: e.target.value })}
                      onFocus={e =>
                        this.setState({ pw1VerifyBox: "box-enabled" })
                      }
                      onBlur={e =>
                        this.setState({ pw1VerifyBox: "box-disabled" })
                      }
                      required
                    />
                    <div
                      id="password-message"
                      className={this.state.pw1VerifyBox}
                    >
                      <h3 id="pw1-verify-title">
                        Password must contain the following:
                      </h3>
                      <p id="letter" className="invalid">
                        A <b>lowercase</b> letter
                      </p>
                      <p id="capital" className="invalid">
                        A <b>capital (uppercase)</b> letter
                      </p>
                      <p id="number" className="invalid">
                        A <b>number</b>
                      </p>
                      <p id="length" className="invalid">
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
                      required
                    />
                    <label htmlFor="rep-pwd-login">Repeat password</label>
                  </div>
                  <input
                    type="submit"
                    name="submit"
                    value="Register"
                    className="btn"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Checking first name format is valid
  validateFirstName = () => {
    let firstnameError = "";
    let firstnameRegex = /^[a-zA-Z]*-?[a-zA-Z]*$/;

    if (/\s/.test(this.state.firstname)) {
      firstnameError = "First name cannot contain spaces";
    } else if (!this.state.firstname.match(firstnameRegex)) {
      firstnameError = "First name is invalid";
    }

    this.setState({ firstnameError });
  };

  // Checking last name format is valid
  validateLastName = () => {
    let lastnameError = "";
    let lastnameRegex = /^[a-zA-Z]*-?[a-zA-Z]*$/;

    if (/\s/.test(this.state.lastname)) {
      lastnameError = "Last name cannot contain spaces";
    } else if (!this.state.lastname.match(lastnameRegex)) {
      lastnameError = "Last name is invalid";
    }

    this.setState({ lastnameError });
  };

  // Checking username format is valid
  validateUsername = () => {
    let usernameError = "";
    let usernameRegex = /^[a-zA-Z]*-?[a-zA-Z]*$/;

    if (/\s/.test(this.state.username)) {
      usernameError = "Username cannot contain spaces";
    } else if (!this.state.username.match(usernameRegex)) {
      usernameError = "Username is invalid (use letters and numbers)";
    }

    this.setState({ usernameError });
  };

  // Checking email format is valid
  validateEmail = () => {
    let emailError = "";
    let emailRegex = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/;

    if (/\s/.test(this.state.email)) {
      emailError = "Email cannot contain spaces";
    } else if (!this.state.email.match(emailRegex)) {
      emailError = "Email is invalid (example@email.com)";
    }

    this.setState({ emailError });
  };

  validatePw1 = () => {};

  /* componentDidMount() {
    
    this.callApi()
    .then(res => this.setState({response: res.express}))
    .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/register');
    const body = await response.json();

    if (response.status !== 200)
      throw Error(body.message);
    return body;
  };
 */

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch("/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lastname: this.state.lastname,
        firstname: this.state.firstname,
        username: this.state.username,
        email: this.state.email,
        pwd1: this.state.pwd1,
        pwd2: this.state.pwd2
      })
    });
    const body = await response.text();
    this.setState({ responseToPost: body });
    console.log(body);
  };
}

export default Register;
