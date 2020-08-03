import React from 'react';
import { withRouter } from 'react-router-dom';
import { Form, FormControl } from 'react-bootstrap';
import searchIco from '../../../images/icons/search_icon.png'
import './Navey.scss';

class SearchBar extends React.Component {
  state = {
    searchTerm: '',
  }

  updateSearchTerm = (e) => {
    this.setState({ searchTerm: e.target.value });
  }

  searchBarChange = (e) => {
    if (e.keyCode === 13) {
      this.props.history.push(`/search/${this.state.searchTerm}/`);
    }
  }

  render() {
    const { searchTerm } = this.state;
    return (
      <Form className="SearchBar">
        <img src={searchIco} height="30" className="icon-inset" alt="Search:" />
        <FormControl
        type="text"
        id="show-search"
        placeholder="Enter an event, play, or other show name"
        className="search-box rounded-pill"
        value={searchTerm}
        onChange={this.updateSearchTerm}
        onKeyDown={this.searchBarChange}
        />

      </Form>
    );
  }
}
export default withRouter(SearchBar);