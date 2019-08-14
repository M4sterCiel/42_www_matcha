import React, { Component } from "react";
import { Button, Modal } from "react-materialize";

class DeleteAccountBtn extends Component {
  render() {
    return (
      <div>
        <Modal
          header="Delete account"
          fixedFooter
          trigger={
            <Button waves="light" className="delete-account-btn">
              Delete account
            </Button>
          }
          className="action-modal"
          actions={[
            <Button waves="green" modal="close" flat>
              Cancel
            </Button>,
            <Button waves="green" modal="close" flat>
              Confirm
            </Button>
          ]}
        >
          Are you sure you want to delete your account? (all your data will be
          removed)
        </Modal>
      </div>
    );
  }
}

export default DeleteAccountBtn;
