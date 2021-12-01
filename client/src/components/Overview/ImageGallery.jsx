import React from 'react';

const Thumbnail = function (props) {
  let currentThumbId = parseInt(props.thumbId.replace('thumb', ''), 10);
  let thumbImg;
  if (props.thumbImg[0] === 'u') {
    thumbImg = props.thumbImg.slice(1);
  } else {
    thumbImg = props.thumbImg;
  }

  let className = props.selectedThumb === currentThumbId ?
    'thumb current-thumb' :
    'thumb';

  if (props.extended) {
    className += ' extended-thumb';
  }

  return (
    <div className={className} onMouseEnter={props.thumbEnter} onMouseLeave={props.thumbLeave} onClick={(e) => props.thumbClick(e, props.thumbId)} >
      {!props.extended ? <img src={thumbImg}></img> : null}
    </div>
  );
};

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      extended: false,
      zoomed: false,
      imageHover: false,
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
      offsetX: Math.floor((e.nativeEvent.offsetX / this.state.width) * 100) + '%',
      offsetY: Math.floor((e.nativeEvent.offsetY / this.state.height) * 100) + '%',
    });
  }

  mouseOver() {
    this.setState({imageHover: true});
  }

  mouseOut() {
    this.setState({imageHover: false});
  }

  setExpanded(e) {
    if (this.state.imageHover === true && !this.state.extended && e.target.nodeName !== 'IMG') {
      this.setState({
        extended: true
      });
    } else {
      if (!e.target.classList.contains('thumb') && e.target.nodeName !== 'IMG' && e.target.nodeName !== 'I') {
        this.setState({
          zoomed: !this.state.zoomed
        });
      }
    }
    const { width, height } = document.getElementById('image-gallery').getBoundingClientRect();
    this.setState({ width, height });
  }

  componentDidMount() {
    const { width, height } = document.getElementById('image-gallery').getBoundingClientRect();
    this.setState({ width, height });
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
          extended={this.state.extended}
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
        backgroundSize: `${this.state.zoomed ? '250%' : 'contain'}`,
        backgroundPosition: (this.state.zoomed ? `${this.state.offsetX} ${this.state.offsetY}` : 'center'),
        // transition: 0,
      }}>
      <div className="thumb-container">
        <div className="thumb-arrow">
          <i className="fas fa-chevron-up" onMouseEnter={this.mouseOut} onMouseLeave={this.mouseOver} onClick={this.props.handleArrowUp}></i>
        </div>
        {thumbList}
        <div className="thumb-arrow">
          <i className="fas fa-chevron-down" onMouseEnter={this.mouseOut} onMouseLeave={this.mouseOver} onClick={this.props.handleArrowDown}></i>
        </div>
      </div>
      <div className="photo-nav">
        <div className="expand-container width-100-min-0"><i onMouseEnter={this.mouseOut} onMouseLeave={this.mouseOver} onClick={() => this.setState({ extended: !this.state.extended, zoomed: false })} className="fas fa-expand"></i></div>
        <div className="arrow-container width-100-min-0">
          <i onMouseEnter={this.mouseOut} onMouseLeave={this.mouseOver} onClick={this.props.handleArrowUp} className="fas fa-chevron-left"></i>
          <i onMouseEnter={this.mouseOut} onMouseLeave={this.mouseOver} onClick={this.props.handleArrowDown} className="fas fa-chevron-right"></i>
        </div>
      </div>
    </div>);
  }
}


export default ImageGallery;