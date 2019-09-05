import React, { Component } from "react";
import { Row, Col, Collection, CollectionItem } from "react-materialize";

class ViewProfilesList extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col m={6} s={12}>
            <Collection>
              <CollectionItem className="avatar">
                <img
                  src="https://materializecss.com/images/yuna.jpg"
                  alt=""
                  className="circle"
                />
                <span className="title">Title1</span>
                <p>
                  First Line
                  <br />
                  Second Line
                </p>
              </CollectionItem>
              <CollectionItem className="avatar">
                <img
                  src="https://materializecss.com/images/yuna.jpg"
                  alt=""
                  className="circle"
                />
                <span className="title">Title2</span>
                <p>
                  First Line
                  <br />
                  Second Line
                </p>
              </CollectionItem>
            </Collection>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ViewProfilesList;
