import React, { Component } from "react";
import Slider from "@material-ui/core/Slider";
import { Button, Icon, TextInput } from "react-materialize";
import ValidateInput from "../validation/ValidateInput";

class AgeSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: []
    };
  }

  componentDidMount() {
    this.setState({
      value: this.props.range
    });
  }

  handleChange = (e, newValue) => {
    this.setState({
      value: newValue
    });
    this.props.ageToParent(newValue);
  };

  render() {
    return (
      <div className="slider-container">
        <label className="left-label slider-label" htmlFor="slider-edit-age">
          Age range (y/o)
        </label>
        <label className="right-label slider-label" htmlFor="slider-edit-age">
          {this.state.value[0]}-{this.state.value[1]}
          {this.state.value[1] === 99 && "+"} y/o
        </label>
        <Slider
          name="slider-edit-age"
          min={18}
          max={99}
          value={this.state.value}
          onChange={this.handleChange}
          valueLabelDisplay="auto"
        />
      </div>
    );
  }
}

class DistanceSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null
    };
  }

  componentDidMount() {
    this.setState({
      value: this.props.value
    });
  }

  handleChange = (e, newValue) => {
    this.setState({
      value: newValue
    });
    this.props.distanceToParent(newValue);
  };

  render() {
    return (
      <div className="slider-container">
        <label
          className="left-label slider-label"
          htmlFor="slider-edit-distance"
        >
          Maximum distance (km)
        </label>
        <label
          className="right-label slider-label"
          htmlFor="slider-edit-distance"
        >
          {this.state.value} km
        </label>
        <Slider
          name="slider-edit-distance"
          min={0}
          max={50}
          value={this.state.value}
          onChange={this.handleChange}
          valueLabelDisplay="auto"
        />
      </div>
    );
  }
}

class PopularitySlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: []
    };
  }

  componentDidMount() {
    this.setState({
      value: this.props.range
    });
  }

  handleChange = (e, newValue) => {
    this.setState({
      value: newValue
    });
    this.props.popularityToParent(newValue);
  };

  render() {
    return (
      <div className="slider-container">
        <label
          className="left-label slider-label"
          htmlFor="slider-edit-popularity"
        >
          Popularity range (°)
        </label>
        <label
          className="right-label slider-label"
          htmlFor="slider-edit-popularity"
        >
          {this.state.value[0]}-{this.state.value[1]}
          {this.state.value[1] === 1000 && "+"}°
        </label>
        <Slider
          name="slider-edit-popularity"
          min={0}
          max={1000}
          value={this.state.value}
          onChange={this.handleChange}
          valueLabelDisplay="auto"
        />
      </div>
    );
  }
}

class CommonInterestsSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: []
    };
  }

  componentDidMount() {
    this.setState({
      value: this.props.range
    });
  }

  handleChange = (e, newValue) => {
    this.setState({
      value: newValue
    });
    this.props.commonInterestsToParent(newValue);
  };

  render() {
    return (
      <div className="slider-container">
        <label
          className="left-label slider-label"
          htmlFor="slider-edit-common-interests"
        >
          Number of interests in common
        </label>
        <label
          className="right-label slider-label"
          htmlFor="slider-edit-common-interests"
        >
          {this.state.value[0]}-{this.state.value[1]}
          {this.state.value[1] === 25 && "+"} interests
        </label>
        <Slider
          name="slider-edit-common-interests"
          min={0}
          max={25}
          value={this.state.value}
          onChange={this.handleChange}
          valueLabelDisplay="auto"
        />
      </div>
    );
  }
}

class EditEmailBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "toto@email.fr",
      newEmail: "",
      editEmailActive: false,
      emailValid: false,
      emailError: ""
    };
  }

  showEditEmail = () => {
    this.setState({
      editEmailActive: true
    });
  };

  hideEditEmail = () => {
    this.setState({
      editEmailActive: false
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

  handleEmailSubmit = () => {
    this.setState({
      email: this.state.newEmail,
      newEmail: ""
    });
    this.hideEditEmail();
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

class EditPasswordBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      pwd1: "",
      pwd2: "",
      pwd1Valid: false,
      pwd2Valid: false,
      pwd2Error: "",
      editPasswordActive: false
    };
  }

  showEditPassword = () => {
    this.setState({
      editPasswordActive: true
    });
  };

  hideEditPassword = () => {
    this.setState({
      editPasswordActive: false
    });
  };

  switchEditPassword = () => {
    if (this.state.editPasswordActive) this.hideEditPassword();
    else this.showEditPassword();
  };

  validatePwd = () => {
    if (/[a-z]/.test(this.state.pwd1)) {
      this.setState({ pwdHasLowercase: true });
    } else {
      this.setState({ pwdHasLowercase: false });
    }
    if (/[A-Z]/g.test(this.state.pwd1)) {
      this.setState({ pwdHasUppercase: true });
    } else {
      this.setState({ pwdHasUppercase: false });
    }
    if (/[0-9]/g.test(this.state.pwd1)) {
      this.setState({ pwdHasNumber: true });
    } else {
      this.setState({ pwdHasNumber: false });
    }
    if (this.state.pwd1.length >= 8) {
      this.setState({ pwdHasMinLen: true });
    } else {
      this.setState({ pwdHasMinLen: false });
    }
    if (
      this.state.pwdHasLowercase &&
      this.state.pwdHasUppercase &&
      this.state.pwdHasNumber &&
      this.state.pwdHasMinLen
    ) {
      this.setState({ pwd1Valid: true });
    } else {
      this.setState({ pwd1Valid: false });
    }
  };

  // Checking passwords match
  validateRepeatPwd = () => {
    if (this.state.pwd1 === this.state.pwd2) {
      this.setState({ pwd2Error: "" });
    } else if (this.state.pwd2 !== "") {
      this.setState({ pwd2Error: "Passwords don't match" });
    }
  };

  // Checking over both passwords on change
  handlePwdKeyUp = async e => {
    await this.validatePwd();
    await this.validateRepeatPwd();
  };

  handlePasswordSubmit = () => {
    this.setState({
      password: this.state.pwd1,
      pwd1: "",
      pwd2: ""
    });
    this.hideEditPassword();
  };

  render() {
    return (
      <div>
        <Button
          waves="light"
          style={{ marginLeft: "15px" }}
          onClick={this.switchEditPassword}
        >
          Modify password
        </Button>
        {this.state.editPasswordActive && (
          <div className="edit-dropdown-background">
            <TextInput
              password={true}
              name="pwd"
              label="New password"
              id="pwd-login"
              value={this.state.pwd1}
              onChange={e => this.setState({ pwd1: e.target.value })}
              onKeyUp={this.handlePwdKeyUp}
              onFocus={e => this.setState({ pwd1VerifyBox: "box-enabled" })}
              onBlur={e => this.setState({ pwd1VerifyBox: "box-disabled" })}
              required
            />
            <div
              className={
                "password-message edit-password-message " +
                this.state.pwd1VerifyBox
              }
            >
              <h3 id="pwd1-verify-title">
                Password must contain the following:
              </h3>
              <p
                id="letter"
                className={this.state.pwdHasLowercase ? "valid" : "invalid"}
              >
                A <b>lowercase</b> letter
              </p>
              <p
                id="capital"
                className={this.state.pwdHasUppercase ? "valid" : "invalid"}
              >
                A <b>capital (uppercase)</b> letter
              </p>
              <p
                id="number"
                className={this.state.pwdHasNumber ? "valid" : "invalid"}
              >
                A <b>number</b>
              </p>
              <p
                id="length"
                className={this.state.pwdHasMinLen ? "valid" : "invalid"}
              >
                Minimum <b>8 characters</b>
              </p>
            </div>
            <TextInput
              password={true}
              name="rep-pwd"
              label="Repeat new password"
              id="rep-pwd-login"
              value={this.state.pwd2}
              onChange={e => this.setState({ pwd2: e.target.value })}
              onKeyUp={this.handlePwdKeyUp}
              required
            />
            <div className="general-input-error">{this.state.pwd2Error}</div>
            <Button
              className="edit-submit"
              onClick={this.handlePasswordSubmit}
              disabled={
                !this.state.pwd1Valid ||
                this.state.pwd2 !== this.state.pwd1 ||
                this.state.pwd1 === "" ||
                this.state.pwd2 === ""
              }
            >
              Confirm
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export {
  AgeSlider,
  DistanceSlider,
  PopularitySlider,
  CommonInterestsSlider,
  EditEmailBox,
  EditPasswordBox
};
