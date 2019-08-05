import React, { Component } from "react";
import {
  SelectGender,
  SelectSexOrientation,
  InputTwoNames,
  InputBio,
  BirthdatePicker,
  InterestTags,
  SelectLocation
} from "./EditProfileInfo";
import {
  AgeSlider,
  DistanceSlider,
  PopularitySlider,
  CommonInterestsSlider,
  EditEmailBox,
  EditPasswordBox,
  NotificationSwitch,
  DeleteAccountBtn
} from "./EditAccountSettings";
import { EditProfilePictures } from "./EditProfilePictures";
import { Modal, Button } from "react-materialize";
import { connect } from "react-redux";

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
      firstname: null,
      lastname: null,
      bio: "",
      birthdate: null,
      interests: [],
      geo_lat: null,
      geo_long: null,
      username: "",
      birthdateChanged: false
    };
    this.handleGenderData = this.handleGenderData.bind(this);
    this.handleSexOrientationData = this.handleSexOrientationData.bind(this);
    this.handleFirstnameData = this.handleFirstnameData.bind(this);
    this.handleLastnameData = this.handleLastnameData.bind(this);
    this.handleBioData = this.handleBioData.bind(this);
    this.handleBirthdateData = this.handleBirthdateData.bind(this);
    this.handleInterestsData = this.handleInterestsData.bind(this);
    this.handleCoordLatData = this.handleCoordLatData.bind(this);
    this.handleCoordLongData = this.handleCoordLongData.bind(this);
    this.resetMyDetails = this.resetMyDetails.bind(this);
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
      geo_lat: this.props.userData.geo_lat,
      geo_long: this.props.userData.geo_long,
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
    if (this.state.birthdate !== this.props.userData.birthdate) {
      this.setState({
        birthdate: data,
        birthdateChanged: true
      });
    } else {
      this.setState({
        birthdateChanged: false
      });
    }
  }

  handleInterestsData(data) {
    this.setState({
      interests: data
    });
  }

  handleCoordLatData(data) {
    this.setState({
      geo_lat: data
    });
  }

  handleCoordLongData(data) {
    this.setState({
      geo_long: data
    });
  }

  resetMyDetails() {
    console.log("Reset to be done");
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
          <p className="modal-intro">
            You can edit and save the information that will be visibile on your
            profile
          </p>
          <span className="profile-fields-labels">My details</span>
          <div className="modal-input">
            {this.state.firstname !== null && this.state.lastname !== null && (
              <InputTwoNames
                firstnameToParent={this.handleFirstnameData}
                lastnameToParent={this.handleLastnameData}
                firstname={this.state.firstname}
                lastname={this.state.lastname}
              />
            )}
            <InputBio bioToParent={this.handleBioData} bio={this.state.bio} />
            {this.state.birthdate !== null && (
              <BirthdatePicker
                birthdateToParent={this.handleBirthdateData}
                birthdate={this.state.birthdate}
              />
            )}
            { (this.state.firstname !== this.props.userData.firstname || this.state.lastname !== this.props.userData.lastname 
            || (this.state.bio !== this.props.userData.bio && this.state.bio !== "") || this.state.birthdateChanged === true) &&
            <div className="modal-input-btns">
              <Button className="btn waves-effect waves-light multiple-btns" onClick={ e => this.resetMyDetails()} >Cancel</Button>
              <Button className="btn waves-effect waves-light multiple-btns">Save</Button>
            </div>
            }
          </div>
          <span className="profile-fields-labels">City</span>
          <SelectLocation
            lat={this.props.userData.geo_lat}
            long={this.props.userData.geo_long}
            latToParent={this.handleCoordLatData}
            longToParent={this.handleCoordLongData}
          />
          <span className="profile-fields-labels">Gender</span>
          {this.state.gender !== "" && (
            <SelectGender
              genderToParent={this.handleGenderData}
              gender={this.state.gender}
            />
          )}
          <span className="profile-fields-labels">Sexual Orientation</span>
          {this.state.sexOrientation !== "" && (
            <SelectSexOrientation
              sexOrientationToParent={this.handleSexOrientationData}
              sexOrientation={this.state.sexOrientation}
            />
          )}
          <span className="profile-fields-labels">Interested in</span>
          <InterestTags
            interestsToParent={this.handleInterestsData}
            interests={this.state.interests}
          />
        </Modal>
      </div>
    );
  }
}

class ModalUserEditProfilePictures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: [
        {
          mainPic: true,
          url:
            "https://news.nationalgeographic.com/content/dam/news/2018/05/17/you-can-train-your-cat/02-cat-training-NationalGeographic_1484324.ngsversion.1526587209178.adapt.1900.1.jpg"
        },
        {
          mainPic: false,
          url: ""
        },
        {
          mainPic: false,
          url: ""
        },
        {
          mainPic: false,
          url: ""
        },
        {
          mainPic: false,
          url: ""
        }
      ]
    };
    this.handlePicturesData = this.handlePicturesData.bind(this);
  }

  handlePicturesData(data) {
    this.setState({
      pictures: data
    });
  }

  render() {
    return (
      <div>
        <Modal
          id="edit-pictures-modal"
          className="modals"
          header="Edit your profile pictures"
          fixedFooter
          trigger={false}
        >
          <p className="modal-intro">
            Add up to 5 profile pictures (adding pictures helps with growing
            popularity)
          </p>
          <EditProfilePictures
            pictures={this.state.pictures}
            picturesToParent={this.handlePicturesData}
          />
        </Modal>
      </div>
    );
  }
}

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

const mapStateToProps = state => {
  return {
    userConnectedData: state.user.data,
    userConnectedStatus: state.user.status
  };
};

export {
  ModalUserCompleteProfile,
  ModalUserEditProfileInfo,
  ModalUserEditProfilePictures,
  ModalUserEditAccountSettings
};
