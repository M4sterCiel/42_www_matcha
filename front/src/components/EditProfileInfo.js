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
      myTagsArray: ["sea", "sex", "fun"],
      defaultTagsArray: ["beer", "pizza", "alcohol"]
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
        className="my-tags-chip"
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
      />
    ));

    return (
      <div className="tags-component">
        <div>
          <p>Your tags</p>
          {myTags}
        </div>
        <div className="chips-default-tags">
          <p>Select other tags from</p>
          {defaultTags}
        </div>
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
