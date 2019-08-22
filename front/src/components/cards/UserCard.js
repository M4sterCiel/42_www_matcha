import React, { Component } from "react";
import Popscore from "../profile/Popscore";
import { LikeButton } from "../Buttons";
import Male from "../../assets/male.png";
import InterestTagsOnly from "../profile/InterestTagsOnly";

class UserCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [
        {
          tag_id: 0,
          value: "pizza"
        },
        {
          tag_id: 1,
          value: "beer"
        },
        {
          tag_id: 2,
          value: "culture"
        },
        {
          tag_id: 3,
          value: "money"
        },
        {
          tag_id: 4,
          value: "sport"
        }
      ]
    };
  }

  render() {
    return (
      <div className="col xs12 s6 m4">
        <div className="card sticky-action">
          <div className="card-image waves-effect waves-block waves-light user-card-image">
            <img
              className="activator"
              src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/12/04/12/jean-claude-van-johnson.jpg"
            />
          </div>
          <div className="card-content user-card-content">
            <div className="user-card-below-picture">
              <Popscore popscore={150} />
              <span className="user-card-like-btn">
                <LikeButton />
              </span>
            </div>
            <div className="user-card-details">
              <span className="card-title activator grey-text text-darken-4 user-card-username">
                Username{" "}
                <i className="material-icons dp48 online-icon offset-user-card">
                  fiber_manual_record
                </i>
                <i className="material-icons right user-card-bio-btn">
                  more_vert
                </i>
              </span>
              <div className="user-card-names">
                <span>Firstname</span> <span>Lastname</span>{" "}
                <img
                  src={Male}
                  alt="male icon"
                  className="profile-gender-icon"
                />
              </div>
              <div className="user-card-orientation">
                <i className="material-icons prefix pink-icon">wc</i>{" "}
                <span className="profile-text-icon">
                  <span className="grey-message">No preference yet</span>
                </span>
              </div>
              <div className="user-card-location">
                <i className="material-icons prefix pink-icon">place</i>{" "}
                <span className="profile-text-icon">
                  <span className="grey-message">No location yet</span>
                </span>
              </div>
              <div className="user-card-birthdate">
                <i className="material-icons prefix pink-icon">cake</i>{" "}
                <span className="profile-text-icon">
                  <span className="grey-message">No birthdate yet</span>
                </span>
              </div>
              <div className="user-card-interests">
                {" "}
                <InterestTagsOnly tags={this.state.tags} />
              </div>
            </div>
          </div>
          <div className="card-action">SEE PROFILE</div>
          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">
              Bio<i className="material-icons right">close</i>
            </span>
            <p>
              Here is some more information about this product that is only
              revealed once clicked on.
            </p>
            <InterestTagsOnly tags={this.state.tags} />
          </div>
        </div>
      </div>
    );
  }
}

export default UserCard;

/* Original */

/*       <div className="card col s5 m7">
        <div className="card-image waves-effect waves-block waves-light">
          <img className="activator" src="images/office.jpg" />
        </div>
        <div className="card-content">
          <span className="card-title activator grey-text text-darken-4">
            Card Title<i className="material-icons right">more_vert</i>
          </span>
          <p>
            <a href="#">This is a link</a>
          </p>
        </div>
        <div className="card-reveal">
          <span className="card-title grey-text text-darken-4">
            Card Title<i className="material-icons right">close</i>
          </span>
          <p>
            Here is some more information about this product that is only
            revealed once clicked on.
          </p>
        </div>
      </div> */
