import React, { Component } from "react";
import "../styles/App.css";
import "materialize-css/dist/css/materialize.min.css";
import io from 'socket.io-client';
import AuthService from "../services/AuthService";
import Axios from "axios";
import withAuth from "./withAuth";

class ChatConv extends Component {
    constructor(props) {
        super(props);
        this.Auth = new AuthService();
        this.state = {
            userID: this.Auth.getConfirm()['id'],
            status: 0,
            socket: '',
            matches: [],
            displayChatbox: this.displayChatbox.bind(this)
        }
    }

    render() {
        return (
            <ul className="collection with-header chatBox">
                <li className="collection-header"><h4>Chats</h4></li>
                <this.contactList value={this.state.matches} />
            </ul>
        )
    }

    async componentDidMount() {
        await Axios.get('/chat/matches/' + this.Auth.getToken())
            .then(res => {
               // console.log(res.data['result']);
                const tab = [];
                for (var i=0;i<res.data['result'].length;i++)
                    tab.push({
                        id: i,
                        userID: res.data['result'][i]['user_1'] === this.state.userID ? res.data['result'][i]['user_2'] : res.data['result'][i]['user_1'],
                        username: res.data['result'][i]['user_1'] === this.state.userID ? res.data['result'][i]['username_2'] : res.data['result'][i]['username_1'],
                        room_id: res.data['result'][i]['room_id'],
                        status: ''
                    })
                this.setState({ matches: tab });
               // console.log(this.state.matches);
            })
            .catch(err => {
                console.log(err);
            });

            await Axios.post('/chat/status', { tab: this.state.matches })
                .then(res => {
                    var tab = this.state.matches;
                })
                .catch(err => {
                    console.log(err);
                })

            await this.setState({ socket: io({
                query: {
                    userID: this.state.userID,
                    matches: this.state.matches
                  }
                })
            });

            this.state.socket.on('online', (data) => {
                var tab = this.state.matches;
                //console.log(data);
                for (var i=0;i<tab.length;i++) {
                    if (tab[i]['userID'] === data['user_id'])
                        tab[i]['status'] = data['status'];
                }
                this.setState({ matches: tab });
                //console.log(tab);
            })
}

    contactList = (props) => {
         const value = props.value;
         const contacts = value.map((e) =>
            <li className="collection-item avatar clickable" key={e.id} onClick={() => this.displayChatbox(e.room_id)}>
                <i className="material-icons circle pink">person_pin</i>
                <span className="title truncate">{e.username}</span>
                <p>{e.status}</p>
                <a href="#!" className="secondary-content"><span  id={e.status === 'Online' ? 'green-circle' : 'grey-circle'} aria-label="Active Now"></span></a>
            </li>
         );
         return (
           <ul>{contacts}</ul>
         );
       }

       displayChatbox = (props) => {
           console.log("click");
           console.log(props);
       }
}

export default withAuth(ChatConv);