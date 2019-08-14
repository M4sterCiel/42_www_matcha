import React, { Component } from "react";
import { Button, Icon, TextInput } from "react-materialize";
import ValidateInput from "../../validation/ValidateInput";
import ApiCall from "../../services/ApiCall";
import ErrorToast from "../../services/ErrorToastService";
import InfoToast from "../../services/InfoToastService";

class EditEmailBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      email: "",
      newEmail: "",
      editEmailActive: false,
      emailValid: false,
      emailError: ""
    };
  }

  componentDidMount() {
    this.setState({
      id: this.props.user.id,
      email: this.props.user.email
    });
  }

  showEditEmail = () => {
    this.setState({
      editEmailActive: true
    });
  };

  hideEditEmail = () => {
    this.setState({
      editEmailActive: false,
      newEmail: "",
      emailValid: false,
      emailError: ""
    });
  };

  switchEditEmail = () => {
    if (this.state.editEmailActive) this.hideEditEmail();
    else this.showEditEmail();
  };

  handleEmailKeyUp = e => {
    let result = ValidateInput.user.email(e.target.value);

    this.setState({
      emailError: result.emailError,
      emailValid: result.emailValid
    });
  };

  handleEmailSubmit = async e => {
    e.preventDefault();
    await ApiCall.user
      .updateUserField(this.state.id, "mail", this.state.newEmail)
      .then(res => {
        this.setState({
          email: this.state.newEmail
        });
        this.props.emailToParent(this.state.newEmail);
        InfoToast.custom.info("Email updated with success", 3000);
        this.hideEditEmail();
      })
      .catch(err => {
        let message = err.response.data["error"];
        ErrorToast.custom.error(message, 1400);
      });
  };

  render() {
    return (
      <div className="edit-email-container">
        {this.state.email}
        <Button
          waves="light"
          style={{ marginLeft: "15px" }}
          onClick={this.switchEditEmail}
        >
          Edit
          <Icon left>email</Icon>
        </Button>
        {this.state.editEmailActive && (
          <div className="edit-email-input edit-dropdown-background">
            <div className="edit-email-text-input">
              <TextInput
                label="New email"
                onChange={e => this.setState({ newEmail: e.target.value })}
                onKeyUp={this.handleEmailKeyUp}
              >
                {" "}
                <div className="general-input-error">
                  {this.state.emailError}
                </div>
              </TextInput>
            </div>
            <Button
              className="edit-email-submit"
              onClick={this.handleEmailSubmit}
              disabled={!this.state.emailValid || this.state.newEmail === ""}
            >
              Confirm
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default EditEmailBox;
