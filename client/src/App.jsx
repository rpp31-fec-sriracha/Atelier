import React from 'react';
import Overview from './components/Overview/Overview.jsx';
import Questions from './components/Questions/Questions.jsx';
import Reviews from './components/Reviews/Reviews.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentProductId: '',
      productInfo: {},
      productStyles: {},
      productReviews: {
        reviews: {},
        meta: {},
      },
      productQA: {
        questions: {},
        answers: {},
      },
      cart: [],
    };
  }

  render() {
    return (<div id="appContainer" classname="flex-column">
      <Overview />
      <Questions />
      <Reviews />
    </div>);
  }
}

export default App;