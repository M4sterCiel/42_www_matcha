import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar';
//import Footer from './components/Footer';
import 'materialize-css/dist/css/materialize.min.css';

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      message: '',
      lastname: '',
      firstname: '',
      mail: '',
      pwd1: '',
      pwd2: '',
      responseToPost: '' };
  }

  componentDidMount() {
    
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

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify({ 
        lastname: this.state.lastname,
        firstname: this.state.firstname,
        mail: this.state.mail,
        pwd1: this.state.pwd1,
        pwd2: this.state.pwd2
      }), 
    });
      const body = await response.text();
      this.setState({ responseToPost: body});
      console.log(body);
    };

    render() {
      return (
        <div className="App">
          <NavBar />
          { this.state.responseToPost === 'success' ? <div className="msg msg-info z-depth-3">Bravo!</div> : "" } 
          <div className="row">
            <div className="col a12 m6" id="login-box">
              <div className="card-panel center">
                <i className="medium material-icons">person_add</i>
                <div className="card-panel">
                  <form onSubmit={this.handleSubmit}>
                    <div className="input-field col s6">
                      <input type="text" name="lastname" id="lastname-register" value={this.state.lastname} onChange={e => this.setState({ lastname: e.target.value })} required></input>
                      <label htmlFor="lastname-register">Nom</label>
                    </div>
                    <div className="input-field col s6">
                      <input type="text" name="firstname" id="firstname-register" value={this.state.firstname} onChange={e => this.setState({ firstname: e.target.value })} required></input>
                      <label htmlFor="firstname-register">Prénom</label>
                    </div>
                    <div className="input-field col s12">
                      <input type="email" name="email" id="email-register" value={this.state.mail} onChange={e => this.setState({ mail: e.target.value })} required></input>
                      <label htmlFor="email-register">Email</label>
                    </div>
                    <div className="input-field col s12">
                      <input type="password" name="pwd" id="pwd-login" value={this.state.pwd1} onChange={e => this.setState({ pwd1: e.target.value })} required></input>
                      <label htmlFor="pwd-login">Mot de passe</label>
                    </div>
                    <div className="input-field col s12">
                      <input type="password" name="rep-pwd" id="rep-pwd-login" value={this.state.pwd2} onChange={e => this.setState({ pwd2: e.target.value })} required></input>
                      <label htmlFor="rep-pwd-login">Confirmer le mot de passe</label>
                    </div>
                    <input type="submit" name="submit" value="Enregistrer" className="btn"></input>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

}

export default Register;
