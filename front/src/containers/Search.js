import React, { Component } from "react";
import { connect } from "react-redux";
import AuthService from "../services/AuthService";
import Axios from "axios";
import NavBar from "../components/NavBar";
import UserCard from "../components/cards/UserCard";
import SortUserList from "../components/settings/SortUserList";
import { FilterUsersButton, SearchButton } from "../components/Buttons";
import SearchCriteria from "../components/search/SearchCriteria";
import { Card } from "react-materialize";
import HeartBroken from "../assets/heart-broken.gif";
import io from "socket.io-client";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: "",
      defaultTab: [],
      userTab: [],
      defaultSorted: [],
      isLoading: true,
      tags: [],
      filterData: [],
      searchData: [],
      sortValue: "0",
      page: 12
    };
    this.Auth = new AuthService();
    this._isMounted = false;
    this.infiniteScroll = this.infiniteScroll.bind(this);
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <div className="row">
          {this.props.userConnectedData.allTags !== undefined && (
            <div className="search-top">
              <h1 className="search-title">
                Search<i className="material-icons icon-text">search</i>
              </h1>{" "}
              <SearchCriteria
                searchDataToParent={this.handleSearchData}
                allTags={this.props.userConnectedData.allTags}
              />
              <SearchButton onClick={e => this.handleSearch()} />
            </div>
          )}
        </div>
      </div>
    );
  }

  async componentDidMount() {
    this._isMounted = true;

    (await this._isMounted) &&
      this.setState({
        userID: this.Auth.getConfirm()["id"]
      });
    this._isMounted &&
      this.setState({
        socket: io({
          transports: ["polling"],
          requestTimeout: 50000,
          upgrade: false,
          "sync disconnect on unload": true,
          query: {
            userID: this.state.userID
          }
        })
      });
    window.addEventListener("scroll", this.infiniteScroll);
  }

  handleSearchData = async data => {
    (await this._isMounted) &&
      this.setState({
        searchData: data
      });
    console.log(data);
  };

  handleSearch = async e => {
    e.preventDefault();
    await Axios.post("/main/search", {
      uid: this.state.userID,
      ageMin: this.state.filterData.ageRange[0],
      ageMax: this.state.filterData.ageRange[1],
      popMin: this.state.filterData.popularityRange[0],
      popMax: this.state.filterData.popularityRange[1],
      distMax: this.state.filterData.distance,
      gender: this.state.filterData.gender,
      sexOrient: this.state.filterData.sexOrientation,
      tags: Object.keys(this.state.filterData.tags)
    })
      .then(res => {
        this._isMounted &&
          this.setState({
            userTab: res.data.list,
            defaultTab: res.data.list,
            defaultSorted: res.data.list
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleSortValue = async data => {
    (await this._isMounted) &&
      this.setState({
        sortValue: data
      });
    switch (data) {
      case "0":
        this.setState({
          userTab: this.state.userTab.sort((a, b) => {
            return b.pop_max - a.pop_max;
          })
        });
        break;
      case "1":
        this.setState({
          userTab: this.state.userTab.sort((a, b) => {
            return a.birthdate - b.birthdate;
          })
        });
        break;
      case "2":
        this.setState({
          userTab: this.state.userTab.sort((a, b) => {
            return b.birthdate - a.birthdate;
          })
        });
        break;
      case "3":
        this.setState({
          userTab: this.state.userTab.sort((a, b) => {
            return a.geo_lat - b.geo_lat;
          })
        });
        break;
      case "4":
        this.setState({
          userTab: this.state.userTab.sort((a, b) => {
            return b.geo_lat - a.geo_lat;
          })
        });
        break;
      case "5":
        this.setState({
          userTab: this.state.userTab.sort((a, b) => {
            return a.pop_score - b.pop_score;
          })
        });
        break;
      case "6":
        this.setState({
          userTab: this.state.userTab.sort((a, b) => {
            return b.pop_score - a.pop_score;
          })
        });
        break;
      case "7":
        var tags = [];
        if (this.state.filterData.userTags)
          this.state.filterData.userTags.forEach(element => {
            tags.push(element.tag_id);
          });
        else if (this.props.userConnectedData.tags)
          this.props.userConnectedData.tags.forEach(element => {
            tags.push(element.tag_id);
          });
        this.setState({
          userTab: this.state.userTab.sort((a, b) => {
            var countA = 0;
            for (var i = 0; i < a.tags.length; i++) {
              if (tags.includes(a.tags[i])) countA++;
            }
            var countB = 0;
            for (var k = 0; k < b.tags.length; k++) {
              if (tags.includes(b.tags[k])) countB++;
            }
            return countA - countB;
          })
        });
        break;
      case "8":
        tags = [];
        if (this.state.filterData.userTags)
          this.state.filterData.userTags.forEach(element => {
            tags.push(element.tag_id);
          });
        else if (this.props.userConnectedData.tags)
          this.props.userConnectedData.tags.forEach(element => {
            tags.push(element.tag_id);
          });
        this.setState({
          userTab: this.state.userTab.sort((a, b) => {
            var countA = 0;
            for (var i = 0; i < a.tags.length; i++) {
              if (tags.includes(a.tags[i])) countA++;
            }
            var countB = 0;
            for (var k = 0; k < b.tags.length; k++) {
              if (tags.includes(b.tags[k])) countB++;
            }
            return countB - countA;
          })
        });
        break;
      default:
    }
  };

  handleFilterData = async data => {
    (await this._isMounted) &&
      this.setState({
        filterData: data
      });
    if (data.length !== 0) {
      //console.log(data);
      this.updateTab();
      this.handleSortValue(this.state.sortValue);
      this.setState({
        page: 12
      });
    }
  };

  userList = props => {
    const value = props.value;
    if (props.value.length !== 0) {
      const users = value.map((e, index) => (
        <UserCard
          intel={e}
          uid={this.state.userID}
          func={this.sendNotif}
          key={index}
        />
      ));
      return <ul>{users}</ul>;
    } else {
      return (
        <div className="userlist-no-result">
          <img
            className="userlist-no-result-img"
            src={HeartBroken}
            alt="No result anim"
          />
          <div className="userlist-no-result-text">No result</div>
        </div>
      );
    }
  };

  updateTab = async () => {
    var tab = this.state.defaultTab.copyWithin(0);
    var copy = [];
    var tags = [];

    if (this.state.filterData.userTags)
      this.state.filterData.userTags.forEach(element => {
        tags.push(element.tag_id);
      });
    /* else if (this.props.userConnectedData.tags)
      this.props.userConnectedData.tags.forEach(element => {
        tags.push(element.tag_id);
      }); */

    for (var i = 0; i < tab.length; i++) {
      var keep = 1;
      if (tab[i].birthdate > this.state.filterData.ageRange[1]) keep = 0;
      if (tab[i].birthdate < this.state.filterData.ageRange[0]) keep = 0;
      if (!(tab[i].geo_lat <= this.state.filterData.distance + 0.8)) keep = 0;
      if (
        !(
          tab[i].pop_score >= this.state.filterData.popularityRange[0] &&
          tab[i].pop_score <= this.state.filterData.popularityRange[1]
        )
      )
        keep = 0;
      var count = 0;
      var newT = [];
      for (var k = 0; k < tab[i].tags.length; k++) newT.push(tab[i].tags[k]);
      for (var g = 0; g < newT.length; g++) {
        if (tags.includes(newT[g])) count++;
      }
      if (count !== tags.length) keep = 0;
      if (keep === 1) copy.push(tab[i]);
    }
    this.setState({
      userTab: copy,
      defaultSorted: copy
    });
  };

  sendNotif = (target_id, type) => {
    if (this.state.socket !== "") {
      this.state.socket.emit("sendNotif", type, this.state.userID, target_id);
    }
  };

  infiniteScroll = () => {
    if (
      window.pageYOffset >=
      document.documentElement.offsetHeight -
        document.documentElement.clientHeight -
        420
    )
      this._isMounted &&
        this.setState({
          page: this.state.page + 12
        });
  };

  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener("scroll", this.infiniteScroll);
    if (this.state.socket !== "") this.state.socket.close();
  }
}

const mapStateToProps = state => {
  return {
    userConnectedData: state.user.data,
    userConnectedStatus: state.user.status
  };
};

export default connect(mapStateToProps)(Search);
