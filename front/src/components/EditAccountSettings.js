import React, { Component } from "react";
import Slider from "@material-ui/core/Slider";

class AgeSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: []
    };
  }

  componentDidMount() {
    this.setState({
      value: this.props.range
    });
  }

  handleChange = (e, newValue) => {
    this.setState({
      value: newValue
    });
    this.props.ageToParent(newValue);
  };

  render() {
    return (
      <div className="slider-container">
        <label className="left-label slider-label" htmlFor="slider-edit-age">
          Age range (y/o)
        </label>
        <label className="right-label slider-label" htmlFor="slider-edit-age">
          {this.state.value[0]}-{this.state.value[1]}
          {this.state.value[1] === 99 && "+"} y/o
        </label>
        <Slider
          name="slider-edit-age"
          min={18}
          max={99}
          value={this.state.value}
          onChange={this.handleChange}
          valueLabelDisplay="auto"
        />
      </div>
    );
  }
}

class DistanceSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null
    };
  }

  componentDidMount() {
    this.setState({
      value: this.props.value
    });
  }

  handleChange = (e, newValue) => {
    this.setState({
      value: newValue
    });
    this.props.distanceToParent(newValue);
  };

  render() {
    return (
      <div className="slider-container">
        <label
          className="left-label slider-label"
          htmlFor="slider-edit-distance"
        >
          Maximum distance (km)
        </label>
        <label
          className="right-label slider-label"
          htmlFor="slider-edit-distance"
        >
          {this.state.value} km
        </label>
        <Slider
          name="slider-edit-distance"
          min={0}
          max={50}
          value={this.state.value}
          onChange={this.handleChange}
          valueLabelDisplay="auto"
        />
      </div>
    );
  }
}

class PopularitySlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: []
    };
  }

  componentDidMount() {
    this.setState({
      value: this.props.range
    });
  }

  handleChange = (e, newValue) => {
    this.setState({
      value: newValue
    });
    this.props.popularityToParent(newValue);
  };

  render() {
    return (
      <div className="slider-container">
        <label
          className="left-label slider-label"
          htmlFor="slider-edit-popularity"
        >
          Popularity range (°)
        </label>
        <label
          className="right-label slider-label"
          htmlFor="slider-edit-popularity"
        >
          {this.state.value[0]}-{this.state.value[1]}
          {this.state.value[1] === 1000 && "+"}°
        </label>
        <Slider
          name="slider-edit-popularity"
          min={0}
          max={1000}
          value={this.state.value}
          onChange={this.handleChange}
          valueLabelDisplay="auto"
        />
      </div>
    );
  }
}

class CommonInterestsSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: []
    };
  }

  componentDidMount() {
    this.setState({
      value: this.props.range
    });
  }

  handleChange = (e, newValue) => {
    this.setState({
      value: newValue
    });
    this.props.commonInterestsToParent(newValue);
  };

  render() {
    return (
      <div className="slider-container">
        <label
          className="left-label slider-label"
          htmlFor="slider-edit-common-interests"
        >
          Number of interests in common
        </label>
        <label
          className="right-label slider-label"
          htmlFor="slider-edit-common-interests"
        >
          {this.state.value[0]}-{this.state.value[1]}
          {this.state.value[1] === 25 && "+"} interests
        </label>
        <Slider
          name="slider-edit-common-interests"
          min={0}
          max={25}
          value={this.state.value}
          onChange={this.handleChange}
          valueLabelDisplay="auto"
        />
      </div>
    );
  }
}

export { AgeSlider, DistanceSlider, PopularitySlider, CommonInterestsSlider };
