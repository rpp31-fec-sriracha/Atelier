import React from 'react';

const Thumbnail = function(props) {
  return (
    <div className="thumb"><img onClick={(e) => props.thumbClick(e, props.thumbId)} src={props.thumbImg}></img></div>
  );
};

const ImageGallery = function(props) {
  let thumbs = props.currentStyle.photos.map((photo) => (photo.thumbnail_url));
  let thumbList = thumbs.map((t, index) => (<Thumbnail thumbClick={props.thumbClick} key={'thumb' + index} thumbId={'thumb' + index} thumbImg={t} />));

  return (<div className="flex-column col-2-3" id="image-gallery"
    style={{
      backgroundImage: `url(${props.currentStyle.photos[props.selectedThumb].url})`,
      backgroundRepeat: 'no-repeat'
    }}>
    {thumbList}
  </div>);
};


export default ImageGallery;