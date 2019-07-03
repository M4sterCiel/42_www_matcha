import React, { Component } from "react";
import { connect } from "react-redux";

class UserProfile extends Component {
  render() {
    if (this.props.userData && this.props.userError === undefined) {
      return <div>{this.props.userData.firstname}</div>;
    } else return <div>{this.props.userError}</div>;
  }
}

const mapStateToProps = state => {
  return {
    userData: state.user.data,
    userError: state.user.status
  };
};

export default connect(mapStateToProps)(UserProfile);
