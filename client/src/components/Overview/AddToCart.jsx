import React, { useState, useEffect } from 'react';

const QtyOptions = function(props) {
  let options = [];
  for (let i = 1; i <= props.sizeQty && i <= 15; i++) {
    options.push((<option key={i} value={i}>{i}</option>));
  }
  return options;
};

const AddToCart = function(props) {
  // These buttons will be changing to select elements
  const [sizeQty, setQty] = useState(1);
  const [value, setValue] = useState('');
  const [selectedQty, setSelectedQty] = useState('');
  const sizes = {};
  if (props.currentStyle) {
    for (let key in props.currentStyle.skus) {
      let { quantity, size } = props.currentStyle.skus[key];
      sizes[size] = [quantity, key];
    }
  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      props.handleAddToCart(e, parseInt(sizes[value][1], 10), selectedQty);
    }}>
      <div className="flex-row">

        <select value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setQty(sizes[e.target.value][0]);
          }} name="size" id="size-select">
          <option value="">Select Size</option>
          {Object.keys(sizes).map((size) => {
            return (<option value={size} key={size} id={`${size}-select`}>{size}</option>);
          })}
        </select>

        <select value={selectedQty}
          onChange={(e) => setSelectedQty(parseInt(e.target.value, 10))}
          name="quantity"
          id="quantity-select">

          <option value="">Quantity</option>
          <QtyOptions sizeQty={sizeQty} />

        </select>
      </div>

      <div className="flex-row">
        <button>Add to Bag</button>
        <button>STAR</button>
      </div>
    </form>
  );
};

export default AddToCart;