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

  handleStyleClick(e, styleId) {
    e.preventDefault();
    this.setState({ currentStyle: styleId });
  }

  componentDidMount() {
    console.log('Overview props', this.props);
    if (this.props !== undefined) {
      this.props.productStyles.map((style) => {
        if (style['default?'] && this.state.default !== style) {
          this.setState({
            defaultStyle: style,
            // updated: true,
          });
        }
      });
    }
  }

  render() {
    console.log(this.props);
    return (<div className="overview flex-column">
      <ProductInfo product={this.props.productInfo}
        styles={this.props.productStyles}
        styleClick={this.handleStyleClick}
        defaultStyle={this.state.defaultStyle}
        currentStyle={this.state.currentStyle} />
      <ProductInfoBottom
        slogan={this.props.productInfo.slogan}
        description={this.props.productInfo.description}
        features={this.props.productInfo.features} />

    </div>);
  }
}

export default Overview;