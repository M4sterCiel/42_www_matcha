import React, { Component } from "react";
import Popscore from "../profile/Popscore";
import { LikeButton, DislikeButton, LikeBackButton } from "../Buttons";
import Male from "../../assets/male.png";
import Female from "../../assets/female.png";
import InterestTagsOnly from "../profile/InterestTagsOnly";
import moment from "moment";
import { NavLink } from "react-router-dom";

class UserCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [
        'none', "pizza", 'animals', 'party', 'travel', 'sport', 'cooking', 'technology', 'art', 'culture', 'books', 'money', 'politics', 'nature', 'clothing', 'fashion', 'music'
      ],
      age: '',
      picture: '',
      taggs: []
    };
    this._isMounted = false;
  }

  async componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.setState({
      age: moment().diff(
        this.props.intel.birthdate,
        "years",
        false
      ) + " years old"
    })
    await this.props.pictures.forEach(element => {
      if (element.user_id === this.props.intel.id) {
        this._isMounted && this.setState({
          picture: element.url
        });
      }
    });
    
    var tab = [];
    await this.props.tags.forEach(element => {
      if (element.id === this.props.intel.id) {
        var length = element.tags.length;
        var i = 0;
        while (i < length) {
          tab.push({
            tag_id: element.tags[i++].tag_id,
            value: ''
          })
        };
      };
    });
    for (var i=0;i<tab.length;i++) {
      tab[i]['value'] = tab[i]['tag_id'] === 17 ? 'movies' : this.state.tags[tab[i]['tag_id']];
    }
    await this._isMounted && this.setState({ taggs: tab });
  }

  render() {
    return (
      <div className="col xs12 s6 m4">
        <div className="card sticky-action">
          <div className="card-image waves-effect waves-block waves-light user-card-image">
            <img
              className="activator"
              src={this.state.picture ? this.state.picture : "https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/12/04/12/jean-claude-van-johnson.jpg"}
            />
          </div>
          <div className="card-content user-card-content">
            <div className="user-card-below-picture">
              <Popscore popscore={this.props.intel.pop_score} />
              {
                <div className="user-card-like-btn">
                  <LikeButton />
                </div>
              }
              {/*               <div className="user-card-dislike-btn">
                <DislikeButton />
              </div> */}
              {/*               <div className="user-card-like-back-btn">
                <LikeBackButton />
              </div> */}
            </div>
            <div className="user-card-details">
              <span className="card-title activator grey-text text-darken-4 user-card-username">
                {this.props.intel.username}{" "}
                {this.props.intel.online === 1 ?
                <i className="material-icons dp48 online-icon offset-user-card">
                  fiber_manual_record
                </i>
                :
                <span className="tooltip">
                  <i className="material-icons dp48 offline-icon">
                    fiber_manual_record
                  </i>{" "}
                  <span className="tooltip-text">
                    {this.props.intel.last_connexion
                      ? moment(
                        this.props.intel.last_connexion
                        ).fromNow()
                      : "never seen online"}
                  </span>
                </span>}
                <i className="material-icons right user-card-bio-btn">
                  more_vert
                </i>
              </span>
              <div className="user-card-names">
                <span>{this.props.intel.firstname}</span> <span>{this.props.intel.lastname}</span>{" "}
                <img
                  src={this.props.intel.gender === "man" ? Male : Female}
                  alt={this.props.intel.gender === "man" ? "male icon": "female icon"}
                  className="profile-gender-icon"
                />
              </div>
              <div className="user-card-orientation">
                <i className="material-icons prefix pink-icon">wc</i>{" "}
                <span className="profile-text-icon">
                  <span className="grey-message">{this.props.intel.sexual_orientation !== null ? this.props.intel.sexual_orientation : "No preference yet"}</span>
                </span>
              </div>
              <div className="user-card-location">
                <i className="material-icons prefix pink-icon">place</i>{" "}
                <span className="profile-text-icon">
                  <span className="grey-message">{this.props.intel.city !== null ? this.props.intel.city : 'No location yet'}</span>
                </span>
              </div>
              <div className="user-card-birthdate">
                <i className="material-icons prefix pink-icon">cake</i>{" "}
                <span className="profile-text-icon">
                  <span className="grey-message">{this.props.intel.birthdate !== null ? this.state.age : 'No birthdate yet'}</span>
                </span>
              </div>
              <div className="user-card-interests">
                {" "}
                <InterestTagsOnly tags={this.state.taggs} />
              </div>
            </div>
          </div>
          <div className="card-action">
            <NavLink to={'/users/profile/'+this.props.intel.username}>SEE PROFILE</NavLink></div>
          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">
              Bio<i className="material-icons right">close</i>
            </span>
            <p>
              {this.props.intel.bio}
            </p>
            <InterestTagsOnly tags={this.state.taggs} />
          </div>
        </div>
      </div>
    );
  }
}

export default UserCard;
