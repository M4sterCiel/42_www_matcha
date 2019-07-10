import React, { Component } from "react";
import "./styles/App.css";
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
            fakeID: 1234589
        }
    }

    render() {
        return (
            <div className="App">
                <NavBar />
                <div>
                    <h1>Chat Session</h1>
                    <br></br>
                    <div id="messageView">
                        <this.msgList 
                        value={this.state.listMessages} 
                        />
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
                    tab.push({
                        id: i,
                        value: res.data.result[i]['content'],
                        userID: res.data.result[i]['user_id'],
                        date: res.data.result[i]['date']
                    });
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
            console.log(data);
            var tab = this.state.listMessages;
            tab.push({
                id: this.state.listMessages.length + 1,
                value: data['data'],
                userID: data['user_id'],
                date: ''
            });
            this.setState({ listMessages: tab });
            console.log(tab);
        });
    };

    msgList = (props) => {
       // console.log(this.state.userID);
        const value = props.value;
        const listItems = value.map((e) =>
          <li className={this.state.userID === e.userID ? "messagesRight" : "messagesLeft"} user_id={e.userID} key={e.id}>{e.value}</li>
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
        tab.push({
            id: this.state.listMessages.length + 1,
            value: this.state.toSend,
            userID: this.state.userID,
            date: ''
        });
        this.setState({ listMessages: tab });
        this.state.socket.emit(this.state.fakeID, this.state.toSend);
        this.setState({ toSend: '' });
    }
    /* Trouver un moyen de passer l'id de la room correspondante soit par les props ou redux ou peu importe mais il le faut */
}

export default withAuth(Chat);