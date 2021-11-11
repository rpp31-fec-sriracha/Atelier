import React from 'react';
import ProductInfo from './ProductInfo.jsx';
import ProductInfoBottom from './ProductInfoBottom.jsx';
import axios from 'axios';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultStyle: {},
      currentStyle: {},
      selectedStyleId: null,
      selectedThumb: 0,
      cart: [],
    };
    this.handleStyleClick = this.handleStyleClick.bind(this);
    this.handleThumbClick = this.handleThumbClick.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  handleStyleClick(e, styleId) {
    e.preventDefault();
    this.setState({ selectedStyleId: styleId });
  }

  handleThumbClick(e, thumbId) {
    e.preventDefault();
    let selectedThumb = parseInt(thumbId.replace('thumb', ''), 10);
    this.setState({ selectedThumb });
  }

  handleAddToCart(e, sku, qty) {
    e.preventDefault();
    let cart = this.state.cart.concat([{
      sku_id: sku,
      count: qty
    }]);
    this.setState({ cart: this.state });
  }

  componentDidMount() {
    if (this.props.productStyles !== undefined) {
      this.props.productStyles.map((style, index) => {
        if (style['default?'] && this.state.defaultStyle.style_id !== style.style_id) {
          let currentStyle = Object.keys(this.state.currentStyle).length === 0 ? style : this.state.currentStyle;
          this.setState({
            defaultStyle: style,
            currentStyle: style,
          });
        }
      });
    }
  }

  componentDidUpdate() {
    if (this.props.productStyles !== undefined) {
      this.props.productStyles.map((style, index) => {
        if (this.state.selectedStyleId &&
          this.state.selectedStyleId === style.style_id &&
          this.state.currentStyle.style_id !== style.style_id) {

          this.setState({
            currentStyle: style
          });
        }
      });
    }
  }

  render() {
    // console.log(this.props);
    return (<div className="overview flex-column">
      <ProductInfo product={this.props.productInfo}
        styles={this.props.productStyles}
        styleClick={this.handleStyleClick}
        thumbClick={this.handleThumbClick}
        defaultStyle={this.state.defaultStyle}
        currentStyle={this.state.currentStyle}
        selectedThumb={this.state.selectedThumb}
        handleAddToCart={this.handleAddToCart} />
      <ProductInfoBottom
        slogan={this.props.productInfo.slogan}
        description={this.props.productInfo.description}
        features={this.props.productInfo.features} />

    </div>);
  }
}

export default Overview;