import { Modal, Button } from "react-materialize";
import React, { Component } from "react";
import axios from "axios";
import InfoToastService from "../../services/InfoToastService";


class ModalReportUser extends Component {
constructor(props) {
    super(props);
    this.state = {
        isReported: false,
        isBlocked: false
    }
}

handleReport = () => {
    axios.get("/users/report/" + this.props.user_id + "/" + this.props.target_id)
        .then(res => {
        InfoToastService.custom.info(res.data.message, 3000);
        this.setState({ isReported: true });
        this.props.isReported();
        })
        .catch(err => {
        console.log(err);
        })
}  

render() {
    return (
        <div>
{!this.state.isReported ? 
<Modal 
id="report-user-modal"
className="modals"
header="Report a user" 
trigger={false}>
    <p>
    Are you sure you want to report this profile as a fake account?
    </p>
    <button
    className="btn"
    onClick={this.handleReport}
    >Yes, I want to report this user</button>
</Modal>
: ''}
</div>
        );
    }
}

export default ModalReportUser;