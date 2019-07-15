import React, { Component } from "react";
import { Button } from "react-materialize";

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
          tooltip="add a photo"
          icon="add_a_photo"
          className="blue modal-trigger"
          href="#edit-pictures-modal"
        />
        <Button
          floating
          tooltip="edit profile settings"
          icon="account_circle"
          className="blue"
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

export { ProfileSettingsButton, ProfileActionsButton };
