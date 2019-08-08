import React, { Component } from "react";
import { EditProfilePictures } from "../EditProfilePictures";
import { Modal } from "react-materialize";

class ModalUserEditProfilePictures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: [
        {
          mainPic: true,
          url:
            "https://news.nationalgeographic.com/content/dam/news/2018/05/17/you-can-train-your-cat/02-cat-training-NationalGeographic_1484324.ngsversion.1526587209178.adapt.1900.1.jpg"
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
    this.handlePicturesData = this.handlePicturesData.bind(this);
  }

  handlePicturesData(data) {
    this.setState({
      pictures: data
    });
  }

  render() {
    return (
      <div>
        <Modal
          id="edit-pictures-modal"
          className="modals"
          header="Edit your profile pictures"
          fixedFooter
          trigger={false}
        >
          <p className="modal-intro">
            Add up to 5 profile pictures (adding pictures helps with growing
            popularity)
          </p>
          <EditProfilePictures
            pictures={this.state.pictures}
            picturesToParent={this.handlePicturesData}
          />
        </Modal>
      </div>
    );
  }
}

export default ModalUserEditProfilePictures;
