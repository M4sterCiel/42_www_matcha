import React, { Component } from "react";
import { TextInput } from "react-materialize";

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
    this.props.genderToParent(this.state.gender);
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
    this.props.sexOrientationToParent(this.state.sexOrientation);
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

class InputName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }

  componentDidMount() {
    this.setState({
      name: this.props.defaultname
    });
  }

  handleKeyup = e => {
    e.preventDefault();
    this.props.nameToParent(this.state.name);
  };

  handleChange = e => {
    this.setState({ name: e.target.value });
  };

  render() {
    return (
      <TextInput
        label="name"
        value={this.state.name}
        onChange={this.handleChange}
        onKeyUp={this.handleKeyup}
      />
    );
  }
}

class InputTwoFields extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: ""
    };
  }

  componentDidMount() {
    console.log(this.props.defaultdata);
    this.setState({
      firstname: this.props.defaultdata.firstname,
      lastname: this.props.defaultdata.lastname
    });
  }

  handleFirstNameKeyup = e => {
    e.preventDefault();
    this.props.nameToParent(this.state.firstname);
  };

  handleLastNameKeyup = e => {
    e.preventDefault();
    this.props.nameToParent(this.state.lastname);
  };

  handleChange = e => {
    this.setState({ name: e.target.value });
  };

  render() {
    return (
      <div>
        <TextInput
          label="firstname"
          value={this.state.firstname}
          onChange={this.handleChange}
          onKeyUp={this.handleFirstNameKeyup}
        />
        <TextInput
          label="lastname"
          value={this.state.lastname}
          onChange={this.handleChange}
          onKeyUp={this.handleLastNameKeyup}
        />
      </div>
    );
  }
}

export { SelectGender, SelectSexOrientation, InputName, InputTwoFields };
