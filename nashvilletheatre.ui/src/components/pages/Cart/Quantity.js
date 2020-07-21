import React from 'react'

import './Cart.scss';

class Quantity extends React.Component {

  render() {
    const { quantity } = this.props
    return (
      <form>
        <input type="number" id="quantity" name="quantity" min="1" max="5" value={quantity} />
      </form>
    );
  }
}
export default Quantity;