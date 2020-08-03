import React from 'react';
import ShowCard from '../ShowCard/ShowCard';
import { Row } from 'react-bootstrap';
import { getAllShows } from '../../../helpers/data/showData';

import './HeadlineShows.scss';

class HeadlineShows extends React.Component {
	state = {
		shows: []
	}

	componentDidMount() {
		getAllShows()
			.then(shows => this.setState({ shows: shows }));
	};

	render() {
		const { shows } = this.state;
		return (
			<section>
				<Row className="d-flex flex-wrap justify-content-center">
					{shows.slice(0,6).map((show) => <ShowCard key={show.showId} show={show}/>)}
				</Row>
			</section>
		)
	}
}

export default HeadlineShows;
