import "materialize-css/dist/css/materialize.min.css";
import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import AuthService from "./services/AuthService";
import Materialize from "materialize-css";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <div className="row">
          <div className="col l12 m12 s12">
            <div className="row">
              <div className="col s12">
                <div className="card">
                  <div className="card-image">
                    <img
                      src="http://www.img.lirent.net/2014/10/Android-Lollipop-wallpapers-Download.jpg"
                      alt=""
                    />
                  </div>
                  <div className="card-content">
                    <div className="row">
                      <div className="col s4 profile-pic">
                        <img
                          className="circle responsive-img"
                          src="https://lh3.googleusercontent.com/-W2XryVdi-lA/U6tSAh3SsbI/AAAAAAAAFGY/ZHJiUEcR_Zs/w480-h480/avatar%2Bmaterial%2Bdesign.png"
                          alt=""
                        />
                      </div>
                      <div className="col right controls ">
                        <i className="material-icons" onClick={this.showMenu}>
                          more_vert
                        </i>
                      </div>
                      <div className="row-menu">
                        <div className="menu">
                          <div className="row">
                            <ul className="menu-list">
                              <li>Make a call</li>
                              <li>Text a message</li>
                              <li>Block </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className="card-title black-text">
                      Bruce Banner Wayne
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Redirect user if already logged in
  componentDidMount() {
    if (!this.Auth.loggedIn()) {
      let message = "you must log in to access this page";
      Materialize.toast({
        html: message,
        displayLength: 1200,
        classes: "rounded error-toast"
      });
      this.props.history.replace("/users/login");
    }
  }

  showMenu() {
    if (document.getElementsByClassName("menu")[0].style.display !== "none") {
      document.getElementsByClassName("menu")[0].style.display = "none";
    } else {
      document.getElementsByClassName("menu")[0].style.display = "block";
      document.getElementsByClassName("menu")[0].className +=
        " animated bounceIn";
    }
  }
}

export default UserProfile;
