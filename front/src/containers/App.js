import React, { Component } from "react";
import "../styles/App.css";
import NavBar from "../components/NavBar";
//import Footer from './components/Footer';
import "materialize-css/dist/css/materialize.min.css";
import WithAuth from "../components/withAuth";
import { BackgroundRemove } from "../components/Background";

class App extends Component {
  componentDidMount() {
    BackgroundRemove();
  }

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

export default WithAuth(App);
