import React from 'react'
import Quantity from './Quantity';
import moment from 'moment';
import { Link } from 'react-router-dom';

import './Cart.scss';

class ShowLineItem extends React.Component {

  removeLineItemEvent = (e) => {
    e.preventDefault();
    const { removeLineItem, item } = this.props;
    removeLineItem(item.lineItemId);
  }

  render() {
    const { item, updateQuantity } = this.props
    return (
      <tr>
          <td>
            <div className="show-line-item d-flex flex-wrap justify-content-start">
              <div className="cart-image">
                <svg height="0" width="0">
                  <defs>
                    <clipPath id="ticket-clip" clipPathUnits="objectBoundingBox"
                    transform="scale(.003, .005)">
                      <path d="M320,53.2V0H0V53.2C12.8,53.2,23.2,63,23.2,75S12.8,96.8,0,96.8V150H320V96.8c-12.8,0-23.2-9.8-23.2-21.8S307.2,53.2,320,53.2Z"/>
                    </clipPath>
                  </defs>
                </svg>
                <Link to={`/show/${item.showId}`}>
                <img src={item.showImageUrl} alt={item.showName}/>
                </Link>
              </div>
              <div className="show-info">
                <p className="bold">{item.itemName}</p>
                <div className="red-dash"></div>
                <p className="mini bold">{moment(item.showDateTime).format('L')}  |  {moment(item.showDateTime).format('LT')}</p>
                { item.theatreCompanyName === item.venueName
                ? <p className="mini">{item.theatreCompanyName}</p>
                :
                <p className="mini">
                  {item.theatreCompanyName}<br/>
                  {item.venueName}
                </p>
                }
                <Link onClick={this.removeLineItemEvent}>Remove</Link>
              </div>
            </div>
          </td>
          <td>
            <p className="bold">${item.itemPrice.toFixed(2)}</p>
            <p className="mini">({item.creditCost} Credit)</p>
          </td>
          <td>
            <Quantity id={item.lineItemId} quantity={item.quantity} updateQuantity={updateQuantity}/>
          </td>
          <td>
            <p className="bold">
              ${(item.quantity*item.itemPrice).toFixed(2)}
            </p>
          </td>
      </tr>
    );
  }
}
export default ShowLineItem;