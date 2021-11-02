import React from 'react';
import ProductInfo from './ProductInfo.jsx';
import ProductInfoBottom from './ProductInfoBottom.jsx';
// import sampleData from './sampleData.js';
import axios from 'axios';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: 59556,
      product: {},
      styles: [],
      loadProductInfo: false,
      defaultStyle: '',
    };
  }

  componentDidMount() {
    let product;

    Promise.resolve(()=> {
      if (this.state.currentProduct !== 59556) {
        this.setState( { currentProduct: 59556 } );
      } else {
        return null;
      }
    })
      .then(() => {
        return axios({
          url: '/productInfo',
          method: 'get',
          params: { productId: this.state.currentProduct }
        });
      })
      .then((response) => product = response.data)
      .then(() => {
        return axios({
          url: '/productStyles',
          method: 'get',
          params: { productId: this.state.currentProduct }
        });
      })
      .then((response) => this.setState( {
        product: product,
        styles: response.data.results
      }))
      .catch((err) => console.log(err));
  }

  render() {
    // console.log(sampleData);

    return (<div className="overview flex-column">
      <ProductInfo product={this.state.product} styles={this.state.styles} />
      <ProductInfoBottom
        description={this.state.product.description}
        features={this.state.product.features} />

    </div>);
  }
}

export default Overview;