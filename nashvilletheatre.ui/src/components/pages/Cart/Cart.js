import React from 'react'
import LineItem from './LineItem';
import AllShows from '../../shared/AllShows/AllShows';
import { getUsersCartId, getShowLineItems, getSubscriptionLineItems } from '../../../helpers/data/cartData';

import './Cart.scss';

class Cart extends React.Component {
  state = {
    cartId: null,
    shows: [],
    subscriptions:[],
  }

  componentDidMount() {
    const { uid } = this.props.match.params;
    getUsersCartId(uid)
    .then((cartId) => {
      this.setState({ cartId: cartId })
      getSubscriptionLineItems(cartId)
        .then((subscriptions) => {
          this.setState({subscriptions:subscriptions})
          getShowLineItems(cartId)
            .then((shows) => {
              this.setState({shows:shows})
        })
      })
    })
  };

  render() {
    const { shows, subscriptions } = this.state;
    return (
      <div className="cart-container">
        <h1 className="">Box Office</h1>
        <LineItem shows={shows} subscriptions={subscriptions}/>
      </div>
    );
  }
}
export default Cart;