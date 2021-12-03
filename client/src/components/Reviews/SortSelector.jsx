import React from 'react';

class SortSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // sortType: 'relevant'
    };

    this.updateSortType = this.props.updateSortType.bind(this);
  }

  handleChange(event) {
    this.updateSortType(event.target.value);
  }

  render() {
    return (
      <select id="select" onChange={this.handleChange.bind(this)}>
        <option value="relevant">relevant</option>
        <option value="newest">newest</option>
        <option value="helpful">helpful</option>
      </select>
    );
  }
}

export default SortSelector;