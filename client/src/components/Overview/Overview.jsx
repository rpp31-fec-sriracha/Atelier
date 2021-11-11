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
      selectedThumb: '',
    };
    this.handleStyleClick = this.handleStyleClick.bind(this);
  }

  handleStyleClick(e, styleId) {
    e.preventDefault();
    this.setState({ selectedStyleId: styleId });
  }

  componentDidUpdate() {
    console.log('Overview props', this.props);
    if (this.props.productStyles !== undefined) {
      this.props.productStyles.map((style) => {
        if (style['default?'] && this.state.defaultStyle.style_id !== style.style_id) {
          let currentStyle = Object.keys(this.state.currentStyle).length === 0 ? style : this.state.currentStyle;
          this.setState({
            defaultStyle: style,
            currentStyle: currentStyle,
          });
        }
        if (
          this.state.selectedStyleId &&
          this.state.selectedStyleId === style.style_id &&
          this.state.currentStyle.style_id !== style.style_id) {

          this.setState({
            currentStyle: style
          });
        }
      });
    }
  }

  // componentDidUpdate() {
  //   if (this.state.selectedStyleId && this.state.selectedStyleId === style.style_id) {
  //     this.setState({
  //       currentStyle: style
  //     });
  //   }
  // }

  render() {
    // console.log(this.props);
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