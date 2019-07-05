import React, { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
import AuthService from "../services/AuthService";
import Axios from "axios";
import { Modal } from "react-materialize";
import { Button } from "react-materialize";
import { Collapsible } from "react-materialize";
import { CollapsibleItem } from "react-materialize";


class ReportUser extends Component {
    render() {
        return (
            <div className="App">
                  <a className="btn-floating btn-small waves-effect waves-light red"><i class="material-icons"
                  onClick={}
                  >report</i></a>
            </div>
        )
    }
}

export default ReportUser;