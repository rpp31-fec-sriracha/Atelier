import React from 'react';
import Overview from './components/Overview/Overview.jsx';
import Questions from './components/Questions/Questions.jsx';
// import productInfo from './components/Questions/dummyData.js';
import Reviews from './components/Reviews/Reviews.jsx';
import axios from 'axios';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      componentStack: ''
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo.componentStack);
    this.setState({ componentStack: errorInfo.componentStack });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (<>
        <h1>Something went wrong.</h1>
        <p>{this.state.componentStack}</p>
      </>);
    }

    return this.props.children;
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProductId: 59556,
      productInfo: null,
      productStyles: null,
      productReviews: {
        reviews: {},
        meta: {},
      },
      cart: [],
      productLoaded: false,
    };
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

  componentDidMount() {
    this.getProductInfo();
  }

  render() {
    const { currentProductId, productInfo, productStyles} = this.state;
    return (<div className="appContainer">
      {(this.state.productLoaded) ?
        <ErrorBoundary>
          <Overview productInfo={productInfo} productStyles={productStyles} currentProductId={currentProductId} />
          <Questions currentProductId={currentProductId} productInfo={productInfo.name} />
          <Reviews />
        </ErrorBoundary>
        : <p>Loading product info...</p>
      }
    </div>);
  }
}

export default App;