import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import arrow_icon from '../../../images/icons/next_icon.png'
import './MiniShowCard.scss';

class MiniShowCard extends React.Component {
	state = {
		quantity: 1
	}
	updateQuantityEvent = (e) => {
    e.preventDefault();
    let value = e.target.value;
    this.setState({quantity:value});
  }

	eventHandler = (e) => {
		e.preventDefault();
		const showDateId = e.target.id;
		const { addItemToCart } = this.props;
		const { quantity} = this.state;
		addItemToCart(showDateId, quantity)
	}

	render() {
		const { quantity } = this.state;
		const { date } = this.props;
		return (
			<div className="mini-show-card" id={`showDate-${date.showDateTimeId}`}>
				<div>
					<p className="bold-weight">{moment(date.showDateTime).format('dddd')}</p>
          <p>{moment(date.showDateTime).format('MMMM Do, h:mm a')}</p>
					<div className="red-dash"></div>
				</div>
				<div>
				<label>QUANTITY: &nbsp;</label>
        <input
        type="number"
        id="quantity"
        name="quantity"
        min="1"
        value={quantity}
        onChange={this.updateQuantityEvent}
        />
      </div>
				<Link onClick={this.eventHandler} to="">
					<p id={date.showDateTimeId}>ADD TO CART &nbsp; <img id={date.showDateTimeId} src={arrow_icon} alt="Add to Cart" /></p>
				</Link>
			</div>
		);
	}
}

export default MiniShowCard;