import { Modal } from "react-materialize";
import React, { Component } from "react";
import axios from "axios";
import InfoToastService from "../../services/InfoToastService";

class ModalUnblockUser extends Component {
constructor(props) {
    super(props);
    this.state = {
        isBlocked: true
    }
}

handleUnblock = () => {
    axios.get("/users/unblock/" + this.props.user_id + "/" + this.props.target_id)
        .then(res => {
        InfoToastService.custom.info(res.data.message, 5000);
        this.setState({ isBlocked: false });
        this.props.isBlocked();
        })
        .catch(err => {
        console.log(err);
        })
} 

render() {
    return (
        <div>
{this.state.isBlocked ? 
<Modal 
id="unblock-user-modal"
className="modals"
header="Unblock this user" 
trigger={false}>
    <p>
    Are you sure you want to unblock this user? 
    By unblocking this user you will be able to receive messages nor notifications from this person. Also, he may appear on suggestions and researches.
    </p>
    <button
    className="btn"
    onClick={this.handleUnblock}
    >Yes, I want to unblock this user</button>
</Modal>
: ''}
</div>
    );
    }
}

export default ModalUnblockUser;