import React from 'react';

const StyleThumb = function(props) {
  return (<div onClick={(e) => props.onClick(e, props.styleId)} className="styleThumb" style={{backgroundImage: `url(${props.thumbnailUrl})`}}></div>);
};

const StyleSelector = function(props) {
  if (Object.keys(props.styles).length !== 0) {
    let styleThumbs = props.styles.map((style, index) => {
      return (<StyleThumb styleId={style.style_id} className="styleThumb" onClick={props.styleClick} thumbnailUrl={style.photos[0].thumbnail_url} key={'StyleThumb' + index} />);
    });

    return (
      <React.Fragment>
        <div className="flex-row">
          <h3>{'Style >'} </h3><h4>Selected Style</h4>
        </div>
        <div className="flex-row styleThumbs">
          {styleThumbs}
        </div>
      </React.Fragment>
    );
  } else {
    return (<div></div>);
  }
};

export default StyleSelector;