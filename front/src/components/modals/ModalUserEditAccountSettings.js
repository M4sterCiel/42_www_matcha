import React, { Component } from "react";
import {
  AgeSlider,
  DistanceSlider,
  PopularitySlider,
  CommonInterestsSlider,
  EditEmailBox,
  EditPasswordBox,
  NotificationSwitch,
  DeleteAccountBtn
} from "../EditAccountSettings";
import { Modal } from "react-materialize";

class ModalUserEditAccountSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      email: "",
      ageRange: [20, 50],
      distance: 30,
      popularityRange: [0, 200],
      commonInterestsRange: [2, 10],
      notifications: false
    };
  }

  componentDidMount() {
    this.setState({
      userId: this.props.user.id,
      email: this.props.user.mail
    });
  }

  handleAgeData = data => {
    this.setState({
      ageRange: data
    });
  };

  handleDistanceData = data => {
    this.setState({
      distance: data
    });
  };

  handlePopularityData = data => {
    this.setState({
      popularityRange: data
    });
  };

  handleCommonInterestsData = data => {
    this.setState({
      commonInterestsRange: data
    });
  };

  handleEmailData = data => {
    this.setState({
      email: data
    });
  };

  render() {
    return (
      <div>
        {this.state.userId !== null && (
          <Modal
            id="edit-account-modal"
            className="modals"
            header="Edit your account settings"
            fixedFooter
            trigger={false}
          >
            <p className="modal-intro">
              You can edit your Matcha discovery settings and personal account
              settings
            </p>
            <span className="profile-fields-labels">Discovery settings</span>
            <AgeSlider
              range={this.state.ageRange}
              ageToParent={this.handleAgeData}
            />
            <DistanceSlider
              value={this.state.distance}
              distanceToParent={this.handleDistanceData}
            />
            <PopularitySlider
              range={this.state.popularityRange}
              popularityToParent={this.handlePopularityData}
            />
            <CommonInterestsSlider
              range={this.state.commonInterestsRange}
              commonInterestsToParent={this.handleCommonInterestsData}
            />
            <span className="profile-fields-labels">Account settings</span>
            <EditEmailBox
              user={{ id: this.state.userId, email: this.state.email }}
              emailToParent={this.handleEmailData}
            />
            <EditPasswordBox userId={this.state.userId} />
            <NotificationSwitch notifications={this.state.notifications} />
            <DeleteAccountBtn />
          </Modal>
        )}
      </div>
    );
  }
}

export default ModalUserEditAccountSettings;
