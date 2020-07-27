import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import './ShowCardFullDetail.scss';

class ShowCardFullDetail extends React.Component {
    render() {
		const { show } = this.props;
		return (
			<div className="show-card">
				<div className="ticket-image">
					<svg height="0" width="0">
						<defs>
							<clipPath id="ticket-clip">
								<path d="M320,53.2V0H0V53.2C12.8,53.2,23.2,63,23.2,75S12.8,96.8,0,96.8V150H320V96.8c-12.8,0-23.2-9.8-23.2-21.8S307.2,53.2,320,53.2Z"/>
							</clipPath>
						</defs>
					</svg>
					<Link to={`/show/${show.showId}`}>
					<img src={show.showImageUrl} alt={show.showName}/>
					</Link>
				</div>
				<div className="show-info">
					<h5 className="show-name">{show.showName}</h5>
						<div className="red-dash"></div>
							<p className="card-text synopsis">{show.synopsis}</p>
							<div className="red-dash"></div>
							<div className="d-flex justify-content-between">
								<ul className="list-group list-group-flush show-times">
									Upcoming Shows
									{show.dates.map((date) => <li className="single-time">{moment(date).format('LL LT')}</li> )}
								</ul>
							</div>
					<div className="red-dash"></div>
					<p className="credit">Credit Price:  {show.creditCost}</p>
					<p className="theatreCo">Theatre Company:  {show.theatreCompanyName}</p>
					<p className="venue">Venue:  {show.venueName}</p>
					<Link className="view-info" to={`/show/${show.showId}`}><h4>View Info</h4></Link>
				</div>
			</div>

		);
	}
}

export default ShowCardFullDetail ;
