import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
//import Footer from './components/Footer';
import FacebookLogin from 'react-facebook-login';
//import socketIOClient from "socket.io-client";
import "materialize-css/dist/css/materialize.min.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      pwd: "",
      loginError: "",
      pwdError: "",
      loginValid: false,
      pwdValid: false,
      responseToPost: ""
    };
  }

  render() {
    const responseFacebook = (response) => {
      console.log(response);
    }

    return (
      <div className="App">
        <NavBar />
        <div className="row">
          <div className="col a12 m6" id="login-box">
            <div className="card-panel center">
              <i className="medium material-icons">account_box</i>
              <div className="card-panel">
                <form onSubmit={this.handleSubmit}>
                  <div className="input-field">
                    <input
                      type="text"
                      name="name"
                      id="user-login"
                      autoComplete="username"
                      value={this.state.login}
                      onChange={this.handleChange}
                      onKeyUp={this.validateName}
                      required
                    />
                    <div className="login-error">{this.state.loginError}</div>
                    <label htmlFor="user-login">Username or email</label>
                  </div>
                  <div className="input-field">
                    <input
                      type="password"
                      name="pwd"
                      id="pwd-login"
                      autoComplete="current-password"
                      value={this.state.pwd}
                      onChange={this.handleChange}
                      onKeyUp={this.validatePwd}
                      required
                    />
                    <div className="login-error">{this.state.pwdError}</div>
                    <label htmlFor="pwd-login">Password</label>
                  </div>
                  <input
                    type="submit"
                    name="submit"
                    value="Login"
                    className="btn"
                    disabled={!this.state.loginValid || !this.state.pwdValid}
                  />
                </form>
              </div>
              <FacebookLogin
                appId="2410412929189525" 
                fields="name,email,picture"
                callback={responseFacebook}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Checking username or email format is valid
  validateName = () => {
    let loginError = "";
    let regexName = /^[a-zA-Z]*-?[a-zA-Z]*$/;
    let regexEmail = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/;

    if (
      !this.state.login.match(regexName) &&
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

  // Checking password format is valid
  validatePwd = () => {
    let pwdError = "";

    if (this.state.pwd.length < 8 || this.state.pwd.includes(" ")) {
      pwdError = "Please enter a valid password";
    } else if (this.state.pwd.length > 30) {
      pwdError = "Password must be less or equal to 30 chars";
    }

    if (pwdError) {
      this.setState({ pwdValid: false });
    } else if (this.state.pwd) {
      this.setState({ pwdValid: true });
    }

    this.setState({ pwdError });
  };

  // On user input change, update states
  handleChange = e => {
    const isLogin = e.target.name === "name";
    const isPwd = e.target.name === "pwd";

    if (isLogin) {
      this.setState({ login: e.target.value });
    }

    if (isPwd) {
      this.setState({ pwd: e.target.value });
    }
  };

  // On user button submit, execute this
  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch("/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        login: this.state.login,
        pwd: this.state.pwd
      })
    });
    const body = await response.json();
    this.setState({ responseToPost: body.status});
    console.log(body);
    localStorage.setItem('Token', body.token);
  }
  /* componentDidMount() {
    
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", data => this.setState({ response: data }));
  }

  callApi = async () => {
    const response = await fetch('/login');
    const body = await response.json();

    if (response.status !== 200)
      throw Error(body.message);
      return body;
  }; */
}

export default Login;
