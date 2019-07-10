import React, { Component } from "react";
import { TextInput, Textarea, DatePicker, Chip } from "react-materialize";

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
      <div className="switch-field two-fields-switch">
        <input
          type="radio"
          id="radio-one"
          name="switch-one"
          value="man"
          onChange={this.handleChange}
          checked={this.state.gender === "man"}
        />
        <label htmlFor="radio-one">Man</label>
        <input
          type="radio"
          id="radio-two"
          name="switch-one"
          value="woman"
          onChange={this.handleChange}
          checked={this.state.gender === "woman"}
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
      <div className="switch-field three-fields-switch">
        <input
          type="radio"
          id="radio-three"
          name="switch-two"
          value="bi"
          onChange={this.handleChange}
          checked={this.state.sexOrientation === "bi"}
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
      <div className="modal-name-input">
        <TextInput
          name="firstname"
          label="firstname"
          value={this.state.firstname}
          onChange={this.handleChange}
        />
        <TextInput
          name="lastname"
          label="lastname"
          value={this.state.lastname}
          onChange={this.handleChange}
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
      <DatePicker
        options={{
          defaultDate: new Date(this.props.birthdate),
          setDefaultDate: true,
          container: "#root",
          onClose: this.handleChange
        }}
        className="birthdate-picker-modal"
      />
    );
  }
}

class InterestTags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myTagsArray: ["1", "2", "3"],
      defaultTagsArray: ["4", "5", "6"]
    };
  }

  render() {
    const myTags = this.state.myTagsArray.map(tagEl => (
      <Chip close={true}>{tagEl}</Chip>
    ));
    const defaultTags = this.state.defaultTagsArray.map(tagEl => (
      <Chip close={false}>{tagEl}</Chip>
    ));
    return (
      <div className="tags-component">
        {myTags}
        {defaultTags}
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
  InterestTags
};
