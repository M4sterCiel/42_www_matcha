import React, { Component } from "react";
import { Button } from "react-materialize";
import ErrorToast from "../services/ErrorToastService";

class EditProfilePictures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: []
    };
  }

  componentDidMount() {
    this.setState({
      pictures: this.props.pictures
    });
  }

  handlePictureSelect = (id, e) => {
    let file = e.target.files[0];
    if (file) {
      if (this.isPictureTypeValid(file)) {
        this.processPictureFileIfValid(file, e.target, id);
      } else {
        ErrorToast.custom.error("Please upload a correct image", 1400);
      }
    }
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

  doesMainProfilePicExist = pictures => {
    return pictures.some(picture => {
      return picture["mainPic"] === true;
    });
  };

  processPicture = (file, target, id) => {
    let reader = new FileReader();

    reader.onloadend = () => {
      const pics = this.state.pictures;
      pics[id].url = reader.result;
      if (!this.doesMainProfilePicExist(pics)) pics[id].mainPic = true;
      this.setState({
        pictures: pics
      });
      this.props.picturesToParent(pics);
    };
    reader.readAsDataURL(file);
    target.closest(".picture-box").querySelector(".image-upload").value = "";
    this.setNoPictureDefault(target);
  };

  makePictureMainProfilePicture = id => {
    if (id === false) {
      return;
    }
    const pics = this.state.pictures;
    pics.forEach(pic => {
      pic.mainPic = false;
    });
    pics[id].mainPic = true;
    this.setState({
      pictures: pics
    });
    this.props.picturesToParent(pics);
  };

  setNoPictureDefault = target => {
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

  removeNoPictureDefault = target => {
    if (
      target
        .closest(".picture-box")
        .querySelector(".js--image-preview")
        .className.indexOf("js--no-default") !== -1
    )
      target
        .closest(".picture-box")
        .querySelector(".js--image-preview")
        .classList.remove("js--no-default");
  };

  showEditPictureUI = e => {
    e.target
      .closest(".js--image-preview")
      .querySelector(".btn-container-edit-picture").style.display = "block";
  };

  hideEditPictureUI = e => {
    e.target
      .closest(".js--image-preview")
      .querySelector(".btn-container-edit-picture").style.display = "none";
  };

  showMessageToAddPic = e => {
    e.target.closest(".js--image-preview").style.opacity = "0.5";
    e.target
      .closest(".js--image-preview")
      .querySelector(".placeholder-message-no-pic").style.display = "block";
  };

  hideMessageToAddPic = e => {
    e.target.closest(".js--image-preview").style.opacity = "1";
    e.target
      .closest(".js--image-preview")
      .querySelector(".placeholder-message-no-pic").style.display = "none";
  };

  findExistingPicture = id => {
    let i = 0;
    while (i < this.state.pictures.length) {
      if (i === id) {
        i++;
      } else if (this.state.pictures[i].url !== "") {
        return i;
      } else {
        i++;
      }
    }
    return false;
  };

  handleRemovePicture = (id, e) => {
    e.target
      .closest(".picture-box")
      .querySelector(".js--image-preview").style.backgroundImage = "url()";
    if (this.state.pictures[id].mainPic === true) {
      this.makePictureMainProfilePicture(this.findExistingPicture(id));
    }
    const pics = this.state.pictures;
    pics[id].url = "";
    pics[id].mainPic = false;
    this.setState({
      pictures: pics
    });
    this.props.picturesToParent(pics);
    this.removeNoPictureDefault(
      e.target.closest(".picture-box").querySelector(".js--image-preview")
    );
  };

  render() {
    const pictureBoxes = this.state.pictures.map((picture, index) => (
      <div className="picture-box" key={index}>
        <div
          className={
            picture.url !== ""
              ? "js--image-preview js--no-default"
              : "js--image-preview"
          }
          onMouseOver={
            picture.url !== ""
              ? e => this.showEditPictureUI(e)
              : e => this.showMessageToAddPic(e)
          }
          onMouseLeave={
            picture.url !== ""
              ? e => this.hideEditPictureUI(e)
              : e => this.hideMessageToAddPic(e)
          }
          style={{ backgroundImage: `url(${picture.url})` }}
        >
          {picture.url !== "" && (
            <div>
              {picture.mainPic && (
                <Button
                  floating
                  icon="star"
                  className="blue btn-star-picture-main"
                  tooltip="Main profile picture"
                  waves="light"
                />
              )}
              <div className="btn-container-edit-picture">
                {!picture.mainPic && (
                  <Button
                    floating
                    icon="star"
                    className="blue btn-star-picture"
                    tooltip="Make profile picture"
                    waves="light"
                    onClick={() => this.makePictureMainProfilePicture(index)}
                  />
                )}
                <Button
                  floating
                  icon="delete"
                  className="red btn-delete-picture"
                  tooltip="Delete picture"
                  waves="light"
                  onClick={e => this.handleRemovePicture(index, e)}
                />
              </div>
            </div>
          )}
          {picture.url === "" && (
            <div className="placeholder-message-no-pic">
              Add a picture by clicking on "+"
            </div>
          )}
        </div>
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
