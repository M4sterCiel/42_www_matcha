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
            winSize: '',
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
        this.setState({ winSize: window.innerHeight - 160});
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
            requestTimeout: 5000,
            upgrade: false,
            query: {
                userID: this.state.userID,
                matches: this.state.matches
                }
            })
        });

        this.state.socket.on('online', (data) => {
            var tab = this.state.matches;
            for (var i=0;i<tab.length;i++) {
                //eslint-disable-next-line
                if (tab[i]['userID'] == data['user_id'])
                    tab[i]['status'] = 'Online';
            }
            this.setState({ matches: tab });
        });
        
        this.state.socket.on('offline', (data) => {
            var tab = this.state.matches;
            for (var i=0;i<tab.length;i++) {
                // eslint-disable-next-line
                if (tab[i]['userID'] == data['user_id'])
                    tab[i]['status'] = 'Offline';
            }
            this.setState({ matches: tab });
        });

        this.state.socket.on('new message', data => {
            // eslint-disable-next-line
            if (data['userID_other'] != this.state.userID)
                return;
            var elem;
            for (var i=0;i<this.state.matches.length;i++) {
                // eslint-disable-next-line
                if (this.state.matches[i]['room_id'] == data['room_id'])
                {
                    elem = document.getElementById('contactList-'+this.state.matches[i]['room_id']);
                    break;
                }
            }
            this.sortContactList(data['room_id']);
            elem.style = 'background-color: #ffcdd2;';
        });

        this.callNotifApi();

        this.state.socket.on('readMessage', (data, roomID) => {
            // eslint-disable-next-line
        if (data != this.state.userID)
            return;
        document.getElementById('contactList-'+roomID).removeAttribute('style');
        })
}

    contactList = (props) => {
         const value = props.value;
         const contacts = value.map((e) =>
            <li className="collection-item avatar clickable" key={e.id} id={'contactList-'+e.room_id} onClick={() => this.displayChatbox(e.room_id, e.username, e.userID)}>
                <i className="material-icons circle pink">person_pin</i>
                <span className="title truncate">{e.username}</span>
                <p>{e.status}</p>
                <a href="#!" className="secondary-content"><span  id={e.status === 'Online' ? 'green-circle' : 'grey-circle'} aria-label="Active Now"></span></a>
            </li>
         );
         return (
           <ul style={{height: this.state.winSize, overflow: 'auto'}}>{contacts}</ul>
         );
       }

    componentWillUnmount() {
    if (this.state.socket !== '')
        this.state.socket.close();
      }
  
    sortContactList = (roomID) => {
    var copy;
    var index;
    for (var i=0;i<this.state.matches.length;i++) {
        // eslint-disable-next-line
        if (this.state.matches[i]['room_id'] == roomID) {
            copy = this.state.matches[i];
            index = i;
        }
    }
    var tab = this.state.matches;
    tab.splice(index, 1);
    tab.splice(0, 0, copy);
    this.setState({ matches: tab });
    }

    displayChatbox = (roomId, username, userID) => {
        this.props.roomToParent(roomId, username, userID);
        document.getElementById('contactList-'+roomId).removeAttribute('style');
    }

    callNotifApi = async () => {
        await Axios.get('/chat/notification/list/' + this.state.userID)
          .then(res => {
            var tab = res.data['notification'];
            for (var i=0;i<tab.length;i++) {
                document.getElementById('contactList-'+tab[i]['reference']).style = 'background-color: #ffcdd2;';
            }
          })
          .catch(err => {
            console.log(err);
          })
      }
}

export default ChatConv;

