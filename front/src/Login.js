import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar';
//import Footer from './components/Footer';
import 'materialize-css/dist/css/materialize.min.css';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      login: '',
      pwd: '',
      responseToPost: '' };
  }

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify({ 
        login: this.state.login,
        pwd: this.state.pwd
      }), 
    });
    const body = await response.json();
    this.setState({ responseToPost: body.status});
    console.log(body);
    localStorage.setItem('Token', body.token);
  }
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
                      <input type="text" name="name" id="user-login" value={this.state.login} onChange={e => this.setState({ login: e.target.value })} required ></input>
                      <label htmlFor="user-login">Username or email</label>
                    </div>
                    <div className="input-field">
                      <input type="password" name="pwd" id="pwd-login" value={this.state.pwd} onChange={e => this.setState({ pwd: e.target.value })} required></input>
                      <label htmlFor="pwd-login">Password</label>
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

export default Login;
