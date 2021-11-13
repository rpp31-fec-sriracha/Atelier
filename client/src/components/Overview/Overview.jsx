import React from 'react';
import ProductInfo from './ProductInfo.jsx';
import ProductInfoBottom from './ProductInfoBottom.jsx';
import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultStyle: null,
      currentStyle: null,
      selectedStyleId: null,
      selectedThumb: 0,
      cart: [],
      loaded: false,
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

  componentDidMount() {
    axios.get('/api/cart')
      .then((response) => {
        this.setState({ cart: response.data });
      })
      .catch((e) => console.log(e));

    this.setState((state, props) => {
      let cart;
      if (props.productStyles) {
        for (let style of props.productStyles) {
          if (style['default?']) {
            let newStyle = !state.currentStyle ? style : state.currentStyle;

            return ({
              defaultStyle: style,
              currentStyle: newStyle,
              cart: cart,
              loaded: true,
            });
          }
        }
      } else {
        return state;
      }
    });
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
    // console.log(this.props);
    if (!this.state.loaded) {
      return (null);
    }
    return (<div className="overview flex-column">
      <ProductInfo product={this.props.productInfo}
        averageReview={this.props.averageReview}
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