import React from 'react'
import './Cart.scss';
import { deleteLineItem } from '../../../helpers/data/cartData';

class Quantity extends React.Component {

  updateQuantityEvent = (e) => {
    e.preventDefault();
    const { id, quantity, updateQuantity } = this.props
    let value = e.target.value;
    if (value <= 0 ) {
      deleteLineItem(id);
    }
    else if (value !== quantity) {
      updateQuantity(id, value);
    }
  }

  render() {
    const { quantity } = this.props
    return (
      <div>
        <input
        type="number"
        id="quantity"
        name="quantity"
        min="0"
        value={quantity}
        onChange={this.updateQuantityEvent}
        />
      </div>
    );
  }
}
export default Quantity;