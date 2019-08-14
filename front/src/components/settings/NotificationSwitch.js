import React, { Component } from "react";
import { Switch } from "react-materialize";

class NotificationSwitch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false
    };
  }

  componentDidMount() {
    this.setState({
      status: this.props.notifications
    });
  }

  handleSwitch = () => {
    this.setState({
      status: !this.state.status
    });
  };

  render() {
    return (
      <div className="notification-switch-box">
        <span className="notification-switch-label">Notifications</span>
        <Switch
          className="notification-switch"
          offLabel="Off"
          onLabel="On"
          checked={this.state.status}
          onClick={this.handleSwitch}
        />
      </div>
    );
  }
}

export default NotificationSwitch;
