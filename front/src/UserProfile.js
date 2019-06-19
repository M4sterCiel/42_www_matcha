import "materialize-css/dist/css/materialize.min.css";
import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import AuthService from "./services/AuthService";
import Materialize from "materialize-css";

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.Auth = new AuthService();
    }

    render() {
        return (
            <div className="App">
                <NavBar />
            </div>
        )
    }

    // Redirect user if already logged in
    componentDidMount() {
        if (!this.Auth.loggedIn()) {
        let message = "you must log in to access this page";
        Materialize.toast({
            html: message,
            displayLength: 1200,
            classes: "rounded error-toast"
        });
        this.props.history.replace("/users/login");
        }
    }
}



export default UserProfile;