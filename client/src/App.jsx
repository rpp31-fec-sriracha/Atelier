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

  componentDidMount() {
    let product;
    axios({
      url: '/productInfo',
      method: 'get',
      params: { productId: this.state.currentProductId }
    })
      .then((response) => product = response.data)
      .then(() => {
        return axios({
          url: '/productStyles',
          method: 'get',
          params: { productId: this.state.currentProductId }
        });
      })
      .then((response) => this.setState( {
        product: product,
        styles: response.data.results
      }))
      .catch((err) => console.log(err));
  }

  render() {
    return (<div className="appContainer">
      <Overview productInfo={this.state.productInfo} productStyles={this.state.productStyles} />
      <Questions />
      <Reviews />
    </div>);
  }
}

export default App;