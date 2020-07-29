import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import arrow_icon from '../../../images/icons/next_icon.png'
import './ShowDatesTable.scss';

class ShowDatesTable extends React.Component {
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
        <tr className="line-item" id={`showDate-${date.showDateTimeId}`}>
          <td>
            <p className="bold-weight">{moment(date.showDateTime).format('dddd')}</p>
            <div className="red-dash"></div>
            <p>{moment(date.showDateTime).format('MMMM Do, h:mm a')}</p>
          </td>
          <td className="align-middle">
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
              <Link onClick={this.eventHandler} to="">
                <img id={date.showDateTimeId} src={arrow_icon} alt="Add to Cart" />
              </Link>
            </div>
          </td>
        </tr>
    );
  }
}
export default ShowDatesTable;