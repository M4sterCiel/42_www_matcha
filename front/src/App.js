import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
//import Footer from './components/Footer';
import "materialize-css/dist/css/materialize.min.css";
import WithAuth from "./components/withAuth";
import io from "socket.io-client";
import { BackgroundRemove } from "./components/Background";

class App extends Component {
  componentDidMount() {
    BackgroundRemove();
    var socket = io();
    console.log(socket);
    socket.on("plop", data => {
      console.log(data);
    });
    socket.on("hello", data => {
      console.log(data);
    });
  }

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
        <div>
          <p>Home page</p>
          <script src="/socket.io/socket.io.js" />
        </div>
      </div>
    );
  }
}

export default WithAuth(App);
