import React, { Component } from "react";
import "./App.css";
import "materialize-css/dist/css/materialize.min.css";
import Materialize from "materialize-css";

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      emailError: "",
      pwdError: "",
      emailValid: false,
      responseToPost: ""
    };
  }

  render() {
    
    return (
      <div className="App">
        <div className="row">
            <form onSubmit={this.handleSubmit} className="col s12">
                <div className="input-field col s6 name-size">
                <i className="material-icons prefix input-icons">person_outline</i>
                <input
                    type="text"
                    name="firstname"
                    id="user-firstname"
                    autoComplete="firstname"
                    onChange={e => this.setState({ firstname: e.target.value })}
                    onKeyUp={this.validateLogin}
                    value={this.state.firstname}
                    required
                />
                <label htmlFor="user-firstname">Firstname</label>
                </div>
                <div className="input-field">
                <i className="material-icons prefix input-icons">person_outline</i>
                <input
                    type="text"
                    name="firstname"
                    id="user-lastname"
                    autoComplete="lastname"
                    onChange={e => this.setState({ lastname: e.target.value })}
                    onKeyUp={this.validateLogin}
                    value={this.state.firstname}
                    required
                />
                <label htmlFor="user-lastname">Lastname</label>
                </div>
                <div className="input-field">
                <i className="material-icons prefix input-icons">person_outline</i>
                <input
                    type="text"
                    name="username"
                    id="user-username"
                    autoComplete="username"
                    onChange={e => this.setState({ username: e.target.value })}
                    onKeyUp={this.validateLogin}
                    value={this.state.firstname}
                    required
                />
                <label htmlFor="user-username">Username</label>
                </div>
                <div className="input-field">
                <i className="material-icons prefix input-icons">mail_outline</i>
                <input
                    type="text"
                    name="email"
                    id="user-email"
                    autoComplete="email"
                    onChange={e => this.setState({ email: e.target.value })}
                    onKeyUp={this.validateLogin}
                    value={this.state.firstname}
                    required
                />
                <label htmlFor="user-email">Email</label>
                </div>
                <input
                    type="submit"
                    value="Save"
                    className="btn"
                />
            </form>
        </div>
    </div>
    );
  }  

  

  // On user button submit, execute this
  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch("/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        login: this.state.login.toLowerCase(),
        pwd: this.state.pwd
      })
    });

    const body = await response.json();
    if (response.ok) {
      this.setState({ responseToPost: body.status });
      localStorage.setItem("Token", body.token);
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

export default Test;
