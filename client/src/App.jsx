import React, { lazy, Suspense } from 'react';
import './index.css';
import '../../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
const Overview = lazy(() => import('./components/Overview/Overview.jsx'));
const Questions = lazy(() => import('./components/Questions/Questions.jsx'));
const Reviews = lazy(() => import('./components/Reviews/Reviews.jsx'));
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProductId: window.location.pathname.replaceAll('/', '') || 64623,
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

    let productRequests = [
      axios({
        url: `/api/products/${currentProductId}`,
        method: 'get',
      }),
      axios({
        url: `/api/products/${currentProductId}/styles`,
        method: 'get',
      })
    ];

    axios.all(productRequests)
      .then(axios.spread((product, styles) => {
        this.setState({
          productInfo: product.data,
          productStyles: styles.data.results,
          productLoaded: true
        });
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
  renderLoader() {
    return <p>Loading product info...</p>;
  }
  render() {
    const { averageReview, currentProductId, productInfo, productStyles, numReviews} = this.state;
    return (<div className="appContainer">
      {(this.state.productLoaded) ?
        <Suspense fallback={this.renderLoader()}>
          <Overview productInfo={productInfo} productStyles={productStyles} averageReview={averageReview} currentProductId={currentProductId} numReviews={numReviews} />
          <Questions currentProductId={currentProductId} productInfo={productInfo.name} />
          <Reviews currentProductId={currentProductId} productName={productInfo.name}
            setAverageReview={this.setAverageReview} averageStars={this.state.averageReview}
            setNumReviews={this.setNumReviews} numReviews={this.state.numReviews} />
        </Suspense>
        : <p>Loading product info...</p>
      }
    </div>);
  }
}

export default App;