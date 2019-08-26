import { Modal, Button } from "react-materialize";
import React, { Component } from "react";


class ModalReportUser extends Component {

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
</Modal>
        );
    }
}

export default ModalReportUser;