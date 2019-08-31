import React, { Component } from "react";
import { Chip } from "react-materialize";
import InfoToast from "../../services/InfoToastService";

class InterestTagsDumb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myTagsArray: [],
      defaultTagsArray: []
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    console.log(this.props);
    this._isMounted &&
      this.setState({
        myTagsArray: this.props.tags,
        defaultTagsArray: this.props.allTags
      });
  }

  componentDidUpdate() {
    this._isMounted = true;
    if (this.state.myTagsArray !== this.props.tags) {
      console.log(this.props);
      this._isMounted &&
        this.setState({
          myTagsArray: this.props.tags
        });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  chipSelectDefault(tag_id, value) {
    if (!this.state.myTagsArray.find(tag => tag.tag_id === tag_id)) {
      this._isMounted &&
        this.setState({
          myTagsArray: [
            ...this.state.myTagsArray,
            { tag_id: tag_id, value: value }
          ]
        });
    } else {
      InfoToast.custom.info(`Tag ${value} has already been added`, 1500);
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

    const tags = this.state.myTagsArray.map(tagEl => (
      <Chip
        key={tagEl.tag_id}
        options={{
          data: tagToArray(tagEl.value)
        }}
        className="my-tags-chip chip-general"
      />
    ));

    const allTags = this.state.defaultTagsArray.map(tagEl => (
      <Chip
        key={tagEl.tag_id}
        close={false}
        options={{
          data: tagToArray(tagEl.value),
          onChipSelect: () => this.chipSelectDefault(tagEl.tag_id, tagEl.value)
        }}
        className="chip-general"
      />
    ));

    const emptyTags = <p className="no-tags-message">No interests yet</p>;

    return (
      <div className="tags-component">
        <div>
          <p>Already interested in</p>
          {tags.length ? tags : emptyTags}
        </div>
        <div className="chips-default-tags">
          <p>Add more interests</p>
          {allTags}
        </div>
      </div>
    );
  }
}

export default InterestTagsDumb;
