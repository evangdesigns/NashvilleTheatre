import React from 'react';
import { Link } from 'react-router-dom';

import {getAllSubscriptionsByUserType} from '../../../helpers/data/subscriptionData';
import SingleSubscription from '../SubscriptionOfferCard/SubscriptionOfferCard';

import './SubscriptionOffers.scss';
import { Row } from 'react-bootstrap';


class AllSubscriptions extends React.Component {
  state = {
    subscriptions: []
  }

  componentDidMount() {
    getAllSubscriptionsByUserType()
      .then(subscriptions => this.setState({ subscriptions: subscriptions }));
  };

  render() {
    const { subscriptions } = this.state;
    const subscriptionCards = subscriptions.map((subscription) => <SingleSubscription key={subscription.subscriptionId} subscription={subscription} />)
    return (
      <section>
        <div className="text-center">
          <h2 className="title">Get All Access to Nashville Theatre!</h2>
          <h3 className="subtext light">Subscribe Today!</h3>
          <Row className="offer-container justify-content-center">
            {subscriptionCards}
          </Row>
          <h4 className="theatre-login">Are you a Theatre or a Venue? <Link to="">Click here</Link></h4>
          <svg height="0" width="0">
          <defs>
            <clipPath id="subscription-ticket-clip" clipPathUnits="objectBoundingBox" transform="scale(0.00333 0.00153)">
              <path d="M199.4,0c0,24.8-22.1,47.8-49.4,47.8S100.6,24.8,100.6,0H40A40,40,0,0,0,0,39.9V600.1A40,40,0,0,0,40,640h60.6c0-24.8,22.1-47.8,49.4-47.8s49.4,23,49.4,47.8H260a40,40,0,0,0,40-39.9V39.9A40,40,0,0,0,260,0Z"/>
            </clipPath>
          </defs>
        </svg>
        </div>
      </section>
    )
  }
}

export default AllSubscriptions;
