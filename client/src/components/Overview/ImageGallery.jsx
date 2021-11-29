import React from 'react';

const Thumbnail = function (props) {
  let currentThumbId = parseInt(props.thumbId.replace('thumb', ''), 10);
  let thumbImg;
  if (props.thumbImg[0] === 'u') {
    thumbImg = props.thumbImg.slice(1);
  } else {
    thumbImg = props.thumbImg;
  }
  return (
    <div className={props.selectedThumb === currentThumbId ?
      'thumb current-thumb' :
      'thumb'}><img onMouseEnter={props.thumbEnter} onMouseLeave={props.thumbLeave} onClick={(e) => props.thumbClick(e, props.thumbId)} src={thumbImg}></img></div>
  );
};

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      extended: false,
      zoomed: false,
      imageHover: false,
      mouseX: 0,
      mouseY: 0,
      width: null,
      height: null,
    };
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
    this.setExpanded = this.setExpanded.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    // this.getGalleryBoundingRect = this.getGalleryBoundingRect.bind(this);
  }

  handleMouseMove(e) {
    this.setState({
      mouseX: e.clientX,
      mouseY: e.clientY,
      offsetX: this.state.zoomed ? (e.nativeEvent.offsetX - this.state.height / 2) + 'px' : 'center',
      offsetY: this.state.zoomed ? (e.nativeEvent.offsetY - this.state.width / 2) + 'px' : 'center',
    });
  }

  mouseOver() {
    this.setState({imageHover: true});
  }

  mouseOut() {
    this.setState({imageHover: false});
  }

  setExpanded(e) {
    if (this.state.imageHover === true && !this.state.extended) {
      this.setState({
        extended: true
      });
    } else {
      this.setState({zoomed: !this.state.zoomed});
    }
    const { width, height } = document.getElementById('image-gallery').getBoundingClientRect();
    this.setState({ width, height });
  }

  componentDidMount() {
  }

  render() {
    let thumbs = this.props.currentStyle.photos.map((photo) => (photo.thumbnail_url));
    let thumbList = thumbs.map((t, index) => {
      if (index >= this.props.thumbStart && index < this.props.thumbEnd) {
        return (<Thumbnail
          thumbEnter={this.props.mouseOver}
          thumbLeave={this.props.mouseOut}
          thumbClick={this.props.thumbClick}
          key={'thumb' + index}
          thumbId={'thumb' + index}
          selectedThumb={this.props.selectedThumb}
          thumbImg={t} />);
      }
    });

    return (<div className={this.state.extended ? 'extended' : 'flex-row'}
      id="image-gallery"
      onMouseMove={this.handleMouseMove}
      onMouseEnter={this.mouseOver}
      onMouseLeave={this.mouseOut}
      onClick={this.setExpanded}
      style={{
        backgroundImage: `url(${this.props.currentStyle.photos[this.props.selectedThumb].url})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: `${this.state.zoomed ? '250%' : '100%'}`,
        backgroundPosition: (this.state.zoomed ? `bottom ${this.state.offsetY} right ${this.state.offsetX}` : 'center'),
        transition: false,
      }}>
      <div>
        <div className="thumb-arrow">
          <i className="fas fa-chevron-up" onMouseEnter={this.mouseOut} onMouseLeave={this.mouseOver} onClick={this.props.handleArrowUp}></i>
        </div>
        {thumbList}
        <div className="thumb-arrow">
          <i className="fas fa-chevron-down" onMouseEnter={this.mouseOut} onMouseLeave={this.mouseOver} onClick={this.props.handleArrowDown}></i>
        </div>
      </div>
      <div className="photo-nav">
        <div className="expand-container width-100-min-0"><i onMouseEnter={this.mouseOut} onMouseLeave={this.mouseOver} onClick={() => this.setState({ extended: !this.state.extended })} className="fas fa-expand"></i></div>
        <div className="arrow-container width-100-min-0">
          <i onMouseEnter={this.mouseOut} onMouseLeave={this.mouseOver} onClick={this.props.handleArrowUp} className="fas fa-chevron-left"></i>
          <i onMouseEnter={this.mouseOut} onMouseLeave={this.mouseOver} onClick={this.props.handleArrowDown} className="fas fa-chevron-right"></i>
        </div>
      </div>
    </div>);
  }
}


export default ImageGallery;