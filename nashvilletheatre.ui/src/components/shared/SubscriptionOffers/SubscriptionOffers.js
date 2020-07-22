import React from 'react';
import { Link } from 'react-router-dom';

import {getAllSubscriptionsByUserType} from '../../../helpers/data/subscriptionData';
import SingleSubscription from '../SubscriptionOfferCard/SubscriptionOfferCard';

import './SubscriptionOffers.scss';


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
          <div className="offer-container d-flex flex-wrap justify-content-center">
            {subscriptionCards}
          </div>
          <h4 className="theatre-login">Are you a Theatre or a venue? <Link to="">Click here</Link></h4>
        </div>
      </section>
    )
  }
}

export default AllSubscriptions;
