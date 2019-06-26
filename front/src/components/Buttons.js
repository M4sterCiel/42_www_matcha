import React, { Component } from "react";
import { Button } from "react-materialize";

class ProfileSettingsButton extends Component {
  render() {
    return (
      <Button
        floating
        fab={{ direction: "left", hoverEnabled: false }}
        icon="settings"
        className="red"
        large
      >
        <Button
          floating
          tooltip="edit profile info"
          icon="edit"
          className="red"
        />
        <Button
          floating
          tooltip="add a photo"
          icon="add_a_photo"
          className="green"
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

export { ProfileSettingsButton };
