import React from 'react';

const StyleThumb = function(props) {
  return (<div>
    <span role="img" aria-label={props.styleName} onClick={(e) => props.onClick(e, props.styleId)} className={props.currentStyleId === props.styleId ?
      'styleThumb current-style' :
      'styleThumb'} style={{backgroundImage: `url(${props.thumbnailUrl})`}}>
      <i className="fas fa-check"></i>
    </span>
  </div>);
};

const StyleSelector = function(props) {
  let styleName = props.currentStyle.name;

  if (Object.keys(props.styles).length !== 0) {
    let styleThumbs = props.styles.map((style, index) => {
      return (<StyleThumb styleId={style.style_id} styleName={styleName} currentStyleId={props.currentStyle.style_id} onClick={props.styleClick} thumbnailUrl={style.photos[0].thumbnail_url} key={'StyleThumb' + index} />);
    });

    return (
      <React.Fragment>
        <div id="style-name" className="flex-row">
          <h3>{'Style >'} </h3><h4>{styleName}</h4>
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