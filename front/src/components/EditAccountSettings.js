import React, { Component } from "react";
import Slider from "@material-ui/core/Slider";

class AgeSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [20, 80]
    };
  }
  componentDidMount() {}

  handleChange = (e, newValue) => {
    this.setState({
      value: newValue
    });
  };

  render() {
    return (
      <Slider
        min={18}
        max={99}
        value={this.state.value}
        onChange={this.handleChange}
        valueLabelDisplay="auto"
      />
    );
  }
}

export { AgeSlider };
