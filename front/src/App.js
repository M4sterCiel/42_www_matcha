import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar';
//import Footer from './components/Footer';
import 'materialize-css/dist/css/materialize.min.css';

class App extends Component {

  /* state = { message: '' };

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
  }; */

    render() {
      return (
        <div className="App">
          <NavBar />
          <div>
            <p>Home page</p>
          </div>
        </div>
      );
    }

}

export default App;
