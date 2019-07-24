import React, { Component } from "react";
import { connect } from "react-redux";
import AuthService from "../services/AuthService";
import NavBar from "../components/NavBar";
import {
  ProfileSettingsButton,
  ProfileActionsButton
} from "../components/Buttons";
import { ModalUserEditProfileInfo } from "../components/Modals";
import ApiCall from "../services/ApiCall";
import ErrorToast from "../services/ErrorToastService";
import withAuth from "../components/withAuth";

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
    //console.log(this.props);
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
                      src=""
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
                      </div>
                    </div>
                    <span className="card-title black-text">
                      {this.state.user.firstname} {this.state.user.lastname}
                    </span>
                    <ModalUserEditProfileInfo userData={this.state.user} />
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
    //console.log(this.Auth.loggedIn());
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
  //console.log(state);
  return {
    userConnectedData: state.user.data,
    userConnectedStatus: state.user.status
  };
};

export default withAuth(connect(mapStateToProps)(UserProfile));
