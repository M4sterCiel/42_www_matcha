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
import { EditProfilePictures } from "./EditProfilePictures";
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
      interests: [],
      geo_lat: null,
      geo_long: null,
      username: ""
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
    this.setState({
      birthdate: data
    });
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
          <span className="profile-fields-labels">My details</span>
          <div className="modal-input">
            {this.state.firstname !== "" && this.state.lastname !== "" && (
              <InputTwoNames
                firstnameToParent={this.handleFirstnameData}
                lastnameToParent={this.handleLastnameData}
                firstname={this.state.firstname}
                lastname={this.state.lastname}
              />
            )}
            <InputBio bioToParent={this.handleBioData} bio={this.state.bio} />
            {this.state.birthdate !== "" && (
              <BirthdatePicker
                birthdateToParent={this.handleBirthdateData}
                birthdate={this.state.birthdate}
              />
            )}
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
          <EditProfilePictures
            pictures={this.state.pictures}
            picturesToParent={this.handlePicturesData}
          />
        </Modal>
      </div>
    );
  }
}

export {
  ModalUserCompleteProfile,
  ModalUserEditProfileInfo,
  ModalUserEditProfilePictures
};
