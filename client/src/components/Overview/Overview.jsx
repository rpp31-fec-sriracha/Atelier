import React from 'react';
import ProductInfo from './ProductInfo.jsx';
import sampleData from './sampleData.js';
import axios from 'axios';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: '',
      product: {},
      styles: [],
      loadProductInfo: false,
    };
  }

  componentDidMount() {
    // let apiCalls = [
    //   Promise.resolve(axios({
    //     url: '/productInfo',
    //     method: 'get',
    //     params: { productId: this.state.currentProduct }
    //   })),
    //   Promise.resolve(axios({
    //     url: '/productStyles',
    //     method: 'get',
    //     params: { productId: this.state.currentProduct }
    //   })),
    // ];
    let product;

    Promise.resolve(this.setState( { currentProduct: 59556 } ))
      .then(() => {
        return axios({
          url: '/productInfo',
          method: 'get',
          params: { productId: this.state.currentProduct }
        });
      })
      .then((response) => product = response.data)
      // .then((response) => this.setState( { product: response.data } ))
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
    // getData(
    //   '/products', {
    //     page: 1,
    //     count: 5,
    //     responseType: 'json'
    //   },
    //   (err, data) => {
    //     if (err) {
    //       console.log(err);
    //     } else {
    //       this.setState({ product: data[1] });
    //       getData(
    //         `/products/${data[1].id}/styles`,
    //         { responseType: 'json' },
    //         (err, styles) => {
    //           if (err) {
    //             console.log(err);
    //           } else {
    //             this.setState({
    //               styles,
    //               loadProductInfo: true,
    //             });
    //             this.render();
    //           }
    //         }
    //       );
    //     }
    //   });

  }

  render() {
    // console.log(sampleData);
    return (<div className="overview">
      <ProductInfo product={this.state.product} styles={this.state.styles} />
    </div>);
  }
}

export default Overview;