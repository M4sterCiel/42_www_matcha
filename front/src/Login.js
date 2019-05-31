import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar';
//import Footer from './components/Footer';
import 'materialize-css/dist/css/materialize.min.css';

class Plop extends Component {

  state = { message: '' };

  componentDidMount() {
    
    this.callApi()
    .then(res => this.setState({response: res.express}))
    .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/hello');
    const body = await response.json();

    if (response.status !== 200)
      throw Error(body.message);
      return body;
  };

    render() {
      return (
        <div className="App">
          <NavBar />
          <div className="row">
            <div className="col a12 m6" id="login-box">
              <div className="card-panel center">
                <i className="medium material-icons">account_box</i>
                <div className="card-panel">
                  <form method="post">
                    <div className="input-field">
                      <input type="text" name="name" id="user-login"></input>
                      <label for="user-login">Username or email</label>
                    </div>
                    <div className="input-field">
                      <input type="password" name="pwd" id="pwd-login"></input>
                      <label for="pwd-login">Password</label>
                    </div>
                    <input type="submit" name="submit" value="Se connecter" className="btn"></input>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

}

export default Plop;
