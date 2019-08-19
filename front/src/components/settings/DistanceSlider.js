import React, { Component } from "react";
import Slider from "@material-ui/core/Slider";

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
  };

  handleChangeCommitted = (e, newValue) => {
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
        {this.state.value !== null && (
          <Slider
            name="slider-edit-distance"
            min={1}
            max={100}
            value={this.state.value}
            onChange={this.handleChange}
            onChangeCommitted={this.handleChangeCommitted}
            valueLabelDisplay="auto"
          />
        )}
      </div>
    );
  }
}

export default DistanceSlider;
