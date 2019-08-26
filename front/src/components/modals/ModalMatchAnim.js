import React, { Component } from "react";
import { Modal } from "react-materialize";
import MatchAnim from "../../assets/match-love-anim.webp";

class ModalMatchAnim extends Component {
  render() {
    return (
      <div>
        <Modal
          header="That's a match!"
          trigger={false}
          id="match-anim-modal"
          className="modals modal-match-anim"
        >
          <p>Time to get to know each!</p>
          <img
            className="img-match-anim"
            src={MatchAnim}
            alt="Match animation"
          />
        </Modal>
      </div>
    );
  }
}

export default ModalMatchAnim;
