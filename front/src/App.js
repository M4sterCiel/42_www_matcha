import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
//import Footer from './components/Footer';
import "materialize-css/dist/css/materialize.min.css";
import WithAuth from "./components/withAuth";
//import io from 'socket.io-client';
import AddInfo from "./AddInfo";
import AuthService from "./services/AuthService";
class App extends Component {

  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.state = {
        userToken: this.Auth.getToken(),
        userID: "",
        userName: ""
    };
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <AddInfo />
        <div>
          <p>Home page</p>
{/*           <script src="/socket.io/socket.io.js"></script>
 */}          <script type="text/javascript" src="geolocator.min.js"></script>
        </div>
        </div>
    );
  }

  /* async componentDidMount() {
    await this.setState({
      userID: this.Auth.getIdViaToken(this.state.userToken),
      userName: this.Auth.getUsernameViaToken(this.state.userToken)
    });
    
    const socket = io({
      query: {
        token: this.state.userToken,
        userID: this.state.userID,
        userName: this.state.userName
      }
    });

    socket.on('plop', (data) => {
      console.log(data);
    });
    socket.on('hello', (data) => {
      console.log(data);
    });

    socket.on('online', (data) => {
      console.log(data);
    });
  
  }; */
}

export default WithAuth(App);
