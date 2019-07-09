import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
//import Footer from './components/Footer';
import "materialize-css/dist/css/materialize.min.css";
import WithAuth from "./components/withAuth";
import io from 'socket.io-client';
import AuthService from "./services/AuthService";
import Axios from "axios";


class Chat extends Component {

    constructor(props) {
        super(props);
        this.Auth = new AuthService();
        this.state = {
            msg: '',
            toSend: '',
            socket: '',
            userID: '',
            userName: '',
            userToken: this.Auth.getToken()
        }
    }

    render() {
        return (
            <div className="App">
                <NavBar />
                <div>
                    <h1>Chat Session</h1>
                    <br></br>
                    <div id="message">
                        <span>{this.state.msg}</span>
                    </div>
                </div>
                <form onSubmit={ this.handleSubmit }>
                    <div>
                        <label htmlFor="msgToSend">Write your message</label>
                        <input
                        type="text"
                        id="msgToSend"
                        name="msgToSend"
                        value={this.state.toSend}
                        onChange={this.handleChange}
                        required
                        ></input>
                    </div>
                    <div>
                        <input
                        type="submit"
                        name="submit"
                        value="Send"
                        className="btn"
                        >
                        </input>
                    </div>
                </form>
            </div>
        );
    }

    /* componentDidUpdate() {
        if (!this.state.msg === undefined)
        {
            console.log(this.state.msg);
        }
    } */

    async componentDidMount() {
        await this.setState({
            userID: this.Auth.getIdViaToken(this.state.userToken),
            userName: this.Auth.getUsernameViaToken(this.state.userToken)
          });

        await this.setState({ socket: io({
            query: {
                token: this.state.userToken,
                userID: this.state.userID,
                userName: this.state.userName
              }
        }) });
        this.state.socket.on('myroom', (data) => {
            this.setState({ msg: data });
        });
    };

    handleChange = e => {
        this.setState({ toSend: e.target.value });
    };

    handleSubmit = async e => {
        e.preventDefault();
        this.state.socket.emit('myroom', this.state.toSend);
    }
    
}

export default Chat;