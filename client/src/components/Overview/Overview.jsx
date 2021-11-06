import React from 'react';
import ProductInfo from './ProductInfo.jsx';
import ProductInfoBottom from './ProductInfoBottom.jsx';
import axios from 'axios';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultStyle: '',
      currentStyle: '',
      selectedThumb: '',
    };
    this.handleStyleClick = this.handleStyleClick.bind(this);
  }

  handleStyleClick(e) {
    this.setState({ currentStyle: e.target });
  }

  render() {
    return (<div className="overview flex-column">
      <ProductInfo product={this.props.productInfo}
        styles={this.props.productStyles}
        styleClick={this.handleStyleClick} />
      <ProductInfoBottom
        slogan={this.props.productInfo.slogan}
        description={this.props.productInfo.description}
        features={this.props.productInfo.features} />

    </div>);
  }
}

export default Overview;