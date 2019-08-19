import React, { Component } from "react";
import { Button } from "react-materialize";
import LikeNotif from "@material-ui/icons/ThumbUp";

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
        Like{" "}
        <span style={iconStyle}>
          <LikeNotif />
        </span>
      </Button>
    );
  }
}

export { ProfileSettingsButton, ProfileActionsButton, LikeButton };
