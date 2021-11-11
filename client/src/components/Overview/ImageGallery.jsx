import React from 'react';

const Thumbnail = function(props) {
  return (
    <div className="thumb"><img onClick={(e) => console.log(e.target)} src={props.thumbImg}></img></div>
  );
};

// class ImageGallery extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       default: {},
//       thumbnails: [],
//       // updated: false,
//     };
//   }

//   componentDidMount() {
//     // this.props.styles.map((style) => {
//     //   if (style['default?'] && this.state.default !== style) {
//     //     this.setState({
//     //       default: style,
//     //       updated: true,
//     //     });
//     //   }
//     // });
//   }

//   // componentDidUpdate() {
//   //   if (this.state.updated) {
//   //     let thumbs = this.props.currentStyle.photos.map((photo) => (photo.thumbnail_url));
//   //     if (JSON.stringify(this.state.thumbnails) !== JSON.stringify(thumbs)) {
//   //       this.setState({ thumbnails: thumbs });
//   //     }
//   //   }
//   // }

//   render() {
//     let thumbs = this.props.curentStyle.photos.map((photo) => (photo.thumbnail_url));
//     let thumbList = thumbs.map((t, index) => (<Thumbnail key={'thumb' + index} thumbImg={t} />));

//     return (<div className="flex-column col-2-3" id="image-gallery" style={//this.state.updated ?
//       {backgroundImage: `url(${this.props.currentStyle.photos[0].url})`,
//         backgroundRepeat: 'no-repeat'}// :
//       /*{backgroundColor: 'black'}*/}>
//       {/* {thumbList ? thumbList : <Thumbnail thumbImg="" />} */}
//       {thumbList}
//     </div>);
//   }
// }

const ImageGallery = function(props) {
  let thumbs = props.currentStyle.photos.map((photo) => (photo.thumbnail_url));
  let thumbList = thumbs.map((t, index) => (<Thumbnail key={'thumb' + index} thumbImg={t} />));

  return (<div className="flex-column col-2-3" id="image-gallery"
    style={{
      backgroundImage: `url(${props.currentStyle.photos[0].url})`,
      backgroundRepeat: 'no-repeat'
    }}>
    {thumbList}
  </div>);
};


export default ImageGallery;