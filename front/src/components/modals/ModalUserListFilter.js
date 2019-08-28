import { Modal } from "react-materialize";
import React, { Component } from "react";

class ModalUserListFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      email: "",
      ageRange: [18, 99],
      distance: 5,
      popularityRange: [0, 1000],
      commonInterestsRange: [1, 25],
      notifications: false
    };
    this._isMounted = false;
  }

  render() {
    return (
      <Modal
        id="filter-users-modal"
        className="modals"
        header="Filter settings"
        fixedFooter
        trigger={false}
      >
        <p className="modal-intro">
          You can edit your filter settings to improve your profile suggestions
        </p>
        <span className="profile-fields-labels">Filter settings</span>
      </Modal>
    );
  }
}

export default ModalUserListFilter;
