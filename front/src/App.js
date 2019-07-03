import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
//import Footer from './components/Footer';
import "materialize-css/dist/css/materialize.min.css";
import WithAuth from "./components/withAuth";
//import io from 'socket.io-client';
import AddInfo from "./AddInfo";
import DelUser from "./components/DeleteUser";


class App extends Component {

  /* state = { message: '' };
*/

  /* componentDidMount() {
    var socket = io();
    console.log(socket);
    socket.on('plop', (data) => {
      console.log(data);
    });
    socket.on('hello', (data) => {
      console.log(data);
    });
  } */

/*
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
        <AddInfo />
        <div>
          <p>Home page</p>
          <DelUser />
          <script src="/socket.io/socket.io.js"></script>
          <script type="text/javascript" src="geolocator.min.js"></script>
        </div>
        </div>
    );
  }
}

export default WithAuth(App);
