import React, { Component } from "react";
import "./App.css";
import "materialize-css/dist/css/materialize.min.css";
import { Modal } from "react-materialize";
import { Button } from "react-materialize";
import { Collapsible } from "react-materialize";
import { CollapsibleItem } from "react-materialize";
import AuthService from "./services/AuthService";
import Materialize from "materialize-css";
import DefaultPicture from "./assets/default-profile.png"
import Test from "./Test";

class AddInfo extends Component {
    constructor(props) {
        super(props);
        this.Auth = new AuthService();
        this.state = {
          user: "",
          picture: ""
        };
      }

    render() {
        return (
        <Modal header="Additional Information" trigger={<Button />}>
          <Collapsible popout>
            <CollapsibleItem header="General information" icon="filter_drama">
                <Test />
            </CollapsibleItem>
            <CollapsibleItem header="Yeah, you do seem to have a little 'shit creek' ac…" icon="place">
            Yeah, you do seem to have a little 'shit creek' action going.
            </CollapsibleItem>
            <CollapsibleItem header="You know, FYI, you can buy a paddle. Did you not p…" icon="whatshot">
            You know, FYI, you can buy a paddle. Did you not plan for this contingency?
            </CollapsibleItem>
        </Collapsible>
        </Modal>
        )
    }

    componentDidMount() {
        if (!this.Auth.loggedIn()) {
          let message = "you must log in to access this page";
          Materialize.toast({
            html: message,
            displayLength: 1200,
            classes: "rounded error-toast"
          });
          this.props.history.replace("/users/login");
        } else {
          this.callApi()
            .then(res => {
              this.setState({ user: res.data });
              if (res.picture === "default")
                this.setState({ picture: DefaultPicture });
              else
                this.setState({ picture: res.picture });
            })
            .catch(err => {
              let message = "couldn't find this user";
              Materialize.toast({
                html: message,
                displayLength: 1200,
                classes: "rounded error-toast"
              });
              this.props.history.replace("/");
              console.log(err);
            });
        }
      }
    
      callApi = async () => {
        var username = this.Auth.getConfirm();
        const response = await fetch(
          "/users/profile/" + username.username
        );
        const body = await response.json();
    
        if (response.status !== 200) throw Error(body.message);
        return body;
      };
 }


export default AddInfo;