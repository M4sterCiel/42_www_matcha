import React, { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css";
import AuthService from "../services/AuthService";
import { withRouter, NavLink } from "react-router-dom";
import logo from "../assets/logo-with-name.png";
import io from "socket.io-client";
import Axios from "axios";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";
import Notifications from "@material-ui/icons/Notifications";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import LikeNotif from "@material-ui/icons/ThumbUp";
import DislikeNotif from "@material-ui/icons/ThumbDown";
import HotNotif from "@material-ui/icons/Whatshot";
import HighlightOff from "@material-ui/icons/HighlightOff";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import Divider from "@material-ui/core/Divider";

const Auth = new AuthService();
const CancelToken = Axios.CancelToken;
let cancel;

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: "",
      socket: "",
      listNotif: [],
      nbMessages: null,
      nbNotifications: null,
      right: false,
      left: false
    };
    this._isMounted = false;
    this.Auth = new AuthService();
    this.handleLogout = this.handleLogout.bind(this);
    this.Auth.getConfirm = this.Auth.getConfirm.bind(this);
    this.Auth.loggedIn = this.Auth.loggedIn.bind(this);
  }

  async componentDidMount() {
    //console.log(this.state);
    if (!localStorage.getItem("Token")) {
      return;
    }
    this._isMounted = true;
    this._isMounted &&
      (await this.setState({ userID: this.Auth.getConfirm()["id"] }));

    this._isMounted && (await this.callMsgNotifApi());
    this._isMounted && (await this.callMainNotifApi());

    this._isMounted &&
      (await this.setState({
        socket: io({
          transports: ["polling"],
          requestTimeout: 50000,
          upgrade: false,
          "sync disconnect on unload": true,
          query: {
            userID: this.state.userID
          }
        })
      }));

    if (this.state.socket) {
      this.state.socket.on("new message", data => {
        if (data["userID_other"] === this.state.userID)
          this._isMounted &&
            this.setState({ nbMessages: this.state.nbMessages + 1 });
      });

      this.state.socket.on("readMessage", data => {
        // eslint-disable-next-line
        if (data == this.state.userID) this.callMsgNotifApi();
      });

      this.state.socket.on("newNotif", id => {
        if (id === this.state.userID) this.callMainNotifApi();
      });
    }
  }

  callMsgNotifApi = async () => {
    await Axios.get("/chat/notification/messages/" + this.state.userID, {
      cancelToken: new CancelToken(function executor(c) {
        cancel = c;
      })
    })
      .then(res => {
        this._isMounted &&
          this.setState({
            nbMessages: res.data["notification"][0]["COUNT (*)"]
          });
      })
      .catch(error => {
        //console.log(error);
      });
  };

  callMainNotifApi = async () => {
    var counter = 0;
    await Axios.get("/users/notification/main/" + this.state.userID, {
      cancelToken: new CancelToken(function executor(c) {
        cancel = c;
      })
    })
      .then(res => {
        var tab = res.data.tab;
        for (var i = 0; i < tab.length; i++)
          if (tab[i]["isRead"] == 0) counter++;
        this._isMounted &&
          this.setState({
            listNotif: tab,
            nbNotifications: counter
          });
        //console.log(this.state.listNotif);
      })
      .catch(err => {
        //console.log(err);
      });
  };

  componentDidUpdate() {
    if (
      (!localStorage.getItem("Token") || !this.Auth.isTokenExpired) &&
      this.state.socket !== ""
    )
      this.state.socket.close();
  }
  componentWillUnmount() {
    if (this.state.socket !== "") this.state.socket.close();
    this._isMounted = false;
  }

  render() {
    const logout = this.handleLogout;
    var listNotif = this.state.listNotif;
    const userID = this.state.userID;

    const useStyles = makeStyles(theme => ({
      margin: {
        margin: theme.spacing(2),
        marginRight: theme.spacing(3)
      },
      list: {
        width: 320
      }
    }));

    const LoggedInLinks = () => {
      const classes = useStyles();

      const toggleDrawer = (side, open) => event => {
        Axios.post("/users/read-notification/" + userID).then(res => {
          this._isMounted &&
            this.setState({ nbNotifications: null, [side]: open });
        });

        if (
          event &&
          event.type === "keydown" &&
          (event.key === "Tab" || event.key === "Shift")
        ) {
          return;
        }
      };

      const sideList = (side, listNotif) => (
        <div
          className={classes.list}
          role="presentation"
          onClick={toggleDrawer(side, false)}
          onKeyDown={toggleDrawer(side, false)}
        >
          <h5 style={{ textAlign: "center", color: "#ffb6d3" }}>
            Notifications
          </h5>
          <List>
            {listNotif.length < 1 ? (
              <ListItem>
                <ListItemIcon>
                  <HighlightOff />
                </ListItemIcon>
                <ListItemText
                  primary={"You do not have any notification yet."}
                  style={{ wordBreak: "break-word", color: "black" }}
                />
              </ListItem>
            ) : (
              ""
            )}
            {listNotif.map((text, index) => (
              <NavLink
                to={"/users/profile/" + text.sender_username}
                key={index}
              >
                <ListItem button>
                  <ListItemIcon>
                    {text.type === "visit" || text.type === "like_back" ? (
                      <HotNotif className="notif-icons" />
                    ) : text.type === "dislike" ? (
                      <DislikeNotif className="notif-icons" />
                    ) : (
                      <LikeNotif className="notif-icons" />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={text.sender_username + " " + text.data}
                    style={{ wordBreak: "break-word", color: "black" }}
                  />
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
              {<i className="material-icons">person</i>}
            </NavLink>
          </li>
          <li>
            <Button
              className="MuiButton-colorInherit"
              to="#"
              onClick={toggleDrawer("right", true)}
              style={{ backgroundColor: "none", borderRadius: "0px" }}
            >
              <Badge
                className={classes.margin}
                badgeContent={this.state.nbNotifications}
                color="secondary"
              >
                <Notifications />
              </Badge>
            </Button>
            <SwipeableDrawer
              anchor="right"
              open={this.state.right}
              onClose={toggleDrawer("right", false)}
              onOpen={toggleDrawer("right", true)}
            >
              {sideList("right", listNotif)}
            </SwipeableDrawer>
          </li>
          <li>
            <NavLink to="/chat/messages">
              <Badge
                className={classes.margin}
                badgeContent={this.state.nbMessages}
                color="secondary"
              >
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
    };

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

    const MobileLoggedInLinks = () => {
      const toggleMenu = (menu, open) => event => {
        if (
          event &&
          event.type === "keydown" &&
          (event.key === "Tab" || event.key === "Shift")
        ) {
          return;
        }

        this._isMounted && this.setState({ [menu]: open });
      };

      const classes = useStyles();

      const fullList = menu => (
        <div
          className={classes.fullList}
          role="presentation"
          onClick={toggleMenu(menu, false)}
          onKeyDown={toggleMenu(menu, false)}
        >
          <List>
            {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {["All mail", "Trash", "Spam"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      );

      return (
        <div>
          <Button
            className="mobile-menu-btn"
            onClick={toggleMenu("left", true)}
          >
            <i className="material-icons">menu</i>
          </Button>
          <SwipeableDrawer
            anchor="left"
            open={this.state.left}
            onClose={toggleMenu("left", false)}
            onOpen={toggleMenu("left", true)}
          >
            {fullList("left")}
          </SwipeableDrawer>
        </div>
      );
    };

    // Generates the links in the navbar for a logged in user
    function NavLinks() {
      if (Auth.loggedIn())
        return (
          <div>
            <LoggedInLinks />
            <MobileLoggedInLinks />
          </div>
        );
      else return <LoggedOutLinks />;
    }

    document.addEventListener("DOMContentLoaded", function() {
      var elems = document.querySelectorAll(".sidenav");
      M.Sidenav.init(elems);
    });

    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <NavLink to="/" className="brand-logo">
              <img className="header-logo" src={logo} alt="" />
            </NavLink>
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
