import React from 'react';

class KeywordSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: ''
    };
  }

  render() {
    return (<div className="keywordSearch">
      <div>'Keyword Search Bar'</div>
    </div>);
  }
}

export default KeywordSearch;