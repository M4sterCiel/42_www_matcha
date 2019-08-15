import React, { Component } from "react";

class UserBio extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-content">
          <h5>Bio</h5>
          {this.props.bio}
        </div>
      </div>
    );
  }
}

export default UserBio;
