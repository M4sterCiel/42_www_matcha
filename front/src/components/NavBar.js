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
import Notifications from '@material-ui/icons/Notifications';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import LikeNotif from '@material-ui/icons/ThumbUp';
import DislikeNotif from '@material-ui/icons/ThumbDown';
import HotNotif from '@material-ui/icons/Whatshot';

const Auth = new AuthService();

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: '',
      socket: '',
      nbMessages: null,
      nbNotifications: null
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
    
    await this.callMsgNotifApi();
    await this.callMainNotifApi();

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
      // eslint-disable-next-line
      if (data == this.state.userID)
        this.callMsgNotifApi();
    })
  }

  callMsgNotifApi = async () => {
    await Axios.get('/chat/notification/messages/' + this.state.userID)
      .then(res => {
        console.log(res.data)
        this.setState({ nbMessages: res.data['notification'][0]['COUNT (*)'] });
      })
      .catch(err => {
        console.log(err);
      })
  }
  
  callMainNotifApi = async () => {
    await Axios.get('/users/notification/main/' + this.state.userID)
      .then(res => {
        this.setState({ nbNotifications: null });
      })
      .catch(err => {
        console.log(err);
      })
  }

  componentWillUnmount() {
    if (this.state.socket !== '')
      this.state.socket.close();
  }

  render() {
    const countMessages = this.state.nbMessages;
    const countNotif = this.state.nbNotifications;
    const logout = this.handleLogout;
    const removeNotif = this.removeNotif;
    

    const useStyles = makeStyles(theme => ({
      margin: {
        margin: theme.spacing(2),
        marginRight: theme.spacing(3),
      },
      list: {
        width: 320,
      },
    }));


    function LoggedInLinks() {
      const classes = useStyles();

      const [state, setState] = React.useState({
        right: false,
      });

      
      const toggleDrawer = (side, open) => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        
        setState({ ...state, [side]: open });
      };

      const sideList = side => (
        <div
          className={classes.list}
          role="presentation"
          onClick={toggleDrawer(side, false)}
          onKeyDown={toggleDrawer(side, false)}
        >
          <h5 style={{textAlign: 'center'}}>Notifications</h5>
          <List>
            {[{data: ' just visited your profile!', type: 'visit', link: "/users/profile/", username: "ebechade"}, {data: ' just liked you back!', type: 'like_back', link: "/users/profile/", username: "lnicosia"}, {data: ' just liked your profile!', type: 'like', link: "/users/profile/", username: "willsmith"}, {data: ' just stopped liking your profile...', type: 'dislike', link: "/users/profile/", username: "brucewillis"}].map((text, index) => (
              <NavLink to={text.link+text.username} key={index}>
              <ListItem button>
                <ListItemIcon>
                  {text.type === 'visit' ? <HotNotif /> : text.type === 'dislike' ? <DislikeNotif /> : <LikeNotif />}
                </ListItemIcon>
                <ListItemText primary={text.username+text.data} style={{wordBreak: 'break-word', color: 'black'}} />
              </ListItem>
              </NavLink>
            ))}
          </List>
        </div>
      );


      return (
        <ul className="right hide-on-med-and-down">
          <li>
            <NavLink to={"/users/profile/" + Auth.getConfirm().username}>
              {" "}
              My profile{" "}
            </NavLink>
          </li>
          <li>
          <Button className="MuiButton-colorInherit" to="#" onClick={toggleDrawer('right', true)} style={{backgroundColor: 'none', borderRadius: '0px'}}>
            <Badge className={classes.margin} badgeContent={countNotif} color="secondary">
                <Notifications />
            </Badge>
          </Button>
          <SwipeableDrawer
            anchor="right"
            open={state.right}
            onClose={toggleDrawer('right', false)}
            onOpen={toggleDrawer('right', true) }
          >
            {sideList('right')}
          </SwipeableDrawer>
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
      M.Sidenav.init(elems);
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

  removeNotif = () => {
    this.setState({ nbNotifications: null });
  }
}

export default withRouter(NavBar);
