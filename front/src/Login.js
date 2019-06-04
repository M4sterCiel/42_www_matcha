import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
//import Footer from './components/Footer';
import "materialize-css/dist/css/materialize.min.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      pwd: "",
      loginError: "",
      pwdError: "",
      responseToPost: ""
    };
  }

  validateName = () => {
    let loginError = "";
    let regexName = /^[a-zA-Z0-9_.-]*$/;
    let regexEmail = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/;

    if (
      !this.state.login.match(regexName) &&
      !this.state.login.match(regexEmail)
    ) {
      loginError = "Invalid login";
    }

    if (loginError) {
      this.setState({ loginError });
      return false;
    }

    this.setState({ loginError });
    return true;
  };

  validatePwd = () => {
    let pwdError = "";

    if (this.state.pwd.includes("2")) {
      pwdError = "Invalid password";
    }

    if (pwdError) {
      this.setState({ pwdError });
      return false;
    }

    this.setState({ pwdError });
    return true;
  };

  handleChange = e => {
    const isLogin = e.target.name === "name";
    const isPwd = e.target.name === "pwd";

    if (isLogin) {
      this.setState({ login: e.target.value });
      const isValidLogin = this.validateName();

      if (isValidLogin) {
        console.log(this.state);
      }
    }

    if (isPwd) {
      this.setState({ pwd: e.target.value });
      const isValidPwd = this.validatePwd();

      if (isValidPwd) {
        console.log(this.state);
      }
    }
  };

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
    const body = await response.text();
    this.setState({ responseToPost: body.status });
    console.log(body);
  };
  /* componentDidMount() {
    
    this.callApi()
    .then(res => this.setState({response: res.express}))
    .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/login');
    const body = await response.json();

    if (response.status !== 200)
      throw Error(body.message);
      return body;
  }; */

  render() {
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
                      value={this.state.login}
                      onChange={this.handleChange}
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
                      value={this.state.pwd}
                      onChange={this.handleChange}
                      required
                    />
                    <div className="pwd-error">{this.state.pwdError}</div>
                    <label htmlFor="pwd-login">Password</label>
                  </div>
                  <input
                    type="submit"
                    name="submit"
                    value="Se connecter"
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
}

export default Login;
