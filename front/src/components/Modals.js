import React, { Component } from "react";
import { SelectGender } from "./EditProfileInfo";
import { Modal, Button } from "react-materialize";

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
    console.log(this.state.userData.firstname);
  }
  render() {
    return (
      <Modal header="Modal Header" fixedFooter trigger={<Button />}>
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

export { ModalUserCompleteProfile };
