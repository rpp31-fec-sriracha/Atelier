import React from 'react';
import ProductInfo from './ProductInfo.jsx';

const getData = function(endpoint, params, callback) {
  const TOKEN = 'APITOKEN';
  const axios = require('axios').default;

  const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp';

  axios.get(`${url}${endpoint}`, {
    headers: { 'Authorization': TOKEN },
    params: params,
  })
    .then((response) => callback(null, response.data))
    .catch((error) => callback(error, null));

};

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      styles: {},
      loadProductInfo: false,
    };
  }

  componentDidMount() {
    getData(
      '/products', {
        page: 1,
        count: 5,
        responseType: 'json'
      },
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          this.setState({ product: data[1] });
          getData(
            `/products/${data[1].id}/styles`,
            { responseType: 'json' },
            (err, styles) => {
              if (err) {
                console.log(err);
              } else {
                this.setState({
                  styles,
                  loadProductInfo: true,
                });
                this.render();
              }
            }
          );
        }
      });

  }

  render() {
    return (<div className="overview">
      'Overview'
      {this.loadProductInfo ? <ProductInfo product={this.state.product} styles={this.state.styles} /> : 'Product Info'}
    </div>);
  }
}

export default Overview;