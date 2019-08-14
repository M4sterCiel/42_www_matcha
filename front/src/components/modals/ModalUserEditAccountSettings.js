import React, { Component } from "react";
import AgeSlider from "../settings/AgeSlider";
import DistanceSlider from "../settings/DistanceSlider";
import PopularitySlider from "../settings/PopularitySlider";
import InterestsSlider from "../settings/InterestsSlider";
import EditEmailBox from "../settings/EditEmailBox";
import EditPasswordBox from "../settings/EditPasswordBox";
import NotificationSwitch from "../settings/NotificationSwitch";
import DeleteAccountBtn from "../settings/DeleteAccountBtn";
import { Modal } from "react-materialize";
import * as actionCreators from "../../actions/user-actions";
import { connect } from "react-redux";

class ModalUserEditAccountSettings extends Component {
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
  }

  componentDidMount() {
    this.setState({
      userId: this.props.userConnectedData.id,
      email: this.props.userConnectedData.mail,
      ageRange: [
        this.props.userConnectedData.age_min,
        this.props.userConnectedData.age_max
      ],
      distance: this.props.userConnectedData.distance_max,
      popularityRange: [
        this.props.userConnectedData.pop_min,
        this.props.userConnectedData.pop_max
      ],
      commonInterestsRange: [
        this.props.userConnectedData.tag_min,
        this.props.userConnectedData.tag_max
      ],
      notifications:
        this.props.userConnectedData.notifications_switch === 1 ? true : false
    });
  }

  handleAgeData = data => {
    this.props.updateUserData(
      this.props.userConnectedData.id,
      this.props.userConnectedData.username,
      {
        age_min: data[0],
        age_max: data[1]
      }
    );
    this.setState({
      ageRange: data
    });
  };

  handleDistanceData = data => {
    this.props.updateUserData(
      this.props.userConnectedData.id,
      this.props.userConnectedData.username,
      {
        distance_max: data
      }
    );
    this.setState({
      distance: data
    });
  };

  handlePopularityData = data => {
    this.props.updateUserData(
      this.props.userConnectedData.id,
      this.props.userConnectedData.username,
      {
        pop_min: data[0],
        pop_max: data[1]
      }
    );
    this.setState({
      popularityRange: data
    });
  };

  handleCommonInterestsData = data => {
    this.props.updateUserData(
      this.props.userConnectedData.id,
      this.props.userConnectedData.username,
      {
        tag_min: data[0],
        tag_max: data[1]
      }
    );
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
            <InterestsSlider
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

const mapStateToProps = state => {
  return {
    userConnectedData: state.user.data,
    userConnectedStatus: state.user.status
  };
};

export default connect(
  mapStateToProps,
  actionCreators
)(ModalUserEditAccountSettings);
