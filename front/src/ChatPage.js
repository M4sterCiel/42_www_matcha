import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
//import Footer from './components/Footer';
import "materialize-css/dist/css/materialize.min.css";
import io from 'socket.io-client';
import AuthService from "./services/AuthService";
import Axios from "axios";
import withAuth from "./components/withAuth";


class Chat extends Component {

    constructor(props) {
        super(props);
        this.Auth = new AuthService();
        this.state = {
            msg: '',
            toSend: '',
            listMessages: [],
            listItems: '',
            socket: '',
            userID: '',
            userName: '',
            userToken: this.Auth.getToken(),
            fakeID: 12345
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
                        <this.msgList msg={this.state.listMessages} />
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

    async componentDidMount() {
        Axios.get('/chat/room/' + this.state.fakeID)
            .then(res => {
                const tab = [];
                for (var i=0; i<res.data.result.length; i++)
                    tab.push(res.data.result[i]['content']);
                this.setState({ listMessages: tab });
                //console.log(this.state.listMessages);
            })
            .catch(err => {
                console.log(err);
            })
        await this.setState({
            userID: this.Auth.getIdViaToken(this.state.userToken),
            userName: this.Auth.getUsernameViaToken(this.state.userToken)
          });

        await this.setState({ socket: io('/chat', {
            query: {
                token: this.state.userToken,
                userID: this.state.userID,
                userName: this.state.userName,
                room_id: this.state.fakeID
              }
        }) });
        this.state.socket.on(this.state.fakeID, (data) => {
            /* this.setState({ msg: data }); */
            var tab = this.state.listMessages;
            tab.push(data);
            this.setState({ listMessages: tab });
        });
    };

    msgList(props) {
        console.log(props.msg);
        const msg = props.msg;
        const listItems = msg.map((number) =>
          <li>{number}</li>
        );
        return (
          <ul>{listItems}</ul>
        );
      }

    handleChange = e => {
        this.setState({ toSend: e.target.value });
    };

    handleSubmit = async e => {
        e.preventDefault();
        var tab = this.state.listMessages;
        tab.push(this.state.toSend);
        this.setState({ listMessages: tab });
        this.state.socket.emit(this.state.fakeID, this.state.toSend);
        this.setState({ toSend: '' });
    }
    /* Trouver un moyen de passer l'id de la room correspondante soit par les props ou redux ou peu importe mais il faut */
}

export default withAuth(Chat);