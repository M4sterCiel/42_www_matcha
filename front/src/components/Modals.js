import React, { Component } from "react";
import { SelectGender } from "./EditProfileInfo";
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
      userData: []
    };
    this.handleGenderData = this.handleGenderData.bind(this);
  }

  componentDidMount() {
    this.setState({
      userData: this.props.userData
    });
  }

  handleGenderData(data) {
    this.setState({
      gender: data
    });
    console.log(this.state.gender);
  }

  render() {
    return (
      <Modal
        id="edit-profile-modal"
        className="modals"
        header="Edit your profile info"
        fixedFooter
        trigger={false}
      >
        You can edit and save the information that will be visibile on your
        profile
        <span className="profile-fields-labels">Select a gender:</span>
        <SelectGender
          genderToParent={this.handleGenderData}
          gender={this.state.gender}
        />
        <p>{this.state.userData.username}</p>
      </Modal>
    );
  }
}

export { ModalUserCompleteProfile, ModalUserEditProfileInfo };
