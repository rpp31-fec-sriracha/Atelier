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
      'thumb'}><img onClick={(e) => props.thumbClick(e, props.thumbId)} src={thumbImg}></img></div>
  );
};

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      extended: false
    };
  }

  render() {

    let thumbs = this.props.currentStyle.photos.map((photo) => (photo.thumbnail_url));
    let thumbList = thumbs.map((t, index) => {
      if (index >= this.props.thumbStart && index < this.props.thumbEnd) {
        return (<Thumbnail
          thumbClick={this.props.thumbClick}
          key={'thumb' + index}
          thumbId={'thumb' + index}
          selectedThumb={this.props.selectedThumb}
          thumbImg={t} />);
      }
    });

    return (<div className={this.state.extended ? 'extended' : 'flex-row'} id="image-gallery"
      style={{
        backgroundImage: `url(${this.props.currentStyle.photos[this.props.selectedThumb].url})`,
        backgroundRepeat: 'no-repeat'
      }}>
      <div>
        <div className="thumb-arrow">
          <i className="fas fa-chevron-up" onClick={this.props.handleArrowUp}></i>
        </div>
        {thumbList}
        <div className="thumb-arrow">
          <i className="fas fa-chevron-down" onClick={this.props.handleArrowDown}></i>
        </div>
      </div>
      <div className="photo-nav">
        <div className="expand-container width-100-min-0"><i onClick={() => this.setState({ extended: !this.state.extended })} className="fas fa-expand"></i></div>
        <div className="arrow-container width-100-min-0">
          <i onClick={this.props.handleArrowUp} className="fas fa-chevron-left"></i>
          <i onClick={this.props.handleArrowDown} className="fas fa-chevron-right"></i>
        </div>
      </div>
    </div>);
  }
}


export default ImageGallery;