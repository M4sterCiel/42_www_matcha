import React, { Component } from "react";
import { Slider, Slide } from "react-materialize";
import NoImage from "../../assets/no-image.jpeg";

class Pictures extends Component {
  render() {
    const NoSlide = (
      <Slide image={<img src={NoImage} alt="no pic set" />}></Slide>
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
          {this.props.pictures !== undefined && (
            <Slider>
              {this.props.pictures.length === 0 ? NoSlide : Slides}
            </Slider>
          )}
        </div>
      </div>
    );
  }
}

export default Pictures;
