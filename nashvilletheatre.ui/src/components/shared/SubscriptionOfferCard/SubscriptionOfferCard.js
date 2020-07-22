import React from 'react';

import './SubscriptionOfferCard.scss';

class SingleSubscription extends React.Component {
  render() {
    const { subscription } = this.props;
    return (
      <div className="offer-body col-md-2"id={subscription.subscriptionName} >
        <div className="text-center offer-detail">
          <h3>{subscription.subscriptionName}</h3>
          <h1 className="title text-center">${subscription.price}</h1>
          <p class="subtext">/month</p>
          <p>See {subscription.credits} shows a month at any Nashville Theatre affiliated company</p>
          <button className="button-1">SUBSCRIBE</button>
        </div>
      </div>
    )
  }
}

export default SingleSubscription;