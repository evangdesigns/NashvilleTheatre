import React from 'react'
import LineItems from './LineItems';
import { getUsersCart, getSubscriptionLineItems,getShowLineItems } from '../../../helpers/data/cartData';
import './Cart.scss';

class Cart extends React.Component {
  state = {
    cart: {},
    subscriptions: [],
    shows: [],
  }
  componentDidMount() {
    this.getCartData();
  }

  getCartData = () => {
    this.getUsersCart()
    this.getShowLineItems();
    this.getSubscriptionLineItems();
  }

  getUsersCart() {
    const uid = sessionStorage.getItem('uid');
    if (uid) {
      getUsersCart(uid)
    .then((cart) => {
      this.setState({ cart: cart })
      })
    }
  }

  getSubscriptionLineItems() {
    const cartId = sessionStorage.getItem('cartId');
    if (cartId) {
    getSubscriptionLineItems(cartId)
      .then((subscriptions) => {
        this.setState({ subscriptions: subscriptions })
    })}
  }

  getShowLineItems() {
    const cartId = sessionStorage.getItem('cartId');
    if (cartId) {
      getShowLineItems(cartId)
      .then((shows) => {
      this.setState({ shows: shows })
    })}
  }

  render() {
    const { cart, shows, subscriptions } = this.state;
    return (
      <div className="cart-container">
        <h1 className="text-center">Box Office</h1>
        <div className=" container">

          <div className="row">
            <div className="col">
              <LineItems shows={shows} subscriptions={subscriptions} getCartData={this.getCartData}/>
            </div>
            <div className="cart-summary col-lg-4">
              <div className="cart-summary-top">
                <h3 className="bold">Cart Summary</h3>
                <span className="bold">{shows.length + subscriptions.length} ITEMS</span>
              </div>
              <div className="cart-summary-middle">
                <div className="row">
                  <div className="col">
                    <span className="bold">ESTIMATED TOTAL <span className="light mini">(Before Taxes)</span></span>
                  </div>
                  <div className="col">

                    <h4 className="bold float-right">$
                    {NaN ? '0.00' : parseFloat(cart.total).toFixed(2)}
                    </h4>
                  </div>
                </div>
              </div>
              <div className="cart-summary-bottom">
                <button type="button" className="button-1">CHECKOUT</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Cart;