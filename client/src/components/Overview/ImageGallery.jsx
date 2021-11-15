import React, { useState } from 'react';

const Thumbnail = function(props) {
  let currentThumbId = parseInt(props.thumbId.replace('thumb', ''), 10);

  return (
    <div className={props.selectedThumb === currentThumbId ?
      'thumb current-thumb' :
      'thumb'}><img onClick={(e) => props.thumbClick(e, props.thumbId)} src={props.thumbImg}></img></div>
  );
};

const ImageGallery = function(props) {
  const { extended, setExtended } = useState(false);
  let thumbs = props.currentStyle.photos.map((photo) => (photo.thumbnail_url));
  let thumbList = thumbs.map((t, index) => (<Thumbnail
    thumbClick={props.thumbClick}
    key={'thumb' + index}
    thumbId={'thumb' + index}
    selectedThumb={props.selectedThumb}
    thumbImg={t} />));

  return (<div className={extended ? 'extended' : 'flex-column col-2-3'} id="image-gallery"
    style={{
      backgroundImage: `url(${props.currentStyle.photos[props.selectedThumb].url})`,
      backgroundRepeat: 'no-repeat'
    }}>
    <div className="thumb-arrow">
      <i className="fas fa-chevron-up"></i>
    </div>
    {thumbList}
    <div className="thumb-arrow">
      <i className="fas fa-chevron-down"></i>
    </div>
  </div>);
};


export default ImageGallery;