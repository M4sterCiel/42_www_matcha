import React, { Component } from "react";
import { Select } from "react-materialize";

class SortUserList extends Component {
  render() {
    return (
      <Select value="">
        <option value="" disabled>
          Sort by
        </option>
        <option value="1">age: youngest to oldest</option>
        <option value="2">age: oldest to youngest</option>
        <option value="3">distance: nearest to farthest</option>
        <option value="4">distance: farthest to nearest</option>
        <option value="5">popularity: lowest to highest</option>
        <option value="6">popularity: highest to lowest</option>
        <option value="7">common tags: lowest to highest</option>
        <option value="8">common tags: highest to lowest</option>
      </Select>
    );
  }
}

export default SortUserList;
