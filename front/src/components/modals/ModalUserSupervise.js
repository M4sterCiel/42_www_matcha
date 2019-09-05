import React, { Component } from "react";
import { Modal } from "react-materialize";
import ApiCall from "../../services/ApiCall";
import ViewProfilesList from "../profileEdit/ViewProfilesList";

class ModalUserSupervise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profilesVisited: [],
      profilesLiked: [],
      profilesBlocked: []
    };
    this._isMounted = false;
  }

  async componentDidMount() {
    this._isMounted = true;
    await ApiCall.user.getUserProfilesVisited(1).then(res => console.log(res));
    await ApiCall.user.getUserProfilesLiked(1).then(res => console.log(res));
    await ApiCall.user.getUserProfilesBlocked(1).then(res => console.log(res));
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div>
        <Modal
          id="user-supervise-modal"
          className="modals"
          header="Manage visits, likes, users blocked"
          fixedFooter
          trigger={false}
        >
          {" "}
          <p className="modal-intro">
            See profiles you visited, liked and ones you blocked
          </p>
          <ViewProfilesList />
        </Modal>
      </div>
    );
  }
}

export default ModalUserSupervise;
