import React, { Component } from "react";
import "../styles/App.css";
import "materialize-css/dist/css/materialize.min.css";
import io from 'socket.io-client';
import AuthService from "../services/AuthService";
import Axios from "axios";


class Chat extends Component {

    constructor(props) {
        super(props);
        this.Auth = new AuthService();
        this.state = {
            winSize: '',
            msg: '',
            toSend: '',
            listMessages: [],
            listItems: '',
            socket: '',
            userID: '',
            userName: '',
            userToken: this.Auth.getToken(),
            fakeID: 1234589,
            usernameOther: 'fake username'
        }
    }

    render() {
        return (
            <div>
            <div className="row main-chat-box">
            <h5 id="chat-title">{this.state.usernameOther+"'s conversation"}</h5><hr className="grey" />
            <div id="chatbox-message" className="col s12 m9 l9 chatbox-message" style={{height: this.state.winSize}}>
                <div>
                    <this.msgList 
                    value={this.state.listMessages} 
                    />
                </div>
            </div>
            </div>
            <form className="fixed-bottom-imput" onSubmit={ this.handleSubmit }>
                <div className="col s9">
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
                <div id="btn-chat-box" className="col s3 btn-chat-box">
                    <button
                    type="submit"
                    name="submit"
                    value="Send"
                    className="btn"
                    style={{width: 35 + '%'}}
                    >
                        <i className="material-icons">send</i>
                    </button>
                </div>
            </form>
        </div>
        );
    }

    async componentDidMount() {
        this.setState({ winSize: window.innerHeight - 190});

        await Axios.get('/chat/room/' + this.state.fakeID)
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
                this.goToElement(this.state.listMessages.length - 1);
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
            //console.log(data);
            var tab = this.state.listMessages;
            tab.push({
                id: this.state.listMessages.length + 1,
                value: data['data'],
                userID: data['user_id'],
                date: ''
            });
            this.setState({ listMessages: tab });
            //console.log(tab);
            this.goToElement(tab.length);
        });
    };

    goToElement = (nb) => {
        //console.log(nb);
        document.getElementById("id-msg"+nb).scrollIntoView({block: "start"});
    }

    msgList = (props) => {
       // console.log(this.state.userID);
        const value = props.value;
        const listItems = value.map((e) =>
          <div className={this.state.userID === e.userID ? "row right-align" : "row left-align"} key={e.id}>
				<div className={this.state.userID === e.userID ? "col s12 m8 l6 right" : "col s12 m8 l6 left"}>
						<div className="row valign-wrapper">
                        
                        
                            
							<div className={this.state.userID === e.userID ? "chat-field2 grey" : "chat-field red"}>
								<span id={"id-msg"+e.id} className="chat-message white-text">
									{e.value}
								</span>
								<div id={"id-msg"+e.id} className={this.state.userID === e.userID ? "example2" : "example"}></div>  
							</div>

                            
						</div>
				</div>
			</div>
        );
        return (
            <div className="col s12 m12 l9">{listItems}</div>
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
        await this.setState({ listMessages: tab });
        this.goToElement(tab.length);
        this.state.socket.emit(this.state.fakeID, this.state.toSend);
        this.setState({ toSend: '' });
    }

    componentWillUnmount() {
        if (this.state.socket !== '')
          this.state.socket.close();
      }
  
    /* Trouver un moyen de passer l'id de la room correspondante soit par les props ou redux ou peu importe mais il le faut */
}

export default Chat;