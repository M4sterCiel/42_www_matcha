import React, { Component } from "react";
import { Select } from "react-materialize";

class SelectGender extends Component {
  render() {
    return (
      <Select value="" icon="accessibility">
        <option value="" disabled>
          Gender
        </option>
        <option value="man">Man</option>
        <option value="woman">Woman</option>
      </Select>
    );
  }
}

export { SelectGender };
