import React from 'react'
import './Cart.scss';

class Quantity extends React.Component {

  updateQuantityEvent = (e) => {
    e.preventDefault();
    const { id, updateQuantity } = this.props
    let value = e.target.value;
    updateQuantity(id, value);
    }

  render() {
    const { quantity } = this.props
    return (
      <div>
        <input
        type="number"
        id="quantity"
        name="quantity"
        min="1"
        value={quantity}
        onChange={this.updateQuantityEvent}
        />
      </div>
    );
  }
}
export default Quantity;