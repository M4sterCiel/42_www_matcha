import React, { Component } from "react";
import "../styles/App.css";
import "materialize-css/dist/css/materialize.min.css";
//import io from 'socket.io-client';
import AuthService from "../services/AuthService";
import Axios from "axios";
import withAuth from "./withAuth";
import ChatConv from './ChatConv';
import ChatRoom from './ChatRoom';
import NavBar from './NavBar';


class Testclass extends Component {
    constructor(props) {
        super(props);
        this.Auth = new AuthService();
        this.state = {
            room: null
        }
        this.handleRoomData = this.handleRoomData.bind(this);
    }

    handleRoomData(data) {
        console.log(data);
        this.setState({
            room: data
        })
    }

    render() {
        return (
            <div className="App">
                <NavBar />
                    <div className="row left align">
                        <div className="col s3">
                            <ChatConv roomToParent={this.handleRoomData} />
                        </div>
                        <div className="col s9">
                            <ChatRoom data={this.state.room}/>
                        </div>
                    </div>
            </div>
        )
    }

}

export default withAuth(Testclass);

