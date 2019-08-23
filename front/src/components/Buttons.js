import React, { Component } from "react";
import { Button } from "react-materialize";
import LikeIcon from "@material-ui/icons/ThumbUp";
import DislikeIcon from "@material-ui/icons/ThumbDown";

class ProfileSettingsButton extends Component {
  render() {
    return (
      <Button
        floating
        fab={{ direction: "left", hoverEnabled: false }}
        icon="settings"
        className="blue pulse"
        large
      >
        <Button
          floating
          tooltip="edit profile info"
          icon="edit"
          className="blue modal-trigger"
          href="#edit-profile-modal"
        />
        <Button
          floating
          tooltip="add/edit profile pictures"
          icon="add_a_photo"
          className="blue modal-trigger"
          href="#edit-pictures-modal"
        />
        <Button
          floating
          tooltip="edit account settings"
          icon="account_circle"
          className="blue modal-trigger"
          href="#edit-account-modal"
        />
      </Button>
    );
  }
}

class ProfileActionsButton extends Component {
  render() {
    return (
      <Button
        floating
        fab={{ direction: "left", hoverEnabled: false }}
        icon="more_vert"
        className="red pulse"
        large
      >
        <Button
          floating
          tooltip="report this user"
          icon="report"
          className="red"
        />
        <Button
          floating
          tooltip="block this user"
          icon="block"
          className="red"
        />
      </Button>
    );
  }
}

class LikeButton extends Component {
  render() {
    const iconStyle = { position: "relative", top: "5px" };
    return (
      <Button tooltip="like this user" className="red">
        <span className="like-btn-text">Like</span>{" "}
        <span style={iconStyle}>
          <LikeIcon />
        </span>
      </Button>
    );
  }
}

class LikeBackButton extends Component {
  render() {
    const iconStyle = { position: "relative", top: "5px" };
    return (
      <Button tooltip="like back this user" className="red">
        <span className="like-btn-text">Like </span>Back{" "}
        <span style={iconStyle}>
          <LikeIcon />
        </span>
      </Button>
    );
  }
}

class DislikeButton extends Component {
  render() {
    const iconStyle = { position: "relative", top: "5px" };
    return (
      <Button tooltip="dislike this user" className="red">
        <span className="like-btn-text">Dislike </span>{" "}
        <span style={iconStyle}>
          <DislikeIcon />
        </span>
      </Button>
    );
  }
}

export {
  ProfileSettingsButton,
  ProfileActionsButton,
  LikeButton,
  LikeBackButton,
  DislikeButton
};
