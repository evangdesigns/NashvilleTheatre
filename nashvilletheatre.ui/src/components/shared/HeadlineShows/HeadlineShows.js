import React from 'react';
import ShowCard from '../ShowCard/ShowCard';
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
		const singleShow = shows.map((show) => <ShowCard key={show.showId} show={show}/>);
		return (
			<div className="headliners d-flex flex-wrap justify-content-center">
				{singleShow}
			</div>
		)
	}
}

export default HeadlineShows;
