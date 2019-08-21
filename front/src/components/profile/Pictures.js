import React, { Component } from "react";
import { Slider, Slide, Caption } from "react-materialize";
import NoImage from "../../assets/no-image.jpg";

class Pictures extends Component {
  render() {
    const NoSlide = (
      <Slide image={<img src={NoImage} alt="no pic set" />}>
        <Caption>
          <h3>No picture yet</h3>
          <h5 className="light grey-text text-lighten-3">It's sad :(</h5>
        </Caption>
      </Slide>
    );

    const Slides = this.props.pictures.map(picture => (
      <Slide
        key={picture.id}
        image={<img src={picture.url} alt={"picture " + picture.index} />}
      />
    ));

    return (
      <div className="card">
        <div className="card-content">
          <p className="profile-info-title">Pictures</p>
          <Slider>{this.props.pictures.length === 0 ? NoSlide : Slides}</Slider>
        </div>
      </div>
    );
  }
}

export default Pictures;
