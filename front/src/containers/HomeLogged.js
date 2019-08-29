import React, { Component } from "react";
import { connect } from "react-redux";
import UserCard from "../components/cards/UserCard";
import CompleteProfile from "../components/home/CompleteProfile";
import SuggestionsHeader from "../components/home/SuggestionsHeader";
import ModalUserEditProfileInfo from "../components/modals/ModalUserEditProfileInfo";
import ModalUserEditProfilePictures from "../components/modals/ModalUserEditProfilePictures";
import Axios from "axios";
import io from "socket.io-client";


const CancelToken = Axios.CancelToken;
let cancel;

class HomeLogged extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: '',
      userTab: []
    }
    this._isMounted = false;
  }
  render() {
    return (
      <div className="App">
        <div className="row">
          {this.props.userConnectedData.id !== undefined &&
          (this.props.userConnectedData.gender === null ||
            this.props.userConnectedData.sexual_orientation === null ||
            this.props.userConnectedData.bio === null ||
            this.props.userConnectedData.birthdate === null ||
            this.props.userConnectedData.tags.length === 0 ||
            this.props.userConnectedData.pictures.length === 0) ? (
            <div>
              <CompleteProfile
                infoEdit={
                  this.props.userConnectedData.gender === null ||
                  this.props.userConnectedData.sexual_orientation === null ||
                  this.props.userConnectedData.bio === null ||
                  this.props.userConnectedData.birthdate === null ||
                  this.props.userConnectedData.tags.length === 0
                }
                picEdit={this.props.userConnectedData.pictures.length === 0}
              />
              {this.props.userConnectedData.id !== undefined && (
                <div>
                  <ModalUserEditProfileInfo />
                  <ModalUserEditProfilePictures />
                </div>
              )}
            </div>
          ) : (
            <div className="home-suggestions-list" disabled={true}>
              <SuggestionsHeader />
              <UserCard />
              <UserCard />
              <UserCard />
              <UserCard />
              <UserCard />
              <UserCard />
              <UserCard />
              <UserCard />
              <UserCard />
            </div>
          )}
        </div>
      </div>
    );
  }

  async componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.setState({
      socket: io({
        transports: ["polling"],
        requestTimeout: 50000,
        upgrade: false,
        "sync disconnect on unload": true,
        query: {
          userID: this.Auth.getConfirm()["id"]
        }
      })
    });

    await Axios.get("/main/list/" + this.state.userID, {
      cancelToken: new CancelToken(function executor(c) {
        cancel = c;
      })
    })
      .then(res => {
        this._isMounted &&
          this.setState({
            userTab: res.data
          });
      })
      .catch(error => {
        //console.log(error);
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
}

const mapStateToProps = state => {
  return {
    userConnectedData: state.user.data,
    userConnectedStatus: state.user.status
  };
};

export default connect(mapStateToProps)(HomeLogged);
