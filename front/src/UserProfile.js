import "materialize-css/dist/css/materialize.min.css";
import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import AuthService from "./services/AuthService";
import Materialize from "materialize-css";
import { ProfileSettingsButton } from "./components/Buttons";
import { SelectGender } from "./components/EditProfileInfo";
import { SelectSexOrientation } from "./components/EditProfileInfo";
import { InputName } from "./components/EditProfileInfo";
import { InputTwoFields } from "./components/EditProfileInfo";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.handleData = this.handleData.bind(this);
    this.handleGenderData = this.handleGenderData.bind(this);
    this.handleSexOrientationData = this.handleSexOrientationData.bind(this);
    this.state = {
      firstname: ""
    };
  }

  render() {
    if (!this.state.firstname) {
      return null;
    }
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
                      className="profile-background-image"
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
                        <ProfileSettingsButton />
                        <InputName
                          nameToParent={this.handleData}
                          defaultname={this.state.firstname}
                        />
                        <InputTwoFields
                          defaultdata={{
                            firstname: this.state.firstname,
                            lastname: this.state.lastname
                          }}
                        />
                        {/*                         <i className="material-icons">more_vert</i> */}
                      </div>
                    </div>
                    <span className="card-title black-text">
                      {this.state.firstname} {this.state.lastname}
                    </span>
                    <SelectGender
                      genderToParent={this.handleGenderData}
                      gender={this.state.gender}
                    />
                    <SelectSexOrientation
                      sexOrientationToParent={this.handleSexOrientationData}
                      sexOrientation={this.state.sexOrientation}
                    />
                    <p>{this.state.gender}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleData(data) {
    this.setState({
      firstname: data
    });
  }

  handleGenderData(data) {
    this.setState({
      gender: data
    });
  }

  handleSexOrientationData(data) {
    this.setState({
      sexOrientation: data
    });
  }

  // Redirect user if not logged in or if profile doesn't exist
  componentDidMount() {
    if (!this.Auth.loggedIn()) {
      let message = "you must log in to access this page";
      Materialize.toast({
        html: message,
        displayLength: 1200,
        classes: "rounded error-toast"
      });
      this.props.history.replace("/users/login");
    } else {
      this.callApi()
        .then(res => {
          this.setState({
            firstname: res.data.firstname,
            lastname: res.data.lastname
          });
        })
        .catch(err => {
          let message = "couldn't find this user";
          Materialize.toast({
            html: message,
            displayLength: 1200,
            classes: "rounded error-toast"
          });
          this.props.history.replace("/");
          console.log(err);
        });
    }
  }

  callApi = async () => {
    var username = document.location.href;
    username = username.split("/");
    const response = await fetch(
      "/users/profile/" + username[username.length - 1]
    );
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    return body;
  };
}

export default UserProfile;
