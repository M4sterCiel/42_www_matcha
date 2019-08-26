import { Modal, Button } from "react-materialize";
import React, { Component } from "react";
import axios from "axios";
import InfoToastService from "../../services/InfoToastService";


class ModalReportUser extends Component {
constructor(props) {
    super(props);
}

handleReport = () => {
    console.log(this.props);
    axios.get("/users/report/" + this.props.user_id + "/" + this.props.target_id)
        .then(res => {
        console.log(res.data.message);
        InfoToastService.custom.info(res.data.message, 3000);
        })
        .catch(err => {
        console.log(err);
        })
}  

render() {
    return (
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
>Report</button>
</Modal>
        );
    }
}

export default ModalReportUser;