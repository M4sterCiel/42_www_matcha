import React, { Component } from "react";
import { Modal } from "react-materialize";
import AgeSlider from "../settings/AgeSlider";
import DistanceSlider from "../settings/DistanceSlider";
import PopularitySlider from "../settings/PopularitySlider";
import InterestTagsDumb from "../settings/InterestTagsDumb";
import { connect } from "react-redux";

class ModalUserListFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      ageRange: [18, 99],
      distance: 5,
      popularityRange: [0, 1000],
      commonInterestsRange: [1, 25],
      userTags: [],
      allTags: []
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted &&
      this.setState({
        userId: this.props.userConnectedData.id,
        ageRange: [
          this.props.userConnectedData.age_min,
          this.props.userConnectedData.age_max
        ],
        distance: this.props.userConnectedData.distance_max,
        popularityRange: [
          this.props.userConnectedData.pop_min,
          this.props.userConnectedData.pop_max
        ],
        userTags: this.props.userConnectedData.tags,
        allTags: this.props.userConnectedData.allTags
      });
  }

  componentDidUpdate() {
    this._isMounted = true;

    if (
      this.state.userId !== this.props.userConnectedData.id &&
      this.state.allTags !== this.props.userConnectedData.allTags
    ) {
      this._isMounted &&
        this.setState({
          userId: this.props.userConnectedData.id,
          ageRange: [
            this.props.userConnectedData.age_min,
            this.props.userConnectedData.age_max
          ],
          distance: this.props.userConnectedData.distance_max,
          popularityRange: [
            this.props.userConnectedData.pop_min,
            this.props.userConnectedData.pop_max
          ],
          userTags: this.props.userConnectedData.tags,
          allTags: this.props.userConnectedData.allTags
        });
    }
  }

  handleAgeData = data => {
    this._isMounted &&
      this.setState({
        ageRange: data
      });
  };

  handleDistanceData = data => {
    this._isMounted &&
      this.setState({
        distance: data
      });
  };

  handlePopularityData = data => {
    this._isMounted &&
      this.setState({
        popularityRange: data
      });
  };

  render() {
    return (
      <div>
        {this.state.userId === this.props.userConnectedData.id && (
          <Modal
            id="filter-users-modal"
            className="modals"
            header="Filter profiles"
            fixedFooter
            trigger={false}
          >
            <p className="modal-intro">
              You can edit your filter settings to improve your profile
              suggestions
            </p>
            <span className="profile-fields-labels">Filter settings</span>
            <AgeSlider
              range={this.state.ageRange}
              ageToParent={this.handleAgeData}
            />
            <DistanceSlider
              value={this.state.distance}
              distanceToParent={this.handleDistanceData}
            />
            <PopularitySlider
              range={this.state.popularityRange}
              popularityToParent={this.handlePopularityData}
            />
            {this.props.userConnectedData.tags !== undefined && (
              <div>
                <span className="profile-fields-labels">Filter interests</span>
                <InterestTagsDumb
                  tags={this.state.userTags}
                  allTags={this.state.allTags}
                />
              </div>
            )}
          </Modal>
        )}
      </div>
    );
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
}

const mapStateToProps = state => {
  return {
    userConnectedData: state.user.data,
    userConnectedStatus: state.user.status
  };
};

export default connect(mapStateToProps)(ModalUserListFilter);
