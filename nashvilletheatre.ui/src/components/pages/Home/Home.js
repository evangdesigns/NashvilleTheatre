import React from 'react';
import SubscriptionOffers from '../../shared/SubscriptionOffers/SubscriptionOffers';
import AllShows from '../../shared/HeadlineShows/HeadlineShows';

import './home.scss';


class Home extends React.Component {
  render() {
    return (
     <section>
       <h1 className="text-center">Welcome NashvilleTheatre.com</h1>
       <AllShows />
       <SubscriptionOffers />
     </section>
    )
  }
}

export default Home;
