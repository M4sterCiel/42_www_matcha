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
  };

  handleChangeCommitted = (e, newValue) => {
    this.props.ageToParent(newValue);
  };

  render() {
    return (
      <div className="slider-container">
        <label className="left-label slider-label" htmlFor="slider-edit-age">
          Age range (y/o)
        </label>
        <label className="right-label slider-label" htmlFor="slider-edit-age">
          {this.state.value[0]}-{this.state.value[1]} y/o
        </label>
        <Slider
          name="slider-edit-age"
          min={18}
          max={99}
          value={this.state.value}
          onChange={this.handleChange}
          onChangeCommitted={this.handleChangeCommitted}
          valueLabelDisplay="auto"
        />
      </div>
    );
  }
}

export default AgeSlider;
