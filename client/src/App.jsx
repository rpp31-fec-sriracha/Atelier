import React from 'react';
import Overview from './components/Overview/Overview.jsx';
import Questions from './components/Questions/Questions.jsx';
// import productInfo from './components/Questions/dummyData.js';
import Reviews from './components/Reviews/Reviews.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProductId: window.location.pathname.replaceAll('/', '') || 59556,
      productInfo: null,
      productStyles: null,
      cart: [],
      productLoaded: false,
      averageReview: null,
      numReviews: 0
    };
    this.setAverageReview = this.setAverageReview.bind(this);
    this.setNumReviews = this.setNumReviews.bind(this);
  }

  getProductInfo() {
    let { currentProductId } = this.state;
    let product;
    axios({
      url: `/api/products/${currentProductId}`,
      method: 'get',
    })
      .then((response) => product = response.data)
      .then(() => {
        return axios({
          url: `/api/products/${currentProductId}/styles`,
          method: 'get',
        });
      })
      .then((response) => this.setState( {
        productInfo: product,
        productStyles: response.data.results,
        productLoaded: true
      }))
      .catch((err) => console.log(err));
  }

  setAverageReview(average) {
    this.setState({
      averageReview: average
    });
  }

  setNumReviews(count) {
    this.setState({
      numReviews: count
    });
  }

  componentDidMount() {
    this.getProductInfo();
  }

  render() {
    const { averageReview, currentProductId, productInfo, productStyles} = this.state;
    return (<div className="appContainer">
      {(this.state.productLoaded) ?
        <>
          <Overview productInfo={productInfo} productStyles={productStyles} averageReview={averageReview} currentProductId={currentProductId} />
          <Questions currentProductId={currentProductId} productInfo={productInfo.name} />
          <Reviews currentProductId={currentProductId} productName={productInfo.name}
            setAverageReview={this.setAverageReview} averageStars={this.state.averageReview}
            setNumReviews={this.setNumReviews} numReviews={this.state.numReviews}/>
        </>
        : <p>Loading product info...</p>
      }
    </div>);
  }
}

export default App;