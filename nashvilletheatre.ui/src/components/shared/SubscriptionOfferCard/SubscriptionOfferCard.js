import React from 'react';

import './SubscriptionOfferCard.scss';
import { Col } from 'react-bootstrap';

class SingleSubscription extends React.Component {
  render() {
    const { subscription } = this.props;
    return (

      <div className="subscription-card" lg={2} md={2} sm={6} xs={12}>
        <div className="offer-body"id={subscription.subscriptionName} >
          <div className="text-center offer-detail">
            <h3>{subscription.subscriptionName}</h3>
            <h1 className="title text-center">${subscription.price}</h1>
            <p className="subtext">/month</p>
            <p>See <span className="medium-weight">{subscription.credits} shows a month</span> at any Nashville Theatre affiliated company</p>
            <button className="button-1">SUBSCRIBE</button>
          </div>
        </div>
      </div>

    )
  }
}

export default SingleSubscription;