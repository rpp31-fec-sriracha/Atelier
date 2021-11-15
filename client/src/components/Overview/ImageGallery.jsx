import React, { useState } from 'react';

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

const ImageGallery = function (props) {
  const { extended, setExtended } = useState(false);

  let thumbs = props.currentStyle.photos.map((photo) => (photo.thumbnail_url));
  let thumbList = thumbs.map((t, index) => {
    if (index >= props.thumbStart && index < props.thumbEnd) {
      return (<Thumbnail
        thumbClick={props.thumbClick}
        key={'thumb' + index}
        thumbId={'thumb' + index}
        selectedThumb={props.selectedThumb}
        thumbImg={t} />);
    }
  });

  return (<div className={extended ? 'extended' : 'flex-row col-2-3'} id="image-gallery"
    style={{
      backgroundImage: `url(${props.currentStyle.photos[props.selectedThumb].url})`,
      backgroundRepeat: 'no-repeat'
    }}>
    <div>
      <div className="thumb-arrow">
        <i className="fas fa-chevron-up"></i>
      </div>
      {thumbList}
      <div className="thumb-arrow">
        <i className="fas fa-chevron-down" onClick={props.handleArrowDown}></i>
      </div>
    </div>
    <i className="fas fa-expand"></i>
  </div>);
};


export default ImageGallery;