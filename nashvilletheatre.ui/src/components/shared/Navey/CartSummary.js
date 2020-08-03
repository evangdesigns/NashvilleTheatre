import React from 'react';

class CartSummary extends React.Component {
  render() {
    const { cart, shows, subscriptions } = this.props;
    return (
      <div className="mini-cart-summary">
        <p>${parseFloat(cart.total).toFixed(2)}</p>
      </div>
    );
  }
}

export default CartSummary;