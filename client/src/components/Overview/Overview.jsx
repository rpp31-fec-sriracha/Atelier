import React from 'react';
import ProductInfo from './ProductInfo.jsx';
import sampleData from './sampleData.js';
import axios from 'axios';

// const getData = function(endpoint, params, callback) {
//   const TOKEN = '';
//   const axios = require('axios').default;

//   const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp';

//   axios.get(`${url}${endpoint}`, {
//     headers: { 'Authorization': TOKEN },
//     params: params,
//   })
//     .then((response) => callback(null, response.data))
//     .catch((error) => callback(error, null));

// };

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: '',
      product: sampleData.product,
      styles: sampleData.styles,
      loadProductInfo: false,
    };
  }

  componentDidMount() {
    let apiCalls = [
      Promise.resolve(axios({
        url: '/productInfo',
        method: 'get',
        params: { productId: this.state.currentProduct }
      })),
      Promise.resolve(axios({
        url: '/productStyles',
        method: 'get',
        params: { productId: this.state.currentProduct }
      })),
    ];

    Promise.resolve(this.setState( { currentProduct: 59556 } ))
      .then(() => Promise.all(apiCalls))
      .then((data) => console.log(data))
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
    console.log(sampleData);
    return (<div className="overview">
      <ProductInfo product={this.state.product} styles={this.state.styles} />
    </div>);
  }
}

export default Overview;