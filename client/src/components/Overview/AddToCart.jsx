import React from 'react';

const AddToCart = function(props) {
  // These buttons will be changing to select elements
  return (
    <React.Fragment>
      <div className="flex-row">
        <button>Select Size</button>
        <button>1</button>
      </div>
      <div className="flex-row">
        <button>Add to Bag</button>
        <button>STAR</button>
      </div>
    </React.Fragment>
  );
};

export default AddToCart;