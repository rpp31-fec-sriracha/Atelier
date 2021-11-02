import React from 'react';
import Overview from './components/Overview/Overview.jsx';
import Questions from './components/Questions/Questions.jsx';
import productInfo from './components/Questions/dummyData.js';
import Reviews from './components/Reviews/Reviews.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProductId: 59556,
      productInfo: productInfo,
      productStyles: {},
      productReviews: {
        reviews: {},
        meta: {},
      },
      cart: [],
    };
  }

  render() {
    const { currentProductId, productInfo } = this.state;

    return (<div className="appContainer">
      <Overview />
      <Questions currentProductId={currentProductId} productInfo={productInfo.name} />
      <Reviews />
    </div>);
  }
}

export default App;