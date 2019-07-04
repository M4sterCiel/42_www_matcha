import React, { Component } from "react";
import { connect } from "react-redux";
import AuthService from "../services/AuthService";
import Materialize from "materialize-css";
import NavBar from "../components/NavBar";
import {
  ProfileSettingsButton,
  ProfileActionsButton
} from "../components/Buttons";
import {
  SelectGender,
  SelectSexOrientation,
  InputName,
  InputTwoFields
} from "../components/EditProfileInfo";
import { ModalUserCompleteProfile } from "../components/Modals";
import axios from "axios";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.handleData = this.handleData.bind(this);
    this.handleGenderData = this.handleGenderData.bind(this);
    this.handleSexOrientationData = this.handleSexOrientationData.bind(this);
    this.state = {
      user: []
    };
  }

  render() {
    if (!this.state.user.firstname) return null;
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
                        {this.state.user.id ===
                        this.props.userConnectedData.id ? (
                          <ProfileSettingsButton />
                        ) : (
                          <ProfileActionsButton />
                        )}

                        <InputName
                          nameToParent={this.handleData}
                          defaultname={this.state.user.firstname}
                        />
                        <InputTwoFields
                          defaultdata={{
                            firstname: this.state.user.firstname,
                            lastname: this.state.user.lastname
                          }}
                        />
                      </div>
                    </div>
                    <span className="card-title black-text">
                      {this.state.user.firstname} {this.state.user.lastname}
                    </span>
                    <SelectGender
                      genderToParent={this.handleGenderData}
                      gender={this.state.gender}
                    />
                    <SelectSexOrientation
                      sexOrientationToParent={this.handleSexOrientationData}
                      sexOrientation={this.state.sexOrientation}
                    />
                    <ModalUserCompleteProfile userData={this.state} />
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
      user: {
        ...this.state.user,
        firstname: data
      }
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
    let url = document.location.href;
    let username = url.split("/");
    username = username[username.length - 1];
    axios
      .get(`/users/profile/${username}`)
      .then(res =>
        this.setState({
          user: res.data.data
        })
      )
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

const mapStateToProps = state => {
  return {
    userConnectedData: state.user.data,
    userConnectedError: state.user.status
  };
};

export default connect(mapStateToProps)(UserProfile);
