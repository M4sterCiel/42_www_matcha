import React, { Component } from "react";
import { connect } from "react-redux";
import AuthService from "../services/AuthService";
import NavBar from "../components/NavBar";
import {
  ProfileSettingsButton,
  ProfileActionsButton
} from "../components/Buttons";
import ModalUserEditProfileInfo from "../components/modals/ModalUserEditProfileInfo";
import ModalUserEditProfilePictures from "../components/modals/ModalUserEditProfilePictures";
import ModalUserEditAccountSettings from "../components/modals/ModalUserEditAccountSettings";
import ApiCall from "../services/ApiCall";
import ErrorToast from "../services/ErrorToastService";
import defaultProfileNoGender from "../assets/default-profile-no-gender.png";
import defaultProfileMan from "../assets/default-profile-man.jpg";
import defaultProfileWoman from "../assets/default-profile-woman.jpg";

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
    if (!this.state.user.id) return null;
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
                          src={
                            this.props.userConnectedData.gender === null
                              ? defaultProfileNoGender
                              : this.props.userConnectedData.gender === "man"
                              ? defaultProfileMan
                              : defaultProfileWoman
                          }
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
                      </div>
                    </div>
                    <span className="card-title black-text">
                      {this.state.user.firstname} {this.state.user.lastname}
                    </span>
                    {this.state.user.id === this.props.userConnectedData.id && (
                      <ModalUserEditProfileInfo />
                    )}
                    {this.state.user.id === this.props.userConnectedData.id && (
                      <ModalUserEditProfilePictures />
                    )}
                    {this.state.user.id === this.props.userConnectedData.id && (
                      <ModalUserEditAccountSettings
                        user={this.props.userConnectedData}
                      />
                    )}
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

  componentDidUpdate() {
    let url = document.location.href;
    let username = url.split("/");
    username = username[username.length - 1];

    if (
      username !== this.state.user.username &&
      this.state.user.username !== undefined
    ) {
      ApiCall.user
        .getUserFromUsername(username)
        .then(res =>
          this.setState({
            user: res
          })
        )
        .catch(err => {
          ErrorToast.user.userNotFound();
          this.props.history.replace("/");
          console.log(err);
        });
    }
  }

  componentDidMount() {
    if (!this.Auth.loggedIn()) {
      ErrorToast.auth.pageRequiresLogin();
      this.props.history.replace("/users/login");
    }
    let url = document.location.href;
    let username = url.split("/");
    username = username[username.length - 1];
    ApiCall.user
      .getUserFromUsername(username)
      .then(res =>
        this.setState({
          user: res
        })
      )
      .catch(err => {
        ErrorToast.user.userNotFound();
        this.props.history.replace("/");
        console.log(err);
      });
  }
}

const mapStateToProps = state => {
  return {
    userConnectedData: state.user.data,
    userConnectedStatus: state.user.status
  };
};

export default connect(mapStateToProps)(UserProfile);
