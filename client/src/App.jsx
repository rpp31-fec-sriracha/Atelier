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
      productQA: [],
      cart: [],
    };
  }

  render() {
    const { productQA, currentProductId } = this.state;

    return (<div className="appContainer">
      <Overview />
      <Questions currentProductId={currentProductId} productQA={productQA} />
      <Reviews />
    </div>);
  }
}

export default App;