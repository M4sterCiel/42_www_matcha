import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
//import Footer from './components/Footer';
import "materialize-css/dist/css/materialize.min.css";

class App extends Component {
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
