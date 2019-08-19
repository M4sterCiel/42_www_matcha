import React, { Component } from "react";
import { Modal } from "react-materialize";
import { SelectGender } from "../EditProfileInfo";

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

const mapStateToProps = state => {
  return { state };
};

export default { ModalUserCompleteProfile };
