import React from 'react'
import ShowLineItem from './ShowLineItem';
import SubscriptionLineItem from './SubscriptionLineItem';

import { deleteLineItem } from '../../../helpers/data/cartData';

import './Cart.scss';

class LineItem extends React.Component {

  removeLineItem = (lineItemId) => {
    deleteLineItem(lineItemId)
    .then(() => {
      console.log('item deleted')

    })
  }

  render() {
    const { shows, subscriptions } = this.props
    const showItemListing = shows.map((item) => <ShowLineItem key={item.lineItemId} item={item} removeLineItem={this.removeLineItem} />)
    const subscriptionItemListing = subscriptions.map((item) => <SubscriptionLineItem key={item.lineItemId} item={item}/>)
    return (
      <table className="table line-item">
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