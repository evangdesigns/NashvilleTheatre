import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import './ShowCard.scss';
import { Col } from 'react-bootstrap';

class ShowCard extends React.Component {

	render() {
		const { show } = this.props;
		return (
			<Col md={3} sm={12} className="show-card">
				<svg height="0" width="0">
					<defs>
						<clipPath id="ticket-clip" clipPathUnits="objectBoundingBox"
						transform="scale(.0015, .0023)">
							<path d="M640.5,106.6V40.2a40,40,0,0,0-40-40H40.5a40,40,0,0,0-40,40v66.4c25.6,0,46.4,19.5,46.4,43.6S26.1,193.8.5,193.8v66.4a40,40,0,0,0,40,40h560a40,40,0,0,0,40-40V193.8c-25.6,0-46.4-19.5-46.4-43.6S614.9,106.6,640.5,106.6Z"/>
						</clipPath>
					</defs>
				</svg>

				<div className="ticket-image">
					<Link to={`/show/${show.showId}`}>
					<img src={show.showImageUrl} alt={show.showName}/>
					</Link>
				</div>
				<div>
					<p className="bold-weight">{show.showName}</p>
					<div className="red-dash"></div>
					<p>{moment(show.showDateTime).format('MMMM, Do')}  |  {moment(show.showDateTime).format('LT')}</p>
				</div>
				<Link to={`/show/${show.showId}`}>
					<p>GET TICKETS</p>
				</Link>
			</Col>
		);
	}
}

export default ShowCard;
