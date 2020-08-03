import React from 'react';
import { getTopCategoriesWithShows } from '../../../helpers/data/categoryData';
import { NavDropdown } from 'react-bootstrap';


class Category extends React.Component {
   state = {
    categorySummary: [],
  }

  componentDidMount() {
    const { category } = this.props;
    getTopCategoriesWithShows(category.categoryId)
    .then((categorySummary) => {
      this.setState({ categorySummary: categorySummary })
    })
  }

  render() {
    const { categorySummary } = this.state;
    const { category } = this.props;

    return (
      <NavDropdown title={category.categoryName} id="collasible-nav-dropdown" to={`/category/${category.categoryId}`}>
      {categorySummary.map(show => <NavDropdown.Item key={show.showId} href={`/show/${show.showId}`}>{show.showName}</NavDropdown.Item>)}
      </NavDropdown>
    );
  }
}

export default Category;