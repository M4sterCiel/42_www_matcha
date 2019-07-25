import React, { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css";
import AuthService from "../services/AuthService";
import { withRouter, NavLink } from "react-router-dom";
import logo from "../assets/logo-with-name.png";
import io from "socket.io-client";
import Axios from "axios";
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import { makeStyles } from '@material-ui/core/styles';
const Auth = new AuthService();

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: '',
      socket: '',
      socketChat: '',
      nbMessages: null
    }
    this.Auth = new AuthService();
    this.handleLogout = this.handleLogout.bind(this);
    this.Auth.getConfirm = this.Auth.getConfirm.bind(this);
    this.Auth.loggedIn = this.Auth.loggedIn.bind(this);
  }

   async componentDidMount() {

    if (!localStorage.getItem('Token'))
      return;
    await this.setState({ userID: this.Auth.getConfirm()['id'] });
   /* Axios.get('/chat/notification/' + this.state.userID)
      .then(res => {
        this.setState({ nbMessages: res.data['notification'][0]['COUNT (*)'] });
      })
      .catch(err => {
        console.log(err);
      }) */
    
    await this.callNotifApi();

    await this.setState({ socket: io({ 
      transports: ['polling'],
      requestTimeout: 5000,
      upgrade: false,
      query: {
          userID: this.state.userID
        } 
      })
      });
    

    this.state.socket.on('new message', data => {
      if (data['userID_other'] === this.state.userID)
        this.setState({ nbMessages: this.state.nbMessages + 1 })
    });

    this.state.socket.on('readMessage', data => {
      if (data == this.state.userID)
        this.callNotifApi();
    })
  }

  callNotifApi = async () => {
    await Axios.get('/chat/notification/' + this.state.userID)
      .then(res => {
        this.setState({ nbMessages: res.data['notification'][0]['COUNT (*)'] });
      })
      .catch(err => {
        console.log(err);
      })
  }

  componentWillUnmount() {
    if (this.state.socket !== '')
      this.state.socket.close();
    if (this.state.socketChat !== '')
      this.state.socketChat.close();
  }

  render() {
    const countMessages = this.state.nbMessages;
    const logout = this.handleLogout;
    

    const useStyles = makeStyles(theme => ({
      margin: {
        margin: theme.spacing(2),
        marginRight: theme.spacing(3),
      },
    }));


    function LoggedInLinks() {
      const classes = useStyles();
      return (
        <ul className="right hide-on-med-and-down">
          <li>
            <NavLink to={"/users/profile/" + Auth.getConfirm().username}>
              {" "}
              My profile{" "}
            </NavLink>
          </li>
          <li>
            <NavLink to="/chat/messages">
              <Badge className={classes.margin} badgeContent={countMessages} color="secondary">
                <MailIcon />
              </Badge>
            </NavLink>
          </li>
          <li>
            <button className="nav-buttons" onClick={logout}>
              Log out
            </button>
          </li>
        </ul>
      );
    }

    // Generates the links in the navbar for a logged out user
    function LoggedOutLinks() {
      return (
        <ul className="right hide-on-med-and-down">
          <li>
            <NavLink to="/users/register">Register</NavLink>
          </li>
          <li>
            <NavLink to="/users/login">Log in</NavLink>
          </li>
        </ul>
      );
    }

    // Generates the links in the navbar for a logged in user
    function NavLinks() {
      if (Auth.loggedIn()) return <LoggedInLinks />;
      else return <LoggedOutLinks />;
    }

    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.sidenav');
      var instances = M.Sidenav.init(elems);
    });

    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <NavLink to="/" className="brand-logo">
              <img className="header-logo" src={logo} alt="" />
            </NavLink>
            <a href="#" data-target="mobile-demo" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
            <NavLinks />
          </div>
        </nav>

        <ul className="sidenav" id="mobile-demo">
          <li>
            <a href="/users/register">Register</a>
          </li>
          <li>
            <a href="/users/login">Login</a>
          </li>
        </ul>
      </div>
    );
  }

  // Log out the user clearing his Auth token
  handleLogout() {
    Auth.logout();
    this.props.history.replace("/users/login");
  }
}

export default withRouter(NavBar);
