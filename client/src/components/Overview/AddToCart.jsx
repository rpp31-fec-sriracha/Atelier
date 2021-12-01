import React, { useState, useEffect } from 'react';

const QtyOptions = function(props) {
  let options = [];
  for (let i = 2; i <= props.sizeQty && i <= 15; i++) {
    options.push((<option key={i} value={i}>{i}</option>));
  }
  return options;
};

const AddToCart = function(props) {
  // These buttons will be changing to select elements
  const [sizeQty, setQty] = useState(1);
  const [value, setValue] = useState('');
  const [selectedQty, setSelectedQty] = useState('');
  const [disabled, setDisabled] = useState(true);
  const sizes = {};
  if (props.currentStyle) {
    for (let key in props.currentStyle.skus) {
      let { quantity, size } = props.currentStyle.skus[key];
      sizes[size] = [quantity, key];
    }
  }

  return (
    <form onSubmit={(e) => {
      let sizeValue;
      e.preventDefault();
      if (!sizes[value]) {
        sizeValue = false;
      } else {
        sizeValue = parseInt(sizes[value][1], 10);
      }
      props.handleAddToCart(e, sizeValue, selectedQty);
    }}>
      <div className="flex-row">

        <select value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setQty(e.hasOwnProperty('value') ? sizes[e.target.value][0] : '');
            setDisabled(!Boolean(e.target.value));
          }} name="size" id="size-select" required>
          <option value="">Select Size</option>
          {Object.keys(sizes).map((size) => {
            return (<option value={size} key={size} id={`${size}-select`}>{size}</option>);
          })}
        </select>

        <select value={selectedQty}
          onChange={(e) => setSelectedQty(parseInt(e.target.value, 10))}
          name="quantity"
          id="quantity-select"
          disabled={disabled}>

          <option value={value ? 1 : ''}>{value ? 1 : '-'}</option>
          <QtyOptions sizeQty={sizeQty} />

        </select>
      </div>

      <div className="flex-row">
        <button>Add to Bag</button>
        <button><i className="far fa-star"></i></button>
      </div>
    </form>
  );
};

export default AddToCart;