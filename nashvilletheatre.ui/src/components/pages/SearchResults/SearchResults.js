import React from 'react';
import { searchShows } from '../../../helpers/data/showData';
import Show from '../../shared/ShowCard/ShowCard';
import HeadlineShows from '../../shared/HeadlineShows/HeadlineShows';
import './SearchResults.scss';
import '../../shared/ShowCard/ShowCard.scss';
import { Row } from 'react-bootstrap';

class SearchResults extends React.Component {
  state = {
    shows: [],
  }

  componentDidMount() {
    const { searchTerm } = this.props.match.params
    searchShows(searchTerm)
      .then( shows => this.setState({ shows: shows }))
  }

  componentDidUpdate(e) {
    const { searchTerm } = this.props.match.params
    if (e.key === 'Enter'){
      searchShows(searchTerm)
        .then( shows => this.setState({ shows: shows }))
    }
  }

  renderView() {
    const { shows } = this.state;
    const count = shows.length;
    if (count > 0) {
      return (
        <div>
          <p className="results-number">{count} Results</p>
          <Row className="d-flex flex-wrap justify-content-center">
            {shows.map((show) => <Show key={show.showId} show={show} showDate={show.showDateTime} showTime={show.showDateTime}/>)}
          </Row>
        </div>
      );
    } else {
      return(
      <div>
        <h1 className="text-center">What A Tragedy</h1>
        <h4 className="text-center">Your search returned no results.</h4>
        <h2 className="text-center">But checkout theses other shows...</h2>
        <HeadlineShows />
      </div>
      )
    }
  }

  render() {
    return (
      <section>
        {this.renderView()}
      </section>
    )
  }
}

export default SearchResults;