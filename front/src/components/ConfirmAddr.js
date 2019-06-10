import React, { Component } from 'react';
import '../App';
//import Footer from './components/Footer';
import 'materialize-css/dist/css/materialize.min.css';

class ConfirmAddr extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      status: '' };
  }

  componentDidMount() {
    
    this.callApi()
    .then(res => this.setState({status: res.message}))
    .catch(err => console.log(err));
  }

  callApi = async () => {
    var link = document.location.href;
    link = link.split('/');
    const response = await fetch('/users/register/'+link[link.length - 1]);
    const body = await response.json();

    if (response.status !== 200)
      throw Error(body.message);
      return body;
  };

    render() {
      return (
        <div className="App">
          <p>Page de validation du lien a construire</p>
        </div>
      );
    }

}

export default ConfirmAddr;
