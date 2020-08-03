import React from 'react';
import { Nav } from 'react-bootstrap';
import { getTopCategories } from '../../../helpers/data/categoryData';

class FooterCategories extends React.Component {
  state = {
    categories: []
  };

  componentDidMount() {
    getTopCategories()
      .then(categories => this.setState({ categories: categories }));
  };

  render() {
    const { categories } = this.state;
    return (
      <Nav className="category-links justify-content-center">
        {categories.map((category) => <Nav.Link key={category.categoryId} href={`/category/${category.categoryId}`}>{category.categoryName}</Nav.Link>)}
      </Nav>
    )
  }
}

export default FooterCategories;