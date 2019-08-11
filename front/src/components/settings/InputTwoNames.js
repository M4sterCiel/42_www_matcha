import React, { Component } from "react";
import { TextInput } from "react-materialize";
import ValidateInput from "../../validation/ValidateInput";

class InputTwoNames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      firstnameError: "",
      firstnameValid: true,
      lastname: "",
      lastnameError: "",
      lastnameValid: true
    };
  }

  componentDidMount() {
    this.setState({
      firstname: this.props.firstname,
      lastname: this.props.lastname
    });
  }

  componentDidUpdate() {
    if (
      document.querySelector("input[name='firstname']").value !==
      this.props.firstname
    ) {
      document.querySelector(
        "input[name='firstname']"
      ).value = this.props.firstname;
      this.setState({
        firstname: this.props.firstname,
        firstnameValid: true,
        firstnameError: ""
      });
      this.props.validInput(true);
    }
    if (
      document.querySelector("input[name='lastname']").value !==
      this.props.lastname
    ) {
      document.querySelector(
        "input[name='lastname']"
      ).value = this.props.lastname;
      this.setState({
        lastname: this.props.lastname,
        lastnameValid: true,
        lastnameError: ""
      });
      this.props.validInput(true);
    }
  }

  handleChange = e => {
    const name = e.target.name;

    this.setState({ [name]: e.target.value });
    if (name === "firstname") {
      this.props.firstnameToParent(e.target.value);
      let result = ValidateInput.user.firstname(e.target.value);

      this.setState({
        firstnameError: result.firstnameError,
        firstnameValid: result.firstnameValid
      });
      this.props.validInput(
        result.firstnameValid && this.state.lastnameValid ? true : false
      );
    } else if (name === "lastname") {
      let result = ValidateInput.user.lastname(e.target.value);

      this.setState({
        lastnameError: result.lastnameError,
        lastnameValid: result.lastnameValid
      });
      this.props.validInput(
        this.state.firstnameValid && result.lastnameValid ? true : false
      );
      this.props.lastnameToParent(e.target.value);
    }
  };

  render() {
    return (
      <div>
        <TextInput
          name="firstname"
          label="Firstname"
          value={this.state.firstname}
          onChange={this.handleChange}
          onKeyUp={this.handleFirstnameKeyUp}
          className="input-modal"
        />
        {!this.state.firstnameValid && (
          <div className="input-error-block">{this.state.firstnameError}</div>
        )}
        <TextInput
          name="lastname"
          label="Lastname"
          value={this.state.lastname}
          onChange={this.handleChange}
          onKeyUp={this.handleLastnameKeyUp}
          className="input-modal"
        />
        {!this.state.lastnameValid && (
          <div className="input-error-block">{this.state.lastnameError}</div>
        )}
      </div>
    );
  }
}

export default InputTwoNames;
