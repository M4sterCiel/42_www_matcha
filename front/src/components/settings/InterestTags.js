import React, { Component } from "react";
import { Chip } from "react-materialize";
import InfoToast from "../../services/InfoToastService";

class InterestTags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myTagsArray: ["sea", "sex", "fun"],
      defaultTagsArray: [
        "beer",
        "pizza",
        "alcohol",
        "rice",
        "barbec",
        "vodka",
        "xbox one",
        "ps4",
        "hello les amis",
        "radiateur",
        "slient",
        "lolling",
        "not lolling hard",
        "poneys"
      ]
    };
    this.chipSelectDefault = this.chipSelectDefault.bind(this);
    this.chipDelete = this.chipDelete.bind(this);
  }

  createMyTags(tab) {
    this.setState({
      myTagsArray: tab
    });
  }

  chipDelete() {
    const tagElements = document.querySelectorAll(".my-tags-chip > .chip");
    let tagsTab = [];
    for (var value of tagElements.values()) {
      tagsTab = tagsTab.concat(value.innerText.replace("\nclose", ""));
    }
    this.createMyTags(tagsTab);
  }

  chipSelectDefault(target) {
    if (
      !this.state.myTagsArray.find(
        tag => tag === target[0].children[0].innerText
      )
    ) {
      this.setState(state => {
        const myTagsArray = state.myTagsArray.concat(
          target[0].children[0].innerText
        );
        return {
          myTagsArray
        };
      });
    } else {
      InfoToast.custom.info(
        `Tag ${target[0].children[0].innerText} has already been added`,
        1500
      );
    }
  }

  render() {
    function tagToArray(tagValue) {
      return [
        {
          tag: tagValue
        }
      ];
    }

    const myTags = this.state.myTagsArray.map(tagEl => (
      <Chip
        key={tagEl}
        options={{
          data: tagToArray(tagEl),
          onChipDelete: this.chipDelete
        }}
        className="my-tags-chip chip-general"
      />
    ));

    const defaultTags = this.state.defaultTagsArray.map(tagEl => (
      <Chip
        key={tagEl}
        close={false}
        options={{
          data: tagToArray(tagEl),
          onChipSelect: this.chipSelectDefault
        }}
        className="chip-general"
      />
    ));

    const emptyTags = <p className="no-tags-message">No interests yet</p>;

    return (
      <div className="tags-component">
        <div>
          <p>Already interested in</p>
          {myTags.length ? myTags : emptyTags}
        </div>
        <div className="chips-default-tags">
          <p>Add more interests</p>
          {defaultTags}
        </div>
      </div>
    );
  }
}

export default InterestTags;
