import React, { Component } from "react";
import {
  SelectGender,
  SelectSexOrientation,
  InputTwoNames,
  InputBio,
  BirthdatePicker,
  InterestTags,
  SelectLocation
} from "../EditProfileInfo";
import { Modal, Button } from "react-materialize";
import ApiCall from "../../services/ApiCall";
import * as actionCreators from "../../actions/user-actions";
import { connect } from "react-redux";

class ModalUserEditProfileInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: "",
      sexOrientation: "",
      originalFirstname: null,
      originalLastname: null,
      originalBio: "",
      originalBirthdate: null,
      firstname: null,
      lastname: null,
      bio: "",
      birthdate: null,
      interests: [],
      geo_lat: null,
      geo_long: null,
      username: "",
      isTwoNamesInputValid: true,
      isBioInputValid: true
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
    this.isTwoNamesInputValid = this.isTwoNamesInputValid.bind(this);
    this.isBioInputValid = this.isBioInputValid.bind(this);
    this.resetMyDetails = this.resetMyDetails.bind(this);
  }

  componentDidMount() {
    this.setState({
      gender: this.props.userData.gender,
      sexOrientation: this.props.userData.sexual_orientation,
      originalFirstname: this.props.userData.firstname,
      originalLastname: this.props.userData.lastname,
      originalBio:
        this.props.userData.bio === null ? "" : this.props.userData.bio,
      originalBirthdate: this.props.userData.birthdate,
      firstname: this.props.userData.firstname,
      lastname: this.props.userData.lastname,
      bio: this.props.userData.bio === null ? "" : this.props.userData.bio,
      birthdate: this.props.userData.birthdate,
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

  isTwoNamesInputValid(data) {
    this.setState({
      isTwoNamesInputValid: data
    });
  }

  isBioInputValid(data) {
    this.setState({
      isBioInputValid: data
    });
  }

  resetMyDetails() {
    this.setState({
      firstname: this.state.originalFirstname,
      lastname: this.state.originalLastname,
      bio: this.state.originalBio,
      birthdate: this.state.originalBirthdate
    });
  }

  handleSubmitMyDetails = async e => {
    e.preventDefault();
    /*     if (this.state.firstname !== this.state.originalFirstname) {
      await ApiCall.user
        .updateUserData(this.props.userData.id, {
          firstname: this.state.firstname
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          let message = err.response.data["error"];
          console.log(message);
        });
    } */
    var date = new Date(this.state.birthdate);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    this.props.updateUserData(
      this.props.userData.id,
      this.props.userData.username,
      {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        bio: this.state.bio,
        birthdate: year + "-" + month + "-" + day
      }
    );
  };

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
                validInput={this.isTwoNamesInputValid}
              />
            )}
            <InputBio
              bioToParent={this.handleBioData}
              bio={this.state.bio}
              validInput={this.isBioInputValid}
            />
            <BirthdatePicker
              birthdateToParent={this.handleBirthdateData}
              birthdate={this.state.birthdate}
            />
            {(this.state.firstname !== this.props.userData.firstname ||
              this.state.lastname !== this.props.userData.lastname ||
              (this.state.bio !== this.props.userData.bio &&
                this.state.bio !== "") ||
              (this.state.birthdate !== this.state.originalBirthdate &&
                this.state.birthdate !== "")) && (
              <div className="modal-input-btns">
                <Button
                  className="btn waves-effect waves-light multiple-btns"
                  onClick={e => this.resetMyDetails()}
                >
                  Cancel
                </Button>
                <Button
                  className="btn waves-effect waves-light multiple-btns"
                  onClick={this.handleSubmitMyDetails}
                  disabled={
                    !this.state.isTwoNamesInputValid ||
                    !this.state.isBioInputValid
                  }
                >
                  Save
                </Button>
              </div>
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

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  actionCreators
)(ModalUserEditProfileInfo);
