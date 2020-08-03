import React from 'react'
import Quantity from './Quantity';
import moment from 'moment';
import { Link } from 'react-router-dom';

import './Cart.scss';

class ShowLineItem extends React.Component {

  removeLineItemEvent = (e) => {
    e.preventDefault();
    const { removeLineItem, item } = this.props
    //insert prompt here
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
                    transform="scale(.0015, .0023)">
                      <path d="M640.5,106.6V40.2a40,40,0,0,0-40-40H40.5a40,40,0,0,0-40,40v66.4c25.6,0,46.4,19.5,46.4,43.6S26.1,193.8.5,193.8v66.4a40,40,0,0,0,40,40h560a40,40,0,0,0,40-40V193.8c-25.6,0-46.4-19.5-46.4-43.6S614.9,106.6,640.5,106.6Z"/>
                    </clipPath>
                  </defs>
                </svg>
                <Link to={`/show/${item.showId}`}>
                <img src={item.showImageUrl} alt={item.showName}/>
                </Link>
              </div>
              <div className="show-info">
                <p className="bold-weight">{item.itemName}</p>
                <div className="red-dash"></div>
                <p className="mini bold-weight">{moment(item.showDateTime).format('L')}  |  {moment(item.showDateTime).format('LT')}</p>
                { item.theatreCompanyName === item.venueName
                ? <p className="mini">{item.theatreCompanyName}</p>
                :
                <p className="mini">
                  {item.theatreCompanyName}<br/>
                  {item.venueName}
                </p>
                }

              </div>
            </div>
          </td>
          <td>
            <p className="bold-weight">${item.itemPrice.toFixed(2)}</p>
            <p className="mini">({item.creditCost} Credit)</p>
          </td>
          <td>
            <Quantity id={item.lineItemId} quantity={item.quantity} updateQuantity={updateQuantity}/>
          </td>
          <td>
            <p className="bold-weight">
              ${(item.quantity*item.itemPrice).toFixed(2)}
            </p>
            <p className="light-weight mini"><Link to="" onClick={()=>{}}>Change</Link><br/><Link className="light-weight mini" onClick={this.removeLineItemEvent}>Remove</Link></p>
          </td>
      </tr>
    );
  }
}
export default ShowLineItem;