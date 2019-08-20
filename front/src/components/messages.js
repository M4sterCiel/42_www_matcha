import React, { Component } from "react";
import "../styles/App.css";
import "materialize-css/dist/css/materialize.min.css";
import AuthService from "../services/AuthService";
import Axios from "axios";
import withAuth from "./withAuth";
import ChatConv from "./ChatConv";
import ChatRoom from "./ChatRoom";
import NavBar from "./NavBar";

const CancelToken = Axios.CancelToken;
let cancel;

class Messages extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.state = {
      room: null,
      username: "",
      userID: "",
      listMessages: []
    };
    this.handleRoomData = this.handleRoomData.bind(this);
  }

  async handleRoomData(room_id, username, userID) {
    await this.setState({
      room: room_id,
      username: username,
      userID: userID
    });
    this.updateChat();
  }

  async componentDidMount() {
    if (this.state.room === null) return;
    await Axios.get("/chat/room/" + this.state.room, {
      cancelToken: new CancelToken(function executor(c) {
        cancel = c;
      })
    })
      .then(res => {
        const tab = [];
        for (var i = 0; i < res.data.result.length; i++)
          tab.push({
            id: i,
            value: res.data.result[i]["content"],
            userID: res.data.result[i]["user_id"],
            date: res.data.result[i]["date"]
          });
        this.setState({ listMessages: tab });
      })
      .catch(err => {
        console.log(err);
      });
    console.log(this.props.socket);
  }

  updateChat = async () => {
    await Axios.get("/chat/room/" + this.state.room, {
      cancelToken: new CancelToken(function executor(c) {
        cancel = c;
      })
    })
      .then(res => {
        const tab = [];
        for (var i = 0; i < res.data.result.length; i++)
          tab.push({
            id: i,
            value: res.data.result[i]["content"],
            userID: res.data.result[i]["user_id"],
            date: res.data.result[i]["date"]
          });
        this.setState({ listMessages: tab });
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export default withAuth(Messages);
