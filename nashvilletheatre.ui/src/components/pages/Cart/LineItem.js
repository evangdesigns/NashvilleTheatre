import React from 'react'
import ShowLineItem from './ShowLineItem';
import SubscriptionLineItem from './SubscriptionLineItem';

import './Cart.scss';

class LineItem extends React.Component {

  render() {
    const { shows, subscriptions } = this.props
    const showItemListing = shows.map((item) => <ShowLineItem key={item.itemId} item={item}/>)
    const subscriptionItemListing = subscriptions.map((item) => <SubscriptionLineItem key={item.itemId} item={item}/>)
    return (
      <table class="table line-item">
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
          {subscriptionItemListing}
          {showItemListing}
          </tbody>
          </table>
    );
  }
}
export default LineItem;