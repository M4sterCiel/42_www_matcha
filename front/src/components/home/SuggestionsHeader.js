import React, { Component } from "react";
import { Col, Card } from "react-materialize";

class CompleteProfile extends Component {
  render() {
    return (
      <Col s={12}>
        <Card
          className="suggestions-header"
          textClassName="white-text"
          title="Your profile suggestions"
          actions={[
            <a
              key={0}
              className="modal-trigger suggestions-header-links"
              href="#edit-profile-modal"
            >
              Sort
            </a>,
            <a
              key={1}
              className="modal-trigger suggestions-header-links"
              href="#edit-pictures-modal"
            >
              Filter
            </a>
          ]}
        >
          We found potential people you might be interested in!
        </Card>
      </Col>
    );
  }
}

export default CompleteProfile;
