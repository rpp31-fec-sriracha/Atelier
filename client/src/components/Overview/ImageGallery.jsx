import React from 'react';

const Thumbnail = function(props) {
  return (
    props.thumbImg ? <div className="thumb"><img onClick={(e) => console.log(e.target)} src={props.thumbImg}></img></div> : <div className="thumb"></div>
  );
};

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      default: {},
      thumbnails: [],
      updated: false,
    };
  }

  componentDidUpdate() {
    if (this.props.styles !== {}) {
      this.props.styles.map((style) => {
        if (style['default?'] && this.state.default !== style) {
          this.setState({
            default: style,
            updated: true,
          });
        }
      });
    }

    if (this.state.updated) {
      let thumbs = this.state.default.photos.map((photo) => (photo.thumbnail_url));
      if (JSON.stringify(this.state.thumbnails) !== JSON.stringify(thumbs)) {
        this.setState({ thumbnails: thumbs });
      }
    }
  }

  render() {
    let thumbList = this.state.thumbnails.map((t, index) => (<Thumbnail key={'thumb' + index} thumbImg={t} />));

    return (<div className="flex-column col-2-3" id="image-gallery" style={this.state.updated ?
      {backgroundImage: `url(${this.state.default.photos[0].url})`,
        backgroundRepeat: 'no-repeat'} :
      {backgroundColor: 'black'}}>
      {thumbList ? thumbList : <Thumbnail thumbImg="" />}
    </div>);
  }
}

export default ImageGallery;