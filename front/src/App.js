import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
//import Footer from './components/Footer';
import "materialize-css/dist/css/materialize.min.css";
import WithAuth from "./components/withAuth";
//import io from 'socket.io-client';
import AddInfo from "./AddInfo";
class App extends Component {

  render() {
    return (
      <div className="App">
        <NavBar />
        <AddInfo />
        <div>
          <p>Home page</p>
          <script src="/socket.io/socket.io.js"></script>
          <script type="text/javascript" src="geolocator.min.js"></script>
        </div>
        </div>
    );
  }
}

export default WithAuth(App);
