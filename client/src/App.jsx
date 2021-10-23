import React from 'react';
import Overview from './Overview/Overview.jsx';
import Questions from './Questions/Questions.jsx';
import Reviews from './Reviews/Reviews.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
    };
  }

  render() {
    return (<div className="appContainer">
      <Overview />
      <Questions />
      <Reviews />
    </div>);
  }
}