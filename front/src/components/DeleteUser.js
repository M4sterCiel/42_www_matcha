import React, { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
import AuthService from "../services/AuthService";
import Axios from "axios";

class DeletUser extends Component {
    constructor(props) {
        super(props);
        this.Auth = new AuthService();
        this.state = {
            userToken: this.Auth.getToken()
        };
    }

    render() {
        return (
            <div className="App">
                <button
                className="delete-btn"
                onClick={this.eraseUserData}
                >
                    Delete user account
                </button>
            </div>
        )
    }

    eraseUserData = async () => {
        if (window.confirm("Are you sure you want delete your account ?"))
        {
            Axios.delete(`/users/delete-account`, { headers: { Authorization: `Bearer ${this.state.userToken}` }})
                .then(res => {
                    this.Auth.logout();
                    window.location.reload();
                });
        };
    };
}

export default DeletUser;