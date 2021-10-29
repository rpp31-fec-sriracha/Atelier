import React from 'react';

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      default: {},
      thumbnails: {}
    };
  }

  componentDidMount() {
    this.props.styles.map((style) => {
      console.log(style);
      if (style['default?']) {
        console.log(style);
        this.setState({ default: style });
      }
    });
  }

  render() {
    return (<p>This is the image gallery</p>);
  }
}

export default ImageGallery;