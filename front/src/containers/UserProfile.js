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
import UserBio from "../components/profile/UserBio";
import ErrorToast from "../services/ErrorToastService";
import defaultProfileNoGender from "../assets/default-profile-no-gender.png";
import defaultProfileMan from "../assets/default-profile-man.jpg";
import defaultProfileWoman from "../assets/default-profile-woman.jpg";
import ProfileBackgroundMan from "../assets/man-profile-background.png";
import ProfileBackgroundWoman from "../assets/woman-profile-background.png";
import ProfileBackgroundManWoman from "../assets/man-woman-profile-background.png";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.state = {
      user: [],
      profile_picture: [],
      pictures: [],
      tags: []
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
                      src={
                        this.state.user.sexual_orientation === "bi"
                          ? ProfileBackgroundManWoman
                          : (this.state.user.sexual_orientation === "hetero" &&
                              this.state.user.gender === "man") ||
                            (this.state.user.sexual_orientation === "homo" &&
                              this.state.user.gender === "woman")
                          ? ProfileBackgroundWoman
                          : ProfileBackgroundMan
                      }
                      alt=""
                    />
                  </div>
                  <div className="card-content">
                    <div className="row">
                      <div className="col s4 profile-pic">
                        <img
                          className="circle responsive-img profile-picture-round"
                          src={
                            this.state.profile_picture.length !== 0
                              ? this.state.profile_picture[0].url
                              : this.state.user.gender === null
                              ? defaultProfileNoGender
                              : this.state.user.gender === "man"
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
                      {this.state.user.username}
                    </span>
                    {this.state.user.id === this.props.userConnectedData.id && (
                      <ModalUserEditProfileInfo />
                    )}
                    {this.state.user.id === this.props.userConnectedData.id && (
                      <ModalUserEditProfilePictures />
                    )}
                    {this.state.user.id === this.props.userConnectedData.id && (
                      <ModalUserEditAccountSettings />
                    )}
                  </div>
                </div>
                {this.state.user.bio !== null && (
                  <UserBio bio={this.state.user.bio} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidUpdate() {
    let url = document.location.href;
    let username = url.split("/");
    username = username[username.length - 1];

    if (this.props.userConnectedData.username !== username) {
      if (
        username !== this.state.user.username &&
        this.state.user.username !== undefined
      ) {
        ApiCall.user
          .getUserFromUsername(username)
          .then(res => {
            if (res.pictures.length !== 0) {
              var profile_picture = res.pictures.filter(pic => {
                return pic.profile_picture === 1;
              });
            }

            this.setState({
              user: res.data,
              profile_picture: res.pictures.length === 0 ? [] : profile_picture,
              pictures: res.pictures,
              tags: res.tags
            });
          })
          .catch(err => {
            ErrorToast.user.userNotFound();
            this.props.history.replace("/");
            console.log(err);
          });
      }
    } else if (
      this.state.user !== this.props.userConnectedData ||
      this.state.pictures !== this.props.userConnectedData.pictures ||
      this.state.tags !== this.props.userConnectedData.tags
    ) {
      if (this.props.userConnectedData.pictures.length !== 0) {
        var profile_pic = this.props.userConnectedData.pictures.filter(pic => {
          return pic.profile_picture === 1;
        });
      }

      this.setState({
        user: this.props.userConnectedData,
        profile_picture:
          this.props.userConnectedData.pictures.length === 0 ? [] : profile_pic,
        pictures: this.props.userConnectedData.pictures,
        tags: this.props.userConnectedData.tags
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

    if (this.props.userConnectedData.username !== username) {
      ApiCall.user
        .getUserFromUsername(username)
        .then(res => {
          if (res.pictures.length !== 0) {
            var profile_picture = res.pictures.filter(pic => {
              return pic.profile_picture === 1;
            });
          }

          this.setState({
            user: res.data,
            profile_picture: res.pictures.length === 0 ? [] : profile_picture,
            pictures: res.pictures,
            tags: res.tags
          });
        })
        .catch(err => {
          ErrorToast.user.userNotFound();
          this.props.history.replace("/");
          console.log(err);
        });
    } else {
      if (this.props.userConnectedData.pictures.length !== 0) {
        var profile_pic = this.props.userConnectedData.pictures.filter(pic => {
          return pic.profile_picture === 1;
        });
      }

      this.setState({
        user: this.props.userConnectedData,
        profile_picture:
          this.props.userConnectedData.pictures.length === 0 ? [] : profile_pic,
        pictures: this.props.userConnectedData.pictures,
        tags: this.props.userConnectedData.tags
      });
    }
  }
}

const mapStateToProps = state => {
  return {
    userConnectedData: state.user.data,
    userConnectedStatus: state.user.status
  };
};

export default connect(mapStateToProps)(UserProfile);
