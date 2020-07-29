import React from 'react';
import HeaderImage from '../../shared/HeaderImage/HeaderImage';
import SubscriptionOffers from '../../shared/SubscriptionOffers/SubscriptionOffers';
import AllShows from '../../shared/HeadlineShows/HeadlineShows';

import './home.scss';


class Home extends React.Component {
  render() {
    return (
      <div>
        <HeaderImage src="https://www.313presents.com/assets/img/fox-theatre-slide-4-7f762b2ed1.jpg" alt="Welcome NashvilleTheatre.com" />
        <section>
          <AllShows />
          <SubscriptionOffers />
        </section>
      </div>
    )
  }
}

export default Home;
