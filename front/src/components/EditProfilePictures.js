import React, { Component } from "react";
import ErrorToast from "../services/ErrorToastService";

class EditProfilePictures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: [
        {
          mainPic: false,
          url: ""
        },
        {
          mainPic: false,
          url: ""
        },
        {
          mainPic: false,
          url: ""
        },
        {
          mainPic: false,
          url: ""
        },
        {
          mainPic: false,
          url: ""
        }
      ]
    };
  }

  componentDidMount() {
    /*     let boxes = document.querySelectorAll(".picture-box");

    for (let i = 0; i < boxes.length; i++) {
      let box = boxes[i];
      let mainPic = this.state.pictures[i].mainPic;
      let url = this.state.pictures[i].url;
      this.initImageUpload(box, mainPic, url);
    } */
  }

  handlePictureSelect = (id, e) => {
    let file = e.target.files[0];
    this.checkType(file, e.target, id);
  };

  processPicture = (file, target, id) => {
    let reader = new FileReader();

    reader.onload = () => {
      target
        .closest(".picture-box")
        .querySelector(".js--image-preview").style.backgroundImage =
        "url(" + reader.result + ")";
    };

    reader.onloadend = () => {
      this.setState(state => {
        const pictures = state.pictures;
        pictures[id].url = reader.result;
        return {
          pictures
        };
      });
    };
    reader.readAsDataURL(file);
    if (
      target
        .closest(".picture-box")
        .querySelector(".js--image-preview")
        .className.indexOf("js--no-default") === -1
    )
      target
        .closest(".picture-box")
        .querySelector(".js--image-preview").className += " js--no-default";
  };

  checkType = (file, target, id) => {
    let imageType = /image.*/;
    if (!file) {
      ErrorToast.default.error("Please upload a correct image", 1400);
      return;
    } else if (!file.type.match(imageType)) {
      ErrorToast.default.error("Please upload a correct image", 1400);
      return;
    } else {
      this.processPicture(file, target, id);
    }
  };

  render() {
    const pictureBoxes = this.state.pictures.map((picture, index) => (
      <div className="picture-box" key={index}>
        <div className="js--image-preview" />
        <div
          className="upload-options"
          onChange={e => this.handlePictureSelect(index, e)}
        >
          <label>
            <input type="file" className="image-upload" accept="image/*" />
            <i className="material-icons picture-edit-add-icon">
              {picture.url !== "" ? "edit" : "add"}
            </i>
          </label>
        </div>
      </div>
    ));
    return (
      <div className="edit-pictures-box">
        {pictureBoxes}
        {/* <div className="picture-box">
          <div className="js--image-preview" />
          <div
            className="upload-options"
            onChange={e => this.handlePictureSelect(0, e)}
          >
            <label>
              <input type="file" className="image-upload" accept="image/*" />
              <i className="material-icons picture-edit-add-icon">
                {this.state.pictures[0].url !== "" ? "edit" : "add"}
              </i>
            </label>
          </div>
        </div>
        <div className="picture-box">
          <div className="js--image-preview" />
          <div
            className="upload-options"
            onChange={e => this.handlePictureSelect(1, e)}
          >
            <label>
              <input type="file" className="image-upload" accept="image/*" />
              <i className="material-icons picture-edit-add-icon">
                {this.state.pictures[1].url !== "" ? "edit" : "add"}
              </i>
            </label>
          </div>
        </div>
        <div className="picture-box">
          <div className="js--image-preview" />
          <div
            className="upload-options"
            onChange={e => this.handlePictureSelect(2, e)}
          >
            <label>
              <input type="file" className="image-upload" accept="image/*" />
              <i className="material-icons picture-edit-add-icon">
                {this.state.pictures[2].url !== "" ? "edit" : "add"}
              </i>
            </label>
          </div>
        </div>
        <div className="picture-box">
          <div className="js--image-preview" />
          <div
            className="upload-options"
            onChange={e => this.handlePictureSelect(3, e)}
          >
            <label>
              <input type="file" className="image-upload" accept="image/*" />
              <i className="material-icons picture-edit-add-icon">
                {this.state.pictures[3].url !== "" ? "edit" : "add"}
              </i>
            </label>
          </div>
        </div>
        <div className="picture-box">
          <div className="js--image-preview" />
          <div
            className="upload-options"
            onChange={e => this.handlePictureSelect(4, e)}
          >
            <label>
              <input type="file" className="image-upload" accept="image/*" />
              <i className="material-icons picture-edit-add-icon">
                {this.state.pictures[4].url !== "" ? "edit" : "add"}
              </i>
            </label>
          </div>
        </div> */}
      </div>
    );
  }
}

export { EditProfilePictures };
