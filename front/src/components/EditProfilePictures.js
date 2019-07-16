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
    if (file) {
      if (this.isPictureTypeValid(file)) {
        this.processPictureFileIfValid(file, e.target, id);
      } else {
        ErrorToast.default.error("Please upload a correct image", 1400);
      }
    }
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

  isPictureTypeValid = file => {
    let imageType = /image.*/;
    if (!file.type.match(imageType)) {
      return false;
    }
    return true;
  };

  processPictureFileIfValid = (file, target, id) => {
    let pic = new Image();

    pic.src = window.URL.createObjectURL(file);
    pic.onload = () => {
      let width = pic.naturalWidth;
      let height = pic.naturalHeight;
      window.URL.revokeObjectURL(pic.src);
      if (width && height) {
        this.processPicture(file, target, id);
      }
    };
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
    return <div className="edit-pictures-box">{pictureBoxes}</div>;
  }
}

export { EditProfilePictures };
