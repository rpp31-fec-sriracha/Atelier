import React from 'react';
import Overview from './components/Overview/Overview.jsx';
import Questions from './components/Questions/Questions.jsx';
import Reviews from './components/Reviews/Reviews.jsx';

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

export default App;