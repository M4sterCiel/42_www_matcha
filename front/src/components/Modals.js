import React, { Component } from "react";
import {
  SelectGender,
  SelectSexOrientation,
  InputTwoNames,
  InputBio,
  BirthdatePicker,
  InterestTags
} from "./EditProfileInfo";
import { Modal } from "react-materialize";

class ModalUserCompleteProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: []
    };
  }

  componentDidMount() {
    this.setState({
      userData: this.props.userData
    });
  }
  render() {
    return (
      <Modal header="Modal Header" className="modal" fixedFooter>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
        <SelectGender
          genderToParent={this.handleGenderData}
          gender={this.state.gender}
        />
      </Modal>
    );
  }
}

class ModalUserEditProfileInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: "",
      sexOrientation: "",
      firstname: "",
      lastname: "",
      bio: "",
      birthdate: "",
      username: ""
    };
    this.handleGenderData = this.handleGenderData.bind(this);
    this.handleSexOrientationData = this.handleSexOrientationData.bind(this);
    this.handleFirstnameData = this.handleFirstnameData.bind(this);
    this.handleLastnameData = this.handleLastnameData.bind(this);
    this.handleBioData = this.handleBioData.bind(this);
    this.handleBirthdateData = this.handleBirthdateData.bind(this);
  }

  componentDidMount() {
    this.setState({
      gender: this.props.userData.gender,
      sexOrientation: this.props.userData.sexual_orientation,
      firstname: this.props.userData.firstname,
      lastname: this.props.userData.lastname,
      bio: this.props.userData.bio,
      birthdate:
        this.props.userData.birthdate !== null && this.props.userData.birthdate,
      username: this.props.userData.username
    });
  }

  handleGenderData(data) {
    this.setState({
      gender: data
    });
  }

  handleSexOrientationData(data) {
    this.setState({
      sexOrientation: data
    });
  }

  handleFirstnameData(data) {
    this.setState({
      firstname: data
    });
  }

  handleLastnameData(data) {
    this.setState({
      lastname: data
    });
  }

  handleBioData(data) {
    this.setState({
      bio: data
    });
  }

  handleBirthdateData(data) {
    this.setState({
      birthdate: data
    });
  }

  render() {
    return (
      <div>
        <Modal
          id="edit-profile-modal"
          className="modals"
          header="Edit your profile info"
          fixedFooter
          trigger={false}
        >
          You can edit and save the information that will be visibile on your
          profile
          <span className="profile-fields-labels">My name is:</span>
          {this.state.firstname !== "" && this.state.lastname !== "" && (
            <InputTwoNames
              firstnameToParent={this.handleFirstnameData}
              lastnameToParent={this.handleLastnameData}
              firstname={this.state.firstname}
              lastname={this.state.lastname}
            />
          )}
          <span className="profile-fields-labels">I am:</span>
          {this.state.gender !== "" && (
            <SelectGender
              genderToParent={this.handleGenderData}
              gender={this.state.gender}
            />
          )}
          <span className="profile-fields-labels">I prefer:</span>
          {this.state.sexOrientation !== "" && (
            <SelectSexOrientation
              sexOrientationToParent={this.handleSexOrientationData}
              sexOrientation={this.state.sexOrientation}
            />
          )}
          <span className="profile-fields-labels">My bio is:</span>
          <InputBio bioToParent={this.handleBioData} bio={this.state.bio} />
          <span>{this.state.bio}</span>
          <span className="profile-fields-labels">I am born in:</span>
          {this.state.birthdate !== "" && (
            <BirthdatePicker
              birthdateToParent={this.handleBirthdateData}
              birthdate={this.state.birthdate}
            />
          )}
          <InterestTags />
        </Modal>
      </div>
    );
  }
}

export { ModalUserCompleteProfile, ModalUserEditProfileInfo };
