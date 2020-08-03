import React from 'react';
import HeaderImage from '../../shared/HeaderImage/HeaderImage';
import ShowDatesTable from '../../shared/ShowDatesTable/ShowDatesTable';
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.showId !== this.state.show.showId) {
      const showId = nextProps.match.params.showId;
      this.getShowData(showId);
    }
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

  addItemToCart = (productId, quantity) => {
    const {user} = this.props;
    const lineItem = {
      CartId: parseInt(sessionStorage.getItem('cartId')),
      LineItemTypeId: 2,
      ProductId: parseInt(productId),
      Quantity: parseInt(quantity)
    };
    addToCart(lineItem)
    .then(()=>{this.props.history.push(`/cart/${user.uid}`)})
  }

  render() {
    const {user} = this.props;
    const { show, showDates } = this.state;
    const showLineUp = showDates.map((date) => <ShowDatesTable key={date.showDateTimeId} date={date} user={user} addItemToCart={this.addItemToCart}/>)
    return (
      <div>
        <HeaderImage src={show.showImageUrl} alt={show.showName} subheading={show.theatreCompanyName}/>
        <section>

          <div className="row">
            <div className="col-md-8 col-md-pull-8">
              <table className="table table-striped line-item ShowDatesTable">
                <thead>
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Add To Cart</th>
                  </tr>
                </thead>
                <tbody>
                  {showLineUp}
                </tbody>
              </table>
            </div>

          <div className="col-md-4 col-md-push-4">
          <h5>The Location:</h5>
            <p>{show.venueName}</p>
            <h5>The Story:</h5>
            <p className="text-justify">{show.synopsis}</p>
          </div>

        </div>

      </section>
     </div>
    )
  }
}

export default Show;