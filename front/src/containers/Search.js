import React, { Component } from "react";
import { connect } from "react-redux";
import NavBar from "../components/NavBar";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plop: ""
    };
  }

  render() {
    return (
      <div className="App">
        <NavBar />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userConnectedData: state.user.data,
    userConnectedStatus: state.user.status
  };
};

export default connect(mapStateToProps)(Search);
