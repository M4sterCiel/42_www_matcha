import React, { Component } from "react";
import "../styles/App.css";
import "materialize-css/dist/css/materialize.min.css";
import io from 'socket.io-client';
import AuthService from "../services/AuthService";
import Axios from "axios";

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
                <li className="collection-header"><h5 style={{textAlign: 'center'}}>Chats</h5></li>
                <this.contactList value={this.state.matches} />
            </ul>
        )
    }

    async componentDidMount() {
        await Axios.get('/chat/matches/' + this.Auth.getToken())
            .then(res => {
                //console.log(res.data['result']);
                //console.log(res.data['status']);
                const tab = [];
                for (var i=0;i<res.data['result'].length;i++)
                    tab.push({
                        id: i,
                        userID: res.data['result'][i]['user_1'] === this.state.userID ? res.data['result'][i]['user_2'] : res.data['result'][i]['user_1'],
                        username: res.data['result'][i]['user_1'] === this.state.userID ? res.data['result'][i]['username_2'] : res.data['result'][i]['username_1'],
                        room_id: res.data['result'][i]['room_id'],
                        status: ''
                    })
                i = 0;
                
                while (i < res.data['status'].length) {
                    var k = 0;
                    while (k < tab.length) {
                        if (tab[k]['userID'] === res.data['status'][i]['id'])
                            tab[k]['status'] = res.data['status'][i]['online'] === 1 ? 'Online' : 'Offline';
                        k++;
                    }
                    i++;
                }
                this.setState({ matches: tab });
                //console.log(this.state.matches);
            })
            .catch(err => {
                console.log(err);
            });
 
            await this.setState({ socket: io({
                transports: ['polling'], 
                upgrade: false,
                query: {
                    userID: this.state.userID,
                    matches: this.state.matches
                  }
                })
            });

            this.state.socket.on('online', (data) => {
                var tab = this.state.matches;
                //console.log(tab);
                for (var i=0;i<tab.length;i++) {
                    if (tab[i]['userID'] == data['user_id'])
                        tab[i]['status'] = 'Online';
                }
                this.setState({ matches: tab });
                //console.log(this.state.matches);
            });
            this.state.socket.on('offline', (data) => {
                var tab = this.state.matches;
                for (var i=0;i<tab.length;i++) {
                    if (tab[i]['userID'] == data['user_id'])
                        tab[i]['status'] = 'Offline';
                }
                this.setState({ matches: tab });
                //console.log(this.state.matches);
            });
}

    contactList = (props) => {
         const value = props.value;
         const contacts = value.map((e) =>
            <li className="collection-item avatar clickable" key={e.id} onClick={() => this.displayChatbox(e.room_id, e.username, e.userID)}>
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

       componentWillUnmount() {
        if (this.state.socket)
          this.state.socket.close();
      }
  

       displayChatbox = (roomId, username, userID) => {
           //console.log(roomId);
           this.props.roomToParent(roomId, username, userID);
       }
}

export default ChatConv;