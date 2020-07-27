import React from 'react';
import HeaderImage from '../../shared/HeaderImage/HeaderImage';
import MiniShowCard from '../../shared/MiniShowCard/MiniShowCard';
import { addToCart } from '../../../helpers/data/cartData';
import { getShow, getShowDates } from '../../../helpers/data/showData';

import './Show.scss';

class Show extends React.PureComponent {
  state = {
    show: {},
    showDates: []
  }

  componentDidMount() {
    const { showId } = this.props.match.params;
    this.getShowData(showId);
  }

  getShowData(showId) {
    getShow(showId)
    .then((show) => {
      this.setState({ show : show })
      getShowDates(showId)
      .then((showDates) => {
        this.setState({showDates : showDates})
      })
    })
  }

  addItemToCart(productId, quantity) {
    const lineItem = {
      CartId: parseInt(sessionStorage.getItem('cartId')),
      LineItemTypeId: 2,
      ProductId: parseInt(productId),
      Quantity: parseInt(quantity)
    };
    addToCart(lineItem)
    .then(window.alert(`Added ${quantity} tickets to your card`))
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.showId !== this.state.show.showId) {
      const showId = nextProps.match.params.showId;
      this.getShowData(showId);
    }
  }

  render() {
    const { show, showDates } = this.state;
    const showLineUp = showDates.map((date) => <MiniShowCard key={date.showDateTimeId} date={date} addItemToCart={this.addItemToCart}/>)
    return (
     <div>
       <HeaderImage src={show.showImageUrl} alt={show.showName}/>
          <h2 className="text-center">{show.showName}</h2>
          <h4 className="text-center">Theatre Company Name</h4>
          <h4 className="text-center">Venue</h4>
          <div className="d-flex justify-content-center">[MAP CAN GO HERE MAYBE]</div>
          <div className="d-flex flex-wrap justify-content-center">
            {showLineUp}
          </div>

     </div>
    )
  }
}

export default Show;