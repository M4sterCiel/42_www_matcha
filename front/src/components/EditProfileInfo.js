import React, { Component } from "react";
import {
  TextInput,
  Textarea,
  DatePicker,
  Chip,
  Autocomplete,
  Button,
  Icon
} from "react-materialize";
import GeoPosition from "geolocator";
import InfoToast from "../services/InfoToastService";
import ErrorToast from "../services/ErrorToastService";
import cities from "../assets/data-json/cities";

class SelectGender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: ""
    };
  }

  componentDidMount() {
    this.setState({
      gender: this.props.gender
    });
  }

  handleChange = e => {
    this.setState({ gender: e.target.value });
    this.props.genderToParent(e.target.value);
  };

  render() {
    return (
      <div className="switch-field">
        <input
          type="radio"
          id="radio-one"
          name="switch-one"
          value="man"
          onChange={this.handleChange}
          checked={this.state.gender === "man"}
          className="input-modal"
        />
        <label htmlFor="radio-one">Man</label>
        <input
          type="radio"
          id="radio-two"
          name="switch-one"
          value="woman"
          onChange={this.handleChange}
          checked={this.state.gender === "woman"}
          className="input-modal"
        />
        <label htmlFor="radio-two">Woman</label>
      </div>
    );
  }
}

class SelectSexOrientation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sexOrientation: ""
    };
  }

  componentDidMount() {
    this.setState({
      sexOrientation: this.props.sexOrientation
    });
  }

  handleChange = e => {
    this.setState({ sexOrientation: e.target.value });
    this.props.sexOrientationToParent(e.target.value);
  };

  render() {
    return (
      <div className="switch-field">
        <input
          type="radio"
          id="radio-three"
          name="switch-two"
          value="bi"
          onChange={this.handleChange}
          checked={this.state.sexOrientation === "bi"}
          className="input-modal"
        />
        <label htmlFor="radio-three">Bi</label>
        <input
          type="radio"
          id="radio-four"
          name="switch-two"
          value="hetero"
          onChange={this.handleChange}
          checked={this.state.sexOrientation === "hetero"}
        />
        <label htmlFor="radio-four">Hetero</label>
        <input
          type="radio"
          id="radio-five"
          name="switch-two"
          value="homo"
          onChange={this.handleChange}
          checked={this.state.sexOrientation === "homo"}
          className="input-modal"
        />
        <label htmlFor="radio-five">Homo</label>
      </div>
    );
  }
}

class InputTwoNames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: ""
    };
  }

  componentDidMount() {
    this.setState({
      firstname: this.props.firstname,
      lastname: this.props.lastname
    });
  }

  handleChange = e => {
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
    if (name === "firstname") this.props.firstnameToParent(e.target.value);
    else if (name === "lastname") this.props.lastnameToParent(e.target.value);
  };

  render() {
    return (
      <div>
        <TextInput
          name="firstname"
          label="Firstname"
          value={this.state.firstname}
          onChange={this.handleChange}
          className="input-modal"
        />
        <TextInput
          name="lastname"
          label="Lastname"
          value={this.state.lastname}
          onChange={this.handleChange}
          className="input-modal"
        />
      </div>
    );
  }
}

class InputBio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bio: ""
    };
  }

  componentDidMount() {
    this.setState({
      bio: this.props.bio
    });
  }

  handleChange = e => {
    this.setState({
      bio: e.target.value
    });
    this.props.bioToParent(e.target.value);
  };

  render() {
    return (
      <Textarea
        label="Say something about you..."
        onChange={this.handleChange}
        value={this.props.bio}
        data-length={140}
      />
    );
  }
}

class BirthdatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      birthdate: null
    };
  }

  componentDidMount() {
    this.setState({
      birthdate: this.props.birthdate
    });
  }

  handleChange = e => {
    this.setState({
      birthdate: document.querySelector(".birthdate-picker-modal").value
    });
    this.props.birthdateToParent(
      document.querySelector(".birthdate-picker-modal").value
    );
  };

  render() {
    return (
      <div>
        <label className="left-label" htmlFor="birthdate-edit-profile">
          Birthdate
        </label>
        <DatePicker
          options={{
            defaultDate: new Date(this.props.birthdate),
            setDefaultDate: true,
            container: "#root",
            onClose: this.handleChange
          }}
          className="birthdate-picker-modal"
          id="birthdate-edit-profile"
        />
      </div>
    );
  }
}

class InterestTags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myTagsArray: ["sea", "sex", "fun"],
      defaultTagsArray: [
        "beer",
        "pizza",
        "alcohol",
        "rice",
        "barbec",
        "vodka",
        "xbox one",
        "ps4",
        "hello les amis",
        "radiateur",
        "slient",
        "lolling",
        "not lolling hard",
        "poneys"
      ]
    };
    this.chipSelectDefault = this.chipSelectDefault.bind(this);
    this.chipDelete = this.chipDelete.bind(this);
  }

  createMyTags(tab) {
    this.setState({
      myTagsArray: tab
    });
  }

  chipDelete() {
    const tagElements = document.querySelectorAll(".my-tags-chip > .chip");
    let tagsTab = [];
    for (var value of tagElements.values()) {
      tagsTab = tagsTab.concat(value.innerText.replace("\nclose", ""));
    }
    this.createMyTags(tagsTab);
  }

  chipSelectDefault(target) {
    if (
      !this.state.myTagsArray.find(
        tag => tag === target[0].children[0].innerText
      )
    ) {
      this.setState(state => {
        const myTagsArray = state.myTagsArray.concat(
          target[0].children[0].innerText
        );
        return {
          myTagsArray
        };
      });
    } else {
      InfoToast.default.info(
        `Tag ${target[0].children[0].innerText} has already been added`
      );
    }
  }

  render() {
    function tagToArray(tagValue) {
      return [
        {
          tag: tagValue
        }
      ];
    }

    const myTags = this.state.myTagsArray.map(tagEl => (
      <Chip
        key={tagEl}
        options={{
          data: tagToArray(tagEl),
          onChipDelete: this.chipDelete
        }}
        className="my-tags-chip chip-general"
      />
    ));

    const defaultTags = this.state.defaultTagsArray.map(tagEl => (
      <Chip
        key={tagEl}
        close={false}
        options={{
          data: tagToArray(tagEl),
          onChipSelect: this.chipSelectDefault
        }}
        className="chip-general"
      />
    ));

    const emptyTags = <p class="no-tags-message">No interests yet</p>;

    return (
      <div className="tags-component">
        <div>
          <p>Already interested in</p>
          {myTags.length ? myTags : emptyTags}
        </div>
        <div className="chips-default-tags">
          <p>Add more interests</p>
          {defaultTags}
        </div>
      </div>
    );
  }
}

class SelectLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: "",
      long: "",
      city: "Not set",
      cityInput: "",
      editLocationActive: false
    };
    this.citiesJSON = cities["France"];
  }

  componentDidMount() {
    this.initGeolocator();
    if (this.props.lat && this.props.long) {
      this.getCityFromLatLong(this.props.lat, this.props.long);
      this.setState({
        lat: this.props.lat,
        long: this.props.long
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.city !== prevState.city &&
      prevState.city !== undefined &&
      prevState.city !== "" &&
      prevState.city !== "Not set"
    ) {
      InfoToast.default.info("Your city has been changed");
    }
  }

  initGeolocator = () => {
    GeoPosition.config({
      language: "en",
      google: {
        version: "3",
        key: "AIzaSyCrQGnPtopWTSK9joyPAxlEGcl535KlQQQ"
      }
    });
  };

  showPosition = pos => {
    var options = {
      enableHighAccuracy: true,
      desiredAccuracy: 30,
      timeout: 5000,
      maximumWait: 5000,
      maximumAge: 0,
      fallbackToIP: true,
      addressLookup: true
    };
    GeoPosition.locate(options, (err, location) => {
      console.log(err || location);
      this.setState({ userLocation: location });
      this.setState({ city: location.address.city });
      this.setState({ lat: location.coords.latitude });
      this.setState({ long: location.coords.longitude });
      this.setState({ locationValid: true });
      this.props.latToParent(location.coords.latitude);
      this.props.longToParent(location.coords.longitude);
    });
  };

  errorPosition = error => {
    var options = {
      homeMobileCountryCode: 208,
      homeMobileNetworkCode: 1,
      carrier: "Orange",
      radioType: GeoPosition.RadioType.GSM,
      fallbackToIP: true,
      addressLookup: true,
      timezone: false
    };
    GeoPosition.locateByMobile(options, (err, location) => {
      console.log(err || location);
      this.setState({ userLocation: location });
      this.setState({ city: location.address.city });
      this.setState({ lat: location.coords.latitude });
      this.setState({ long: location.coords.longitude });
      this.setState({ locationValid: true });
      this.props.latToParent(location.coords.latitude);
      this.props.longToParent(location.coords.longitude);
    });
  };

  getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      this.showPosition,
      this.errorPosition
    );
  };

  getCityFromLatLong = (lat, long) => {
    const coords = {
      latitude: lat,
      longitude: long
    };

    GeoPosition.reverseGeocode(coords, (err, location) => {
      console.log(err || location.address.city);
      if (location.address.city) this.setState({ city: location.address.city });
      else
        ErrorToast.default.error(
          "Couldn't get city from coordinates, please try again later...",
          1400
        );
    });
  };

  getLatLongFromCity = city => {
    GeoPosition.geocode(city, (err, location) => {
      console.log(err || location);
      if (location !== null && location.coords.longitude !== null) {
        this.setState({
          lat: location.coords.latitude,
          long: location.coords.longitude
        });
        this.props.latToParent(location.coords.latitude);
        this.props.longToParent(location.coords.longitude);
      } else {
        ErrorToast.default.error(
          "Couldn't get coordinates from city entered",
          1000
        );
      }
    });
  };

  showEditLocation = () => {
    this.setState({
      editLocationActive: true
    });
  };

  hideEditLocation = () => {
    this.setState({
      editLocationActive: false
    });
  };

  switchEditLocation = () => {
    if (this.state.editLocationActive) this.hideEditLocation();
    else this.showEditLocation();
  };

  geolocateMe = () => {
    this.getLocation();
    this.hideEditLocation();
    InfoToast.default.info("Please wait while you are being geolocated...");
  };

  confirmAutoCity = () => {
    document.querySelectorAll(".edit-location-submit")[0].disabled = false;
  };

  handleAutocompleteSubmit = () => {
    if (
      document.querySelectorAll(".edit-location-autoc-input > input")[0].value
    ) {
      this.setState({
        city: document.querySelectorAll(".edit-location-autoc-input > input")[0]
          .value
      });
      this.getLatLongFromCity(
        document.querySelectorAll(".edit-location-autoc-input > input")[0].value
      );
      this.hideEditLocation();
    } else {
      ErrorToast.default.error("Please enter a city", 1400);
    }
  };

  handleAutocompleteChange = () => {
    document.querySelectorAll(".edit-location-submit")[0].disabled = true;
  };

  render() {
    return (
      <div className="location-component">
        <p>Your city is:</p>
        {this.state.city}
        <Button
          waves="light"
          style={{ marginLeft: "15px" }}
          onClick={this.switchEditLocation}
        >
          Edit
          <Icon left>edit_location</Icon>
        </Button>
        {this.state.editLocationActive ? (
          <div className="edit-location-input">
            <div className="edit-location-autoc">
              <Autocomplete
                className="edit-location-autoc-input"
                style={{ display: "inline-block" }}
                options={{
                  data: this.citiesJSON,
                  minLength: 3,
                  onAutocomplete: this.confirmAutoCity
                }}
                placeholder="Insert city here"
                icon="place"
                onChange={this.handleAutocompleteChange}
              />
              <Button
                className="edit-location-submit"
                onClick={this.handleAutocompleteSubmit}
              >
                Confirm
              </Button>
            </div>
            <p>Or</p>
            <Button waves="light" onClick={this.geolocateMe}>
              Geolocate me
              <Icon left>location_searching</Icon>
            </Button>
          </div>
        ) : (
          false
        )}
      </div>
    );
  }
}

export {
  SelectGender,
  SelectSexOrientation,
  InputTwoNames,
  InputBio,
  BirthdatePicker,
  InterestTags,
  SelectLocation
};
