import React from 'react';

import ProductInfo from './ProductInfo.jsx';
import ProductInfoBottom from './ProductInfoBottom.jsx';
import Interactions from '../Interactions.jsx';
import axios from 'axios';
// import products from './products.js';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultStyle: null,
      currentStyle: null,
      selectedStyleId: null,
      selectedThumb: 0,
      thumbStart: 0,
      thumbEnd: 7,
      cart: [],
      loaded: false,
      done: false
    };
    this.handleStyleClick = this.handleStyleClick.bind(this);
    this.handleThumbClick = this.handleThumbClick.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleArrowDown = this.handleArrowDown.bind(this);
    this.handleArrowUp = this.handleArrowUp.bind(this);
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
    let requests = [];
    for (let i = 0; i < qty; i++) {
      requests.push(
        axios.post('/api/cart', {
          // eslint-disable-next-line camelcase
          sku_id: sku
        })
      );
    }
    axios.all(requests)
      .then(() => (axios.get('/api/cart')))
      .then((response) => this.setState({ cart: response.data }))
      .catch((e) => console.log(e));
  }

  handleArrowDown(e) {
    let { selectedThumb, thumbStart, thumbEnd, currentStyle } = this.state;
    if (selectedThumb < currentStyle.photos.length - 1) {
      selectedThumb++;
    }
    if (selectedThumb > thumbEnd - 1) {
      thumbStart++;
      thumbEnd++;
    }
    this.setState({
      selectedThumb,
      thumbStart,
      thumbEnd
    });
  }

  handleArrowUp(e) {
    let { selectedThumb, thumbStart, thumbEnd, currentStyle } = this.state;
    if (selectedThumb > 0) {
      selectedThumb--;
    }
    if (selectedThumb < thumbStart) {
      thumbStart--;
      thumbEnd--;
    }
    this.setState({
      selectedThumb,
      thumbStart,
      thumbEnd
    });
  }

  componentDidMount() {
    let cart;
    let newState;
    axios.get('/api/cart')
      .then((response) => { cart = response.data; })
      .then(() => {
        for (let style of this.props.productStyles) {
          if (style['default?']) {
            let newStyle = !this.state.currentStyle ? style : this.state.currentStyle;

            newState = {
              defaultStyle: style,
              currentStyle: newStyle,
              cart: cart,
              loaded: true,
            };
          }
        }
        if (!newState) {
          newState = {
            defaultStyle: this.props.productStyles[0],
            currentStyle: !this.state.currentStyle ? this.props.productStyles[0] : this.state.currentStyle,
            cart: cart,
            loaded: true,
          };
        }
      })
      .then(() => this.setState(newState))
      .catch((e) => console.log(e));
  }

  componentDidUpdate() {
    if (this.props.productStyles) {
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
    if (!this.state.loaded) {
      return null;
    }

    return (<Interactions widget="Overview" children={
      <div className="overview flex-column">
        <ProductInfo product={this.props.productInfo}
          averageReview={this.props.averageReview}
          styles={this.props.productStyles}
          numReviews={this.props.numReviews}

          styleClick={this.handleStyleClick}
          thumbClick={this.handleThumbClick}
          handleAddToCart={this.handleAddToCart}
          handleArrowDown={this.handleArrowDown}
          handleArrowUp={this.handleArrowUp}

          currentStyle={this.state.currentStyle}
          defaultStyle={this.state.defaultStyle}
          selectedThumb={this.state.selectedThumb}
          thumbStart={this.state.thumbStart}
          thumbEnd={this.state.thumbEnd} />
        <ProductInfoBottom
          slogan={this.props.productInfo.slogan}
          description={this.props.productInfo.description}
          features={this.props.productInfo.features} />

      </div>
    } />);

  }
}

export default Overview;