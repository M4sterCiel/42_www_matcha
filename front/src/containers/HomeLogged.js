import React, { Component } from "react";
import { connect } from "react-redux";
import AuthService from "../services/AuthService";
import UserCard from "../components/cards/UserCard";
import CompleteProfile from "../components/home/CompleteProfile";
import SuggestionsHeader from "../components/home/SuggestionsHeader";
import ModalUserEditProfileInfo from "../components/modals/ModalUserEditProfileInfo";
import ModalUserEditProfilePictures from "../components/modals/ModalUserEditProfilePictures";
import ModalMatchAnim from "../components/modals/ModalMatchAnim";
import Axios from "axios";
import io from "socket.io-client";
import ModalUserListFilter from "../components/modals/ModalUserListFilter";
import SortUserList from "../components/settings/SortUserList";
import { FilterUsersButton } from "../components/Buttons";

const CancelToken = Axios.CancelToken;
// eslint-disable-next-line
let cancel;

class HomeLogged extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: "",
      socket: "",
      userTab: [],
      tags: [],
      filterData: [],
      page: 12
    };
    this.Auth = new AuthService();
    this._isMounted = false;
    this.infiniteScroll = this.infiniteScroll.bind(this);
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
              <SuggestionsHeader
                username={this.props.userConnectedData.username}
              />
              <div className="user-list-settings col s12">
                <FilterUsersButton />
                <SortUserList />
              </div>
              <this.userList
                value={this.state.userTab.slice(0, this.state.page)}
              />
              <ModalUserListFilter filterDataToParent={this.handleFilterData} />
              <ModalMatchAnim />
            </div>
          )}
        </div>
      </div>
    );
  }

  handleFilterData = data => {
    this._isMounted &&
      this.setState({
        filterData: data
      });
  };

  async componentDidMount() {
    this._isMounted = true;
    (await this._isMounted) &&
      this.setState({
        userID: this.Auth.getConfirm()["id"]
      });
    this._isMounted &&
      this.setState({
        socket: io({
          transports: ["polling"],
          requestTimeout: 50000,
          upgrade: false,
          "sync disconnect on unload": true,
          query: {
            userID: this.state.userID
          }
        })
      });

    await Axios.get("/main/suggestions/" + this.state.userID, {
      cancelToken: new CancelToken(function executor(c) {
        cancel = c;
      })
    })
      .then(res => {
        this._isMounted &&
          this.setState({
            userTab: res.data.list,
            allTags: res.data.allTags,
            tags: res.data.tags
          });
      })
      .catch(error => {
        console.log(error);
      });
    window.addEventListener("scroll", this.infiniteScroll);
  }

  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener("scroll", this.infiniteScroll);
    if (this.state.socket !== "") this.state.socket.close();
  }

  sendNotif = (target_id, type) => {
    if (this.state.socket !== "") {
      this.state.socket.emit("sendNotif", type, this.state.userID, target_id);
    }
  };

  userList = props => {
    const value = props.value;
    const users = value.map((e, index) => (
      <UserCard
        intel={e}
        allTags={this.state.allTags}
        tags={this.state.tags}
        uid={this.state.userID}
        func={this.sendNotif}
        key={index}
      />
    ));
    return <ul>{users}</ul>;
  };

  infiniteScroll = () => {
    if (
      window.pageYOffset >=
      document.documentElement.offsetHeight -
        document.documentElement.clientHeight -
        420
    )
      this._isMounted &&
        this.setState({
          page: this.state.page + 12
        });
  };
}

const mapStateToProps = state => {
  return {
    userConnectedData: state.user.data,
    userConnectedStatus: state.user.status
  };
};

export default connect(mapStateToProps)(HomeLogged);
